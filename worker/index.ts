import { normalisePostcode, ukPostcodePattern, validateBrief, type Brief } from "../src/lib/contact-validation";
import type { AddressOption } from "../src/lib/address-types";
import { deliverContactEmails, emailStatements, mailEnabled } from "./contact-mail";

// Minimal D1 interfaces keep the Next export and Worker types independent.
export interface Statement {
  bind(...values: (string | number | null)[]): Statement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<unknown>;
}
export interface Env {
  DB?: { prepare(sql: string): Statement; batch(statements: Statement[]): Promise<unknown> };
  ASSETS: { fetch(request: Request): Promise<Response> };
  CONTACT_FORM_SECRET?: string;
  IDEAL_POSTCODES_API_KEY?: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_EMAIL_ENABLED?: string;
  RESEND_API_KEY?: string;
}
type Transport = typeof fetch;
class HttpError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...(status === 429 ? { "Retry-After": "600" } : {}) },
});
function ready(env: Env) {
  return Boolean(env.DB && env.CONTACT_FORM_SECRET && env.CONTACT_FORM_SECRET.length >= 32 && Boolean(env.TURNSTILE_SITE_KEY) === Boolean(env.TURNSTILE_SECRET_KEY));
}
async function boundedJSON(response: Request | Response, limit: number): Promise<Record<string, unknown>> {
  const length = response.headers.get("content-length");
  if (length && Number(length) > limit) throw new HttpError(413, "This request is too large.");
  if (!response.body) throw new HttpError(400, "A request body is required.");
  const reader = response.body.getReader(); let size = 0; const chunks: Uint8Array[] = [];
  try {
    while (true) { const part = await reader.read(); if (part.done) break; size += part.value.byteLength; if (size > limit) { await reader.cancel(); throw new HttpError(413, "This request is too large."); } chunks.push(part.value); }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try { const value = JSON.parse(new TextDecoder().decode(bytes)); if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(); return value; }
  catch { throw new HttpError(400, "Send a valid JSON object."); }
}
async function hmac(secret: string, value: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return Array.from(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value))), byte => byte.toString(16).padStart(2, "0")).join("");
}
async function quota(env: Env, subject: string, maximum: number, windowSeconds: number) {
  const now = Math.floor(Date.now() / 1000), key = await hmac(env.CONTACT_FORM_SECRET!, subject);
  const row = await env.DB!.prepare(
    "INSERT INTO form_rate_limits (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN expires_at<=? THEN 1 ELSE count+1 END, expires_at=CASE WHEN expires_at<=? THEN excluded.expires_at ELSE expires_at END RETURNING count"
  ).bind(key, now + windowSeconds, now, now).first<{ count: number }>();
  if (!row || row.count > maximum) throw new HttpError(429, "There have been too many requests. Please try later or use the email option.");
}
async function guard(request: Request, env: Env, kind: "contact" | "address") {
  if (!ready(env)) throw new HttpError(503, "Online sending is unavailable. Please use the email option.");
  const origin = request.headers.get("origin");
  if (origin !== new URL(request.url).origin || request.headers.get("sec-fetch-site") === "cross-site") throw new HttpError(403, "Please submit from this website.");
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") throw new HttpError(415, "Send the form as JSON.");
  // Cloudflare supplies this header. Do not trust caller-supplied X-Forwarded-For.
  const ip = request.headers.get("cf-connecting-ip") || "unavailable";
  await quota(env, kind + ":ip:" + ip, kind === "contact" ? 10 : 20, 600);
}
async function verifyChallenge(input: Record<string, unknown>, request: Request, env: Env, transport: Transport) {
  if (!env.TURNSTILE_SECRET_KEY) return;
  if (typeof input.turnstileToken !== "string" || !input.turnstileToken || input.turnstileToken.length > 2048) throw new HttpError(400, "Complete the security check.");
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: input.turnstileToken });
  const response = await transport("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, redirect: "manual", signal: AbortSignal.timeout(7000) });
  const result = await boundedJSON(response, 16000);
  if (!response.ok || result.success !== true || result.action !== "project-brief" || result.hostname !== new URL(request.url).hostname) throw new HttpError(400, "The security check expired. Please try again.");
}
type Receipt = { payload_hash: string; reference: string };
function receipt(row: Receipt, hash: string) {
  if (row.payload_hash !== hash) throw new HttpError(409, "This request reference was already used. Start a new brief or use email.");
  return json({ ok: true, reference: row.reference });
}
async function contact(request: Request, env: Env, transport: Transport) {
  await guard(request, env, "contact");
  const input = await boundedJSON(request, 24000);
  if (input.websiteCheck) throw new HttpError(400, "Unable to accept this request. Please use the email option.");
  const validation = validateBrief(input);
  if (!validation.valid) return json({ ok: false, error: "Check the highlighted fields.", errors: validation.errors }, 400);
  if (typeof input.requestId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.requestId)) throw new HttpError(400, "A valid request reference is required. Reload the form and try again.");
  const id = input.requestId.toLowerCase(), data = validation.data;
  const hash = await hmac(env.CONTACT_FORM_SECRET!, JSON.stringify(data));
  const existing = await env.DB!.prepare("SELECT payload_hash,reference FROM contact_enquiries WHERE id=?").bind(id).first<Receipt>();
  if (existing) return receipt(existing, hash);
  await quota(env, "contact:email:" + data.email.toLowerCase(), 5, 600);
  await quota(env, "contact:global", 200, 3600);
  await verifyChallenge(input, request, env, transport);
  const reference = "WD-" + id.replaceAll("-", "").slice(0, 20).toUpperCase();
  const keys: (keyof Brief)[] = ["service", "budget", "name", "email", "phone", "company", "website", "message", "country", "postcode", "addressLine1", "addressLine2", "city", "region"];
  const now = Math.floor(Date.now() / 1000);
  const insert = env.DB!.prepare("INSERT INTO contact_enquiries (id,payload_hash,reference,created_at,service,budget,name,email,phone,company,website,message,country,postcode,address_line_1,address_line_2,city,region) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING")
    .bind(id, hash, reference, now, ...keys.map(key => data[key]));
  // D1 batch is transactional: the saved enquiry and both send intents commit
  // together. Disabled email never queues historical requests for later sending.
  if (mailEnabled(env)) await env.DB!.batch([insert, ...emailStatements(env, id, reference, data, now)]);
  else await insert.run();
  // Read after commit: neither a rejected write nor an idempotency race can return false success.
  const saved = await env.DB!.prepare("SELECT payload_hash,reference FROM contact_enquiries WHERE id=?").bind(id).first<Receipt>();
  if (!saved) throw new HttpError(503, "Saving was not confirmed. Please retry.");
  return receipt(saved, hash);
}
function field(value: unknown, limit = 200) { return typeof value === "string" ? value.trim().slice(0, limit) : ""; }
async function address(request: Request, env: Env, transport: Transport) {
  await guard(request, env, "address");
  const input = await boundedJSON(request, 1024);
  if (typeof input.postcode !== "string" || input.postcode.length > 20) throw new HttpError(400, "Enter a complete UK postcode.");
  const postcode = normalisePostcode(input.postcode);
  if (!ukPostcodePattern.test(postcode)) throw new HttpError(400, "Enter a complete UK postcode, for example SW1A 1AA.");
  await quota(env, "address:global", env.IDEAL_POSTCODES_API_KEY ? 300 : 1000, 86400);
  const providerKey = env.IDEAL_POSTCODES_API_KEY;
  let stage = "request", providerStatus: number | null = null, providerCode: number | null = null;
  try {
    const endpoint = providerKey ? "https://api.ideal-postcodes.co.uk/v1/postcodes/" : "https://api.postcodes.io/postcodes/";
    const response = await transport(endpoint + encodeURIComponent(postcode), {
      headers: providerKey ? { Authorization: 'api_key="' + providerKey + '"' } : { Accept: "application/json" },
      // Workers supports manual/follow. Never follow a redirect with our API key.
      signal: AbortSignal.timeout(7000), redirect: "manual",
    });
    providerStatus = response.status;
    stage = "response";
    if (response.status === 404) return json({ ok: false, error: "We could not find this postcode. Check it or enter the address manually." }, 404);
    if (response.status >= 300 && response.status < 400) throw new Error("provider_redirect");
    const result = await boundedJSON(response, 400000);
    providerCode = typeof result.code === "number" && Number.isInteger(result.code) ? result.code : null;
    if (!response.ok) throw new Error("provider_unavailable");
    stage = "contract";
    if (providerKey) {
      if (result.code !== 2000 || !Array.isArray(result.result)) throw new Error("provider_contract");
      const addresses: AddressOption[] = result.result.slice(0, 100).flatMap((row: Record<string, unknown>, index: number) => {
        if (!row || typeof row !== "object" || !field(row.line_1) || !field(row.post_town)) return [];
        const line2 = [field(row.line_2), field(row.line_3)].filter(Boolean).join(", ").slice(0, 200);
        const code = normalisePostcode(field(row.postcode, 20));
        if (code !== postcode) return [];
        return [{ id: String(index), line1: field(row.line_1), line2, city: field(row.post_town, 100), region: field(row.county || row.postal_county, 100), postcode: code, country: "United Kingdom", label: [field(row.line_1), line2, field(row.post_town), code].filter(Boolean).join(", ") }];
      });
      if (!addresses.length) throw new Error("provider_empty");
      return json({ ok: true, mode: "addresses", addresses, more: result.result.length >= 100 });
    }
    const location = result.result as Record<string, unknown> | undefined;
    if (result.status !== 200 || !location || normalisePostcode(field(location.postcode)) !== postcode) throw new Error("provider_contract");
    return json({ ok: true, mode: "postcode", postcode, district: field(location.admin_district, 100), region: field(location.region, 100) });
  } catch (error) {
    // Fixed diagnostic fields only: never log URLs, keys, postcode/address data,
    // provider messages or exception text, which could include sensitive values.
    const errorKind = error instanceof Error && ["Error", "TypeError", "SyntaxError", "TimeoutError", "AbortError"].includes(error.name) ? error.name : "unknown";
    console.error(JSON.stringify({ event: "address_provider_failure", provider: providerKey ? "ideal" : "postcodes", stage, status: providerStatus, code: providerCode, errorKind }));
    return json({ ok: false, error: "Address search is unavailable. Please enter your address manually." }, 503);
  }
}
export async function handleRequest(request: Request, env: Env, transport: Transport = fetch): Promise<Response> {
  const path = new URL(request.url).pathname;
  if (!path.startsWith("/api/")) return env.ASSETS.fetch(request);
  try {
    if (path === "/api/contact/config") {
      if (request.method !== "GET") return json({ ok: false, error: "Method not allowed." }, 405);
      return json({ accepting: ready(env), addressMode: env.IDEAL_POSTCODES_API_KEY ? "addresses" : "postcode", ...(env.TURNSTILE_SITE_KEY ? { turnstileSiteKey: env.TURNSTILE_SITE_KEY } : {}) });
    }
    if (path !== "/api/contact" && path !== "/api/address-lookup") return json({ ok: false, error: "Not found." }, 404);
    if (request.method !== "POST") return json({ ok: false, error: "Method not allowed." }, 405);
    return path === "/api/contact" ? await contact(request, env, transport) : await address(request, env, transport);
  } catch (error) {
    if (error instanceof HttpError) return json({ ok: false, error: error.message }, error.status);
    // Do not log request bodies, provider keys or customer information.
    return json({ ok: false, error: "Saving was not confirmed. Please retry or use email." }, 503);
  }
}
export default {
  async fetch(request: Request, env: Env, context: { waitUntil(promise: Promise<unknown>): void }) {
    const response = await handleRequest(request, env);
    const path = new URL(request.url).pathname;
    if (response.ok && ((path === "/api/contact" && request.method === "POST") || (path === "/api/contact/config" && request.method === "GET"))) context.waitUntil(deliverContactEmails(env));
    if (request.method === "POST" && env.DB) context.waitUntil(env.DB.prepare("DELETE FROM form_rate_limits WHERE key IN (SELECT key FROM form_rate_limits WHERE expires_at<? LIMIT 100)").bind(Math.floor(Date.now() / 1000)).run().catch(() => undefined));
    return response;
  },
};

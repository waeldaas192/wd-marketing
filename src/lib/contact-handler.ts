// Server use only. Provider credentials are read here, never sent to the browser.
import { createHmac, randomBytes, randomUUID } from "node:crypto";
import { validateBrief } from "./contact-validation";

type Env = Record<string, string | undefined>;
const maxBytes = 24000;
const salt = randomBytes(32);
// Bounded, per-process abuse backstop. Configure an edge rate limit for multi-instance hosting.
const attempts = new Map<string, { count: number; until: number }>();
const json = (status: number, body: object, headers: Record<string,string> = {}) => Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
async function readBody(request: Request): Promise<string> {
  const declared = Number(request.headers.get("content-length"));
  if (declared > maxBytes) throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) return "";
  const parts: Uint8Array[] = []; let length = 0;
  try { while (true) { const next = await reader.read(); if (next.done) break; length += next.value.byteLength; if (length > maxBytes) { await reader.cancel(); throw new RangeError(); } parts.push(next.value); } }
  finally { reader.releaseLock(); }
  const all = new Uint8Array(length); let offset = 0;
  for (const part of parts) { all.set(part, offset); offset += part.byteLength; }
  return new TextDecoder("utf-8", { fatal: true }).decode(all);
}
export async function handleContact(request: Request, env: Env = process.env, transport: typeof fetch = fetch): Promise<Response> {
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return json(415,{ok:false,error:"Use JSON for this request."});
  const origin = request.headers.get("origin");
  const allowed = new Set([new URL(request.url).origin, "https://wdmarketing.co.uk", ...(env.CONTACT_ALLOWED_ORIGINS || "").split(",").map(value=>value.trim()).filter(Boolean)]);
  if ((origin && !allowed.has(origin)) || request.headers.get("sec-fetch-site") === "cross-site") return json(403,{ok:false,error:"Submit the form from this website."});
  let raw: Record<string, unknown>;
  try { const decoded: unknown = JSON.parse(await readBody(request)); if (!decoded || typeof decoded !== "object" || Array.isArray(decoded)) throw new Error(); raw = decoded as Record<string,unknown>; }
  catch (error) { return json(error instanceof RangeError ? 413 : 400,{ok:false,error:error instanceof RangeError ? "The brief is too large." : "Invalid request."}); }
  const { data, errors, valid } = validateBrief(raw);
  if (!valid) return json(400,{ok:false,error:"Check the highlighted fields.",fields:errors});
  if (raw.websiteCheck) return json(400,{ok:false,error:"Unable to accept this submission."});
  const requestId = typeof raw.requestId === "string" && /^[a-zA-Z0-9-]{16,80}$/.test(raw.requestId) ? raw.requestId : randomUUID();
  const token = typeof raw.turnstileToken === "string" ? raw.turnstileToken : "";
  // Fail closed until delivery and anti-abuse verification are both configured.
  const from = env.CONTACT_FROM, to = env.CONTACT_TO, key = env.RESEND_API_KEY, secret = env.TURNSTILE_SECRET_KEY;
  if (env.CONTACT_ENABLED !== "true" || !from || !to || !key || !secret || !env.TURNSTILE_EXPECTED_HOSTNAME) return json(503,{ok:false,error:"Online delivery is not enabled yet. Your entries are preserved; please use the email alternative."});
  if (/\r|\n/.test(from + to) || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(to)) return json(503,{ok:false,error:"Online delivery is temporarily unavailable."});
  const now = Date.now();
  for (const [id, item] of attempts) if (item.until < now) attempts.delete(id);
  const bucket = createHmac("sha256", salt).update(data.email.toLowerCase()).digest("hex");
  const attempt = attempts.get(bucket);
  if ((attempt && attempt.count >= 5) || attempts.size >= 5000) return json(429,{ok:false,error:"Please wait before submitting again, or contact us by email."},{"Retry-After":"600"});
  if (!token || token.length > 2048) return json(400,{ok:false,error:"Please complete the security check."});
  attempts.set(bucket,{count:(attempt?.count || 0)+1,until:attempt?.until || now+600000});
  try {
    const verification = await transport("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({secret,response:token}),signal:AbortSignal.timeout(8000),redirect:"error" });
    const result = await verification.json() as {success?:boolean;hostname?:string;action?:string};
    if (!verification.ok || !result.success || result.hostname !== env.TURNSTILE_EXPECTED_HOSTNAME || result.action !== "project-brief") return json(400,{ok:false,error:"The security check expired or failed. Please try it again."});
  } catch { return json(503,{ok:false,error:"The security check is unavailable. Please retry or email your brief."}); }
  // Same brief + same request ID => same key on retries. Never put PII in headers or logs.
  const idempotency = createHmac("sha256",key).update(requestId + JSON.stringify(data)).digest("hex");
  const text = ["New WD Marketing project brief",`Service: ${data.service}`,`Budget: ${data.budget}`,`Name: ${data.name}`,`Email: ${data.email}`,`Company: ${data.company || "Not provided"}`,`Website: ${data.website || "Not provided"}`,"",data.message].join("\n");
  try {
    const sent = await transport("https://api.resend.com/emails", {method:"POST",headers:{Authorization:`Bearer ${key}`,"Content-Type":"application/json","Idempotency-Key":`wd-brief/${idempotency}`},body:JSON.stringify({from,to:[to],reply_to:data.email,subject:`WD project enquiry · ${data.service}`,text}),signal:AbortSignal.timeout(10000),redirect:"error"});
    const result = await sent.json() as {id?:string};
    if (!sent.ok || typeof result.id !== "string" || !result.id) return json(502,{ok:false,error:"We could not confirm delivery. Your entries are preserved; retry or email us."});
    return json(200,{ok:true,message:"Your brief has been accepted for delivery. Thank you.",reference:requestId});
  } catch { return json(502,{ok:false,error:"We could not confirm delivery. Your entries are preserved; retry or email us."}); }
}

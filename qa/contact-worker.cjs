// Exercise the actual Worker with an ephemeral SQLite database and controlled providers.
// No network requests, production writes or emails are made by this test.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");
const { build } = require("esbuild");
const { randomUUID } = require("node:crypto");
const root = path.resolve(__dirname, "..");
let passed = 0;
async function test(name, task) { await task(); passed++; console.log("PASS " + name); }
function database() {
  const sql = new DatabaseSync(":memory:");
  for (const file of fs.readdirSync(path.join(root, "drizzle")).filter(file => file.endsWith(".sql")).sort()) {
    for (const statement of fs.readFileSync(path.join(root, "drizzle", file), "utf8").split("--> statement-breakpoint").filter(sql => sql.trim())) sql.exec(statement);
  }
  function prepare(source) { let values = []; return {
    bind(...args) { values = args; return this; },
    async first() { return sql.prepare(source).get(...values) || null; },
    async run() { return sql.prepare(source).run(...values); },
    execute() { return sql.prepare(source).run(...values); },
  }; }
  async function batch(statements) {
    sql.exec("BEGIN");
    try { const result = statements.map(statement => statement.execute()); sql.exec("COMMIT"); return result; }
    catch (error) { sql.exec("ROLLBACK"); throw error; }
  }
  return { sql, prepare, batch };
}
function environment() {
  return { DB: database(), CONTACT_FORM_SECRET: "test-secret-never-used-in-production-12345", ASSETS: { async fetch(request) { return new Response("asset:" + new URL(request.url).pathname); } } };
}
let sequence = 1;
function request(route, data, headers = {}, method = "POST") {
  return new Request("https://wdmarketing.co.uk" + route, { method, headers: { origin: "https://wdmarketing.co.uk", "content-type": "application/json", "cf-connecting-ip": "192.0.2." + sequence++, ...headers }, body: method === "POST" ? JSON.stringify(data) : undefined });
}
const valid = () => ({ requestId: randomUUID(), service: "SEO", budget: "Not sure", name: "Test Client", email: "client@example.test", website: "example.test", phone: "+44 20 7946 0000", message: "We would like more local enquiries.", country: "United Kingdom", postcode: "sw1a1aa", addressLine1: "1 Test Street", city: "London" });
async function main() {
  const output = await build({ entryPoints: [path.join(root, "worker/index.ts")], bundle: true, format: "esm", platform: "browser", target: "es2022", write: false });
  const { handleRequest } = await import("data:text/javascript;base64," + Buffer.from(output.outputFiles[0].text).toString("base64"));
  const mailBundle = await build({ entryPoints: [path.join(root, "worker/contact-mail.ts")], bundle: true, format: "esm", platform: "browser", target: "es2022", write: false });
  const { deliverContactEmails } = await import("data:text/javascript;base64," + Buffer.from(mailBundle.outputFiles[0].text).toString("base64"));
  const noNetwork = async () => { throw new Error("Unexpected provider call"); };
  const send = (data, env = environment(), headers = {}) => handleRequest(request("/api/contact", data, headers), env, noNetwork);
  await test("durable receipt, normalised fields and optional details", async () => {
    const env = environment(), data = valid(); const response = await send(data, env); const result = await response.json();
    assert.equal(response.status, 200); assert.equal(result.ok, true); assert.match(result.reference, /^WD-[A-F0-9]{20}$/);
    const row = env.DB.sql.prepare("SELECT * FROM contact_enquiries").get();
    assert.equal(row.reference, result.reference); assert.equal(row.postcode, "SW1A 1AA"); assert.equal(row.website, "https://example.test"); assert.equal(row.phone, data.phone); assert.equal(row.address_line_1, data.addressLine1);
    assert.equal(Object.keys(row).some(key => key.includes("ip")), false);
    assert.equal(response.headers.get("cache-control"), "no-store");
  });
  await test("manual international address without UK lookup", async () => {
    const env = environment(); const data = { ...valid(), country: "Ireland", postcode: "D02 X285", city: "Dublin" };
    assert.equal((await send(data, env)).status, 200);
    assert.equal(env.DB.sql.prepare("SELECT postcode FROM contact_enquiries").get().postcode, "D02 X285");
  });
  await test("address and telephone can be skipped", async () => {
    const data = valid(); for (const key of ["country", "postcode", "addressLine1", "city", "phone"]) delete data[key];
    assert.equal((await send(data)).status, 200);
  });
  await test("invalid address, phone, URL and required fields do not write", async () => {
    const env = environment(), response = await send({ ...valid(), name: "", email: "bad", postcode: "xxx", phone: "abc", website: "javascript:alert(1)" }, env);
    assert.equal(response.status, 400); const result = await response.json();
    for (const field of ["name", "email", "postcode", "phone", "website"]) assert.ok(result.errors[field]);
    assert.equal(env.DB.sql.prepare("SELECT COUNT(*) n FROM contact_enquiries").get().n, 0);
  });
  await test("retry returns original receipt without duplicate", async () => {
    const env = environment(), data = valid(); const first = await (await send(data, env)).json(), second = await (await send(data, env)).json();
    assert.deepEqual(second, first); assert.equal(env.DB.sql.prepare("SELECT COUNT(*) n FROM contact_enquiries").get().n, 1);
  });
  await test("concurrent duplicate writes produce one request", async () => {
    const env = environment(), data = valid();
    const results = await Promise.all([send(data, env), send(data, env)]);
    assert.deepEqual(await results[0].json(), await results[1].json());
    assert.equal(env.DB.sql.prepare("SELECT COUNT(*) n FROM contact_enquiries").get().n, 1);
  });
  await test("reusing an ID with different content is rejected", async () => {
    const env = environment(), data = valid(); await send(data, env);
    assert.equal((await send({ ...data, message: "This content is a different enquiry." }, env)).status, 409);
  });
  await test("database failure cannot show success", async () => {
    const env = environment(); env.DB.prepare = () => { throw new Error("offline"); };
    const response = await send(valid(), env); assert.equal(response.status, 503); assert.equal((await response.json()).ok, false);
  });
  await test("missing configuration fails closed", async () => {
    const env = environment(); delete env.CONTACT_FORM_SECRET;
    assert.equal((await send(valid(), env)).status, 503);
    const config = await (await handleRequest(request("/api/contact/config", null, {}, "GET"), env)).json(); assert.equal(config.accepting, false);
  });
  await test("cross-site requests and missing origin are rejected", async () => {
    assert.equal((await send(valid(), environment(), { origin: "https://other.test" })).status, 403);
    assert.equal((await send(valid(), environment(), { "sec-fetch-site": "cross-site" })).status, 403);
    const req = request("/api/contact", valid()); req.headers.delete("origin");
    assert.equal((await handleRequest(req, environment())).status, 403);
  });
  await test("oversize, bad JSON, arrays and wrong media type are rejected", async () => {
    assert.equal((await send({ ...valid(), message: "x".repeat(25000) })).status, 413);
    assert.equal((await send([], environment())).status, 400);
    assert.equal((await send(valid(), environment(), { "content-type": "text/plain" })).status, 415);
    const req = new Request("https://wdmarketing.co.uk/api/contact", { method: "POST", headers: { origin: "https://wdmarketing.co.uk", "content-type": "application/json" }, body: "{" });
    assert.equal((await handleRequest(req, environment())).status, 400);
  });
  await test("honeypot and malformed request ID rejected", async () => {
    assert.equal((await send({ ...valid(), websiteCheck: "bot" })).status, 400);
    assert.equal((await send({ ...valid(), requestId: "../../" })).status, 400);
  });
  await test("persistent sender quota spans different connections", async () => {
    const env = environment(); for (let i = 0; i < 5; i++) assert.equal((await send(valid(), env)).status, 200);
    const blocked = await send(valid(), env); assert.equal(blocked.status, 429); assert.equal(blocked.headers.get("retry-after"), "600");
    const rows = env.DB.sql.prepare("SELECT key FROM form_rate_limits").all(); assert.ok(rows.every(row => /^[a-f0-9]{64}$/.test(row.key)));
  });
  await test("expired quotas reset", async () => {
    const env = environment(); for (let i = 0; i < 5; i++) await send(valid(), env);
    env.DB.sql.prepare("UPDATE form_rate_limits SET expires_at=0").run(); assert.equal((await send(valid(), env)).status, 200);
  });
  await test("config reveals mode but never provider secrets", async () => {
    const env = { ...environment(), IDEAL_POSTCODES_API_KEY: "private-key" };
    const response = await handleRequest(request("/api/contact/config", null, {}, "GET"), env);
    const body = await response.text(); assert.ok(!body.includes("private-key")); assert.equal(JSON.parse(body).addressMode, "addresses");
  });
  await test("postcode-only response does not invent street or postal town", async () => {
    const transport = async url => { assert.equal(url, "https://api.postcodes.io/postcodes/SW1A%201AA"); return Response.json({ status: 200, result: { postcode: "SW1A 1AA", admin_district: "Westminster", region: "London" } }); };
    const response = await handleRequest(request("/api/address-lookup", { postcode: "sw1a1aa" }), environment(), transport);
    const value = await response.json(); assert.equal(value.mode, "postcode"); assert.equal(value.district, "Westminster"); assert.equal(value.addresses, undefined); assert.equal(value.city, undefined);
  });
  await test("licensed lookup fills an editable property address", async () => {
    const env = { ...environment(), IDEAL_POSTCODES_API_KEY: "server-only-secret" };
    const transport = async (url, options) => {
      assert.equal(url, "https://api.ideal-postcodes.co.uk/v1/postcodes/SW1A%201AA"); assert.ok(!url.includes(env.IDEAL_POSTCODES_API_KEY)); assert.equal(options.headers.Authorization, 'api_key="server-only-secret"'); assert.equal(options.redirect, "manual");
      return Response.json({ code: 2000, result: [{ line_1: "1 Test Street", line_2: "Suite 2", line_3: "", post_town: "LONDON", county: "", postcode: "SW1A 1AA" }] });
    };
    const response = await handleRequest(request("/api/address-lookup", { postcode: "sw1a1aa" }), env, transport); const value = await response.json();
    assert.equal(value.mode, "addresses"); assert.equal(value.addresses[0].line1, "1 Test Street"); assert.equal(value.addresses[0].line2, "Suite 2"); assert.equal(value.addresses[0].city, "LONDON");
    assert.ok(!JSON.stringify(value).includes("server-only-secret"));
  });
  await test("invalid postcode never calls the provider", async () => {
    const response = await handleRequest(request("/api/address-lookup", { postcode: "../config" }), environment(), noNetwork); assert.equal(response.status, 400);
  });
  await test("postcode not found gives a manual-entry path", async () => {
    const response = await handleRequest(request("/api/address-lookup", { postcode: "SW1A1AA" }), environment(), async () => new Response("{}", { status: 404 }));
    assert.equal(response.status, 404); assert.match((await response.json()).error, /manually/);
  });
  await test("provider timeout, malformed payload and mismatched postcode fail safely", async () => {
    for (const provider of [async () => { throw new Error("timeout"); }, async () => new Response("<html>bad</html>"), async () => Response.json({ status: 200, result: { postcode: "W1A 1AA" } })]) {
      const result = await handleRequest(request("/api/address-lookup", { postcode: "SW1A1AA" }), environment(), provider);
      assert.equal(result.status, 503); assert.equal((await result.json()).ok, false);
    }
  });
  await test("optional challenge fails closed when partly configured", async () => {
    assert.equal((await send(valid(), { ...environment(), TURNSTILE_SECRET_KEY: "secret" })).status, 503);
  });
  await test("challenge checks token, action and hostname before saving", async () => {
    const env = { ...environment(), TURNSTILE_SECRET_KEY: "secret", TURNSTILE_SITE_KEY: "public" };
    assert.equal((await send(valid(), env)).status, 400);
    const data = { ...valid(), turnstileToken: "valid-token" };
    const result = await handleRequest(request("/api/contact", data), env, async () => Response.json({ success: true, action: "project-brief", hostname: "other.test" }));
    assert.equal(result.status, 400);
    const accepted = await handleRequest(request("/api/contact", { ...data, email: "second@example.test" }), env, async () => Response.json({ success: true, action: "project-brief", hostname: "wdmarketing.co.uk" }));
    assert.equal(accepted.status, 200);
  });
  await test("API method guards and static assets remain separate", async () => {
    const env = environment();
    assert.equal((await handleRequest(request("/api/contact", null, {}, "GET"), env)).status, 405);
    assert.equal((await handleRequest(request("/api/enquiries", null, {}, "GET"), env)).status, 404);
    assert.equal(await (await handleRequest(request("/work", null, {}, "GET"), env)).text(), "asset:/work");
  });
  const emailEnv = () => ({ ...environment(), CONTACT_EMAIL_ENABLED: "true", RESEND_API_KEY: "re_test_only" });
  const due = env => env.DB.sql.prepare("UPDATE contact_email_outbox SET next_attempt_at=0 WHERE status='pending'").run();
  const acceptedMail = async () => Response.json({ id: randomUUID() });
  await test("email disabled requires both switch and credential; old briefs are not backfilled", async () => {
    for (const configuration of [{}, { CONTACT_EMAIL_ENABLED: "true" }, { RESEND_API_KEY: "re_test_only" }]) {
      const env = { ...environment(), ...configuration }, data = valid();
      assert.equal((await send(data, env)).status, 200);
      await deliverContactEmails(env, noNetwork);
      Object.assign(env, { CONTACT_EMAIL_ENABLED: "true", RESEND_API_KEY: "re_test_only" });
      await send(data, env); await deliverContactEmails(env, noNetwork);
      assert.equal(env.DB.sql.prepare("SELECT COUNT(*) n FROM contact_email_outbox").get().n, 0);
    }
  });
  await test("branded notification and safe customer confirmation queue with the saved enquiry", async () => {
    const env = emailEnv(), data = { ...valid(), name: "<b>Client</b>", message: 'Click https://untrusted.example <script>alert("test")</script>' };
    const result = await (await send(data, env)).json();
    const rows = env.DB.sql.prepare("SELECT kind,payload FROM contact_email_outbox").all(); assert.equal(rows.length, 2);
    const notification = JSON.parse(rows.find(row => row.kind === "notification").payload), confirmation = JSON.parse(rows.find(row => row.kind === "confirmation").payload);
    assert.deepEqual(notification.to, ["hello@wdmarketing.co.uk"]); assert.equal(notification.reply_to, data.email);
    assert.deepEqual(confirmation.to, [data.email]); assert.equal(confirmation.reply_to, "hello@wdmarketing.co.uk");
    for (const message of [notification, confirmation]) {
      assert.equal(message.from, "WD Marketing <hello@wdmarketing.co.uk>");
      assert.ok(message.text.includes(result.reference)); assert.ok(message.html.includes(result.reference));
      assert.ok(message.html.includes("/images/brand/wd-marketing-ribbon-mark.png")); assert.ok(!message.html.includes("<script>"));
    }
    assert.ok(notification.html.includes("&lt;script&gt;")); assert.ok(notification.html.includes("&lt;b&gt;Client&lt;/b&gt;"));
    assert.ok(!JSON.stringify(confirmation).includes("untrusted.example")); assert.ok(!JSON.stringify(confirmation).includes("Client"));
  });
  await test("transaction failure stores neither enquiry nor partial email intent", async () => {
    const env = emailEnv(), batch = env.DB.batch;
    env.DB.batch = statements => batch([...statements, env.DB.prepare("INSERT INTO table_that_does_not_exist VALUES (1)")]);
    assert.equal((await send(valid(), env)).status, 503);
    assert.equal(env.DB.sql.prepare("SELECT COUNT(*) n FROM contact_enquiries").get().n, 0);
    assert.equal(env.DB.sql.prepare("SELECT COUNT(*) n FROM contact_email_outbox").get().n, 0);
  });
  await test("concurrent workers and form retries send each mail once, then clear duplicate PII", async () => {
    const env = emailEnv(), data = valid(); await Promise.all([send(data, env), send(data, env)]);
    const calls = [];
    const transport = async (url, options) => {
      assert.equal(url, "https://api.resend.com/emails"); assert.equal(options.redirect, "manual");
      assert.equal(options.headers.Authorization, "Bearer re_test_only");
      calls.push(options.headers["Idempotency-Key"]); return acceptedMail();
    };
    await Promise.all([deliverContactEmails(env, transport), deliverContactEmails(env, transport)]);
    await send(data, env); await deliverContactEmails(env, noNetwork);
    assert.equal(calls.length, 2); assert.equal(new Set(calls).size, 2);
    const rows = env.DB.sql.prepare("SELECT status,payload,provider_id FROM contact_email_outbox").all();
    assert.ok(rows.every(row => row.status === "accepted" && row.payload === "" && row.provider_id));
    assert.equal((await send({ ...data, message: "Different request content" }, env)).status, 409);
  });
  await test("partial failure keeps saved receipt and retries only the failed message", async () => {
    const env = emailEnv(), data = valid(); assert.equal((await send(data, env)).status, 200);
    let failedBody, failedKey;
    await deliverContactEmails(env, async (url, options) => {
      if (options.headers["Idempotency-Key"].endsWith("confirmation")) { failedBody = options.body; failedKey = options.headers["Idempotency-Key"]; throw new Error("lost response"); }
      return acceptedMail();
    });
    assert.equal(env.DB.sql.prepare("SELECT COUNT(*) n FROM contact_email_outbox WHERE status='accepted'").get().n, 1);
    await deliverContactEmails(env, noNetwork); // Backoff has not elapsed.
    due(env); let retried = 0;
    await deliverContactEmails(env, async (url, options) => { retried++; assert.equal(options.body, failedBody); assert.equal(options.headers["Idempotency-Key"], failedKey); return acceptedMail(); });
    assert.equal(retried, 1); assert.equal((await send(data, env)).status, 200);
  });
  await test("redirects and invalid credentials stop for review without affecting receipt", async () => {
    for (const status of [302, 401, 403, 422]) {
      const env = emailEnv(), data = valid(); await send(data, env);
      await deliverContactEmails(env, async () => new Response(null, { status, headers: { location: "https://untrusted.example" } }));
      assert.equal(env.DB.sql.prepare("SELECT COUNT(*) n FROM contact_email_outbox WHERE status='review'").get().n, 2);
      assert.equal((await send(data, env)).status, 200); await deliverContactEmails(env, noNetwork);
    }
  });
  await test("provider outages have three attempts maximum and never retry outside dedupe window", async () => {
    const env = emailEnv(); await send(valid(), env); let calls = 0;
    for (let index = 0; index < 4; index++) { due(env); await deliverContactEmails(env, async () => { calls++; return new Response(null, { status: 503 }); }); }
    assert.equal(calls, 6); assert.equal(env.DB.sql.prepare("SELECT COUNT(*) n FROM contact_email_outbox WHERE status='review' AND attempts=3").get().n, 2);
    const expired = emailEnv(); await send(valid(), expired);
    expired.DB.sql.prepare("UPDATE contact_email_outbox SET first_attempt_at=?,attempts=1,next_attempt_at=0").run(Math.floor(Date.now()/1000)-24*3600);
    await deliverContactEmails(expired, noNetwork);
    assert.equal(expired.DB.sql.prepare("SELECT COUNT(*) n FROM contact_email_outbox WHERE status='review'").get().n, 2);
  });
  await test("malformed and oversized provider acceptance stays retryable, never false accepted", async () => {
    for (const response of [() => Response.json({ success: true }), () => new Response("x".repeat(9000))]) {
      const env = emailEnv(); await send(valid(), env); await deliverContactEmails(env, async () => response());
      assert.equal(env.DB.sql.prepare("SELECT COUNT(*) n FROM contact_email_outbox WHERE status='pending'").get().n, 2);
    }
  });
  await test("mail API credential is never exposed by public config", async () => {
    const env = emailEnv(); const text = await (await handleRequest(request("/api/contact/config", null, {}, "GET"), env)).text();
    assert.ok(!text.includes(env.RESEND_API_KEY)); assert.ok(!text.includes("RESEND"));
  });
  console.log(passed + " Worker integration scenarios passed.");
}
main().catch(error => { console.error(error); process.exitCode = 1; });

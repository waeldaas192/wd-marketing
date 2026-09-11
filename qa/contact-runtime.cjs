// Actual workerd fetch/streams/D1 execution, with a mocked external provider.
// No production credentials, external network requests or enquiry writes.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { build } = require("esbuild");
const { Miniflare } = require("miniflare");
const root = path.resolve(__dirname, "..");

async function main() {
  const output = await build({ entryPoints: [path.join(root, "worker/index.ts")], bundle: true, format: "esm", platform: "browser", target: "es2022", write: false });
  const payload = { code: 2000, result: [{ line_1: "Test address", post_town: "LONDON", postcode: "SW1A 1AA" }] };
  let redirected = 0;
  const mails = [];
  let redirectConfirmation = false;
  // Return raw responses so only workerd, not an additional Node fetch layer,
  // controls redirects. Every outbound request is handled here; no network.
  const outboundService = async request => {
    if (request.url === "https://api.resend.com/emails") {
      assert.equal(request.headers.get("authorization"), "Bearer re_runtime_test_only");
      const message = await request.json();
      mails.push({ key: request.headers.get("idempotency-key"), message });
      if (redirectConfirmation && message.to[0] === "client@example.test") return new Response(null, { status: 302, headers: { location: "https://redirect.example/collect" } });
      return Response.json({ id: "runtime-email-" + mails.length });
    }
    if (request.url === "https://api.ideal-postcodes.co.uk/v1/postcodes/SW1A%201AA") {
      assert.equal(request.headers.get("authorization"), 'api_key="ak_runtime_test_only"');
      return Response.json(payload);
    }
    if (request.url === "https://api.ideal-postcodes.co.uk/v1/postcodes/SW1A%202AA") {
      return new Response(null, { status: 302, headers: { location: "https://redirect.example/collect" } });
    }
    if (request.url === "https://redirect.example/collect") {
      redirected++;
      return Response.json(payload);
    }
    throw new Error("Unexpected outbound request in runtime test");
  };
  const runtime = new Miniflare({
    modules: true, script: output.outputFiles[0].text, compatibilityDate: "2026-07-01",
    outboundService, d1Databases: ["DB"],
    bindings: { CONTACT_FORM_SECRET: "runtime-test-secret-at-least-32-characters", IDEAL_POSTCODES_API_KEY: "ak_runtime_test_only", CONTACT_EMAIL_ENABLED: "true", RESEND_API_KEY: "re_runtime_test_only" },
  });
  try {
    const db = await runtime.getD1Database("DB");
    for (const file of fs.readdirSync(path.join(root, "drizzle")).filter(name => name.endsWith(".sql")).sort()) {
      for (const sql of fs.readFileSync(path.join(root, "drizzle", file), "utf8").split("--> statement-breakpoint").filter(sql => sql.trim())) await db.prepare(sql).run();
    }
    const lookup = postcode => runtime.dispatchFetch("https://wdmarketing.co.uk/api/address-lookup", {
      method: "POST", headers: { origin: "https://wdmarketing.co.uk", "content-type": "application/json", "cf-connecting-ip": "192.0.2.1" },
      body: JSON.stringify({ postcode }),
    });
    const success = await lookup("SW1A 1AA");
    assert.equal(success.status, 200, "The native Worker fetch must accept our request options");
    const result = await success.json();
    assert.equal(result.mode, "addresses");
    assert.equal(result.addresses[0].line1, "Test address");
    assert.equal(result.addresses[0].city, "LONDON");
    assert.equal(result.addresses[0].postcode, "SW1A 1AA");
    console.log("PASS native Worker fetch, bounded streams and address mapping");

    const redirect = await lookup("SW1A 2AA");
    assert.equal(redirect.status, 503);
    assert.equal((await redirect.json()).ok, false);
    assert.equal(redirected, 0, "Provider credentials must never be sent to a redirect target");
    console.log("PASS upstream redirects are rejected without forwarding credentials");

    const brief = { requestId: "60000000-0000-4000-8000-000000000001", service: "SEO", budget: "Not sure", name: "Runtime Client", email: "client@example.test", message: "A synthetic enquiry for local tests only." };
    const submit = data => runtime.dispatchFetch("https://wdmarketing.co.uk/api/contact", { method: "POST", headers: { origin: "https://wdmarketing.co.uk", "content-type": "application/json", "cf-connecting-ip": "192.0.2.2" }, body: JSON.stringify(data) });
    async function settled(total) {
      for (let attempt = 0; attempt < 100; attempt++) {
        const row = await db.prepare("SELECT COUNT(*) n FROM contact_email_outbox WHERE status IN ('accepted','review')").first();
        if (row.n === total) return;
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      assert.fail("Native background email tasks did not settle");
    }
    const receipt = await submit(brief); assert.equal(receipt.status, 200); const saved = await receipt.json();
    await settled(2);
    assert.equal(mails.length, 2);
    assert.ok(mails.every(mail => mail.message.html.includes(saved.reference) && mail.message.text.includes(saved.reference)));
    assert.deepEqual(mails.map(mail => mail.message.to[0]).sort(), ["client@example.test", "hello@wdmarketing.co.uk"]);
    assert.equal((await submit(brief)).status, 200);
    assert.equal((await db.prepare("SELECT COUNT(*) n FROM contact_email_outbox").first()).n, 2);
    console.log("PASS native D1 transaction, branded emails and waitUntil dispatch with mocked provider");

    redirectConfirmation = true;
    assert.equal((await submit({ ...brief, requestId: "70000000-0000-4000-8000-000000000002" })).status, 200);
    await settled(4); assert.equal(redirected, 0);
    assert.equal((await db.prepare("SELECT COUNT(*) n FROM contact_email_outbox WHERE status='review'").first()).n, 1);
    console.log("PASS native email redirect is held for review; saved enquiry and other email succeed");
  } finally { await runtime.dispose(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });

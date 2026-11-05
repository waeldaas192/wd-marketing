const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { retain } = require("../scripts/retain-live-css.cjs");

async function main() {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), "wd-css-"));
  const original = "/_next/static/css/1111111111111111.css";
  const body = "<html><head><link rel=\"stylesheet\" href=\"" + original + "\"></head></html>";
  const calls = [];
  const good = async url => {
    calls.push(url);
    if (url === "https://wdmarketing.co.uk/") return new Response(body, { status: 200, headers: { "content-type": "text/html" } });
    if (url === "https://wdmarketing.co.uk" + original) return new Response(".hero {color:#17202c; padding:10px;} /* valid stylesheet */".repeat(4), { status: 200, headers: { "content-type": "text/css" } });
    throw Error("Unexpected external URL " + url);
  };
  try {
    const first = await retain({ fetchImpl: good, outputDir: folder });
    assert.equal(first.added, 1);
    assert.ok(fs.statSync(path.join(folder, "1111111111111111.css")).size > 100);
    const second = await retain({ fetchImpl: good, outputDir: folder });
    assert.equal(second.added, 0);
    assert.equal(calls.filter(url => url.includes("1111111111111111.css")).length, 1, "already archived CSS must not be re-downloaded");
    const hostile = async () => new Response('<link rel="stylesheet" href="/_next/static/css/../../api/health">', { status: 200, headers: { "content-type": "text/html" } });
    await assert.rejects(() => retain({ fetchImpl: hostile, outputDir: folder }), /Unsafe stylesheet path/);
    console.log("PASS: live CSS retention, existing assets, and traversal guard");
  } finally { fs.rmSync(folder, { recursive: true, force: true }); }
}
main().catch(e => { console.error(e); process.exitCode = 1; });

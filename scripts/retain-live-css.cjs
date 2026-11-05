// Keeps CSS from the *currently* published site in the next verified release.
// Otherwise an iPhone tab holding old HTML can request a removed content-hash
// and display a completely unstyled website after a Cloudflare deployment.
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const SOURCE = "https://wdmarketing.co.uk/";

async function read(response, limit, label) {
  if (!response.ok) throw new Error(label + " returned HTTP " + response.status);
  const length = Number(response.headers.get("content-length") || 0);
  if (length > limit) throw new Error(label + " exceeded size limit");
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length > limit) throw new Error(label + " exceeded size limit");
  return buffer;
}

async function retain({ fetchImpl = fetch, outputDir = path.join(ROOT, "dist/client/_next/static/css") } = {}) {
  if (!fs.existsSync(outputDir)) throw new Error("Build the site before retaining its prior CSS.");
  const options = { headers: { "cache-control": "no-cache", "user-agent": "WD-Marketing-Release-Asset-Check" }, redirect: "error", signal: AbortSignal.timeout(15000) };
  const response = await fetchImpl(SOURCE, options);
  if (!response.headers.get("content-type")?.includes("text/html")) throw new Error("Published homepage is not HTML");
  const html = (await read(response, 512000, "Published homepage")).toString("utf8");
  const found = [...html.matchAll(/<link\b[^>]*>/gi)].map(match => match[0])
    .filter(tag => /\brel=["']stylesheet["']/i.test(tag))
    .map(tag => tag.match(/\bhref=["']([^"']+)["']/i)?.[1])
    .filter(Boolean);
  const paths = [...new Set(found.filter(href => href.startsWith("/_next/static/css/")))];
  if (paths.length === 0 || paths.length > 25) throw new Error("Unexpected published stylesheet manifest");
  let added = 0;
  for (const pathname of paths) {
    if (!/^\/_next\/static\/css\/[0-9a-f]{16}\.css$/.test(pathname)) throw new Error("Unsafe stylesheet path");
    const name = pathname.slice(pathname.lastIndexOf("/") + 1);
    const destination = path.join(outputDir, name);
    if (fs.existsSync(destination)) continue;
    const cssResponse = await fetchImpl(new URL(pathname, SOURCE).toString(), options);
    if (!cssResponse.headers.get("content-type")?.includes("text/css")) throw new Error("Published stylesheet MIME mismatch: " + name);
    const bytes = await read(cssResponse, 1048576, "Published stylesheet " + name);
    if (bytes.length < 100) throw new Error("Published stylesheet is unexpectedly short: " + name);
    fs.writeFileSync(destination, bytes, { flag: "wx" });
    console.log("Retained previous live CSS " + name + " (" + bytes.length + " bytes)");
    added++;
  }
  console.log("Checked " + paths.length + " published CSS references; retained " + added + " unique prior file(s).");
  return { references: paths.length, added };
}

if (require.main === module) retain().catch(error => { console.error(error.message); process.exitCode = 1; });
module.exports = { retain };

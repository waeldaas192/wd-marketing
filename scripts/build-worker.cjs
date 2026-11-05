const fs = require("node:fs");
const path = require("node:path");
const { build } = require("esbuild");
async function main() {
  const root = path.resolve(__dirname, "..");
  const target = path.join(root, "dist");
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(path.join(target, "server"), { recursive: true });
  fs.cpSync(path.join(root, "out"), path.join(target, "client"), { recursive: true });
  // Preserve the previous release's hashed CSS for Safari tabs still holding
  // older HTML. Cloudflare asset deployments otherwise remove old hashes,
  // causing the entire document to render without styles after a release.
  const compatCssDir = path.join(root, "compat-assets/_next/static/css");
  if (fs.existsSync(compatCssDir)) {
    let copied = 0;
    for (const name of fs.readdirSync(compatCssDir)) {
      if (!/^[0-9a-f]{16}\.css$/.test(name)) throw new Error("Unexpected legacy CSS asset: " + name);
      const destination = path.join(target, "client/_next/static/css", name);
      if (fs.existsSync(destination)) continue; // Current build takes priority.
      fs.copyFileSync(path.join(compatCssDir, name), destination);
      copied++;
    }
    console.log("Retained " + copied + " older hashed stylesheet(s) for open browser tabs.");
  }
  await build({ entryPoints: [path.join(root, "worker/index.ts")], outfile: path.join(target, "server/index.js"), bundle: true, format: "esm", platform: "browser", target: "es2022", minify: true });
  const rules = fs.readFileSync(path.join(root, "public/_redirects"), "utf8").split(/\r?\n/)
    .map(line => line.trim()).filter(line => line && !line.startsWith("#")).map(line => {
      const [from, to, status, extra] = line.split(/\s+/);
      if (extra || !from.startsWith("/") || !to.startsWith("/") || to.startsWith("//") || !["301", "308"].includes(status)) throw new Error("Unsupported redirect rule in public/_redirects");
      if (from.includes("*") && (!from.endsWith("*") || from.indexOf("*") !== from.length - 1)) throw new Error("Unsupported redirect wildcard");
      return { from, to, status: Number(status) };
    });
  await build({ entryPoints: [path.join(root, "worker/standalone.ts")], outfile: path.join(target, "worker/index.js"), bundle: true, format: "esm", platform: "browser", target: "es2022", minify: true, define: { __WD_REDIRECTS__: JSON.stringify(rules) } });
  // Redirects run in our Worker. Do not depend on a hosting-specific parser.
  fs.rmSync(path.join(target, "client/_redirects"), { force: true });
  fs.cpSync(path.join(root, "drizzle"), path.join(target, "migrations"), { recursive: true });
  console.log(`Built standalone Worker, static assets and ${rules.length} redirect rules.`);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });

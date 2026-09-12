const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const { config } = require("./cloudflare-config.cjs");
function run(args) {
  const result = spawnSync(process.execPath, [path.join(root, "node_modules/wrangler/bin/wrangler.js"), ...args, "--config", "wrangler.generated.json"], { cwd: root, stdio: "inherit", shell: false });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error("Cloudflare command failed; deployment stopped.");
}
try {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 1 || args[0] !== "--dry-run")) throw new Error("Only --dry-run is supported.");
  if (!fs.existsSync(path.join(root, "dist/worker/index.js"))) throw new Error("Run npm run build before deploying.");
  const generated = config();
  fs.writeFileSync(path.join(root, "wrangler.generated.json"), JSON.stringify(generated, null, 2) + "\n");
  const databaseName = generated.d1_databases?.[0]?.database_name;
  if (!databaseName) throw new Error("D1 database name is missing from generated Cloudflare configuration.");
  // Only additive, versioned migrations. Use the stable database name rather than a binding alias.
  if (args[0] === "--dry-run") run(["deploy", "--dry-run"]);
  else {
    run(["d1", "migrations", "apply", databaseName, "--remote"]);
    run(["deploy"]);
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }

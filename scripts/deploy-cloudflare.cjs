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
  fs.writeFileSync(path.join(root, "wrangler.generated.json"), JSON.stringify(config(), null, 2) + "\n");
  // Only additive, versioned migrations. An import of existing data is a separate cutover step.
  if (args[0] === "--dry-run") run(["deploy", "--dry-run"]);
  else {
    run(["d1", "migrations", "apply", "DB", "--remote"]);
    run(["deploy"]);
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }

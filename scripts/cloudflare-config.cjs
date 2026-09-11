const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
function config(env = process.env) {
  const account = env.CLOUDFLARE_ACCOUNT_ID || "";
  const database = env.CLOUDFLARE_D1_DATABASE_ID || "";
  if (!/^[a-f0-9]{32}$/i.test(account)) throw new Error("Set CLOUDFLARE_ACCOUNT_ID to your actual Cloudflare account ID.");
  if (!/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i.test(database)) throw new Error("Set CLOUDFLARE_D1_DATABASE_ID to your actual new D1 database ID.");
  for (const key of ["DEPLOY_CUSTOM_DOMAINS", "CONTACT_EMAIL_ENABLED"]) {
    if (env[key] && !["true", "false"].includes(env[key])) throw new Error(`${key} must be true or false.`);
  }
  const production = env.DEPLOY_CUSTOM_DOMAINS === "true";
  return {
    $schema: "./node_modules/wrangler/config-schema.json",
    name: "wd-marketing", account_id: account, main: "dist/worker/index.js",
    compatibility_date: "2026-07-01", workers_dev: true,
    assets: { directory: "dist/client", binding: "ASSETS", run_worker_first: true, html_handling: "drop-trailing-slash", not_found_handling: "404-page" },
    d1_databases: [{ binding: "DB", database_name: "wd-marketing-enquiries", database_id: database, migrations_dir: "drizzle" }],
    vars: { DEPLOYMENT_STAGE: production ? "production" : "staging", CONTACT_EMAIL_ENABLED: env.CONTACT_EMAIL_ENABLED || "false", ...(env.TURNSTILE_SITE_KEY ? { TURNSTILE_SITE_KEY: env.TURNSTILE_SITE_KEY } : {}) },
    ...(production ? { routes: [{ pattern: "wdmarketing.co.uk", custom_domain: true }, { pattern: "www.wdmarketing.co.uk", custom_domain: true }] } : {}),
  };
}
if (require.main === module) {
  try { fs.writeFileSync(path.join(root, "wrangler.generated.json"), JSON.stringify(config(), null, 2) + "\n"); console.log("Generated independent Cloudflare configuration. No secrets were written."); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { config };

"use strict";

/**
 * cPanel/Passenger entry point. Local development keeps using `npm run dev`.
 * Preview is the fail-safe default; opting into public production is separate.
 */
const { createServer } = require("node:http");
const { existsSync } = require("node:fs");
const { join } = require("node:path");

const PREVIEW_HOST = "preview.wdmarketing.co.uk";

function isPreviewRequest(req, environment = process.env) {
  const host = String(req.headers.host || "").split(":")[0].toLowerCase();
  return environment.DEPLOYMENT_ENV !== "production" || host === PREVIEW_HOST;
}

function guardPreview(req, res, environment = process.env) {
  if (!isPreviewRequest(req, environment)) return false;
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
  let pathname;
  try { pathname = new URL(req.url || "/", "http://localhost").pathname; }
  catch {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Invalid request.");
    return true;
  }
  if (pathname === "/robots.txt") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
    res.end("User-agent: *\nAllow: /\n");
    return true;
  }
  if (/^\/api\/contact\/?$/.test(pathname)) {
    res.writeHead(503, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
    res.end(JSON.stringify({ error: "Enquiry delivery is disabled on this preview." }));
    return true;
  }
  return false;
}

async function start() {
  process.env.NODE_ENV = "production";
  process.env.DEPLOYMENT_ENV ||= "preview";
  if (!["preview", "production"].includes(process.env.DEPLOYMENT_ENV)) {
    throw new Error("DEPLOYMENT_ENV must be preview or production.");
  }
  if (process.env.DEPLOYMENT_ENV === "preview") process.env.CONTACT_ENABLED = "false";
  process.chdir(__dirname);
  if (!existsSync(join(__dirname, ".next", "BUILD_ID"))) {
    throw new Error("Missing production build. Build locally and upload the complete .next directory.");
  }
  const port = Number(process.env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be a valid port number.");
  const next = require("next");
  const app = next({ dev: false, dir: __dirname, hostname: "127.0.0.1", port });
  const handle = app.getRequestHandler();
  await app.prepare();
  const server = createServer(async (req, res) => {
    if (guardPreview(req, res)) return;
    try { await handle(req, res); }
    catch {
      console.error("[wd-server] Request handling failed.");
      if (!res.headersSent) res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      if (!res.writableEnded) res.end("Internal server error.");
    }
  });
  server.once("error", () => {
    console.error("[wd-server] Could not start the HTTP listener.");
    process.exit(1);
  });
  server.listen(port, () => console.log(`[wd-server] Ready (${process.env.DEPLOYMENT_ENV}).`));
  let stopping = false;
  function shutdown() {
    if (stopping) return;
    stopping = true;
    server.close(async () => {
      try { await app.close(); } finally { process.exit(0); }
    });
    setTimeout(() => process.exit(1), 10000).unref();
  }
  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);
}

module.exports = { guardPreview, isPreviewRequest, start };

// Passenger may load the startup file with require(), so do not gate startup
// behind `require.main === module`. Tests opt out explicitly.
if (process.env.WD_SERVER_IMPORT_ONLY !== "1") {
  start().catch(error => {
    console.error("[wd-server] Startup failed:", error.message);
    process.exit(1);
  });
}

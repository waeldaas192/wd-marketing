import application, { type Env } from "./index";

type StandaloneEnv = Env & { DEPLOYMENT_STAGE?: string };
declare const __WD_REDIRECTS__: { from: string; to: string; status: number }[];
type Context = { waitUntil(promise: Promise<unknown>): void };

export default {
  async fetch(request: Request, env: StandaloneEnv, context: Context): Promise<Response> {
    const url = new URL(request.url);
    const read = request.method === "GET" || request.method === "HEAD";
    let response: Response;
    if (url.pathname === "/api/health" && read) {
      let database = false;
      try {
        database = Boolean(await env.DB?.prepare("SELECT COUNT(*) AS tables_ready FROM sqlite_master WHERE type='table' AND name IN ('contact_enquiries','contact_email_outbox','form_rate_limits')").first<{ tables_ready: number }>().then(row => row?.tables_ready === 3));
      } catch { /* Health reports configuration, never request data or secrets. */ }
      const form = database && (env.CONTACT_FORM_SECRET?.length ?? 0) >= 32
        && Boolean(env.TURNSTILE_SITE_KEY) === Boolean(env.TURNSTILE_SECRET_KEY);
      const mail = env.CONTACT_EMAIL_ENABLED === "true" && Boolean(env.RESEND_API_KEY);
      response = Response.json({ ok: form, database, form, mail, addresses: Boolean(env.IDEAL_POSTCODES_API_KEY) }, { status: form ? 200 : 503, headers: { "Cache-Control": "no-store" } });
    } else if (read && url.hostname === "www.wdmarketing.co.uk") {
      url.hostname = "wdmarketing.co.uk"; url.protocol = "https:";
      response = Response.redirect(url.toString(), 308);
    } else {
      const rule = read && __WD_REDIRECTS__.find(rule => rule.from.endsWith("*")
        ? url.pathname.startsWith(rule.from.slice(0, -1)) : url.pathname === rule.from);
      if (rule) {
        url.pathname = rule.to;
        response = Response.redirect(url.toString(), rule.status);
      } else {
        response = await application.fetch(request, env, context);
      }
    }
    // Keep the independent test deployment out of search while DNS still serves Sites.
    if (env.DEPLOYMENT_STAGE !== "production" || !["wdmarketing.co.uk", "www.wdmarketing.co.uk"].includes(url.hostname)) {
      response = new Response(response.body, response);
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
    }
    return response;
  },
};

#!/usr/bin/env node
"use strict";
// Read-only production checks. NEVER submit a form, request secrets,
// set cookies, or treat this as proof of GA4/Resend account-side delivery.
const origin = "https://wdmarketing.co.uk";
const { writeFileSync, mkdirSync } = require("node:fs");
const paths = [
  "/", "/about", "/contact", "/services/web-conversion",
  "/services/seo", "/services/technical-seo-london",
  "/services/conversion-rate-optimisation", "/services/meta-ads",
  "/industries/stone-worktops", "/work/stone-pro-worktops",
  "/insights/seo-that-generates-leads"
];
const redirects = [
  ["/HOME", "/"], ["/about-us/", "/about"],
  ["/google-ads-ppc/", "/services/paid-acquisition"],
  ["/best-web-design-company-london/", "/services/web-conversion"]
];
const results = [];
const report = (name, result, details = "") => results.push({ name, result, details });
async function get(path, method="GET", urlBase=origin) {
  return fetch(urlBase + path, {
    method, redirect: "manual",
    headers: { "accept": "*/*", "user-agent": "WDMarketing-Live-ReadOnly-QA/1.0" },
    signal: AbortSignal.timeout(12000)
  });
}
async function checkPage(path) {
  try {
    const response = await get(path);
    const body = await response.text();
    const robotsHeader = response.headers.get("x-robots-tag") || "";
    const links = Array.from(body.matchAll(/<link\b[^>]*>/gi), match => match[0]);
    const tag = links.find(tag => /\brel=["']canonical["']/i.test(tag)) || "";
    const canonical = tag.match(/\bhref=["']([^"']+)["']/i)?.[1] || "";
    const desired = origin + path;
    const pass = response.status === 200 && !/noindex/i.test(robotsHeader)
      && canonical === desired && /<h1\b/i.test(body);
    report(path, pass ? "PASS" : "FAIL",
      "http=" + response.status + "; canonical=" + (canonical || "none") +
      "; robots=" + (robotsHeader || "none") + "; h1=" + /<h1\b/i.test(body));
  } catch(e) {
    report(path, "UNKNOWN", e.name === "TimeoutError" ? "timeout" : "network_failure");
  }
}
(async () => {
  // A small set of critical routes instead of a high-volume crawl.
  await Promise.all(paths.map(checkPage));
  for (const [from,to] of redirects) {
    try {
      const res = await get(from);
      const location = res.headers.get("location") || "";
      report("redirect " + from, (res.status===301 || res.status===308) && location === origin+to ? "PASS":"FAIL",
        "http=" + res.status + "; target=" + (location || "none"));
    } catch(e) { report("redirect " + from, "UNKNOWN", "network_failure"); }
  }
  try {
    const res=await get("/api/health"), body=await res.json();
    report("/api/health",res.status===200 && body.ok === true && body.database === true && body.form === true && body.mail === true ? "PASS":"FAIL",
      "http=" + res.status + "; ready=" + !!body.ok + "; db=" + !!body.database + "; form=" + !!body.form + "; mail=" + !!body.mail);
  } catch(e) { report("/api/health","UNKNOWN","network_or_json_failure"); }
  try {
    const res=await get("/api/contact/config"), body=await res.json();
    const guarded=res.status===200 && body.accepting === true && !!body.turnstileSiteKey;
    report("/api/contact/config",guarded?"PASS":"FAIL",
      "http=" + res.status + "; accepting=" + !!body.accepting + "; turnstile_present=" + !!body.turnstileSiteKey);
  } catch(e) { report("/api/contact/config","UNKNOWN","network_or_json_failure"); }
  try {
    const res=await get("/sitemap.xml"); const body=await res.text();
    report("/sitemap.xml",res.status===200 && body.includes(origin+"/industries/stone-worktops")?"PASS":"FAIL",
      "http="+res.status+"; sector_present="+body.includes(origin+"/industries/stone-worktops"));
  } catch(e) { report("/sitemap.xml","UNKNOWN","network_failure"); }
  const summary = { passed:results.filter(x=>x.result==="PASS").length,
    failed:results.filter(x=>x.result==="FAIL").length,
    unknown:results.filter(x=>x.result==="UNKNOWN").length };
  const output = { checkedAt:new Date().toISOString(), target:origin, mode:"read-only",
    summary, results, notes:[
      "This audit cannot prove Search Console indexation, GA4 conversion events or actual email delivery.",
      "Cloudflare may challenge automated runners; network failures are UNKNOWN, not proof the site is down."
    ]};
  console.log(JSON.stringify(output,null,2));
  mkdirSync("qa-results",{recursive:true});
  writeFileSync("qa-results/live-production-audit.json",JSON.stringify(output,null,2)+"\n");
  if (summary.failed>0) process.exitCode=1;
})().catch(error=>{ console.error("Live audit failed: "+error.name); process.exitCode=1; });

import { clearAnalyticsCookies, CONSENT_MAX_AGE, type CookieConsent } from "./consent";

type ConsentListener = (state: { analytics: boolean }) => void;
type DataEvent = Record<string, string | number | boolean>;
declare global {
  interface Window {
    dataLayer?: DataEvent[];
    wdOnConsentChange?: (listener: ConsentListener) => void;
    wdMeasurementContext?: () => ReturnType<typeof fields>;
  }
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";
const ga4Id = process.env.NEXT_PUBLIC_GA4_ID || "";
export const measurementConfigured = process.env.NEXT_PUBLIC_MEASUREMENT_ENABLED === "true"
  && /^GTM-[A-Z0-9]+$/.test(gtmId) && /^G-[A-Z0-9]+$/.test(ga4Id);
let consent: CookieConsent | null = null;
let started = false, bridgeReady = false, listener: ConsentListener | undefined;
let currentPath = "", previousLocation = "", lastPage = "", announced = false;
const pending: DataEvent[] = [];
const leadReceipts = new Set<string>();
let expiryTimer: ReturnType<typeof setTimeout> | undefined;

const primaryPaths = new Set(["/", "/about", "/contact", "/work", "/insights", "/services", "/privacy", "/terms", "/cookies",
  "/services/web-conversion", "/services/seo", "/services/paid-acquisition", "/services/growth-infrastructure",
  "/work/sma-marble",
  "/work/stone-pro-worktops",
  "/work/mb-legacy-roofing",
  "/work/exp-auto-parts",
  "/work/marble-stone-polishing",
  "/work/amici-executive-assistants",
  "/work/km-capital-roofing",
  "/work/tim-paints-tiles",
  "/work/prestige-painters",
  "/work/naranj-glasgow",
  "/work/london-marble-stone",
  "/work/floor-care-london",
  "/insights/seo-that-generates-leads",
  "/insights/landing-page-before-more-ad-spend",
  "/insights/growth-stack-for-local-services"]);
// Unknown paths are grouped instead of sending arbitrary text from a URL.
export function safePath(path: string) {
  if (primaryPaths.has(path)) return path;
  return "/other";
}
export function safePageLocation(path: string, search: string) {
  const url = new URL(safePath(path), "https://wdmarketing.co.uk");
  const query = new URLSearchParams(search);
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_id"]) {
    const value = query.get(key);
    if (value && /^[a-zA-Z][a-zA-Z0-9_-]{0,79}$/.test(value) && !/\d{7}/.test(value)) url.searchParams.set(key, value);
  }
  return url.toString();
}
function allowed() {
  return measurementConfigured && !!consent?.analytics && Date.now() - consent.savedAt < CONSENT_MAX_AGE;
}
function push(value: DataEvent) { (window.dataLayer ||= []).push(value); }
function fields() {
  let referrer = previousLocation;
  if (!referrer) try { referrer = document.referrer ? new URL(document.referrer).origin + "/" : ""; } catch { /* Omit malformed referrers. */ }
  return { page_path: safePath(currentPath), page_location: safePageLocation(currentPath, location.search), page_referrer: referrer };
}
function emit(value: DataEvent) {
  if (!allowed()) return false;
  const event = { ...fields(), ...value };
  if (bridgeReady) push(event);
  else if (pending.length < 30) pending.push(event);
  return true;
}
function pageView() {
  if (!allowed() || !bridgeReady || lastPage === currentPath) return;
  emit({ event: "wd_page_view" });
  lastPage = currentPath;
}
function setDisabled(disabled: boolean) {
  if (/^G-[A-Z0-9]+$/.test(ga4Id)) (window as unknown as Record<string, unknown>)["ga-disable-" + ga4Id] = disabled;
}
function ready() {
  bridgeReady = true;
  if (!allowed()) { pending.length = 0; return; }
  if (!announced) { push({ event: "wd_analytics_ready", ...fields() }); announced = true; }
  pageView();
  for (const event of pending.splice(0)) push(event);
}
function loadContainer() {
  if (started || !allowed()) return;
  started = true;
  window.wdMeasurementContext = fields;
  // The native GTM consent template registers this callback on Consent Initialization.
  // A missing template fails closed: no application events are released.
  window.wdOnConsentChange = callback => {
    listener = callback;
    callback({ analytics: allowed() });
    queueMicrotask(ready);
  };
  push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.id = "wd-gtm"; script.async = true;
  script.src = "https://www.googletagmanager.com/gtm.js?id=" + gtmId;
  script.onerror = () => { started = false; script.remove(); pending.length = 0; };
  document.head.appendChild(script);
}
export function applyConsent(value: CookieConsent | null) {
  consent = value;
  clearTimeout(expiryTimer);
  const enabled = allowed();
  setDisabled(!enabled);
  if (!enabled) { pending.length = 0; lastPage = ""; clearAnalyticsCookies(); }
  listener?.({ analytics: enabled });
  if (enabled) {
    loadContainer();
    if (bridgeReady) queueMicrotask(ready);
  }
  if (value) {
    // Long expiries exceed browsers' signed 32-bit setTimeout limit.
    const remaining = value.savedAt + CONSENT_MAX_AGE - Date.now();
    expiryTimer = setTimeout(() => {
      if (remaining > 2147483647) applyConsent(value);
      else { applyConsent(null); window.dispatchEvent(new Event("wd-consent-expired")); }
    }, Math.max(1, Math.min(remaining, 2147483647)));
  }
}
export function trackPage(path: string) {
  if (path !== currentPath) {
    previousLocation = currentPath && allowed() ? "https://wdmarketing.co.uk" + safePath(currentPath) : "";
    currentPath = path;
  }
  pageView();
}
export function trackFormStart() { return emit({ event: "wd_form_start", form_id: "project_brief" }); }
export function trackFormStep(step: number) {
  if ([1, 2, 3].includes(step)) emit({ event: "wd_form_step", form_id: "project_brief", step });
}
export function trackLead(receipt: string) {
  if (!receipt || leadReceipts.has(receipt)) return;
  // The receipt only deduplicates in memory; it never enters dataLayer or Google.
  if (emit({ event: "wd_generate_lead", form_id: "project_brief", lead_method: "website_form" })) leadReceipts.add(receipt);
}
export function trackContactClick(method: "email" | "phone" | "whatsapp") {
  emit({ event: "wd_contact_click", contact_method: method });
}
export function trackContactCta() { emit({ event: "wd_contact_cta_click" }); }

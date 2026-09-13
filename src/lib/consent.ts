export const CONSENT_KEY = "wd_cookie_consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export type CookieConsent = { version: number; analytics: boolean; savedAt: number };

export function parseConsent(raw: string | null, now = Date.now()): CookieConsent | null {
  try {
    const value = JSON.parse(raw || "null");
    if (value?.version !== CONSENT_VERSION || typeof value.analytics !== "boolean"
      || !Number.isFinite(value.savedAt) || value.savedAt > now
      || now - value.savedAt >= CONSENT_MAX_AGE) return null;
    return { version: CONSENT_VERSION, analytics: value.analytics, savedAt: value.savedAt };
  } catch { return null; }
}

export function readConsent(): CookieConsent | null {
  try { return parseConsent(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}

export function writeConsent(analytics: boolean): { consent: CookieConsent; persisted: boolean } {
  const consent = { version: CONSENT_VERSION, analytics, savedAt: Date.now() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    return { consent, persisted: true };
  } catch { return { consent, persisted: false }; }
}

/** Only our known optional cookies; never delete security or unrelated storage. */
export function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, "." + host];
  if (host === "wdmarketing.co.uk" || host.endsWith(".wdmarketing.co.uk")) domains.push("wdmarketing.co.uk", ".wdmarketing.co.uk");
  const paths = new Set(["/"]);
  const parts = location.pathname.split("/").filter(Boolean);
  for (let i = 1; i <= parts.length; i++) {
    const path = "/" + parts.slice(0, i).join("/"); paths.add(path); paths.add(path + "/");
  }
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0].trim();
    if (!/^(_ga(?:_[A-Za-z0-9_-]+)?|_gid|_gat(?:_[A-Za-z0-9_-]+)?)$/.test(name)) continue;
    for (const domain of new Set(domains)) for (const path of paths) {
      document.cookie = `${name}=; Max-Age=0; Path=${path}; SameSite=Lax${domain ? "; Domain=" + domain : ""}${location.protocol === "https:" ? "; Secure" : ""}`;
    }
  }
}

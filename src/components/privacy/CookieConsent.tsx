"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { applyConsent, trackPage, trackContactClick, trackContactCta } from "@/lib/measurement";
import { CONSENT_KEY, readConsent, writeConsent } from "@/lib/consent";
import styles from "./CookieConsent.module.css";

export function CookieConsent() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false), [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false), [notice, setNotice] = useState("");
  const committedAnalytics = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null), returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const saved = readConsent(); committedAnalytics.current = saved?.analytics ?? false; applyConsent(saved); setVisible(!saved); setAnalytics(saved?.analytics ?? false);
    const open = () => { setAnalytics(committedAnalytics.current); returnFocus.current = document.activeElement as HTMLElement; setSettings(true); };
    const sync = () => { const value = readConsent(); committedAnalytics.current = value?.analytics ?? false; applyConsent(value); setAnalytics(value?.analytics ?? false); setVisible(!value); };
    const storage = (event: StorageEvent) => { if (event.key === CONSENT_KEY || event.key === null) sync(); };
    const expired = () => { committedAnalytics.current = false; setAnalytics(false); setVisible(true); };
    const click = (event: MouseEvent) => {
      const link = (event.target as Element)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("mailto:")) trackContactClick("email");
      else if (href.startsWith("tel:")) trackContactClick("phone");
      else if (["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(link.hostname)) trackContactClick("whatsapp");
      else if (link.origin === location.origin && link.pathname === "/contact") trackContactCta();
    };
    window.addEventListener("wd-cookie-settings", open); window.addEventListener("storage", storage);
    window.addEventListener("wd-consent-expired", expired); document.addEventListener("click", click);
    return () => { window.removeEventListener("wd-cookie-settings", open); window.removeEventListener("storage", storage); window.removeEventListener("wd-consent-expired", expired); document.removeEventListener("click", click); };
  }, []);
  useEffect(() => { trackPage(pathname); }, [pathname]);
  useEffect(() => { if (settings) dialog.current?.showModal(); else dialog.current?.close(); }, [settings]);
  function close() { setSettings(false); returnFocus.current?.focus(); }
  function save(value: boolean) {
    const result = writeConsent(value); committedAnalytics.current = value; applyConsent(result.consent); setAnalytics(value); setVisible(false); close();
    setNotice(result.persisted ? "Cookie preferences saved." : "Preferences applied for this page. Your browser could not save them for future visits.");
  }
  return <>
    {visible && <section className={styles.banner} aria-label="Cookie choices">
      <div><p className={styles.label}>Your privacy</p><h2>A choice that stays yours.</h2><p>We use essential technologies to run this site. With your permission, we also use Google Analytics to understand visits and improve the website. You can change your choice at any time.</p><Link href="/cookies">Read our cookie policy</Link></div>
      <div className={styles.actions}><button className={styles.choice} type="button" onClick={() => save(false)}>Reject optional</button><button className={styles.choice} type="button" onClick={() => save(true)}>Accept analytics</button><button className={styles.settings} type="button" onClick={event => { setAnalytics(committedAnalytics.current); returnFocus.current = event.currentTarget; setSettings(true); }}>Customise</button></div>
    </section>}
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="cookie-dialog-title" aria-describedby="cookie-dialog-description" onCancel={event => { event.preventDefault(); close(); }} onClose={() => setSettings(false)}>
      <header><div><p className={styles.label}>WD Marketing</p><h2 id="cookie-dialog-title">Cookie preferences</h2></div><button className={styles.close} type="button" onClick={close} aria-label="Close cookie preferences">×</button></header>
      <p id="cookie-dialog-description">Choose which optional technologies we can use. Rejecting analytics will not affect your enquiry or access to the website.</p>
      <div className={styles.category}><div><h3>Essential</h3><p>Keep the website secure, process your requests and remember your cookie choice.</p></div><span className={styles.always}>Always on</span></div>
      <label className={styles.category}><div><h3>Analytics</h3><p>Google Analytics helps us understand visits and successful form submissions. Your form answers are not sent to Google Analytics.</p></div><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} aria-label="Allow analytics cookies"/></label>
      <div className={styles.category}><div><h3>Advertising</h3><p>Advertising and remarketing tags are not enabled in this website setup.</p></div><span className={styles.always}>Not used</span></div>
      <p className={styles.detail}>We remember your choice for 180 days. See our <Link href="/privacy" onClick={close}>privacy policy</Link> and <Link href="/cookies" onClick={close}>cookie policy</Link>.</p>
      <div className={styles.actions}><button className={styles.choice} type="button" onClick={() => save(false)}>Reject optional</button><button className={styles.choice} type="button" onClick={() => save(true)}>Accept analytics</button><button className={styles.save} type="button" onClick={() => save(analytics)}>Save preferences</button></div>
    </dialog>
    <span className={styles.srOnly} role="status">{notice}</span>
  </>;
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { assets } from "@/data/assets";
import { site } from "@/data/site";
import { initialiseMotionPreference, toggleMotionPreference, useMotionPreference } from "@/lib/motion-preferences";
import styles from "./Header.module.css";

const services = [
  { label: "Web & Conversion", href: "/services/web-conversion", copy: "Websites and landing pages built around customer intent." },
  { label: "SEO & Organic Growth", href: "/services/seo", copy: "Search strategy, technical SEO and demand-led content." },
  { label: "Paid Acquisition", href: "/services/paid-acquisition", copy: "Google and Meta advertising connected to conversion." },
  { label: "Growth Infrastructure", href: "/services/growth-infrastructure", copy: "Analytics, CRM and automation that connect the journey." },
];
const links = [
  { label: "Work", href: "/work" }, { label: "Process", href: "/#process" },
  { label: "About", href: "/about" }, { label: "Insights", href: "/insights" },
];

export function Header() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { paused, reduced } = useMotionPreference();
  const disclosureRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const restoreMobileFocus = useRef(true);
  const active = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  // Navigation must not steal focus back from the destination page.
  const closeForNavigation = () => {
    restoreMobileFocus.current = false;
    setMegaOpen(false);
    setMobileOpen(false);
  };

  useEffect(() => {
    initialiseMotionPreference();
    document.documentElement.dataset.uiReady = "true";
  }, []);
  useEffect(() => {
    restoreMobileFocus.current = false;
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!megaOpen) return;
    const outside = (event: Event) => {
      if (!disclosureRef.current?.contains(event.target as Node)) setMegaOpen(false);
    };
    const keys = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") { setMegaOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", outside);
    document.addEventListener("keydown", keys);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", outside);
      document.removeEventListener("keydown", keys);
    };
  }, [megaOpen]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!mobileOpen) { if (dialog.open) dialog.close(); return; }
    const previous = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      if (dialog.open) dialog.close();
    };
  }, [mobileOpen]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1121px)");
    const resize = () => {
      if (media.matches) { restoreMobileFocus.current = false; setMobileOpen(false); }
      else setMegaOpen(false);
    };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);

  return <>
    <header className={styles.header}>
      <div className={styles.utility}><div className={`container ${styles.utilityInner}`}>
        <span>London · United Kingdom</span>
        <div><a className={styles.utilityEmail} href={`mailto:${site.email}`}>{site.email}</a>
          <button type="button" aria-pressed={paused} title={reduced ? "Your device requests reduced motion. Non-essential animation remains disabled." : "Pause or resume decorative animation"} onClick={toggleMotionPreference}>{paused ? "Resume motion" : "Pause motion"}</button>
        </div>
      </div></div>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="WD Marketing home" onClick={closeForNavigation}><Image src={assets.brand.logo.src} alt={assets.brand.logo.alt} width={assets.brand.logo.width} height={assets.brand.logo.height} className={styles.logo} priority /></Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          <Link href="/work" onClick={closeForNavigation} aria-current={active("/work") ? "page" : undefined} className={`${styles.link} ${active("/work") ? styles.active : ""}`}>Work</Link>
          <div ref={disclosureRef} className={styles.disclosure}>
            <button ref={triggerRef} type="button" aria-expanded={megaOpen} aria-controls="services-menu" className={`${styles.link} ${megaOpen || pathname.startsWith("/services/") ? styles.active : ""}`} onClick={() => setMegaOpen(value => !value)} onKeyDown={event => {
              if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
              event.preventDefault();
              const last = event.key === "ArrowUp";
              setMegaOpen(true);
              requestAnimationFrame(() => {
                const targets = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a");
                targets?.[last ? targets.length - 1 : 0]?.focus();
              });
            }}>Services <span aria-hidden="true">⌄</span></button>
            {/* Keep the panel directly after its trigger in DOM/tab order. */}
            <div ref={panelRef} id="services-menu" className={styles.mega} hidden={!megaOpen}>
              <div className={`container ${styles.megaInner}`}>
                <div className={styles.megaIntro}><p className="eyebrow">Capabilities</p><p className={styles.megaTitle}>One connected growth system.</p><p>Explore the services behind a clearer customer journey, from discovery to enquiry.</p></div>
                <div className={styles.serviceGrid}>{services.map((item,index) => <Link key={item.href} href={item.href} className={styles.serviceCard} onClick={closeForNavigation} aria-current={active(item.href) ? "page" : undefined}><span>0{index+1}</span><strong>{item.label} <span aria-hidden="true">↗</span></strong><p>{item.copy}</p></Link>)}</div>
                <div className={styles.megaAside}><Link href="/work" onClick={closeForNavigation}>Selected work →</Link><Link href="/about" onClick={closeForNavigation}>About WD →</Link><Link href="/insights" onClick={closeForNavigation}>Insights →</Link><Link href="/contact" onClick={closeForNavigation}>Discuss your project ↗</Link></div>
              </div>
            </div>
          </div>
          {links.slice(1).map(item => <Link key={item.href} href={item.href} onClick={closeForNavigation} aria-current={active(item.href) ? "page" : undefined} className={`${styles.link} ${active(item.href) ? styles.active : ""}`}>{item.label}</Link>)}
        </nav>
        <div className={styles.actions}><Link href="/contact" className={styles.cta} onClick={closeForNavigation}>Start a project <span aria-hidden="true">↗</span></Link><button ref={mobileTrigger} type="button" className={styles.menu} aria-label="Open menu" aria-haspopup="dialog" aria-controls="mobile-navigation" aria-expanded={mobileOpen} onClick={() => { restoreMobileFocus.current = true; setMegaOpen(false); setMobileOpen(true); }}><span aria-hidden="true">☰</span></button></div>
      </div>
    </header>
    <dialog ref={dialogRef} id="mobile-navigation" aria-label="Mobile navigation" className={styles.dialog} onKeyDown={event => {
      if (event.key !== "Tab") return;
      const dialog = event.currentTarget;
      // Recompute after expanding Services; never focus links inside closed details.
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])')).filter(element => {
        const collapsed = element.closest("details:not([open])");
        return element.tabIndex >= 0 && element.getClientRects().length > 0
          && getComputedStyle(element).visibility !== "hidden"
          && (!collapsed || collapsed.querySelector("summary") === element);
      });
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) return;
      const focused = document.activeElement;
      if (event.shiftKey && (focused === first || focused === dialog)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (focused === last || focused === dialog || !dialog.contains(focused))) {
        event.preventDefault(); first.focus();
      }
    }} onCancel={event => { event.preventDefault(); restoreMobileFocus.current = true; setMobileOpen(false); }} onClose={() => {
      setMobileOpen(false);
      if (restoreMobileFocus.current && mobileTrigger.current?.getClientRects().length) mobileTrigger.current.focus();
    }}>
      <div className={styles.dialogBar}><strong>WD Marketing</strong><button type="button" onClick={() => { restoreMobileFocus.current = true; setMobileOpen(false); }}>Close menu</button></div>
      <nav className={styles.mobileLinks} aria-label="Mobile navigation links">
        <Link href="/work" onClick={closeForNavigation} aria-current={active("/work") ? "page" : undefined}>Work</Link>
        <details><summary>Services</summary><div>{services.map(item => <Link key={item.href} href={item.href} onClick={closeForNavigation} aria-current={active(item.href) ? "page" : undefined}>{item.label} <span aria-hidden="true">↗</span></Link>)}</div></details>
        {links.slice(1).map(item => <Link key={item.href} href={item.href} onClick={closeForNavigation} aria-current={active(item.href) ? "page" : undefined}>{item.label}</Link>)}
        <Link href="/contact" onClick={closeForNavigation} className={styles.cta}>Start a project ↗</Link>
      </nav>
    </dialog>
  </>;
}

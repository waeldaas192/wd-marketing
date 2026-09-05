"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { assets } from "@/data/assets";
import { site } from "@/data/site";
import styles from "./Header.module.css";

const services = [
  { label: "Web & Conversion", href: "/services/web-conversion", copy: "Websites and landing pages built around customer intent." },
  { label: "SEO & Organic Growth", href: "/services/seo", copy: "Search strategy, technical SEO and demand-led content." },
  { label: "Paid Acquisition", href: "/services/paid-acquisition", copy: "Google and Meta advertising connected to conversion." },
  { label: "Growth Infrastructure", href: "/services/growth-infrastructure", copy: "Analytics, CRM and automation that connect the journey." },
];
const links = [{label:"Work",href:"/work"},{label:"Process",href:"/#process"},{label:"About",href:"/about"},{label:"Insights",href:"/insights"}];

export function Header() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const active = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));
  const close = () => { setMegaOpen(false); setMobileOpen(false); };

  useEffect(() => { setMegaOpen(false); setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
  }, [paused]);
  useEffect(() => {
    if (!megaOpen) return;
    const dismiss = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setMegaOpen(false); };
    const keys = (event: KeyboardEvent) => { if (event.key === "Escape") { setMegaOpen(false); triggerRef.current?.focus(); } };
    const focus = (event: FocusEvent) => { if (!headerRef.current?.contains(event.target as Node)) setMegaOpen(false); };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", keys);
    document.addEventListener("focusin", focus);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", keys); document.removeEventListener("focusin", focus); };
  }, [megaOpen]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!mobileOpen) { if (dialog.open) dialog.close(); return; }
    const previous = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; if (dialog.open) dialog.close(); };
  }, [mobileOpen]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1121px)");
    const resize = () => { if (media.matches) setMobileOpen(false); else setMegaOpen(false); };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);

  return <>
    <header ref={headerRef} className={styles.header}>
      <div className={styles.utility}><div className={`container ${styles.utilityInner}`}>
        <span>London · United Kingdom</span>
        <div><a className={styles.utilityEmail} href={`mailto:${site.email}`}>{site.email}</a><button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "Resume motion" : "Pause motion"}</button></div>
      </div></div>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="WD Marketing home" onClick={close}><Image src={assets.brand.logo.src} alt={assets.brand.logo.alt} width={assets.brand.logo.width} height={assets.brand.logo.height} className={styles.logo} priority /></Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          <Link href="/work" onClick={close} aria-current={active("/work") ? "page" : undefined} className={`${styles.link} ${active("/work") ? styles.active : ""}`}>Work</Link>
          <button ref={triggerRef} type="button" aria-expanded={megaOpen} aria-controls="services-menu" className={`${styles.link} ${megaOpen || pathname.startsWith("/services/") ? styles.active : ""}`} onClick={() => setMegaOpen(value => !value)} onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); setMegaOpen(true); requestAnimationFrame(() => panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus()); } }}>Services <span aria-hidden="true">⌄</span></button>
          {links.slice(1).map(item => <Link key={item.href} href={item.href} onClick={close} aria-current={active(item.href) ? "page" : undefined} className={`${styles.link} ${active(item.href) ? styles.active : ""}`}>{item.label}</Link>)}
        </nav>
        <div className={styles.actions}><Link href="/contact" className={styles.cta} onClick={close}>Start a project <span aria-hidden="true">↗</span></Link><button ref={mobileTrigger} type="button" className={styles.menu} aria-label="Open menu" aria-controls="mobile-navigation" aria-expanded={mobileOpen} onClick={() => { setMegaOpen(false); setMobileOpen(true); }}><span aria-hidden="true">☰</span></button></div>
      </div>
      <div ref={panelRef} id="services-menu" className={styles.mega} hidden={!megaOpen}>
        <div className={`container ${styles.megaInner}`}>
          <div className={styles.megaIntro}><p className="eyebrow">Capabilities</p><p className={styles.megaTitle}>One connected growth system.</p><p>Explore the services behind a clearer customer journey, from discovery to enquiry.</p></div>
          <div className={styles.serviceGrid}>{services.map((item,index) => <Link key={item.href} href={item.href} className={styles.serviceCard} onClick={close}><span>0{index+1}</span><strong>{item.label} <span aria-hidden="true">↗</span></strong><p>{item.copy}</p></Link>)}</div>
          <div className={styles.megaAside}><Link href="/work" onClick={close}>Selected work →</Link><Link href="/about" onClick={close}>About WD →</Link><Link href="/insights" onClick={close}>Insights →</Link><Link href="/contact" onClick={close}>Discuss your project ↗</Link></div>
        </div>
      </div>
    </header>
    <dialog ref={dialogRef} id="mobile-navigation" aria-label="Mobile navigation" className={styles.dialog} onClose={() => { setMobileOpen(false); mobileTrigger.current?.focus(); }}>
      <div className={styles.dialogBar}><strong>WD Marketing</strong><button type="button" onClick={() => setMobileOpen(false)}>Close menu</button></div>
      <nav className={styles.mobileLinks} aria-label="Mobile navigation links">
        <Link href="/work" onClick={close}>Work</Link>
        <details><summary>Services</summary><div>{services.map(item => <Link key={item.href} href={item.href} onClick={close}>{item.label} <span aria-hidden="true">↗</span></Link>)}</div></details>
        {links.slice(1).map(item => <Link key={item.href} href={item.href} onClick={close}>{item.label}</Link>)}
        <Link href="/contact" onClick={close} className={styles.cta}>Start a project ↗</Link>
      </nav>
    </dialog>
  </>;
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { assets } from "@/data/assets";
import styles from "./Header.module.css";

const serviceLinks = [
  { label: "Web & Conversion", href: "/services/web-conversion", copy: "High-performance websites built to turn intent into enquiries." },
  { label: "SEO", href: "/services/seo", copy: "Search strategy, technical foundations and content built around demand." },
  { label: "Paid Acquisition", href: "/services/paid-acquisition", copy: "Google and paid media connected to landing pages and measurement." },
  { label: "Growth Infrastructure", href: "/services/growth-infrastructure", copy: "Analytics, CRM, automation and tracking that keep the system connected." },
];

const primaryLinks = [
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setMegaOpen(false);
  };
  const isActive = (href: string) => href.startsWith("/#") ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const servicesActive = pathname.startsWith("/services");

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.brand} aria-label="WD Marketing home" onClick={closeAll}>
            <Image src={assets.brand.logo.src} alt={assets.brand.logo.alt} width={assets.brand.logo.width} height={assets.brand.logo.height} className={styles.logo} priority />
          </Link>

          <nav className={styles.nav} aria-label="Primary navigation">
            <Link href="/work" className={`${styles.link} ${isActive("/work") ? styles.active : ""}`}>Work</Link>
            <button type="button" className={`${styles.link} ${styles.servicesTrigger} ${(megaOpen || servicesActive) ? styles.active : ""}`} aria-expanded={megaOpen} onClick={() => setMegaOpen((value) => !value)}>
              Services <span aria-hidden="true">⌄</span>
            </button>
            {primaryLinks.map((item) => (
              <Link key={item.href} href={item.href} className={`${styles.link} ${isActive(item.href) ? styles.active : ""}`} onClick={() => setMegaOpen(false)}>{item.label}</Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <span className={styles.location}>London · UK</span>
            <Link href="/contact" className={styles.cta} onClick={closeAll}>Start a project <span aria-hidden="true">↗</span></Link>
            <button type="button" className={`${styles.menu} ${mobileOpen ? styles.menuOpen : ""}`} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}><i /><b /></button>
          </div>
        </div>

        <div className={`${styles.mega} ${megaOpen ? styles.megaOpen : ""}`}>
          <div className={`container ${styles.megaInner}`}>
            <div className={styles.megaIntro}>
              <span>Capabilities</span><h2>One connected growth system.</h2>
              <p>Strategy, experience, acquisition and measurement designed to work together — not as isolated services.</p>
            </div>
            <div className={styles.serviceGrid}>
              {serviceLinks.map((item, index) => (
                <Link key={item.href} href={item.href} className={styles.serviceCard} onClick={closeAll}>
                  <span>0{index + 1}</span><strong>{item.label}</strong><p>{item.copy}</p><i aria-hidden="true">↗</i>
                </Link>
              ))}
            </div>
            <aside className={styles.megaAside}>
              <span>Explore</span>
              <Link href="/work" onClick={closeAll}>Selected work <i>→</i></Link>
              <Link href="/about" onClick={closeAll}>About WD <i>→</i></Link>
              <Link href="/insights" onClick={closeAll}>Insights <i>→</i></Link>
              <Link href="/contact" className={styles.megaCta} onClick={closeAll}>Discuss your project <i>↗</i></Link>
            </aside>
          </div>
        </div>
      </header>

      <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ""}`} aria-hidden={!mobileOpen}>
        <div className={`container ${styles.mobileInner}`}>
          <div className={styles.mobileLinks}>
            <Link href="/work" onClick={closeAll}>Work <span>01</span></Link>
            <div className={styles.mobileServices}><div className={styles.mobileServicesTitle}>Services <span>02</span></div>{serviceLinks.map((item) => <Link key={item.href} href={item.href} onClick={closeAll}>{item.label} <i>↗</i></Link>)}</div>
            <Link href="/#process" onClick={closeAll}>Process <span>03</span></Link>
            <Link href="/about" onClick={closeAll}>About <span>04</span></Link>
            <Link href="/insights" onClick={closeAll}>Insights <span>05</span></Link>
          </div>
          <div className={styles.mobileBottom}><p>London-based digital growth studio.</p><Link href="/contact" className={styles.cta} onClick={closeAll}>Start a project <span>↗</span></Link></div>
        </div>
      </div>
    </>
  );
}

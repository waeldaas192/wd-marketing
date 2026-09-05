"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation } from "@/data/site";
import { assets } from "@/data/assets";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.brand} aria-label="WD Marketing home" onClick={() => setOpen(false)}>
            <Image
              src={assets.brand.logo.src}
              alt={assets.brand.logo.alt}
              width={assets.brand.logo.width}
              height={assets.brand.logo.height}
              className={styles.logo}
              priority
            />
          </Link>

          <nav className={styles.nav} aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={styles.link}>{item.label}</Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <span className={styles.location}>LONDON · UK</span>
            <Link href="/contact" className={styles.cta}>Start a project <span aria-hidden="true">↗</span></Link>
            <button
              type="button"
              className={`${styles.menu} ${open ? styles.menuOpen : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <i /><b />
            </button>
          </div>
        </div>
      </header>

      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`} aria-hidden={!open}>
        <div className={`container ${styles.overlayInner}`}>
          <div>
            <div className={styles.mobileIndex}>WD / NAVIGATION / 2026</div>
            <nav className={styles.mobileNav} aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <span>0{index + 1}</span>{item.label}<i>↗</i>
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.mobileFooter}>
            <p>Digital growth systems for ambitious businesses — strategy, experience and acquisition connected to measurable outcomes.</p>
            <Link href="/contact" className={styles.cta} onClick={() => setOpen(false)}>Start a project <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
    </>
  );
}

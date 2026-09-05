"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation } from "@/data/site";
import { assets } from "@/data/assets";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-50">
        <div className="container flex h-[78px] items-center justify-between gap-6">
          <Link href="/" className="brand-lockup" aria-label="WD Marketing home" onClick={() => setOpen(false)}>
            <Image
              src={assets.brand.logo.src}
              alt={assets.brand.logo.alt}
              width={assets.brand.logo.width}
              height={assets.brand.logo.height}
              className="h-[34px] w-auto"
              priority
            />
          </Link>

          <nav className="nav-pill hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden text-[11px] font-semibold uppercase tracking-[.14em] text-white/35 xl:block">London · UK</span>
            <Link href="/contact" className="button button-primary hidden !min-h-[44px] !px-5 sm:inline-flex">Start a project <span aria-hidden="true">↗</span></Link>
            <button
              type="button"
              className="menu-button lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span className={open ? "menu-line rotate" : "menu-line"} />
              <span className={open ? "menu-line rotate-back" : "menu-line"} />
            </button>
          </div>
        </div>
      </header>

      <div className={open ? "mobile-menu is-open" : "mobile-menu"} aria-hidden={!open}>
        <div className="container mobile-menu-inner">
          <div className="mobile-menu-index">NAVIGATION / 2026</div>
          <nav className="mobile-menu-nav" aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>{item.label}<i>↗</i>
              </Link>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <p>Digital growth systems for ambitious businesses.</p>
            <Link href="/contact" className="button button-primary" onClick={() => setOpen(false)}>Start a project</Link>
          </div>
        </div>
      </div>
    </>
  );
}

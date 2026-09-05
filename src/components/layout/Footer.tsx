import Image from "next/image";
import Link from "next/link";
import { navigation, site } from "@/data/site";
import { assets } from "@/data/assets";

const serviceLinks = [
  ["Web & Conversion", "/services/web-conversion"],
  ["SEO", "/services/seo"],
  ["Paid Acquisition", "/services/paid-acquisition"],
  ["Growth Infrastructure", "/services/growth-infrastructure"],
];

export function Footer() {
  return (
    <footer className="mega-footer">
      <div className="container">
        <div className="footer-cta">
          <div>
            <p className="eyebrow">Next move</p>
            <h2>Build something<br /><span>that performs.</span></h2>
          </div>
          <Link href="/contact" className="footer-arrow" aria-label="Start a project">↗</Link>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand-lockup">
              <Image src={assets.brand.logo.src} alt={assets.brand.logo.alt} width={assets.brand.logo.width} height={assets.brand.logo.height} className="h-[38px] w-auto" />
            </Link>
            <p>{site.description}</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div>
            <span className="footer-label">Explore</span>
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </div>
          <div>
            <span className="footer-label">Capabilities</span>
            {serviceLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </div>
          <div>
            <span className="footer-label">Connect</span>
            <a href="https://www.linkedin.com" rel="noreferrer">LinkedIn</a>
            <a href="mailto:hello@wdmarketing.co.uk">Email</a>
            <span className="footer-location">London · United Kingdom</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 WD Marketing</span>
          <span>Strategy · Build · Acquire · Measure · Scale</span>
          <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}

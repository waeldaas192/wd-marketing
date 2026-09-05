import Image from "next/image";
import Link from "next/link";
import { navigation, site } from "@/data/site";
import { assets } from "@/data/assets";
import styles from "./Footer.module.css";

const serviceLinks = [
  ["Web & Conversion", "/services/web-conversion"],
  ["SEO", "/services/seo"],
  ["Paid Acquisition", "/services/paid-acquisition"],
  ["Growth Infrastructure", "/services/growth-infrastructure"],
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <h2 className={styles.title}>
            Make the next move.
            <span>Make it count.</span>
          </h2>
          <Link href="/contact" className={styles.arrow} aria-label="Start a project">↗</Link>
        </div>

        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" aria-label="WD Marketing home">
              <Image
                src={assets.brand.logo.src}
                alt={assets.brand.logo.alt}
                width={assets.brand.logo.width}
                height={assets.brand.logo.height}
                className="h-[38px] w-auto"
              />
            </Link>
            <p>{site.description}</p>
            <a className={styles.email} href={`mailto:${site.email}`}>{site.email}</a>
          </div>

          <div className={styles.column}>
            <span className={styles.label}>Explore</span>
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </div>

          <div className={styles.column}>
            <span className={styles.label}>Capabilities</span>
            {serviceLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </div>

          <div className={styles.column}>
            <span className={styles.label}>Connect</span>
            <a href="https://www.linkedin.com" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${site.email}`}>Email</a>
            <span className={styles.location}>{site.location}</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 WD Marketing</span>
          <span>Strategy · Build · Acquire · Measure · Scale</span>
          <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { GrowthEngine } from "@/components/ui/GrowthEngine";
import { HeroAtmosphere } from "@/components/ui/HeroAtmosphere";
import { ArrowIcon } from "@/components/ui/Icons";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} data-fluid-hero>
      <HeroAtmosphere/>
      <div className="container">
        <div className={styles.meta}>
          <strong>DIGITAL GROWTH SYSTEMS</strong>
          <span>STRATEGY · EXPERIENCE · ACQUISITION · MEASUREMENT</span>
        </div>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <h1 className={styles.title}>
              <span className={styles.line}>WEB DESIGN.</span>
              <span className={`${styles.line} ${styles.compactLine}`}>SEO &amp; PAID ADS.</span>
              <span className={styles.line}><em className={styles.accent}>FOR GROWTH.</em></span>
            </h1>
            <p className={styles.statement}>Web design, SEO, Google and Meta Ads, and conversion tracking for London stone and worktop specialists, home-service businesses and growing UK brands — focused on qualified enquiries.</p>
            <div className={styles.actions}>
              <Link href="/contact" className={`${styles.primary} liquid-cta`}>Start a project <ArrowIcon/></Link>
              <Link href="/work" className={styles.secondary}>Explore selected work <ArrowIcon/></Link>
            </div>
          </div>
          <div className={styles.engine}><GrowthEngine /></div>
        </div>
        <div className={styles.bottom}><span>ATTENTION · ACTION · GROWTH</span><span>WD / 01 — 06</span></div>
      </div>
    </section>
  );
}

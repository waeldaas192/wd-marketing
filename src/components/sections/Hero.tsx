import Link from "next/link";
import { GrowthEngine } from "@/components/ui/GrowthEngine";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.ambient} aria-hidden="true" />
      <div className="container">
        <div className={styles.meta}>
          <strong>DIGITAL GROWTH SYSTEMS</strong>
          <span>STRATEGY · EXPERIENCE · ACQUISITION · MEASUREMENT</span>
        </div>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <h1 className={styles.title}>
              <span className={styles.line}>ATTENTION.</span>
              <span className={styles.line}>ACTION.</span>
              <span className={styles.line}><em className={styles.accent}>GROWTH.</em></span>
            </h1>

            <p className={styles.statement}>
              WD Marketing connects high-performance websites, search and paid acquisition into one measurable system — designed to turn being discovered into being chosen.
            </p>

            <div className={styles.actions}>
              <Link href="/contact" className={styles.primary}>Start a project <span aria-hidden="true">↗</span></Link>
              <Link href="/work" className={styles.secondary}>Explore selected work <span aria-hidden="true">→</span></Link>
            </div>
          </div>

          <div className={styles.engine}>
            <GrowthEngine />
          </div>
        </div>

        <div className={styles.bottom}>
          <span>SCROLL TO ENTER THE SYSTEM</span>
          <span>WD / 01 — 06</span>
        </div>
      </div>
    </section>
  );
}

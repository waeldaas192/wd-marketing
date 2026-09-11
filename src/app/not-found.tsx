import Link from "next/link";
import { HeroAtmosphere } from "@/components/ui/HeroAtmosphere";
import { ArrowIcon } from "@/components/ui/Icons";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <HeroAtmosphere />
      <div className={`container ${styles.shell}`}>
        <div className={styles.meta}>
          <strong><span aria-hidden="true" />404 / Page not found</strong>
          <span>Route recovery in progress</span>
        </div>

        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>A small detour</p>
            <h1 id="not-found-title">This route lost<br /><span>the signal.</span></h1>
            <p className={styles.intro}>The page may have moved, changed or never existed. Let’s reconnect you with something useful.</p>
            <div className={styles.actions}>
              <Link href="/" className={styles.primary}>Return home <ArrowIcon /></Link>
              <Link href="/services" className={styles.secondary}>Explore services <ArrowIcon /></Link>
            </div>
            <p className={styles.note}>No data was lost. Only this page is missing.</p>
          </div>

          <figure className={styles.visual} aria-label="An animated route leaves a missing page and reconnects to the WD Marketing homepage">
            <figcaption className={styles.visualHeader}>
              <div><i aria-hidden="true" /><strong>WD route monitor</strong></div>
              <span>Live recovery</span>
            </figcaption>

            <div className={styles.errorCode} aria-hidden="true">
              <span>4</span>
              <span className={styles.zero}><i /></span>
              <span>4</span>
            </div>

            <div className={styles.routeMap} aria-hidden="true">
              <svg viewBox="0 0 640 188" preserveAspectRatio="none" focusable="false">
                <defs>
                  <linearGradient id="route-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#8793ee" />
                    <stop offset=".62" stopColor="#5b56ee" />
                    <stop offset="1" stopColor="#58b8dc" />
                  </linearGradient>
                </defs>
                <path className={styles.routeBase} d="M38 134 C138 134 148 64 244 64 C328 64 332 144 418 144 C493 144 502 84 602 84" />
                <path className={styles.routeProgress} d="M38 134 C138 134 148 64 244 64 C328 64 332 144 418 144 C493 144 502 84 602 84" pathLength="1" />
              </svg>
              <span className={styles.routeSignal}><i /></span>
              <span className={`${styles.routeNode} ${styles.requestNode}`}><i />Requested URL</span>
              <span className={`${styles.routeNode} ${styles.missingNode}`}>Route missing</span>
              <span className={`${styles.routeNode} ${styles.homeNode}`}><i />HOME</span>
            </div>

            <div className={styles.recovery}>
              <span><i aria-hidden="true" />System response</span>
              <strong>Useful route found.</strong>
              <Link href="/" aria-label="Open the WD Marketing homepage">Open homepage <ArrowIcon /></Link>
            </div>
          </figure>
        </div>

        <div className={styles.bottom}>
          <span>WD / ERROR 404</span>
          <span>Web · Search · Paid · Measurement</span>
        </div>
      </div>
    </section>
  );
}

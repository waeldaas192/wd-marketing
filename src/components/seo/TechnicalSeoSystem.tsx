import type { CSSProperties } from "react";
import styles from "./TechnicalSeoSystem.module.css";

const stages = [
  { id: "crawl", title: "Crawl", meta: "robots · links · status" },
  { id: "render", title: "Render", meta: "HTML · JS · resources" },
  { id: "canonical", title: "Canonical", meta: "URL · signals · variants" },
  { id: "index", title: "Index", meta: "eligible · unique · useful" },
  { id: "measure", title: "Measure", meta: "GSC · logs · outcomes" },
] as const;

const checks = ["robots.txt", "sitemap.xml", "redirects", "canonical", "structured data", "Core Web Vitals"] as const;

export function TechnicalSeoSystem() {
  return (
    <div className={styles.card} aria-label="Animated technical SEO crawl and indexation system">
      <div className={styles.topline}>
        <span>TECHNICAL SEO SYSTEM</span>
        <span>CRAWL → INDEX → MEASURE</span>
      </div>

      <div className={styles.pipeline}>
        <span className={styles.signal} aria-hidden="true" />
        {stages.map((stage, index) => (
          <div className={styles.stage} key={stage.id} style={{ "--delay": `${index * 180}ms` } as CSSProperties}>
            <span className={styles.node} aria-hidden="true"><i /></span>
            <div>
              <small>0{index + 1}</small>
              <strong>{stage.title}</strong>
              <span>{stage.meta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.checks}>
        <span className={styles.checkLabel}>System checks</span>
        <div>{checks.map((check) => <span key={check}>{check}</span>)}</div>
      </div>

      <div className={styles.footer}>
        <span>Important pages should be discoverable, indexable and unambiguous.</span>
        <span className={styles.live}><i aria-hidden="true" /> VALIDATE AFTER RELEASE</span>
      </div>
    </div>
  );
}

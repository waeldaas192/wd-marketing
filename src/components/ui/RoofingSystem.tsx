"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./RoofingSystem.module.css";

const stages = [
  { label: "Experience", title: "Next.js 16", copy: "A clear experience on every screen.", details: ["App Router · React 19", "Responsive conversion UX", "Optimised image delivery"], icon: "M3 4h18v13H3z M8 21h8 M12 17v4" },
  { label: "Discovery", title: "47 routes", copy: "Built around what London customers search for.", details: ["Services · roof types", "London area pages", "Metadata · schema · canonicals"], icon: "M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14 M15 15l6 6" },
  { label: "Delivery", title: "Cloudflare", copy: "Fast delivery with continuity for existing links.", details: ["Worker and static assets", "84 legacy redirects", "Edge-first production runtime"], icon: "M6 18a4 4 0 0 1-1-8 7 7 0 0 1 13-1 4.5 4.5 0 0 1 0 9Z" },
  { label: "Enquiry", title: "D1 database", copy: "Protected enquiries, ready for the next step.", details: ["Prepared statements", "Rate limits · consent", "Idempotent submissions"], icon: "M4 5h16v14H4z M4 6l8 7 8-7" },
];

export function RoofingSystem() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <section ref={ref} className={styles.system} aria-labelledby="roofing-system-title" data-roofing-system data-running={visible && !paused}>
    <div className={styles.top}><p>WD / Connected platform</p><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>Pause animation <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button></div>
    <header className={styles.intro}><p className={styles.eyebrow}>MB Legacy Roofing</p><h2 id="roofing-system-title">A roofing platform built as<br className={styles.break}/> <span>one connected system.</span></h2><p>Fast pages, structured search coverage and protected enquiries at the edge.</p></header>
    <ol className={styles.stages}>{stages.map((stage, index) => <li key={stage.label} className={styles.stage} style={{ "--step": index } as CSSProperties}>
      <div className={styles.card}>
        <div className={styles.icon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={stage.icon}/></svg></div>
        <p className={styles.label}>0{index + 1} / {stage.label}</p><h3>{stage.title}</h3><p className={styles.copy}>{stage.copy}</p><ul>{stage.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
      </div>
      {index < stages.length - 1 && <span className={styles.connection} aria-hidden="true"><i/></span>}
    </li>)}</ol>
    <footer className={styles.safeguards}><p>Migration safeguards</p><ul>{["Unique metadata", "Structured data", "Canonical URLs", "Legacy redirects", "Protected forms"].map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></footer>
    <p className={styles.caption}>A view of the implemented platform — animation illustrates the flow, not live activity.</p>
  </section>;
}

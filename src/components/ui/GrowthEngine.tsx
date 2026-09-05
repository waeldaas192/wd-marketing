"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { useMotionPreference } from "@/lib/motion-preferences";
import styles from "./GrowthEngine.module.css";

const stages = [
  { title: "Search", heading: "Be found for the right reason.", copy: "Connect technical SEO, useful content and local search to the problems your customers are trying to solve.", href: "/services/seo", link: "Explore organic growth", icon: "search" },
  { title: "Traffic", heading: "Bring intent, not just visits.", copy: "Connect relevant search and paid campaigns to a clear offer, so the next click has a reason to become an enquiry.", href: "/services/paid-acquisition", link: "Explore paid acquisition", icon: "traffic" },
  { title: "Experience", heading: "Make the next step feel obvious.", copy: "Fast pages, useful proof and clear calls to action help visitors understand your offer on every screen.", href: "/services/web-conversion", link: "Explore web and conversion", icon: "experience" },
  { title: "Enquiry", heading: "Turn interest into a conversation.", copy: "Remove unnecessary form friction and connect enquiries to a follow-up process that your team can actually use.", href: "/services/web-conversion", link: "Explore conversion design", icon: "enquiry" },
  { title: "Revenue", heading: "Measure what happens after the click.", copy: "Connect lead quality, CRM outcomes and acquisition costs before deciding where to invest next.", href: "/services/growth-infrastructure", link: "Explore growth infrastructure", icon: "revenue" },
] as const;

type IconName = (typeof stages)[number]["icon"];
function StageIcon({ name }: { name: IconName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {name === "search" && <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></>}
    {name === "traffic" && <><path d="M4 19h16M6 15v-4m6 4V7m6 8V3"/></>}
    {name === "experience" && <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/></>}
    {name === "enquiry" && <><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 3V6a2 2 0 0 1 2-2Z"/><path d="M7 9h10M7 13h6"/></>}
    {name === "revenue" && <><path d="M3 17 9 11l4 3 8-10m-6 0h6v6"/><path d="M3 21h18"/></>}
  </svg>;
}

export function GrowthEngine() {
  const id = useId();
  const figure = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState(0);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const { enabled } = useMotionPreference();
  const stage = stages[selected];

  useEffect(() => {
    const element = figure.current;
    if (!element) return;
    // Only the decorative signal animates. Copy never auto-advances.
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(element);
    const visibility = () => setPageVisible(document.visibilityState === "visible");
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % stages.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + stages.length - 1) % stages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = stages.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    buttons.current[next]?.focus();
  }

  return <figure ref={figure} className={styles.engine} aria-label="WD growth system overview" data-growth-engine data-animate={enabled && inView && pageVisible ? "on" : "off"}>
    <div className={styles.top}><strong>WD / Growth system</strong><span>Explore the journey</span></div>
    <div className={styles.intro}><p>From being discovered<br/><span>to being chosen.</span></p></div>
    <ol className={styles.stages} aria-label="Customer journey stages">
      {stages.map((item, index) => <li key={item.title} className={styles.stage}>
        <button ref={element => { buttons.current[index] = element; }} type="button" id={`${id}-stage-${index}`} aria-pressed={selected === index} aria-controls={`${id}-detail`} className={styles.stageButton} onClick={() => setSelected(index)} onKeyDown={event => onKey(event, index)}>
          <span className={styles.number}><StageIcon name={item.icon}/></span><span className={styles.stageTitle}>{item.title}</span>
        </button>
      </li>)}
    </ol>
    <div className={styles.detail} id={`${id}-detail`} role="region" aria-labelledby={`${id}-stage-${selected}`} aria-live="polite" aria-atomic="true">
      <p className={styles.detailHeading}>{stage.heading}</p><p className={styles.detailCopy}>{stage.copy}</p>
      <Link href={stage.href} className={styles.detailLink}>{stage.link} <span aria-hidden="true">→</span></Link>
    </div>
    <figcaption className={styles.caption}>A connected customer journey — not a live analytics report or a promise of results.</figcaption>
  </figure>;
}

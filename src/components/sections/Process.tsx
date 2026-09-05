"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process.module.css";

const steps = [
  ["01", "Discover", "Understand the commercial problem, market, customer and evidence."],
  ["02", "Strategy", "Choose the channels and positioning with the highest expected leverage."],
  ["03", "Build", "Create the experience, tracking and acquisition infrastructure."],
  ["04", "Acquire", "Capture high-intent demand across organic and paid channels."],
  ["05", "Measure", "Connect behaviour, leads and revenue to decision-making."],
  ["06", "Scale", "Double down on what compounds and remove what does not."],
] as const;

export function Process() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const items = Array.from(section.querySelectorAll<HTMLElement>("[data-step]"));
      if (!items.length) return;
      const target = window.innerHeight * 0.48;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;
      items.forEach((item, index) => {
        const d = Math.abs(item.getBoundingClientRect().top + item.offsetHeight / 2 - target);
        if (d < distance) { distance = d; closest = index; }
      });
      setActive(closest);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const progress = `${((active + 1) / steps.length) * 100}%`;

  return (
    <section id="process" ref={sectionRef} className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.sticky}>
          <p className={styles.kicker}>Our operating system</p>
          <h2 className={styles.title}>Traffic isn&apos;t the goal. <span>Growth is.</span></h2>
          <p className={styles.desc}>
            Each stage answers one commercial question, so strategy, experience and acquisition move as one system instead of six disconnected tasks.
          </p>
          <div className={styles.progress} style={{ "--progress": progress } as React.CSSProperties}><span className={styles.bar} /></div>
          <div className={styles.counter}><span>0{active + 1}</span><span>06</span></div>
        </div>

        <div className={styles.steps}>
          {steps.map(([number, title, copy], index) => (
            <article key={number} data-step className={`${styles.step} ${index === active ? styles.active : ""}`}>
              <span className={styles.number}>{number}</span>
              <strong className={styles.name}>{title}</strong>
              <p className={styles.copy}>{copy}</p>
              <span className={styles.badge} aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

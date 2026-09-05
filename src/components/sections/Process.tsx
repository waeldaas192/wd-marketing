"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./Process.module.css";
const steps = [
  ["01","Discover","Understand the commercial problem, market, customer and evidence."],
  ["02","Strategy","Choose the channels and positioning with the highest expected leverage."],
  ["03","Build","Create the experience, tracking and acquisition infrastructure."],
  ["04","Acquire","Capture high-intent demand across organic and paid channels."],
  ["05","Measure","Connect behaviour, leads and revenue to decision-making."],
  ["06","Scale","Double down on what compounds and remove what does not."],
];
export function Process() {
  const [active,setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = Array.from(section.querySelectorAll<HTMLElement>("[data-step]"));
    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const target = window.innerHeight * .48;
      let next = 0, distance = Infinity;
      items.forEach((item,index) => { const r = item.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - target); if (d < distance) { next = index; distance = d; } });
      setActive(current => current === next ? current : next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    schedule(); window.addEventListener("scroll", schedule, {passive:true}); window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);
  return <section ref={sectionRef} id="process" className={styles.section} aria-labelledby="process-heading"><div className={`container ${styles.inner}`}>
    <div className={styles.sticky}><p className={styles.kicker}>Our operating system</p><h2 id="process-heading" className={styles.title}>Traffic isn&apos;t the goal. <span>Growth is.</span></h2><p className={styles.desc}>Each stage answers one commercial question, so strategy, experience and acquisition move as one system instead of six disconnected tasks.</p><div aria-hidden="true" className={styles.progress} style={{"--progress":`${(active+1)/steps.length*100}%`} as CSSProperties}><span className={styles.bar}/></div><div className={styles.counter} aria-hidden="true"><span>0{active+1}</span><span>06</span></div></div>
    <div className={styles.steps}>{steps.map(([number,title,copy],index) => <article key={number} data-step className={`${styles.step} ${active === index ? styles.active : ""}`}><span className={styles.number}>{number}</span><h3 className={styles.name}>{title}</h3><p className={styles.copy}>{copy}</p><span className={styles.badge} aria-hidden="true">↗</span></article>)}</div>
  </div></section>;
}

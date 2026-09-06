"use client";
import { useEffect, useRef, useState } from "react";
import { HeroRippleGrid } from "./HeroRippleGrid";
import styles from "./HeroAtmosphere.module.css";
import { useMotionPreference } from "@/lib/motion-preferences";

export function HeroAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [awake, setAwake] = useState(true);
  const { enabled } = useMotionPreference();
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    const change = () => setAwake(!document.hidden);
    change(); document.addEventListener("visibilitychange", change);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", change); };
  }, []);
  return <div ref={ref} className={`site-squares ${styles.atmosphere}`} aria-hidden="true" data-hero-atmosphere data-animate={enabled && visible && awake ? "on" : "off"}>
    <div className={styles.wash}/><div className={styles.grid}/>
    <HeroRippleGrid enabled={enabled && visible && awake}/>
    <div className={styles.tiles}>{[0,1,2,3,4,5].map(index => <i key={index}/>)}</div>
  </div>;
}

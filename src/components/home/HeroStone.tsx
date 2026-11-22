"use client";
import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "@/lib/motion-preferences";
import styles from "./Home.module.css";

/* Polished black stone with brand-coloured veins. Decorative only: the hero copy never depends on it.
   The veins draw once on load; a soft "reflection" follows the pointer on fine-pointer devices. */
export function HeroStone({ variant = "hero" }: { variant?: "hero" | "cta" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const { enabled } = useMotionPreference();
  const live = enabled && visible;

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = ref.current;
    const host = element?.parentElement;
    if (!element || !host || variant !== "hero" || !live || !matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = host.getBoundingClientRect();
        element.style.setProperty("--light-x", `${Math.round(event.clientX - box.left)}px`);
        element.style.setProperty("--light-y", `${Math.round(event.clientY - box.top)}px`);
      });
    };
    host.addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(frame); host.removeEventListener("pointermove", move); };
  }, [live, variant]);

  const id = variant === "hero" ? "wd-stone-hero" : "wd-stone-cta";
  return <div ref={ref} className={styles.stone} aria-hidden="true" data-hero-stone={variant} data-animate={live ? "on" : "off"}>
    <svg viewBox="0 0 1440 860" preserveAspectRatio="xMidYMid slice" focusable="false">
      <defs>
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.005 0.011" numOctaves="5" seed={variant === "hero" ? 7 : 3} result="noise"/>
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.11  0 0 0 0 0.10  0 0 0 0 0.13  0 0 0 1.05 -0.42"/>
        </filter>
        <linearGradient id={`${id}-vein`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF3D9A"/>
          <stop offset=".55" stopColor="#C02A8C"/>
          <stop offset="1" stopColor="#7B3FE4"/>
        </linearGradient>
        <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="1440" height="860" fill="#131016"/>
      <rect width="1440" height="860" filter={`url(#${id}-grain)`}/>
      {variant === "hero" ? <g fill="none" strokeLinecap="round" className={styles.veins}>
        <path data-vein d="M-40 690 C 220 610, 360 700, 560 560 S 900 420, 1080 470 S 1360 300, 1500 250" stroke={`url(#${id}-vein)`} strokeWidth="2.4" filter={`url(#${id}-glow)`}/>
        <path data-vein d="M560 560 C 640 640, 700 760, 860 900" stroke={`url(#${id}-vein)`} strokeWidth="1.2" opacity=".8" filter={`url(#${id}-glow)`}/>
        <path data-vein d="M1080 470 C 1150 560, 1240 590, 1500 640" stroke={`url(#${id}-vein)`} strokeWidth="1.4" opacity=".7" filter={`url(#${id}-glow)`}/>
        <path data-vein d="M780 -40 C 820 120, 930 210, 1040 300 S 1120 420, 1080 470" stroke="#F3E9FF" strokeWidth=".8" opacity=".35"/>
        <path data-vein d="M-40 260 C 120 300, 260 250, 380 330 S 520 470, 560 560" stroke="#F3E9FF" strokeWidth=".7" opacity=".22"/>
      </g> : <g fill="none" strokeLinecap="round" className={styles.veins}>
        <path data-vein d="M-40 760 C 300 640, 520 800, 820 560 S 1240 260, 1500 200" stroke={`url(#${id}-vein)`} strokeWidth="2" filter={`url(#${id}-glow)`} opacity=".85"/>
        <path data-vein d="M820 560 C 900 660, 1000 760, 1160 900" stroke="#F3E9FF" strokeWidth=".8" opacity=".3"/>
      </g>}
    </svg>
    {variant === "hero" && <div className={styles.reflection}/>}
  </div>;
}

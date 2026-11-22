"use client";
import { useEffect, useRef } from "react";
import { useMotionPreference } from "@/lib/motion-preferences";
import styles from "./Home.module.css";

/* Polished black stone with brand-coloured veins. Decorative only: the hero copy never depends on it.
   Performance: the stone grain is a pre-rendered 12 kB WebP (no live SVG filters), the veins are plain
   strokes drawn once, and the pointer "reflection" moves with a compositor-only transform. */
export function HeroStone({ variant = "hero" }: { variant?: "hero" | "cta" }) {
  const ref = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const { enabled } = useMotionPreference();

  useEffect(() => {
    const element = ref.current;
    const light = lightRef.current;
    const host = element?.parentElement;
    if (!element || !light || !host || variant !== "hero" || !enabled || !matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => { frame = 0; light.style.transform = `translate3d(${x}px, ${y}px, 0)`; };
    const move = (event: PointerEvent) => {
      const box = host.getBoundingClientRect();
      x = event.clientX - box.left;
      y = event.clientY - box.top;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const enter = () => light.setAttribute("data-on", "true");
    const leave = () => light.removeAttribute("data-on");
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
    };
  }, [enabled, variant]);

  const id = `wd-vein-${variant}`;
  return <div ref={ref} className={styles.stone} aria-hidden="true" data-hero-stone={variant}>
    <svg viewBox="0 0 1440 860" preserveAspectRatio="xMidYMid slice" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF3D9A"/>
          <stop offset=".55" stopColor="#C02A8C"/>
          <stop offset="1" stopColor="#7B3FE4"/>
        </linearGradient>
      </defs>
      {variant === "hero" ? <g fill="none" strokeLinecap="round" className={styles.veins}>
        <path data-vein className={styles.halo} d="M-40 690 C 220 610, 360 700, 560 560 S 900 420, 1080 470 S 1360 300, 1500 250" stroke={`url(#${id})`} strokeWidth="9"/>
        <path data-vein d="M-40 690 C 220 610, 360 700, 560 560 S 900 420, 1080 470 S 1360 300, 1500 250" stroke={`url(#${id})`} strokeWidth="2.4"/>
        <path data-vein d="M560 560 C 640 640, 700 760, 860 900" stroke={`url(#${id})`} strokeWidth="1.2" opacity=".8"/>
        <path data-vein d="M1080 470 C 1150 560, 1240 590, 1500 640" stroke={`url(#${id})`} strokeWidth="1.4" opacity=".7"/>
        <path data-vein d="M780 -40 C 820 120, 930 210, 1040 300 S 1120 420, 1080 470" stroke="#F3E9FF" strokeWidth=".8" opacity=".35"/>
        <path data-vein d="M-40 260 C 120 300, 260 250, 380 330 S 520 470, 560 560" stroke="#F3E9FF" strokeWidth=".7" opacity=".22"/>
      </g> : <g fill="none" strokeLinecap="round">
        <path className={styles.halo} d="M-40 760 C 300 640, 520 800, 820 560 S 1240 260, 1500 200" stroke={`url(#${id})`} strokeWidth="8"/>
        <path d="M-40 760 C 300 640, 520 800, 820 560 S 1240 260, 1500 200" stroke={`url(#${id})`} strokeWidth="2" opacity=".85"/>
        <path d="M820 560 C 900 660, 1000 760, 1160 900" stroke="#F3E9FF" strokeWidth=".8" opacity=".3"/>
      </g>}
    </svg>
    {variant === "hero" && <div ref={lightRef} className={styles.reflection}/>}
  </div>;
}

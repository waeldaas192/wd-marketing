import Image from "next/image";
import { assets } from "@/data/assets";
import styles from "./FounderPortrait.module.css";
export function FounderPortrait() {
  if (assets.founder.portraitsReady) return <figure className={`${styles.frame} ${styles.photo}`}><Image src={assets.founder.portrait.src} alt={assets.founder.portrait.alt} fill sizes="(max-width: 640px) calc(100vw - 40px), 400px" className={styles.image}/><figcaption className={styles.caption}>Wael · Founder, WD Marketing</figcaption></figure>;
  return <div className={`${styles.frame} ${styles.identity}`}><p className={styles.label}>Founder-led · London</p><span className={styles.monogram} aria-hidden="true">WD</span><div><p className={styles.name}>Wael</p><p className={styles.role}>Founder & Digital Growth Strategist</p><p className={styles.note}>Strategy, development and marketing — connected around the same business goal.</p></div></div>;
}

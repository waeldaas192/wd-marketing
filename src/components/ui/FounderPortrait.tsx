import { assets } from "@/data/assets";
import { resolveMedia } from "@/lib/media";
import { MediaFrame } from "./MediaFrame";
import styles from "./FounderPortrait.module.css";
export function FounderPortrait({ wide = false }: { wide?: boolean }) {
  const asset = resolveMedia(wide ? assets.founder.portraitWide : assets.founder.portrait);
  if (asset.ready) return <figure className={`${styles.frame} ${wide ? "" : styles.photo}`}><MediaFrame asset={asset} label="Wael · WD Marketing" sizes="(max-width: 640px) calc(100vw - 40px), 500px"/><figcaption className={styles.caption}>Wael · Founder, WD Marketing</figcaption></figure>;
  return <div className={`${styles.frame} ${styles.identity}`}><p className={styles.label}>Founder-led · London</p><span className={styles.monogram} aria-hidden="true">WD</span><div><p className={styles.name}>Wael</p><p className={styles.role}>Founder & Digital Growth Strategist</p><p className={styles.note}>Strategy, development and marketing — connected around the same business goal.</p></div></div>;
}

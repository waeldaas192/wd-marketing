import { FounderPortrait } from "@/components/ui/FounderPortrait";
import styles from "./Founder.module.css";
const principles = [
  ["01","Strategy first","Choose the commercial problem before choosing the channel."],
  ["02","Execution connected","Web, search, paid and measurement designed as one operating system."],
  ["03","Evidence over theatre","Decisions anchored in behaviour, leads and revenue — not vanity metrics."],
];
export function Founder() {
  return <section id="about" className={styles.section} aria-labelledby="founder-heading"><div className="container">
    <div className={styles.frame}><FounderPortrait/><div className={styles.copy} data-reveal="copy">
      <p className={styles.eyebrow}>Founder / Digital Growth Strategist</p>
      <h2 id="founder-heading" className={styles.title}>Built around the work. <span>Not the theatre around it.</span></h2>
      <p className={styles.body}>WD Marketing is led by Wael, bringing web development, search, paid acquisition and conversion thinking together around one commercial objective: turning digital attention into measurable opportunity.</p>
      <div className={styles.identity}><strong>Wael · Founder, WD Marketing</strong><span>London · United Kingdom</span></div>
    </div></div>
    <div className={styles.principles}>{principles.map(([number,title,copy]) => <article key={number} className={styles.principle}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
  </div></section>;
}

import Image from "next/image";
import { assets } from "@/data/assets";
import styles from "./Founder.module.css";

const principles = [
  ["01", "Strategy first", "Choose the commercial problem before choosing the channel."],
  ["02", "Execution connected", "Web, search, paid and measurement designed as one operating system."],
  ["03", "Evidence over theatre", "Decisions anchored in behaviour, leads and revenue — not vanity metrics."],
];

export function Founder() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.frame}>
        <div className={styles.visual}>
          <Image
            src={assets.founder.portrait.src}
            alt={assets.founder.portrait.alt}
            fill
            sizes="(max-width: 980px) 100vw, 48vw"
            priority={false}
          />
          <div className={styles.note}>Founder-led. Strategy and execution stay in the same room.</div>
        </div>

        <div className={styles.copy}>
          <div className={styles.eyebrow}>FOUNDER / DIGITAL GROWTH STRATEGIST</div>
          <h2 className={styles.title}>
            Built around the work. <span>Not the theatre around it.</span>
          </h2>
          <p className={styles.body}>
            WD Marketing is led by Wael, bringing web development, search, paid acquisition and conversion thinking together around one commercial objective: turning digital attention into measurable opportunity.
          </p>

          <div className={styles.identity}>
            <strong>Wael · Founder, WD Marketing</strong>
            <span>London · United Kingdom</span>
          </div>

          <div className={styles.principles}>
            {principles.map(([number, title, copy]) => (
              <div className={styles.principle} key={number}>
                <small>{number}</small>
                <strong>{title}</strong>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

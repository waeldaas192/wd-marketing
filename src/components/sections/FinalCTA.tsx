import Link from "next/link";
import styles from "./FinalCTA.module.css";
export function FinalCTA() {
  return <section id="contact" className={styles.section}><div className="container"><div className={styles.panel}>
    <div className={styles.glow} aria-hidden="true"/>
    <div className={styles.inner} data-reveal="copy">
      <div className={styles.kicker}><strong>READY TO GROW?</strong><span>LONDON · UK · REMOTE</span></div>
      <h2 className={styles.title}>Build the system.<span>Then make it perform.</span></h2>
      <div className={styles.bottom}><p className={styles.copy}>If the problem is growth, conversion, search visibility or acquisition efficiency, start with the system — not another disconnected tactic.</p><div className={styles.actions}><Link href="/contact" className={styles.primary}>Start a project <span aria-hidden="true">↗</span></Link><a href="mailto:hello@wdmarketing.co.uk" className={styles.secondary}>Email WD <span aria-hidden="true">↗</span></a></div></div>
    </div>
  </div></div></section>;
}

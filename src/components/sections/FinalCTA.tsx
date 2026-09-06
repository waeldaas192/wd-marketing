import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Icons";
import { Sculpture } from "@/components/ui/Sculpture";
import styles from "./FinalCTA.module.css";

export function FinalCTA() {
  return <section id="contact" className={styles.section} data-studio-section="contact">
    <div className="container"><div className={styles.panel} data-studio-cta-panel>
      <div data-studio-cta-scene aria-hidden="true"><Sculpture kind="plane"/><span data-studio-cta-orb="cyan"/><span data-studio-cta-orb="peach"/></div>
      <div className={styles.inner} data-studio-cta-copy data-reveal="copy">
        <div className={styles.kicker}><strong>READY TO GROW?</strong><span>LONDON · UK · REMOTE</span></div>
        <h2 className={styles.title}>Build the system.<span>Then make it perform.</span></h2>
        <div className={styles.bottom}>
          <p className={styles.copy}>If the problem is growth, conversion, search visibility or acquisition efficiency, start with the system — not another disconnected tactic.</p>
          <div className={styles.actions}><Link href="/contact" className={styles.primary}>Start a project <ArrowIcon/></Link><a href="mailto:hello@wdmarketing.co.uk" className={styles.secondary}>Email WD <ArrowIcon/></a></div>
        </div>
      </div>
    </div></div>
  </section>;
}

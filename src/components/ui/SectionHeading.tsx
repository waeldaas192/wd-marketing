import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type Props = { id: string; kicker: string; title: ReactNode; intro?: string };
export function SectionHeading({ id, kicker, title, intro }: Props) {
  return <header className={styles.header}>
    <p className={styles.kicker}>{kicker}</p>
    <div className={styles.row}>
      <h2 id={id} className={styles.title}>{title}</h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </div>
  </header>;
}

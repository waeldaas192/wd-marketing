import styles from "./GrowthEngine.module.css";
const stages = ["Search", "Traffic", "Experience", "Enquiry", "Revenue"];
export function GrowthEngine() {
  return <figure className={styles.engine} aria-label="WD growth system overview">
    <div className={styles.top}><strong>WD / Growth system</strong><span>How the pieces connect</span></div>
    <div className={styles.intro}><p>From being discovered<br/><span>to being chosen.</span></p></div>
    <ol className={styles.stages}>{stages.map((stage,index) => <li key={stage} className={styles.stage}><span className={styles.number} aria-hidden="true">0{index+1}</span><strong>{stage}</strong></li>)}</ol>
    <figcaption className={styles.caption}>A connected customer journey — not a live analytics report or a promise of results.</figcaption>
  </figure>;
}

import styles from "./Proof.module.css";

const principles = [
  ["01", "Strategy before channels", "We choose the commercial route before the marketing tactic."],
  ["02", "Measurement before scale", "Every meaningful action is designed to be attributable."],
  ["03", "Conversion over vanity", "Traffic only matters when it creates business opportunity."],
];

export function Proof() {
  return (
    <section className={styles.section} aria-labelledby="proof-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.intro}>
          <p className={styles.kicker}>The standard</p>
          <h2 id="proof-heading" className={styles.title}>Marketing should operate like a system, not a collection of tasks.</h2>
        </div>
        <div className={styles.grid}>
          {principles.map(([number, title, copy]) => (
            <article key={number} className={styles.card}>
              <span className={styles.number}>{number}</span>
              <strong>{title}</strong>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

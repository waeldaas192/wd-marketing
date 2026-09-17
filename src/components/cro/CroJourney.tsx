import styles from "./CroJourney.module.css";

const stages = [
  { key: "visit", label: "Visit", detail: "Search, ads or referral" },
  { key: "intent", label: "Intent", detail: "A real reason to act" },
  { key: "friction", label: "Friction", detail: "Confusion, doubt or effort" },
  { key: "action", label: "Action", detail: "Call, form or message" },
  { key: "lead", label: "Qualified lead", detail: "Useful commercial enquiry" },
] as const;

export function CroJourney() {
  return (
    <div
      className={styles.shell}
      data-cro-journey
      role="img"
      aria-label="Conversion journey from website visit and customer intent through friction and action to a qualified lead"
    >
      <div className={styles.header} aria-hidden="true">
        <span>CONVERSION JOURNEY</span>
        <i /><i /><i />
      </div>
      <div className={styles.flow} aria-hidden="true">
        <span className={styles.rail} />
        {stages.map((stage, index) => (
          <div className={`${styles.stage} ${styles[stage.key]}`} key={stage.key}>
            <span className={styles.index}>0{index + 1}</span>
            <strong>{stage.label}</strong>
            <small>{stage.detail}</small>
            {stage.key === "friction" ? <em>Find the leak</em> : null}
          </div>
        ))}
        <span className={styles.pulse} />
      </div>
      <p>Traffic → intent → friction removed → action → qualified enquiry.</p>
    </div>
  );
}

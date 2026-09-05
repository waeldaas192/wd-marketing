import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Proof.module.css";
const principles = [
  ["01", "Strategy before channels", "We choose the commercial route before the marketing tactic."],
  ["02", "Measurement before scale", "We define the actions to measure before scaling activity."],
  ["03", "Conversion over vanity", "Traffic matters when it creates a real business opportunity."],
];
export function Proof() {
  return <section id="standard" className={styles.section} aria-labelledby="standard-heading"><div className="container">
    <SectionHeading id="standard-heading" kicker="The standard" title="Marketing should operate like a system, not a collection of tasks." />
    <div className={styles.grid}>{principles.map(([number,title,copy],index) => <article key={number} className={styles.card} data-reveal="copy" data-reveal-order={index}><span className={styles.number}>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
  </div></section>;
}

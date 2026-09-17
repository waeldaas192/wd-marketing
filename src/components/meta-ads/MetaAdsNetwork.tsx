import Image from "next/image";
import styles from "./MetaAdsNetwork.module.css";

type NetworkNode = {
  className: string;
  mark: string;
  label: string;
  detail: string;
};

const nodes: NetworkNode[] = [
  { className: styles.meta, mark: "∞", label: "Meta Ads", detail: "Campaign engine" },
  { className: styles.facebook, mark: "f", label: "Facebook", detail: "Lead generation" },
  { className: styles.instagram, mark: "◎", label: "Instagram", detail: "Creative discovery" },
  { className: styles.highLevel, mark: "HL", label: "HighLevel", detail: "CRM & automation" },
  { className: styles.leads, mark: "+", label: "New leads", detail: "Forms & enquiries" },
  { className: styles.calls, mark: "☎", label: "Calls", detail: "Sales conversations" },
  { className: styles.messages, mark: "✉", label: "Messages", detail: "WhatsApp · SMS · email" },
  { className: styles.pipeline, mark: "↳", label: "Pipeline", detail: "Ownership & stages" },
  { className: styles.growth, mark: "↗", label: "Growth", detail: "Better decisions" },
];

export function MetaAdsNetwork() {
  return (
    <div className={styles.shell} role="img" aria-label="WD Marketing connecting Meta Ads, Facebook, Instagram, HighLevel CRM, leads, calls, messages, sales pipeline and growth">
      <div className={styles.topline} aria-hidden="true"><span>CONNECTED ACQUISITION SYSTEM</span><i /><i /><i /></div>
      <div className={styles.network}>
        <svg className={styles.connections} viewBox="0 0 800 520" preserveAspectRatio="none" aria-hidden="true">
          <g className={styles.paths}>
            <path d="M400 260 L105 85" />
            <path d="M400 260 L330 50" />
            <path d="M400 260 L610 82" />
            <path d="M400 260 L690 225" />
            <path d="M400 260 L645 390" />
            <path d="M400 260 L410 468" />
            <path d="M400 260 L170 430" />
            <path d="M400 260 L72 315" />
            <path d="M400 260 L100 190" />
          </g>
          <g className={styles.pulses}>
            <circle r="5"><animateMotion dur="3.6s" repeatCount="indefinite" path="M105 85 L400 260" /></circle>
            <circle r="5"><animateMotion dur="4.1s" begin=".8s" repeatCount="indefinite" path="M330 50 L400 260" /></circle>
            <circle r="5"><animateMotion dur="3.8s" begin="1.4s" repeatCount="indefinite" path="M610 82 L400 260" /></circle>
            <circle r="5"><animateMotion dur="3.4s" begin=".35s" repeatCount="indefinite" path="M400 260 L690 225" /></circle>
            <circle r="5"><animateMotion dur="4s" begin="1.1s" repeatCount="indefinite" path="M400 260 L645 390" /></circle>
            <circle r="5"><animateMotion dur="4.3s" begin="1.8s" repeatCount="indefinite" path="M400 260 L410 468" /></circle>
          </g>
        </svg>

        <div className={styles.center} aria-hidden="true">
          <span className={styles.logoWrap}><Image src="/images/brand/icons/wd-icon-v2-512.png" alt="" width={72} height={72} /></span>
          <strong>WD Marketing</strong>
          <small>Acquisition system</small>
        </div>

        {nodes.map((node) => (
          <div className={`${styles.node} ${node.className}`} key={node.label} aria-hidden="true">
            <span className={styles.mark}>{node.mark}</span>
            <div><strong>{node.label}</strong><small>{node.detail}</small></div>
          </div>
        ))}
      </div>
      <p className={styles.caption}>Meta attention → lead capture → CRM ownership → follow-up → commercial visibility.</p>
    </div>
  );
}

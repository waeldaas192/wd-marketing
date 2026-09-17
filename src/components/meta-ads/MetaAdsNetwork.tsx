import Image from "next/image";
import styles from "./MetaAdsNetwork.module.css";

type IconName = "meta" | "facebook" | "instagram" | "highLevel" | "leads" | "calls" | "messages" | "pipeline" | "growth";
type NetworkNode = { className: string; icon: IconName; label: string; detail: string };

function MetaMark() {
  return <svg viewBox="0 0 36 24" role="presentation" focusable="false"><path d="M4 17.5c2.9-8.2 5.4-12 8.2-12 3.5 0 5.8 7 8.5 11.2 2.1 3.2 3.9 4.8 6.2 4.8 3.2 0 5.1-3.3 5.1-8 0-5.5-2.8-10-6.9-10-4.7 0-7.7 5.6-10.7 11.1C12 18.9 10.3 21.5 8 21.5c-2.5 0-4-1.8-4-4Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function FacebookMark() {
  return <svg viewBox="0 0 24 24" role="presentation" focusable="false"><path d="M14.2 21v-8h2.8l.42-3.1H14.2V7.92c0-.9.25-1.52 1.58-1.52h1.69V3.63c-.29-.04-1.29-.13-2.45-.13-2.42 0-4.08 1.48-4.08 4.2v2.2H8.2V13h2.74v8h3.26Z" fill="currentColor"/></svg>;
}
function InstagramMark() {
  return <svg viewBox="0 0 24 24" role="presentation" focusable="false"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.3" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.4" cy="6.8" r="1.15" fill="currentColor"/></svg>;
}
function HighLevelMark() {
  return <svg viewBox="0 0 46 34" role="presentation" focusable="false" aria-label="HighLevel"><g><path d="M1 12 8 5l7 7h-4v19H5V12H1Z" fill="#FFD000"/><path d="M15.5 19 23 11.5 30.5 19h-4.2v12h-6.6V19h-4.2Z" fill="#2896FB"/><path d="M30 12 37 5l8 7h-4.3v19h-7V12H30Z" fill="#17D94B"/></g></svg>;
}
function LeadMark() {
  return <svg viewBox="0 0 24 24" role="presentation" focusable="false"><path d="M8.8 11.2a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Zm-5.3 8.2c.3-3.3 2.1-5.3 5.3-5.3s5.1 2 5.4 5.3M18.5 8.5v7m-3.5-3.5h7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}
function CallMark() {
  return <svg viewBox="0 0 24 24" role="presentation" focusable="false"><path d="M5.2 3.8 8.5 3l2 4.7-2.1 1.4c1.1 2.5 3 4.4 5.5 5.5l1.4-2.1 4.7 2-.8 3.3c-.4 1.5-1.8 2.5-3.4 2.2C9.5 19 5 14.5 3.9 8.2c-.3-1.6.8-3 1.3-4.4Z" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function MessageMark() {
  return <svg viewBox="0 0 24 24" role="presentation" focusable="false"><path d="M4 5.5h16v11H9l-5 3v-14Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m6.8 8 5.2 4 5.2-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function PipelineMark() {
  return <svg viewBox="0 0 24 24" role="presentation" focusable="false"><path d="M5 5h6v5H5zM13 14h6v5h-6zM8 10v3.5c0 1.4 1.1 2.5 2.5 2.5H13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><circle cx="16" cy="6.8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M18.2 8.6 20 10.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
}
function GrowthMark() {
  return <svg viewBox="0 0 24 24" role="presentation" focusable="false"><path d="M4 18V7m0 11h16M7 15l4-4 3 2 5-6m-4 0h4v4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function NodeIcon({ name }: { name: IconName }) {
  if (name === "meta") return <MetaMark />;
  if (name === "facebook") return <FacebookMark />;
  if (name === "instagram") return <InstagramMark />;
  if (name === "highLevel") return <HighLevelMark />;
  if (name === "leads") return <LeadMark />;
  if (name === "calls") return <CallMark />;
  if (name === "messages") return <MessageMark />;
  if (name === "pipeline") return <PipelineMark />;
  return <GrowthMark />;
}

const nodes: NetworkNode[] = [
  { className: styles.meta, icon: "meta", label: "Meta Ads", detail: "Campaign engine" },
  { className: styles.facebook, icon: "facebook", label: "Facebook", detail: "Lead generation" },
  { className: styles.instagram, icon: "instagram", label: "Instagram", detail: "Creative discovery" },
  { className: styles.highLevel, icon: "highLevel", label: "HighLevel", detail: "CRM & automation" },
  { className: styles.leads, icon: "leads", label: "New leads", detail: "Forms & enquiries" },
  { className: styles.calls, icon: "calls", label: "Calls", detail: "Sales conversations" },
  { className: styles.messages, icon: "messages", label: "Messages", detail: "WhatsApp · SMS · email" },
  { className: styles.pipeline, icon: "pipeline", label: "Pipeline", detail: "Ownership & stages" },
  { className: styles.growth, icon: "growth", label: "Growth", detail: "Better decisions" },
];

export function MetaAdsNetwork() {
  return <div className={styles.shell} role="img" aria-label="WD Marketing connecting Meta Ads, Facebook, Instagram, HighLevel CRM, leads, calls, messages, sales pipeline and growth">
    <div className={styles.topline} aria-hidden="true"><span>CONNECTED ACQUISITION SYSTEM</span><i /><i /><i /></div>
    <div className={styles.network}>
      <svg className={styles.connections} viewBox="0 0 800 520" preserveAspectRatio="none" aria-hidden="true">
        <g className={styles.paths}><path d="M400 260 L105 85"/><path d="M400 260 L330 50"/><path d="M400 260 L610 82"/><path d="M400 260 L690 225"/><path d="M400 260 L645 390"/><path d="M400 260 L410 468"/><path d="M400 260 L170 430"/><path d="M400 260 L72 315"/><path d="M400 260 L100 190"/></g>
        <g className={styles.pulses}><circle r="5"><animateMotion dur="3.6s" repeatCount="indefinite" path="M105 85 L400 260"/></circle><circle r="5"><animateMotion dur="4.1s" begin=".8s" repeatCount="indefinite" path="M330 50 L400 260"/></circle><circle r="5"><animateMotion dur="3.8s" begin="1.4s" repeatCount="indefinite" path="M610 82 L400 260"/></circle><circle r="5"><animateMotion dur="3.4s" begin=".35s" repeatCount="indefinite" path="M400 260 L690 225"/></circle><circle r="5"><animateMotion dur="4s" begin="1.1s" repeatCount="indefinite" path="M400 260 L645 390"/></circle><circle r="5"><animateMotion dur="4.3s" begin="1.8s" repeatCount="indefinite" path="M400 260 L410 468"/></circle></g>
      </svg>
      <div className={styles.center} aria-hidden="true"><span className={styles.logoWrap}><Image src="/images/brand/wd-marketing-logo.svg" alt="WD Marketing" width={210} height={45}/></span><small>Connected acquisition system</small></div>
      {nodes.map(node=><div className={`${styles.node} ${node.className}`} key={node.label} aria-hidden="true"><span className={styles.mark}><NodeIcon name={node.icon}/></span><div><strong>{node.label}</strong><small>{node.detail}</small></div></div>)}
    </div>
    <p className={styles.caption}>Meta attention → lead capture → CRM ownership → follow-up → commercial visibility.</p>
  </div>;
}
import styles from "./MetaAdsNetwork.module.css";

type BrandIconName = "meta" | "facebook" | "instagram" | "highlevel";
type SystemIconName = "leads" | "calls" | "messages" | "pipeline" | "growth";
type NetworkNode = {
  className: string;
  icon: BrandIconName | SystemIconName;
  brand?: boolean;
  label: string;
  detail: string;
};

const META_PATH = "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z";
const FACEBOOK_PATH = "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z";
const INSTAGRAM_PATH = "M7.03.084c-1.277.06-2.149.264-2.911.563-.789.308-1.458.72-2.123 1.388C1.33 2.703.92 3.372.615 4.162.32 4.926.12 5.799.063 7.076.007 8.354-.006 8.765.001 12.023c.006 3.259.02 3.667.082 4.948.061 1.276.264 2.148.564 2.91.308.789.72 1.457 1.388 2.123.668.665 1.337 1.074 2.129 1.38.763.295 1.636.496 2.913.552 1.277.056 1.688.069 4.946.063 3.258-.006 3.668-.021 4.948-.081 1.28-.061 2.147-.265 2.91-.564.789-.308 1.458-.72 2.123-1.388.665-.668 1.074-1.338 1.38-2.128.295-.763.496-1.636.552-2.912.056-1.281.069-1.69.063-4.948-.006-3.258-.021-3.667-.082-4.946-.061-1.28-.264-2.149-.563-2.912-.308-.789-.72-1.457-1.388-2.123C21.298 1.33 20.628.921 19.838.617 19.074.321 18.202.12 16.924.065 15.647.009 15.236-.005 11.977.001 8.718.008 8.31.022 7.03.084m.14 21.693c-1.17-.051-1.805-.245-2.229-.408-.56-.216-.96-.477-1.382-.895-.422-.418-.681-.819-.9-1.378-.164-.424-.362-1.058-.417-2.228-.06-1.265-.072-1.644-.079-4.848-.007-3.204.005-3.583.061-4.848.05-1.169.245-1.805.408-2.228.216-.561.476-.96.895-1.382.419-.422.818-.681 1.378-.9.423-.165 1.058-.361 2.227-.417 1.266-.06 1.645-.072 4.848-.079 3.203-.007 3.584.005 4.85.061 1.169.051 1.805.244 2.228.408.561.216.96.475 1.382.895.422.419.682.818.901 1.379.165.422.362 1.056.417 2.226.06 1.266.074 1.645.08 4.848.006 3.203-.006 3.583-.061 4.848-.051 1.17-.245 1.806-.408 2.23-.216.56-.476.96-.895 1.381-.419.422-.818.681-1.378.9-.422.165-1.058.362-2.226.417-1.266.06-1.645.072-4.85.079-3.204.007-3.582-.006-4.848-.061M16.953 5.586A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.442M5.839 12.012c.007 3.403 2.77 6.156 6.173 6.15 3.403-.007 6.157-2.77 6.15-6.174-.006-3.403-2.77-6.156-6.174-6.15-3.403.007-6.156 2.771-6.149 6.174M8 12.008a4 4 0 1 1 4.008 3.992A4 4 0 0 1 8 12.008";

const nodes: NetworkNode[] = [
  { className: styles.meta, icon: "meta", brand: true, label: "Meta Ads", detail: "Campaign engine" },
  { className: styles.facebook, icon: "facebook", brand: true, label: "Facebook", detail: "Lead generation" },
  { className: styles.instagram, icon: "instagram", brand: true, label: "Instagram", detail: "Creative discovery" },
  { className: styles.highLevel, icon: "highlevel", brand: true, label: "HighLevel", detail: "CRM & automation" },
  { className: styles.leads, icon: "leads", label: "New leads", detail: "Forms & enquiries" },
  { className: styles.calls, icon: "calls", label: "Calls", detail: "Sales conversations" },
  { className: styles.messages, icon: "messages", label: "Messages", detail: "WhatsApp · SMS · email" },
  { className: styles.pipeline, icon: "pipeline", label: "Pipeline", detail: "Ownership & stages" },
  { className: styles.growth, icon: "growth", label: "Growth", detail: "Better decisions" },
];

function BrandIcon({ name }: { name: BrandIconName }) {
  if (name === "meta") return <svg data-meta-brand-icon="meta" className={styles.brandSvg} viewBox="0 0 24 24" aria-hidden="true"><path d={META_PATH} /></svg>;
  if (name === "facebook") return <svg data-meta-brand-icon="facebook" className={styles.brandSvg} viewBox="0 0 24 24" aria-hidden="true"><path d={FACEBOOK_PATH} /></svg>;
  if (name === "instagram") return <svg data-meta-brand-icon="instagram" className={styles.brandSvg} viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="instagram-brand" x1="2" x2="22" y1="22" y2="2" gradientUnits="userSpaceOnUse"><stop stopColor="#FEDA75"/><stop offset=".28" stopColor="#FA7E1E"/><stop offset=".52" stopColor="#D62976"/><stop offset=".75" stopColor="#962FBF"/><stop offset="1" stopColor="#4F5BD5"/></linearGradient></defs><path d={INSTAGRAM_PATH} fill="url(#instagram-brand)" /></svg>;
  return <svg data-meta-brand-icon="highlevel" className={`${styles.brandSvg} ${styles.highLevelSvg}`} viewBox="0 0 72 46" aria-hidden="true"><path fill="#FFD000" d="M2 17 13.5 3 25 17h-6v26H8V17H2Z"/><path fill="#2896FB" d="M24 25 35.5 11 47 25h-6v18H30V25h-6Z"/><path fill="#17D94B" d="M46 17 57.5 3 69 17h-6v26H52V17h-6Z"/><path fill="#07223D" opacity=".24" d="m8 17 11 10V17H8Zm22 8 11 10V25H30Zm22-8 11 10V17H52Z"/></svg>;
}

function SystemIcon({ name }: { name: SystemIconName }) {
  const common = { className: styles.systemSvg, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "leads") return <svg {...common}><path d="M15 19a6 6 0 0 0-12 0"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M16 11h6"/></svg>;
  if (name === "calls") return <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.45 19.45 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"/></svg>;
  if (name === "messages") return <svg {...common}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 9h8M8 13h5"/></svg>;
  if (name === "pipeline") return <svg {...common}><rect x="3" y="4" width="5" height="5" rx="1"/><rect x="16" y="15" width="5" height="5" rx="1"/><path d="M8 6.5h4a3 3 0 0 1 3 3v2a3 3 0 0 0 3 3h1"/><path d="M12 6.5v10.5"/></svg>;
  return <svg {...common}><path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/></svg>;
}

function WdMark() {
  return <svg className={styles.wdMark} viewBox="0 0 160 160" aria-hidden="true"><path d="M24 48h24l14 42 15-42h22L71 112H51L24 48Z"/><path d="M94 48h18c25 0 40 12 40 32s-15 32-40 32H94V48Zm18 46c12 0 18-5 18-14s-6-14-18-14h-1v28h1Z"/></svg>;
}

export function MetaAdsNetwork() {
  return (
    <div className={styles.shell} data-meta-network role="img" aria-label="WD Marketing connecting Meta Ads, Facebook, Instagram, HighLevel CRM, leads, calls, messages, sales pipeline and growth">
      <div className={styles.topline} aria-hidden="true"><span>CONNECTED ACQUISITION SYSTEM</span><i /><i /><i /></div>
      <div className={styles.network}>
        <svg className={styles.connections} viewBox="0 0 800 520" preserveAspectRatio="none" aria-hidden="true">
          <g className={styles.paths}><path d="M400 260 L105 85"/><path d="M400 260 L330 50"/><path d="M400 260 L610 82"/><path d="M400 260 L690 225"/><path d="M400 260 L645 390"/><path d="M400 260 L410 468"/><path d="M400 260 L170 430"/><path d="M400 260 L72 315"/><path d="M400 260 L100 190"/></g>
          <g className={styles.pulses}><circle r="5"><animateMotion dur="3.6s" repeatCount="indefinite" path="M105 85 L400 260"/></circle><circle r="5"><animateMotion dur="4.1s" begin=".8s" repeatCount="indefinite" path="M330 50 L400 260"/></circle><circle r="5"><animateMotion dur="3.8s" begin="1.4s" repeatCount="indefinite" path="M610 82 L400 260"/></circle><circle r="5"><animateMotion dur="3.4s" begin=".35s" repeatCount="indefinite" path="M400 260 L690 225"/></circle><circle r="5"><animateMotion dur="4s" begin="1.1s" repeatCount="indefinite" path="M400 260 L645 390"/></circle><circle r="5"><animateMotion dur="4.3s" begin="1.8s" repeatCount="indefinite" path="M400 260 L410 468"/></circle></g>
        </svg>

        <div className={styles.center} aria-hidden="true">
          <span className={styles.logoWrap}><WdMark /></span>
          <strong>WD Marketing</strong>
          <small>Acquisition system</small>
        </div>

        {nodes.map((node) => (
          <div className={`${styles.node} ${node.className}`} key={node.label} aria-hidden="true" data-node-kind={node.brand ? "brand" : "system"}>
            <span className={styles.mark}>{node.brand ? <BrandIcon name={node.icon as BrandIconName}/> : <SystemIcon name={node.icon as SystemIconName}/>}</span>
            <div><strong>{node.label}</strong><small>{node.detail}</small></div>
          </div>
        ))}
      </div>
      <p className={styles.caption}>Meta attention → lead capture → CRM ownership → follow-up → commercial visibility.</p>
    </div>
  );
}

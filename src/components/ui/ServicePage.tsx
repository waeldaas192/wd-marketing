import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Icons";
import styles from "./ServicePage.module.css";

export type ServiceTone = "web" | "paid" | "infrastructure";

export type ServicePageData = {
  tone: ServiceTone;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  primaryCta: string;
  outcomes: string[];
  problems: { title: string; copy: string }[];
  capabilities: { title: string; copy: string; deliverable: string }[];
  process: { title: string; copy: string }[];
  proof: { eyebrow: string; title: string; copy: string; points: string[] };
  faqs: { question: string; answer: string }[];
};

const connectedServices = [
  { tone: "web", label: "Web & Conversion", href: "/services/web-conversion" },
  { tone: "seo", label: "SEO & Organic Growth", href: "/services/seo" },
  { tone: "paid", label: "Paid Acquisition", href: "/services/paid-acquisition" },
  { tone: "infrastructure", label: "Growth Infrastructure", href: "/services/growth-infrastructure" },
] as const;

function Arrow() {
  return <span className={styles.arrow} aria-hidden="true"><ArrowIcon /></span>;
}

function HeroVisual({ tone }: { tone: ServiceTone }) {
  if (tone === "web") return (
    <div className={`${styles.visual} ${styles.webVisual}`} role="img" aria-label="A responsive website journey moving from a clear message to a customer enquiry">
      <div className={styles.visualBar} aria-hidden="true"><span>LIVE EXPERIENCE</span><i /><i /><i /></div>
      <div className={styles.browser} aria-hidden="true">
        <div className={styles.browserTop}><i /><i /><i /><span>wd / conversion page</span></div>
        <div className={styles.browserBody}>
          <div><small>MESSAGE MATCH</small><strong>Make the next step obvious.</strong><p>A clear offer, useful proof and one focused action.</p><span className={styles.mockButton}>Start an enquiry <ArrowIcon/></span></div>
          <div className={styles.mobilePreview}><i /><span /><span /><strong>CTA</strong></div>
        </div>
      </div>
      <div className={styles.signalRow} aria-hidden="true"><span><i /> Intent aligned</span><span><i /> Responsive</span><span><i /> Measurable action</span></div>
    </div>
  );

  if (tone === "paid") return (
    <div className={`${styles.visual} ${styles.paidVisual}`} role="img" aria-label="A paid acquisition system connecting high-intent searches with ads, landing pages and qualified enquiries">
      <div className={styles.visualBar} aria-hidden="true"><span>CAMPAIGN CONTROL</span><i /><i /><i /></div>
      <div className={styles.funnel} aria-hidden="true">
        <div className={styles.funnelStep}><small>01 / QUERY</small><strong>High-intent search</strong><span className={styles.queryLine} /></div>
        <div className={styles.funnelArrow}>↓</div>
        <div className={styles.funnelStep}><small>02 / MATCH</small><strong>Relevant ad + page</strong><div className={styles.relevance}><i /><i /><i /></div></div>
        <div className={styles.funnelArrow}>↓</div>
        <div className={`${styles.funnelStep} ${styles.funnelResult}`}><small>03 / OUTCOME</small><strong>Qualified enquiry</strong><span>Recorded for optimisation</span></div>
      </div>
      <div className={styles.budgetRail} aria-hidden="true"><span>Budget follows evidence</span><div><i /><i /><i /><i /></div></div>
    </div>
  );

  return (
    <div className={`${styles.visual} ${styles.infrastructureVisual}`} role="img" aria-label="A connected measurement system linking the website, analytics, CRM and commercial outcomes">
      <div className={styles.visualBar} aria-hidden="true"><span>SIGNAL ARCHITECTURE</span><i /><i /><i /></div>
      <div className={styles.systemMap} aria-hidden="true">
        <div className={`${styles.systemNode} ${styles.nodeWebsite}`}><small>01</small><strong>Website</strong><span>Useful action</span></div>
        <div className={`${styles.systemNode} ${styles.nodeData}`}><small>02</small><strong>GA4 + GTM</strong><span>Trusted signal</span></div>
        <div className={`${styles.systemNode} ${styles.nodeCrm}`}><small>03</small><strong>CRM</strong><span>Lead status</span></div>
        <div className={`${styles.systemNode} ${styles.nodeRevenue}`}><small>04</small><strong>Outcome</strong><span>Decision data</span></div>
        <div className={styles.flowLineOne}><i /></div><div className={styles.flowLineTwo}><i /></div><div className={styles.flowLineThree}><i /></div>
      </div>
      <div className={styles.integrity} aria-hidden="true"><span>Signal check</span><strong>Every important action has an owner.</strong></div>
    </div>
  );
}

export function ServicePage({ data }: { data: ServicePageData }) {
  return (
    <div className={styles.page} data-tone={data.tone}>
      <section className={styles.hero} aria-labelledby="service-title">
        <div className="container">
          <div className={styles.topline}><span>{data.eyebrow}</span><span>London · United Kingdom</span></div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="service-title">{data.title}<span>{data.accent}</span></h1>
              <p>{data.intro}</p>
              <div className={styles.heroActions}><Link href="/contact" className={`${styles.primary} liquid-cta`}>{data.primaryCta}<Arrow /></Link><Link href="/work" className={styles.textLink}>View selected work <Arrow /></Link></div>
              <p className={styles.reassurance}>Founder-led strategy and delivery. Scope agreed before work begins.</p>
            </div>
            <HeroVisual tone={data.tone} />
          </div>
          <nav className={styles.inPageNav} aria-label="On this page"><a href="#service-outcomes">Outcomes</a><a href="#service-delivery">What we deliver</a><a href="#service-process">Process</a><a href="#service-questions">Questions</a></nav>
        </div>
      </section>

      <section className={styles.outcomeBand} id="service-outcomes" aria-labelledby="outcome-title">
        <div className="container">
          <div className={styles.sectionLead}><p>Commercial outcome</p><h2 id="outcome-title">Built around what needs to change.</h2></div>
          <ol className={styles.outcomes}>{data.outcomes.map((item,index)=><li key={item}><span>0{index+1}</span><strong>{item}</strong></li>)}</ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="friction-title">
        <div className="container">
          <div className={styles.editorialHeading}><div><p>Where progress gets stuck</p><h2 id="friction-title">Fix the journey, not only the surface.</h2></div><p>A stronger system removes the gaps between attention, understanding and action.</p></div>
          <div className={styles.problemGrid}>{data.problems.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.delivery}`} id="service-delivery" aria-labelledby="delivery-title">
        <div className="container">
          <div className={styles.editorialHeading}><div><p>What we deliver</p><h2 id="delivery-title">Clear work. Defined outputs.</h2></div><p>Each recommendation is connected to an implementation decision, an owner and a way to check the result.</p></div>
          <div className={styles.capabilities}>{data.capabilities.map((item,index)=><article key={item.title}><span className={styles.capabilityNumber}>0{index+1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div><p className={styles.deliverable}><span>Typical output</span>{item.deliverable}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.proofSection} aria-labelledby="proof-title"><div className={`container ${styles.proofGrid}`}><div><p>{data.proof.eyebrow}</p><h2 id="proof-title">{data.proof.title}</h2></div><div><p>{data.proof.copy}</p><ul>{data.proof.points.map(point=><li key={point}>{point}</li>)}</ul><Link href="/work" className={styles.textLink}>Explore selected work <Arrow /></Link></div></div></section>

      <section className={styles.section} id="service-process" aria-labelledby="process-title"><div className="container"><div className={styles.editorialHeading}><div><p>Delivery model</p><h2 id="process-title">One accountable path from problem to progress.</h2></div><p>The detail changes by project. The discipline does not.</p></div><ol className={styles.process}>{data.process.map((item,index)=><li key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></li>)}</ol></div></section>

      <section className={`${styles.section} ${styles.questions}`} id="service-questions" aria-labelledby="questions-title"><div className={`container ${styles.questionsGrid}`}><div><p>Before we begin</p><h2 id="questions-title">Useful questions deserve direct answers.</h2></div><div>{data.faqs.map(({question,answer})=><details key={question}><summary>{question}<i aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>

      <section className={styles.connected} aria-labelledby="connected-title"><div className="container"><div className={styles.connectedHeader}><div><p>Connected capabilities</p><h2 id="connected-title">Use one service or connect the full system.</h2></div><Link href="/services" className={styles.textLink}>View all services <Arrow /></Link></div><div className={styles.connectedLinks}>{connectedServices.filter(item=>item.tone!==data.tone).map((item,index)=><Link href={item.href} key={item.href}><span>0{index+1}</span><strong>{item.label}</strong><Arrow /></Link>)}</div></div></section>

      <section className={styles.finalCta}><div className="container"><div><p>Start with the commercial problem</p><h2>Tell us what needs to work better.</h2><span>Share the current situation, the outcome you need and what is getting in the way.</span></div><Link href="/contact" className={`${styles.primary} liquid-cta`}>{data.primaryCta}<Arrow /></Link></div></section>
    </div>
  );
}

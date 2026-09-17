import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowIcon } from "@/components/ui/Icons";
import { MetaAdsNetwork } from "@/components/meta-ads/MetaAdsNetwork";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";
import styles from "./meta-ads.module.css";

const description = "Meta Ads management for London businesses, connecting Facebook and Instagram campaigns with creative testing, landing pages, HighLevel CRM, tracking and lead follow-up.";
export const metadata = pageMetadata("Meta Ads Agency London | Facebook & Instagram Ads", description, "/services/meta-ads");

const problems = [
  { title: "Leads arrive, but nobody follows up quickly", copy: "A useful cost per lead loses value when enquiries sit in an inbox, spreadsheet or platform notification without clear ownership." },
  { title: "Creative changes without producing learning", copy: "Testing is not random variation. We structure hooks, offers, formats and audiences so the campaign can show what customers respond to." },
  { title: "Platform conversions do not match the sales process", copy: "A form submission, WhatsApp click, qualified opportunity and completed sale are different events. Measurement should reflect those differences." },
];

const capabilities = [
  { title: "Meta campaign strategy", copy: "Define objectives, audience logic, geography, budget structure, offer and conversion path before increasing spend.", output: "Campaign architecture & testing plan" },
  { title: "Facebook & Instagram lead generation", copy: "Use native lead forms, website conversions, WhatsApp journeys and suitable messaging campaigns according to the buying journey.", output: "Lead-generation campaign build" },
  { title: "Creative testing", copy: "Organise images, video, hooks, offers, copy and formats into controlled tests instead of relying on one advert until it fatigues.", output: "Creative testing matrix" },
  { title: "Landing pages & conversion journeys", copy: "Create campaign-specific pages when customers need more proof, context or qualification before they enquire.", output: "Paid-social landing experience" },
  { title: "Tracking & CRM feedback", copy: "Connect Meta Pixel, suitable server-side signals, GA4, GTM and available CRM stages so decisions can move beyond clicks alone.", output: "Measurement & lead-quality framework" },
];

const process = [
  { title: "Understand the economics", copy: "Clarify customer value, capacity, response speed, priority services and what the business considers a useful lead." },
  { title: "Build the acquisition path", copy: "Connect audience, message, creative, offer, campaign objective and destination into one intentional journey." },
  { title: "Configure measurement", copy: "Define forms, calls, messages and CRM stages before campaign performance is judged." },
  { title: "Launch controlled tests", copy: "Test meaningful variables without changing everything at the same time, then document what the evidence supports." },
  { title: "Review lead quality", copy: "Look beyond cost per lead where the sales process provides enough information to distinguish useful enquiries from weak ones." },
  { title: "Scale what earns the right to scale", copy: "Increase budget only when the campaign, customer journey and follow-up process can support it." },
];

const faqs = [
  { question: "Do you manage Facebook and Instagram Ads?", answer: "Yes. Both are managed through Meta's advertising ecosystem, with placement, audience and creative decisions based on the agreed strategy rather than assuming every placement deserves equal budget." },
  { question: "Can you connect Facebook leads to HighLevel?", answer: "Yes. Where the account and integration support it, Meta leads can be routed into HighLevel CRM with pipeline stages, notifications, ownership and follow-up workflows." },
  { question: "Can you generate leads directly inside Facebook?", answer: "Yes. Meta lead forms can reduce friction for suitable campaigns. We can also use landing pages, website forms, calls, WhatsApp or other appropriate conversion paths depending on the service and buying journey." },
  { question: "Do you guarantee a specific cost per lead?", answer: "No. The campaign examples on this page are recorded results from specific campaigns, not guarantees for another business. Costs vary with audience, competition, geography, offer, creative and seasonality." },
  { question: "Can you improve an existing Meta Ads account?", answer: "Yes. We can review campaign structure, audiences, creative, conversion setup, landing pages and available lead-quality information before deciding what should be retained, changed or rebuilt." },
  { question: "Can you track which leads become customers?", answer: "Where CRM and sales-process data permit it, we can structure lead stages and source information to improve visibility beyond the initial form submission. The exact attribution available depends on the systems and data quality." },
];

function Arrow() { return <span className={styles.arrow} aria-hidden="true"><ArrowIcon /></span>; }

export default function MetaAdsPage() {
  return <>
    <JsonLd data={serviceSchema({ name: "Meta Ads Agency London", description, pathname: "/services/meta-ads", serviceType: "Facebook & Instagram Advertising / Meta Lead Generation" })} />
    <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Meta Ads", href: "/services/meta-ads" }]} />
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="meta-title">
        <div className="container">
          <div className={styles.topline}><span>META ADS / FACEBOOK / INSTAGRAM / CRM</span><span>London · United Kingdom</span></div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="meta-title"><span>Meta Ads Agency London.</span>From attention to a managed sales pipeline.</h1>
              <p>Facebook and Instagram advertising should do more than generate clicks. WD Marketing builds connected Meta advertising systems for London businesses — combining campaign strategy, creative testing, lead generation, landing pages, conversion tracking and CRM workflows so every useful enquiry has somewhere to go.</p>
              <div className={styles.actions}><Link href="/contact" className={`${styles.primary} liquid-cta`}>Discuss my Meta Ads <Arrow /></Link><a href="#real-results" className={styles.textLink}>See real campaign results <Arrow /></a></div>
              <p className={styles.reassurance}>Founder-led · Meta Ads + HighLevel CRM + conversion tracking · Scope agreed before launch.</p>
            </div>
            <MetaAdsNetwork />
          </div>
          <nav className={styles.inPageNav} aria-label="On this page"><a href="#meta-system">The system</a><a href="#crm">HighLevel CRM</a><a href="#real-results">Real results</a><a href="#questions">Questions</a></nav>
        </div>
      </section>

      <section className={styles.outcomeBand} id="meta-system" aria-labelledby="outcomes-title"><div className="container"><div><p>ONE CONNECTED ACQUISITION SYSTEM</p><h2 id="outcomes-title">The advert is only the beginning.</h2></div><ul><li>Campaign strategy tied to a commercial objective</li><li>Creative testing built to produce useful learning</li><li>Lead capture connected to CRM ownership</li><li>Measurement that distinguishes clicks from meaningful outcomes</li></ul></div></section>

      <section className={styles.section} aria-labelledby="problem-title"><div className="container"><div className={styles.heading}><div><p>MORE ACTIVITY IS NOT THE GOAL</p><h2 id="problem-title">A busy Ads Manager does not mean your business is growing.</h2></div><p>Meta can generate reach quickly. The value comes from attracting the right people, giving them a reason to act and moving the resulting enquiry into a process your team can manage.</p></div><div className={styles.problemGrid}>{problems.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>

      <section className={`${styles.section} ${styles.delivery}`} aria-labelledby="delivery-title"><div className="container"><div className={styles.heading}><div><p>META ADVERTISING, CONNECTED</p><h2 id="delivery-title">Campaigns designed around what happens after the click.</h2></div><p>Each part of the campaign has a role: attract attention, continue the message, capture intent and give the resulting lead a clear next step.</p></div><div className={styles.capabilities}>{capabilities.map((item,index)=><article key={item.title}><span>0{index+1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div><p className={styles.output}><small>Typical output</small>{item.output}</p></article>)}</div></div></section>

      <section className={styles.crmSection} id="crm" aria-labelledby="crm-title"><div className="container"><div className={styles.crmIntro}><p>FROM META LEAD TO SALES PIPELINE</p><h2 id="crm-title">Generating the lead is only half the system.</h2><p>A Meta lead should not become another notification someone forgets to open. WD Marketing can configure HighLevel / GoHighLevel CRM around the way your business actually handles enquiries.</p></div><div className={styles.crmFlow} aria-label="Meta lead to HighLevel sales pipeline" style={{ flexWrap: "wrap", overflowX: "visible" }}><span>Meta Ad</span><i>→</i><span>Lead Form</span><i>→</i><span className={styles.crmHighlight}>HighLevel CRM</span><i>→</i><span>Pipeline</span><i>→</i><span>Follow-up</span><i>→</i><span>Qualified</span></div><div className={styles.crmGrid}><article><h3>Lead capture & routing</h3><p>Connect Meta lead forms, landing pages and website forms to the appropriate CRM pipeline and owner.</p></article><article><h3>Pipeline design</h3><p>Use stages such as New Lead, Contacted, Qualified, Quote Sent, Won and Lost to make the sales process visible.</p></article><article><h3>Notifications & follow-up</h3><p>Configure useful alerts, reminders and consent-aware email or SMS workflows so new enquiries do not disappear.</p></article><article><h3>Source & quality visibility</h3><p>Preserve campaign/source information where available so the team can review what happened after the initial form submission.</p></article></div><blockquote>We do not want your best campaign to create your biggest admin problem.</blockquote></div></section>

      <section className={styles.results} id="real-results" aria-labelledby="results-title"><div className="container"><div className={styles.resultsHeader}><div><p>REAL CAMPAIGN DATA</p><h2 id="results-title">Built on campaigns we have actually managed.</h2></div><p>No fabricated ROAS. No invented customer numbers. These examples use recorded Meta Ads Manager campaign metrics. Form leads are platform-reported leads, not confirmed sales.</p></div><div className={styles.resultGrid}>
        <article className={styles.featuredResult}><div className={styles.caseHead}><span>01 / London quartz worktops</span><strong>Lead generation</strong></div><div className={styles.metricGrid}><div><b>344</b><span>Meta form leads</span></div><div><b>£6.06</b><span>Cost per form lead</span></div><div><b>£2,082.96</b><span>Recorded spend</span></div><div><b>106,473</b><span>Impressions</span></div><div><b>31,835</b><span>Reach</span></div></div><p>A London-focused worktops campaign generated <strong>344 Meta-reported form leads at an average £6.06 cost per lead</strong> across the recorded campaign period. The objective was to move relevant purchase intent into a direct enquiry journey, not simply maximise reach.</p></article>
        <article><div className={styles.caseHead}><span>02 / Prime Stone Worktops</span><strong>Form leads</strong></div><div className={styles.metricGrid}><div><b>161</b><span>Meta form leads</span></div><div><b>£8.37</b><span>Cost per form lead</span></div><div><b>£1,348.14</b><span>Recorded spend</span></div></div><p>This campaign recorded <strong>161 Meta form leads at £8.37 per lead</strong>. Different offers, audiences, locations and creative combinations produce different acquisition economics.</p></article>
        <article><div className={styles.caseHead}><span>03 / WhatsApp acquisition test</span><strong>Traffic to conversation path</strong></div><div className={styles.metricGrid}><div><b>1,411</b><span>Link clicks</span></div><div><b>£0.15</b><span>Cost per link click</span></div><div><b>£207.31</b><span>Recorded spend</span></div></div><p>The recorded campaign generated <strong>1,411 link clicks at £0.15 per click</strong>. We report this as traffic to the WhatsApp journey — not as 1,411 conversations, customers or sales.</p></article>
      </div><p className={styles.disclaimer} style={{ color: "#5f6672" }}>Campaign figures are historical Meta Ads Manager metrics supplied from the relevant advertising accounts. They describe those campaigns only and are not a forecast or guarantee for another advertiser.</p></div></section>

      <section className={styles.section} aria-labelledby="creative-title"><div className="container"><div className={styles.heading}><div><p>CREATIVE IS PART OF MEDIA BUYING</p><h2 id="creative-title">The audience cannot respond to an advert it does not notice.</h2></div><p>Creative decisions are treated as performance variables, not decoration. We structure tests around message, offer, proof and format.</p></div><div className={styles.creativeGrid}><article><span>01</span><h3>Problem-aware hooks</h3><p>Start with the frustration, ambition or task that makes the right customer stop.</p></article><article><span>02</span><h3>Offer angles</h3><p>Clarify why someone should enquire and what they should expect after acting.</p></article><article><span>03</span><h3>Proof</h3><p>Use completed work, demonstrations, reviews and credible evidence where available.</p></article><article><span>04</span><h3>Format</h3><p>Choose static, vertical video, carousel or other suitable formats around the message and placement.</p></article></div></div></section>

      <section className={styles.qualitySection} aria-labelledby="quality-title"><div className={`container ${styles.qualityGrid}`}><div><p>BEYOND COST PER LEAD</p><h2 id="quality-title">The cheapest lead can be the most expensive one.</h2></div><div><p>A low CPL is not automatically a commercial win. Where CRM and sales information are available, we want to understand which campaigns create enquiries, conversations, qualified opportunities and customers.</p><ul><li>Meta Ads Manager</li><li>Meta Pixel / suitable server-side measurement</li><li>Google Tag Manager & GA4</li><li>HighLevel CRM</li><li>Landing pages & forms</li><li>Email / SMS / notifications where appropriate</li></ul><strong>That is the difference between optimising advertising metrics and improving acquisition.</strong></div></div></section>

      <section className={styles.section} aria-labelledby="process-title"><div className="container"><div className={styles.heading}><div><p>OUR PROCESS</p><h2 id="process-title">Strategy before scale.</h2></div><p>Budget increases follow evidence. The campaign, customer journey and lead-handling process all need to support the next level of spend.</p></div><ol className={styles.process}>{process.map((item,index)=><li key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></li>)}</ol></div></section>

      <section className={styles.questions} id="questions" aria-labelledby="questions-title"><div className={`container ${styles.questionsGrid}`}><div><p>BEFORE WE BEGIN</p><h2 id="questions-title">Useful questions deserve direct answers.</h2></div><div>{faqs.map(({question,answer})=><details key={question}><summary>{question}<i aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>

      <section className={styles.connected} aria-labelledby="connected-title"><div className="container"><div><p>ONE SYSTEM. ONE COMMERCIAL VIEW.</p><h2 id="connected-title">Paid social works better when the website, tracking and CRM are part of the conversation.</h2></div><div className={styles.connectedLinks}><Link href="/services/paid-acquisition"><span>01</span><strong>Google Ads & Paid Acquisition</strong><Arrow /></Link><Link href="/services/growth-infrastructure"><span>02</span><strong>HighLevel, GA4, GTM & CRM</strong><Arrow /></Link><Link href="/services/web-conversion"><span>03</span><strong>Landing Pages & Conversion</strong><Arrow /></Link></div></div></section>

      <section className={styles.finalCta}><div className="container"><div><p>READY TO BUILD THE FULL JOURNEY?</p><h2>Turn Meta attention into a system your sales team can work with.</h2><span>Facebook · Instagram · Lead Generation · HighLevel CRM · Tracking</span></div><Link href="/contact" className={`${styles.primary} liquid-cta`}>Discuss my Meta Ads <Arrow /></Link></div></section>
    </div>
  </>;
}

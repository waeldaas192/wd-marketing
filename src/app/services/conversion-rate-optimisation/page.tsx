import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowIcon } from "@/components/ui/Icons";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";
import styles from "./cro.module.css";

const description = "Conversion rate optimisation for London businesses, improving landing pages, forms, mobile UX, tracking and lead quality from existing website traffic.";
export const metadata = pageMetadata(
  "Conversion Rate Optimisation Agency London",
  description,
  "/services/conversion-rate-optimisation",
);

const leaks = [
  { title: "The page answers the wrong question", copy: "Traffic may be relevant while the page talks around the customer's task. Message match, page hierarchy and service clarity determine whether intent survives the first few seconds." },
  { title: "Trust arrives too late", copy: "Reviews, proof, process, guarantees, credentials and completed work only help when customers can find the evidence before doubt becomes an exit." },
  { title: "The next step feels expensive", copy: "Long forms, vague buttons, unclear response expectations and poor mobile controls can make a simple enquiry feel like a commitment customers are not ready to make." },
  { title: "Measurement counts activity, not outcomes", copy: "A button click, form start, completed enquiry, qualified lead and won customer are different signals. Treating them as one conversion hides where the journey really breaks." },
];

const optimise = [
  { title: "Landing pages & service pages", copy: "Align search or advert intent with the headline, offer, proof, objections and next action so the page continues the conversation that brought the visitor there." },
  { title: "Forms & enquiry journeys", copy: "Review field count, sequence, validation, mobile input, trust around personal details and what happens after submission." },
  { title: "Calls to action", copy: "Clarify the action, timing and expectation around calls, forms, WhatsApp, bookings and quote requests instead of repeating generic buttons everywhere." },
  { title: "Proof & credibility", copy: "Place reviews, case evidence, project detail, process and risk-reduction information where uncertainty occurs rather than collecting it in an isolated testimonials section." },
  { title: "Mobile UX", copy: "Check tap targets, reading width, sticky behaviour, menus, form inputs, image weight and content order on the devices where many service enquiries actually happen." },
  { title: "Offer & commercial clarity", copy: "Make scope, fit, qualification, pricing context and the value of taking the next step easier to understand without inventing urgency or unsupported claims." },
];

const process = [
  { title: "Measure", copy: "Confirm what is being tracked, what each conversion means and where the available data becomes unreliable." },
  { title: "Diagnose", copy: "Review analytics, page behaviour, session evidence, search or campaign intent, forms, device experience and the commercial offer." },
  { title: "Prioritise", copy: "Rank problems by likely impact, confidence, effort and traffic so the first changes address meaningful friction rather than visual preferences." },
  { title: "Improve or test", copy: "Implement high-confidence fixes directly and use structured experiments or A/B testing when traffic and risk make controlled comparison worthwhile." },
  { title: "Validate", copy: "Check the live journey, event quality, form behaviour, device coverage and available lead-quality signals after the change." },
  { title: "Learn", copy: "Document what changed, what the evidence supports and what should be investigated next instead of declaring every redesign a win." },
];

const faqs = [
  { question: "What is conversion rate optimisation?", answer: "Conversion rate optimisation, or CRO, is the structured process of improving the percentage and quality of visitors who complete a useful action. For a lead-generation business that may mean calls, quote requests, forms, bookings or qualified enquiries rather than ecommerce purchases." },
  { question: "How much traffic do I need for CRO?", answer: "You do not need large traffic volumes to improve obvious friction, measurement, messaging or usability. Statistically reliable A/B testing normally needs substantially more volume and enough conversions. We choose the method around the evidence available rather than forcing every website into an experiment." },
  { question: "Do you offer A/B testing?", answer: "Yes, when traffic, conversion volume and business risk make it useful. When the site has low traffic, direct fixes, qualitative evidence, analytics and careful before-and-after validation may be more responsible than running an underpowered test." },
  { question: "Can CRO improve lead quality, not just lead volume?", answer: "It can help. Better qualification, clearer offers, stronger expectation setting and CRM feedback can reduce some weak enquiries. Lead quality also depends on targeting, market demand, pricing and sales follow-up, so CRO is one part of the acquisition system." },
  { question: "Can you optimise an existing website without rebuilding it?", answer: "Often, yes. We first identify whether the constraint is copy, page structure, form friction, mobile UX, tracking, speed or the platform itself. A rebuild is recommended only when the current implementation materially prevents the changes that matter." },
  { question: "Does CRO affect SEO?", answer: "It can. Changes to content, internal links, rendering or page structure need to preserve search intent and technical accessibility. We avoid treating SEO and CRO as separate teams making conflicting changes to the same page." },
  { question: "Can you track which enquiries become customers?", answer: "Where the CRM and sales process expose reliable stages, we can structure measurement around enquiry, contacted, qualified, quote and won outcomes. Attribution is never perfect, so we document what each source can and cannot prove." },
  { question: "Do you work with WordPress and custom-coded websites?", answer: "Yes. The optimisation method is platform-independent, although the speed and cost of implementation depend on the website stack, access, theme or component quality and any third-party tools in the journey." },
];

function Arrow() { return <span className={styles.arrow} aria-hidden="true"><ArrowIcon /></span>; }

export default function CroPage() {
  return <>
    <JsonLd data={serviceSchema({
      name: "Conversion Rate Optimisation Agency London",
      description,
      pathname: "/services/conversion-rate-optimisation",
      serviceType: "Conversion Rate Optimisation",
    })} />
    <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Conversion Rate Optimisation", href: "/services/conversion-rate-optimisation" }]} />

    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="cro-title">
        <div className="container">
          <div className={styles.topline}><span>CRO / LANDING PAGES / UX / MEASUREMENT</span><span>London · United Kingdom</span></div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="cro-title"><span>Conversion Rate Optimisation Agency London.</span>Turn more of your existing traffic into qualified enquiries.</h1>
              <p>More traffic is not always the next answer. WD Marketing improves the journey between a relevant visit and a useful enquiry — combining landing-page strategy, UX, forms, trust, mobile behaviour, analytics and lead-quality feedback so conversion work is tied to a commercial outcome.</p>
              <div className={styles.actions}><Link href="/contact" className={`${styles.primary} liquid-cta`}>Discuss my conversion journey <Arrow /></Link><a href="#cro-audit" className={styles.textLink}>See what we analyse <Arrow /></a></div>
              <p className={styles.reassurance}>Founder-led · Lead-generation CRO · GA4/GTM measurement · No invented uplift claims.</p>
            </div>

            <div className={styles.journey} role="img" aria-label="Conversion journey from website visit through intent, friction and action to a qualified lead" data-cro-journey>
              <div className={styles.journeyHeader}><span>CONVERSION JOURNEY</span><strong>Where value leaks</strong></div>
              <div className={styles.journeyRail} aria-hidden="true">
                <div className={styles.stage}><i>01</i><strong>Visit</strong><span>Relevant traffic</span></div>
                <div className={styles.connector} />
                <div className={styles.stage}><i>02</i><strong>Intent</strong><span>Clear task</span></div>
                <div className={styles.connector} />
                <div className={`${styles.stage} ${styles.friction}`}><i>03</i><strong>Friction</strong><span>Doubt · effort · mismatch</span></div>
                <div className={styles.connector} />
                <div className={styles.stage}><i>04</i><strong>Action</strong><span>Call · form · booking</span></div>
                <div className={styles.connector} />
                <div className={`${styles.stage} ${styles.outcome}`}><i>05</i><strong>Qualified lead</strong><span>Useful business outcome</span></div>
              </div>
              <div className={styles.signalGrid} aria-hidden="true"><span>Message match</span><span>Trust</span><span>Mobile UX</span><span>Form friction</span><span>Tracking</span><span>Lead quality</span></div>
              <p>Optimisation is not changing button colours. It is reducing the avoidable reasons a suitable customer fails to continue.</p>
            </div>
          </div>
          <nav className={styles.inPageNav} aria-label="On this page"><a href="#leaks">Conversion leaks</a><a href="#cro-audit">CRO audit</a><a href="#traffic">Traffic & testing</a><a href="#questions">Questions</a></nav>
        </div>
      </section>

      <section className={styles.outcomeBand} aria-labelledby="outcomes-title"><div className="container"><div><p>USE THE TRAFFIC YOU ALREADY HAVE</p><h2 id="outcomes-title">Before buying more clicks, understand why the current ones stop.</h2></div><ul><li>Match the page to the visitor's actual intent</li><li>Remove avoidable friction from forms and actions</li><li>Strengthen proof where customers hesitate</li><li>Measure enquiries separately from qualified outcomes</li></ul></div></section>

      <section className={styles.section} id="leaks" aria-labelledby="leaks-title"><div className="container"><div className={styles.heading}><div><p>YOU MAY NOT NEED MORE TRAFFIC</p><h2 id="leaks-title">A conversion problem can look like a traffic problem.</h2></div><p>When a business responds to weak enquiry volume by buying more traffic, the same friction simply becomes more expensive. We first ask whether relevant visitors can understand the offer, trust the business and complete the next step without unnecessary work.</p></div><div className={styles.leakGrid}>{leaks.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>

      <section className={styles.auditSection} id="cro-audit" aria-labelledby="audit-title"><div className="container"><div className={styles.auditIntro}><div><p>CONVERSION RATE OPTIMISATION AUDIT</p><h2 id="audit-title">Measure the journey before redesigning it.</h2></div><p>A responsible CRO audit combines quantitative and qualitative evidence with the commercial context. We do not assume that the most visible problem is the most valuable one to fix.</p></div><div className={styles.auditGrid}>
        <article><span>01</span><h3>Analytics & funnels</h3><p>Review GA4, GTM, important events, device behaviour, landing pages and where customers leave measurable journeys.</p><b>Evidence:</b><p>Traffic quality, actions, drop-offs and measurement gaps.</p></article>
        <article><span>02</span><h3>Behaviour evidence</h3><p>Use suitable session recordings, heatmaps or interaction evidence when available to understand hesitation, repeated taps, missed content and dead ends.</p><b>Evidence:</b><p>Observed friction rather than assumptions about how people browse.</p></article>
        <article><span>03</span><h3>Message & offer</h3><p>Compare the page with the search, advert or referral that created the visit and check whether the promise, scope and next step still match.</p><b>Evidence:</b><p>Message continuity, objections, proof and qualification.</p></article>
        <article><span>04</span><h3>Forms, calls & CRM</h3><p>Inspect enquiry completion and, where data exists, what happens after the form: contacted, qualified, quote, won or lost.</p><b>Evidence:</b><p>Lead volume and available lead-quality feedback.</p></article>
      </div></div></section>

      <section className={styles.section} aria-labelledby="optimise-title"><div className="container"><div className={styles.heading}><div><p>WHAT WE OPTIMISE</p><h2 id="optimise-title">The conversion path, not one isolated element.</h2></div><p>Strong CRO work connects content, interface, proof, performance and measurement. The exact scope depends on where evidence shows the journey is losing useful intent.</p></div><div className={styles.optimiseGrid}>{optimise.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>

      <section className={styles.trafficSection} id="traffic" aria-labelledby="traffic-title"><div className="container"><div className={styles.trafficHeading}><p>TESTING METHOD FOLLOWS THE EVIDENCE</p><h2 id="traffic-title">Low traffic and High traffic websites should not use the same CRO playbook.</h2></div><div className={styles.trafficGrid}><article><span>LOW TRAFFIC</span><h3>Improve obvious friction without pretending every change needs statistical significance.</h3><ul><li>Analytics and tracking repair</li><li>Heuristic and UX review</li><li>Session and qualitative evidence</li><li>Message, proof and form improvements</li><li>Careful before-and-after validation</li></ul><p>When traffic or conversions are limited, an underpowered A/B test can create false confidence. High-confidence usability and measurement problems can often be addressed directly.</p></article><article><span>HIGH TRAFFIC</span><h3>Use controlled experiments when there is enough volume to learn reliably.</h3><ul><li>Prioritised experiment backlog</li><li>A/B testing or suitable split tests</li><li>Defined primary and guardrail metrics</li><li>Segment and device checks</li><li>Documented decisions after each test</li></ul><p>Testing is useful when the audience, traffic, conversion volume and business risk justify it. We define what would change our decision before declaring a winner.</p></article></div></div></section>

      <section className={styles.qualitySection} aria-labelledby="quality-title"><div className={`container ${styles.qualityGrid}`}><div><p>FROM CONVERSION RATE TO LEAD QUALITY</p><h2 id="quality-title">A completed form is useful. A qualified enquiry is more useful.</h2></div><div><p>For service businesses, CRO should not end at the thank-you page. Where CRM and sales data are reliable enough, we structure the journey so marketing can learn what happened after the initial enquiry.</p><div className={styles.pipeline} aria-label="Lead quality stages"><span>Enquiry</span><i>→</i><span>Contacted</span><i>→</i><span>Qualified</span><i>→</i><span>Quote</span><i>→</i><span>Won / Lost</span></div><strong>This does not make attribution perfect. It gives the business a better commercial signal than optimising to clicks alone.</strong></div></div></section>

      <section className={styles.section} aria-labelledby="process-title"><div className="container"><div className={styles.heading}><div><p>OUR CRO PROCESS</p><h2 id="process-title">Evidence before opinion. Learning before another redesign.</h2></div><p>The process is deliberately iterative. We want each change to improve the customer journey or improve what we know about it.</p></div><ol className={styles.process}>{process.map((item,index)=><li key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></li>)}</ol></div></section>

      <section className={styles.questions} id="questions" aria-labelledby="questions-title"><div className={`container ${styles.questionsGrid}`}><div><p>BEFORE WE BEGIN</p><h2 id="questions-title">CRO questions deserve more than generic benchmarks.</h2></div><div>{faqs.map(({question,answer})=><details key={question}><summary>{question}<i aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>

      <section className={styles.connected} aria-labelledby="connected-title"><div className="container"><div><p>CONNECTED ACQUISITION</p><h2 id="connected-title">Conversion optimisation works best when traffic, website and measurement share one commercial view.</h2></div><div className={styles.connectedLinks}><Link href="/services/web-conversion"><span>01</span><strong>Web Design & Landing Pages</strong><Arrow /></Link><Link href="/services/paid-acquisition"><span>02</span><strong>Google Ads & Paid Acquisition</strong><Arrow /></Link><Link href="/services/meta-ads"><span>03</span><strong>Meta Ads & Lead Generation</strong><Arrow /></Link><Link href="/services/growth-infrastructure"><span>04</span><strong>GA4, GTM, CRM & Automation</strong><Arrow /></Link></div></div></section>

      <section className={styles.finalCta}><div className="container"><div><p>MAKE EXISTING TRAFFIC WORK HARDER</p><h2>Find the friction before paying for more visits.</h2><span>We will define the commercial outcome, available evidence and scope before recommending tests or a rebuild.</span></div><Link href="/contact" className={`${styles.primary} liquid-cta`}>Discuss my CRO project <Arrow /></Link></div></section>
    </div>
  </>;
}

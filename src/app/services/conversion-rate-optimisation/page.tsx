import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowIcon } from "@/components/ui/Icons";
import { CroJourney } from "@/components/cro/CroJourney";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";
import styles from "./cro.module.css";

const description = "Conversion rate optimisation for London businesses, improving landing pages, forms, calls and user journeys with GA4, GTM and evidence-led testing.";
export const metadata = pageMetadata("CRO Agency London | Conversion Optimisation", description, "/services/conversion-rate-optimisation");

const leaks = [
  { title: "The message does not match the traffic", copy: "A visitor clicks because of one promise, then lands on a page that speaks too broadly or changes the subject. We align the entry message, page intent and next action." },
  { title: "Trust arrives too late", copy: "Strong work, reviews, credentials and proof often exist but appear after the visitor has already decided the page feels risky or generic." },
  { title: "The action asks for too much", copy: "Long forms, unclear fields and premature commitments create avoidable friction. We reduce effort without removing useful qualification." },
  { title: "Mobile visitors get a weaker journey", copy: "Spacing, sticky elements, tap targets, content order and form behaviour can turn the same page into a different experience on a phone." },
  { title: "The site records conversions but not quality", copy: "A form submission is not the same as a qualified enquiry. Where CRM data exists, we connect the conversion event to what happens after it." },
];

const auditAreas = [
  { title: "Analytics & funnel behaviour", copy: "Review GA4, GTM and available event data to understand where users arrive, what they do and where measurable drop-offs occur." },
  { title: "Landing-page intent", copy: "Check whether the page answers the reason someone searched, clicked an advert or followed a referral — before asking them to act." },
  { title: "Forms & calls", copy: "Review field count, error states, phone visibility, click-to-call behaviour, qualification questions and what happens after submission." },
  { title: "Trust & proof", copy: "Assess reviews, case studies, accreditations, guarantees, project evidence and whether proof appears at the point of doubt." },
  { title: "Mobile UX", copy: "Inspect hierarchy, reading effort, navigation, CTA placement, visual stability, tap targets and form usability on smaller screens." },
  { title: "Lead-quality signals", copy: "Where the sales process permits it, compare enquiries with contacted, qualified, quoted and won stages instead of optimising only for volume." },
];

const testAreas = [
  "Headline, offer and message hierarchy",
  "CTA wording, placement and visual priority",
  "Form length, field logic and qualification",
  "Proof, reviews and project evidence",
  "Landing-page structure and content order",
  "Mobile-specific friction and navigation",
];

const process = [
  { title: "Measure", copy: "Confirm what is already tracked, what the business calls a useful conversion and whether current analytics can support decisions." },
  { title: "Diagnose", copy: "Review behaviour, journey logic, page hierarchy, forms, calls, mobile UX and available qualitative evidence to locate likely conversion friction." },
  { title: "Prioritise", copy: "Rank opportunities by commercial importance, confidence and implementation effort instead of changing everything at once." },
  { title: "Improve or test", copy: "Implement clear fixes directly and use structured A/B testing when traffic volume and the decision justify an experiment." },
  { title: "Validate", copy: "Check conversion behaviour after the change and, where available, compare lead quality rather than relying on the first positive metric." },
  { title: "Learn", copy: "Document what the evidence supports so the next page, campaign or experiment starts with better information than the last one." },
];

const faqs = [
  { question: "What is conversion rate optimisation?", answer: "Conversion rate optimisation, or CRO, is the process of improving the percentage of suitable visitors who complete a valuable action such as calling, submitting an enquiry form, booking or starting another defined sales step. It combines measurement, user experience, messaging and controlled changes rather than simply making a page look different." },
  { question: "How much traffic do I need for CRO?", answer: "You do not need a minimum traffic level to improve obvious friction, tracking, forms, messaging or mobile UX. Statistical A/B testing is different: meaningful experiments need enough eligible users and conversions to reach a useful conclusion. We do not force an A/B test onto a low-volume website just because CRO agencies are expected to mention testing." },
  { question: "How long does CRO take?", answer: "A focused audit can identify priorities quickly, but proving the effect of changes takes longer and depends on traffic, conversion volume, implementation speed and seasonality. We define what can be learned from the available data rather than promising a fixed uplift in a fixed number of days." },
  { question: "Do you offer A/B testing?", answer: "Yes, where the page has enough traffic and conversions for a structured experiment to be useful. Where traffic is limited, we prioritise analytics, user-journey review, qualitative evidence and high-confidence improvements instead of pretending every change can be statistically tested." },
  { question: "Can CRO improve lead quality as well as conversion rate?", answer: "It can help. The goal is not always more form submissions. Better qualification, clearer expectations, stronger service information and CRM feedback can help the site attract and identify more useful enquiries. The exact lead-quality view depends on the data your sales process records." },
  { question: "Does CRO affect SEO?", answer: "It can. CRO changes should preserve crawlable content, internal links, metadata and search intent where those elements support organic visibility. We avoid treating SEO and conversion as separate systems when the same landing page needs to satisfy both search engines and users." },
  { question: "Can you optimise an existing website without rebuilding it?", answer: "Yes. Many CRO engagements focus on specific landing pages, service pages, forms, calls or mobile journeys. A rebuild is recommended only when the existing structure creates limitations that cannot be solved efficiently inside the current site." },
  { question: "Can you work with WordPress and custom-coded websites?", answer: "Yes. WD Marketing works with WordPress as well as custom-coded websites. The optimisation method is driven by the journey and measurement needs; the implementation approach depends on the platform and how safely the change can be released." },
  { question: "Do you track calls, forms and CRM outcomes?", answer: "Where the required systems and consent setup are available, we can connect form and contact events through GA4 and GTM and structure CRM stages so reporting can move beyond a simple page conversion. Attribution is always limited by the quality and completeness of the underlying data." },
];

function Arrow() { return <span className={styles.arrow} aria-hidden="true"><ArrowIcon /></span>; }

export default function CroPage() {
  return <>
    <JsonLd data={serviceSchema({ name: "Conversion Rate Optimisation Agency London", description, pathname: "/services/conversion-rate-optimisation", serviceType: "Conversion Rate Optimisation / CRO" })} />
    <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Conversion Rate Optimisation", href: "/services/conversion-rate-optimisation" }]} />
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="cro-title">
        <div className="container">
          <div className={styles.topline}><span>CRO / LANDING PAGES / FORMS / MEASUREMENT</span><span>London · United Kingdom</span></div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="cro-title"><span>Conversion Rate Optimisation Agency London.</span>Turn more visits into qualified enquiries.</h1>
              <p>WD Marketing helps London businesses improve the commercial journey between a visit and an enquiry. We analyse message match, page structure, trust, forms, calls, mobile behaviour, GA4, GTM and available CRM outcomes so conversion decisions are based on evidence rather than cosmetic changes.</p>
              <div className={styles.actions}><Link href="/contact" className={`${styles.primary} liquid-cta`}>Discuss a CRO audit <Arrow /></Link><a href="#cro-process" className={styles.textLink}>See the process <Arrow /></a></div>
              <p className={styles.reassurance}>Founder-led · Lead-generation CRO · No invented uplift claims · Scope agreed before implementation.</p>
            </div>
            <CroJourney />
          </div>
          <nav className={styles.inPageNav} aria-label="On this page"><a href="#leaks">Conversion leaks</a><a href="#audit">What we analyse</a><a href="#testing">Testing strategy</a><a href="#questions">Questions</a></nav>
        </div>
      </section>

      <section className={styles.outcomeBand} aria-labelledby="outcomes-title"><div className="container"><div><p>YOU MAY NOT NEED MORE TRAFFIC</p><h2 id="outcomes-title">Fix the journey before paying for more visitors.</h2></div><ul><li>Make the page match the intent that brought the visitor</li><li>Reduce friction around forms, calls and key actions</li><li>Put trust and proof where hesitation actually happens</li><li>Measure useful enquiries, not only raw conversion counts</li></ul></div></section>

      <section className={styles.section} id="leaks" aria-labelledby="leaks-title"><div className="container"><div className={styles.heading}><div><p>WHERE CONVERSION LEAKS HAPPEN</p><h2 id="leaks-title">Traffic can be healthy while the journey quietly loses demand.</h2></div><p>CRO is not a button-colour exercise. We look for the points where the visitor loses clarity, confidence, motivation or an easy route to the next commercial step.</p></div><div className={styles.leakGrid}>{leaks.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>

      <section className={`${styles.section} ${styles.auditSection}`} id="audit" aria-labelledby="audit-title"><div className="container"><div className={styles.heading}><div><p>THE CRO AUDIT</p><h2 id="audit-title">We inspect the system around the conversion, not one isolated page element.</h2></div><p>The audit combines behavioural evidence, commercial intent and implementation reality. It is designed to produce a prioritised action plan, not a generic list of best practices.</p></div><div className={styles.auditGrid}>{auditAreas.map((item,index)=><article key={item.title}><span>0{index+1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}</div></div></section>

      <section className={styles.qualitySection} aria-labelledby="quality-title"><div className={`container ${styles.qualityGrid}`}><div><p>FROM CONVERSION TO LEAD QUALITY</p><h2 id="quality-title">A form submission is a signal. A qualified enquiry is a business outcome.</h2></div><div><p>Where CRM and sales-process data are available, we structure the journey so the website can be reviewed against what happens after the initial action.</p><div className={styles.pipeline} aria-label="Lead-quality journey"><span>Enquiry</span><i>→</i><span>Contacted</span><i>→</i><span>Qualified</span><i>→</i><span>Quote</span><i>→</i><span>Won / Lost</span></div><strong>This helps prevent the site from being optimised toward a high volume of low-value enquiries.</strong></div></div></section>

      <section className={styles.section} id="testing" aria-labelledby="testing-title"><div className="container"><div className={styles.heading}><div><p>TESTING THAT MATCHES THE EVIDENCE</p><h2 id="testing-title">Not every website should run the same CRO programme.</h2></div><p>Competitor pages often make A/B testing sound mandatory. We separate improvements that can be made with high confidence from experiments that genuinely need enough traffic and conversions to learn something useful.</p></div><div className={styles.trafficGrid}><article><span>Low traffic</span><h3>Improve first. Test selectively.</h3><p>For lower-volume lead-generation sites, we focus on tracking quality, user-journey review, message clarity, mobile usability, forms, calls and obvious friction. Changes are validated with the evidence the site can realistically produce.</p></article><article><span>High traffic</span><h3>Use controlled experiments where they can answer a real question.</h3><p>When traffic and conversion volume are sufficient, structured A/B testing can compare meaningful alternatives without changing multiple variables blindly or declaring a winner too early.</p></article></div><div className={styles.testList}>{testAreas.map((item,index)=><div key={item}><span>0{index+1}</span><strong>{item}</strong></div>)}</div></div></section>

      <section className={styles.measurement} aria-labelledby="measurement-title"><div className="container"><div className={styles.measurementIntro}><p>MEASUREMENT BEFORE OPINION</p><h2 id="measurement-title">GA4 and GTM should explain the journey without collecting unnecessary personal data.</h2><p>We define useful events around page views, forms, calls, messages and available funnel stages. Measurement supports the CRO decision; it does not replace understanding the business.</p></div><div className={styles.measurementGrid}><article><h3>GA4</h3><p>Traffic sources, page behaviour and conversion-event context.</p></article><article><h3>GTM</h3><p>Controlled event delivery, consent-aware tags and maintainable tracking logic.</p></article><article><h3>Forms & contact actions</h3><p>Measure the actions that represent intent without sending form content into analytics.</p></article><article><h3>CRM feedback</h3><p>Where available, use sales stages to understand which conversions become useful opportunities.</p></article></div></div></section>

      <section className={styles.section} id="cro-process" aria-labelledby="process-title"><div className="container"><div className={styles.heading}><div><p>OUR CRO PROCESS</p><h2 id="process-title">Measure. Diagnose. Prioritise. Improve. Validate. Learn.</h2></div><p>The process is deliberately sequential so a redesign preference does not get mistaken for evidence and a short-term metric does not get mistaken for a commercial result.</p></div><ol className={styles.process}>{process.map((item,index)=><li key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></li>)}</ol></div></section>

      <section className={styles.questions} id="questions" aria-labelledby="questions-title"><div className={`container ${styles.questionsGrid}`}><div><p>CRO QUESTIONS</p><h2 id="questions-title">Useful questions before changing a conversion journey.</h2></div><div>{faqs.map(({question,answer})=><details key={question}><summary>{question}<i aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>

      <section className={styles.connected} aria-labelledby="connected-title"><div className="container"><div><p>CONNECTED GROWTH</p><h2 id="connected-title">CRO works best when traffic, landing pages, measurement and follow-up share one commercial objective.</h2></div><div className={styles.connectedLinks}><Link href="/services/web-conversion"><span>01</span><strong>Web Design & Landing Pages</strong><Arrow /></Link><Link href="/services/paid-acquisition"><span>02</span><strong>Google Ads & Paid Acquisition</strong><Arrow /></Link><Link href="/services/meta-ads"><span>03</span><strong>Meta Ads & Lead Generation</strong><Arrow /></Link><Link href="/services/growth-infrastructure"><span>04</span><strong>GA4, GTM, CRM & Automation</strong><Arrow /></Link></div></div></section>

      <section className={styles.finalCta}><div className="container"><div><p>READY TO FIND THE LEAK?</p><h2>Turn more of the traffic you already have into a journey that earns the next action.</h2><span>Landing Pages · Forms · Calls · Mobile UX · GA4 · GTM · Lead Quality</span></div><Link href="/contact" className={`${styles.primary} liquid-cta`}>Discuss a CRO audit <Arrow /></Link></div></section>
    </div>
  </>;
}

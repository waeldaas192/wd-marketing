import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";
import { ArrowIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { HeroCentralLondonMap } from "@/components/seo/HeroCentralLondonMap";
import { site } from "@/data/site";
import base from "../seo/seo.module.css";
import styles from "./local-seo.module.css";

const description = "Local SEO London for Google Maps, Google Business Profile, service pages and qualified enquiries. Founder-led strategy and implementation by WD Marketing.";
export const metadata = pageMetadata("Local SEO London | Google Maps & Local Search", description, "/services/local-seo-london");

const generatedImages = {
  maps: {
    src: "https://d8j0ntlcm91z4.cloudfront.net/user_3GEucVxZY0sRqYaixUorECNXN6a/hf_20260918_213208_c796330b-f334-4e5e-8471-35b97ae7a2f0.png",
    alt: "Conceptual smartphone map interface showing local business discovery points",
    label: "Google Maps and Business Profile",
  },
} as const;

const journey = [
  { title: "Search", copy: "Appear for commercially relevant local searches." },
  { title: "Maps", copy: "Build a clearer, more accurate local presence." },
  { title: "Website", copy: "Give people a reason to understand and trust the business." },
  { title: "Enquiry", copy: "Make calling, messaging or requesting a quote straightforward." },
  { title: "Measurement", copy: "See which search journeys create useful opportunities." },
];

const deliverables = [
  { title: "Local search strategy", copy: "We review the services you want to grow, how people search for them, the local competitors appearing around those searches and the pages Google is already rewarding.", output: "Local keyword and opportunity map" },
  { title: "Google Business Profile optimisation", copy: "We review categories, services, business information, images, service areas and website connections so the profile accurately reflects the real business.", output: "A clearer, better structured local presence" },
  { title: "Service & location architecture", copy: "We decide which search intentions deserve a dedicated page, which should remain together and where a new URL would only duplicate an existing one.", output: "Keyword-to-page architecture" },
  { title: "On-page local SEO", copy: "We improve titles, headings, service context, location relevance, internal links, evidence and calls to action while keeping the page useful to a real customer.", output: "Pages built around search intent and action" },
  { title: "Technical foundations", copy: "We investigate the technical issues that materially affect discovery, crawling, indexing, speed and the experience of the pages customers need to find.", output: "Prioritised technical improvements" },
  { title: "Local authority & consistency", copy: "We review relevant citations, mentions, links, reviews and business information that support a consistent local presence without creating artificial signals.", output: "Local authority priorities" },
  { title: "Conversion & enquiry tracking", copy: "Where appropriate, we connect GA4, GTM and meaningful conversion events so search visibility can be reviewed alongside valid enquiries instead of rankings alone.", output: "Measurement connected to business action" },
];

const process = [
  { title: "Understand", copy: "Services, locations, commercial priorities and current performance." },
  { title: "Map", copy: "Search demand, competitors, existing pages, Google Business Profile and useful gaps." },
  { title: "Build", copy: "Technical improvements, service pages, local content and internal architecture." },
  { title: "Strengthen", copy: "Profile accuracy, relevant authority, citations, reviews and proof." },
  { title: "Measure", copy: "Visibility, landing-page behaviour, calls, forms and valid enquiries." },
  { title: "Expand", copy: "Build further only when the evidence supports the next move." },
];

const questions = [
  { question: "What is Local SEO?", answer: "Local SEO is the work involved in improving how a business is represented and discovered for geographically relevant searches across its website and local search presence. For eligible businesses, Google Business Profile is an important part of that system." },
  { question: "How long does Local SEO take?", answer: "There is no responsible fixed timetable for every business. Existing authority, competition, location, website quality, previous SEO work and the services being targeted all influence progress. We establish a baseline, implement priorities and review movement at agreed intervals." },
  { question: "Can you guarantee number one on Google Maps?", answer: "No. Search and map positions are not under an agency's control. We improve the factors we can influence, keep the business information truthful and measure progress without promising a ranking we cannot control." },
  { question: "Do you optimise Google Business Profiles?", answer: "Yes, where the business is eligible and the profile forms part of the agreed Local SEO scope. We review how the profile represents the real services, locations and website." },
  { question: "Do I need a page for every London borough?", answer: "Usually not. A location page should exist because it serves a genuine search opportunity and provides useful, distinct information. We do not recommend producing dozens of near-identical borough pages simply to increase URL count." },
  { question: "Can you work with my existing website?", answer: "Yes. We first determine what should be retained, what needs improving and whether the current platform can support the agreed work properly. A rebuild is not automatically required." },
  { question: "Do you provide Local SEO for service-area businesses?", answer: "Yes. The strategy is based on the locations the business genuinely serves, the services it provides and the search opportunities that are commercially relevant." },
  { question: "Do you track calls and enquiries?", answer: "Where technically and commercially appropriate, we can configure measurement around forms, calls and other meaningful actions so SEO decisions are not based on rankings or button clicks alone." },
];

const emailHref = `mailto:${site.email}?subject=${encodeURIComponent("Local SEO London project enquiry — WD Marketing")}&body=${encodeURIComponent("Hello Wael,\n\nMy website: \nPrimary service I want to grow: \nLocations I want to target: \nWhat I would like Local SEO to achieve: \n\nName: \nCompany: \n")}`;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className={diagonal ? base.diagonalArrow : base.arrow} aria-hidden="true"><ArrowIcon /></span>;
}

function GeneratedImage({ asset, priority = false }: { asset: (typeof generatedImages)[keyof typeof generatedImages]; priority?: boolean }) {
  return <figure className={styles.mediaFrame}>
    <img src={asset.src} alt={asset.alt} width="1344" height="752" loading={priority ? "eager" : "lazy"} decoding="async" />
    <figcaption>{asset.label}</figcaption>
  </figure>;
}

export default function LocalSeoLondonPage() {
  return (
    <div className={base.page}>
      <JsonLd data={serviceSchema({ name: "Local SEO London", description, pathname: "/services/local-seo-london", serviceType: "Local SEO" })} />
      <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "SEO services", href: "/services/seo" }, { label: "Local SEO London", href: "/services/local-seo-london" }]} />

      <section className={base.hero} id="local-seo-content" aria-labelledby="local-seo-title">
        <div className="container">
          <div className={base.heroTopline}>
            <span>Local SEO / London</span>
            <span>Search. Maps. Website. Enquiry.</span>
          </div>
          <div className={base.heroGrid}>
            <div className={base.heroCopy}>
              <h1 id="local-seo-title"><span>Local SEO London.</span>Be found where your customers are already looking.</h1>
              <p className={base.intro}>WD Marketing connects Google Business Profile, service-page relevance, website experience and enquiry tracking into one local search system built around the work you want to win.</p>
              <div className={base.actions}>
                <a className={base.primaryButton} href="#local-seo-enquiry">Discuss my Local SEO project <Arrow /></a>
                <a className={base.textLink} href="#local-seo-work">See selected work <Arrow diagonal /></a>
              </div>
              <p className={base.heroNote}>Founder-led. London focused. Search, website and conversion connected.</p>
            </div>
            <div className={base.heroVisual}>
              <HeroCentralLondonMap />
              <div className={base.heroCaption}><span>Local visibility</span><p>Prioritise the services and areas that matter commercially.</p></div>
            </div>
          </div>
          <nav className={base.sectionNav} aria-label="On this page">
            <a href="#local-seo-system"><span>01</span> Search journey</a>
            <a href="#local-seo-deliverables"><span>02</span> What we deliver</a>
            <a href="#local-seo-work"><span>03</span> Selected work</a>
            <a href="#local-seo-faq"><span>04</span> Questions</a>
          </nav>
        </div>
      </section>

      <section className={base.section} id="local-seo-system" aria-labelledby="journey-title">
        <div className="container">
          <div className={base.sharedHeading}>
            <SectionHeading id="journey-title" kicker="From search to enquiry" title={<>Being visible is only<br /><span>the first step.</span></>} intro="A local customer searches, compares, opens a profile, visits a website, looks for proof and then decides whether to make contact. We work on that whole journey." />
          </div>
          <ol className={styles.journey}>
            {journey.map((item, index) => <li key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></li>)}
          </ol>
          <p className={styles.journeyNote}>Visibility without a clear next step is unfinished work.</p>
        </div>
      </section>

      <section className={base.perspective} aria-labelledby="problem-title">
        <div className={`container ${base.perspectiveGrid}`}>
          <div><p className={base.eyebrow}>Local search is competitive</p><h2 id="problem-title">A good business can still be<br /><span>difficult to find.</span></h2></div>
          <div>
            <p>Sometimes the Google Business Profile is unclear. Sometimes the website is ranking with the wrong page. Sometimes ten services are competing for attention on one generic URL.</p>
            <p>And sometimes traffic reaches the site but the visitor sees too little evidence, context or direction to become a qualified enquiry.</p>
            <Link className={base.textLink} href="/services/seo">Explore SEO &amp; Organic Growth <Arrow diagonal /></Link>
          </div>
        </div>
      </section>

      <section className={base.section} id="local-seo-deliverables" aria-labelledby="deliverables-title">
        <div className="container">
          <div className={base.sharedHeading}>
            <SectionHeading id="deliverables-title" kicker="The local search system" title={<>Everything important should<br /><span>reinforce everything else.</span></>} intro="The work starts with what the business actually sells, where it genuinely operates and which searches are likely to create commercially useful opportunities." />
          </div>
          <div className={base.deliverables}>
            {deliverables.map((item, index) => <article key={item.title}><span className={base.rowNumber}>0{index + 1}</span><h3>{item.title}</h3><div><p>{item.copy}</p><p className={base.output}><span>Output</span>{item.output}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className={styles.mapsSection} aria-labelledby="maps-title">
        <div className={`container ${styles.split}`}>
          <GeneratedImage asset={generatedImages.maps} />
          <div>
            <p className={base.eyebrow}>Google Maps &amp; Business Profile</p>
            <h2 id="maps-title">Google Maps is not a<br /><span>separate marketing universe.</span></h2>
            <p>Your profile, website, reputation and wider local presence should tell a consistent story about the real business. We do not treat Maps optimisation as a collection of isolated profile edits.</p>
            <div className={styles.systemLine}><span>GBP</span><i>→</i><span>Website</span><i>→</i><span>Service relevance</span><i>→</i><span>Proof</span><i>→</i><span>Enquiry</span></div>
            <p className={styles.smallPrint}>Distance is part of local search and cannot simply be “SEO'd away”. We therefore do not promise arbitrary Map Pack positions across every part of London.</p>
          </div>
        </div>
      </section>

      <section className={base.section} aria-labelledby="london-title">
        <div className="container">
          <div className={styles.londonGrid}>
            <div><p className={base.eyebrow}>London is not one search market</p><h2 id="london-title">One city.<br /><span>Different local search situations.</span></h2></div>
            <div>
              <p>Competition changes by area. Proximity changes. The businesses around a search change. Customer intent can change too.</p>
              <p>We therefore prioritise locations based on genuine service coverage and business value rather than producing location pages simply because a borough exists.</p>
              <p>For a service-area business, that can mean developing strong service coverage around the areas that create the best opportunities first — then expanding when the evidence supports it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.businessSection} aria-labelledby="business-title">
        <div className={`container ${styles.splitReverse}`}>
          <div>
            <p className={`${base.eyebrow} ${styles.darkEyebrow}`}>Built for local demand</p>
            <h2 id="business-title">Local SEO for businesses that need<br /><span>customers, not traffic reports.</span></h2>
            <p className={styles.darkBody}>This approach is especially relevant where location and service intent influence the buying decision: trades, specialist cleaning, property services, construction, stone and surfaces, security, professional services, hospitality, automotive services and other location-led businesses.</p>
            <p className={styles.callout}>Before content production begins, we ask: Which services matter commercially? Which locations can you genuinely serve? What proof does a customer need before contacting you?</p>
          </div>
          <div className={styles.localDemandVisual} role="img" aria-label="Local search strategy connecting a valuable service, a genuine service area, customer intent and a qualified enquiry">
            <div className={styles.demandHeader}><span>LOCAL DEMAND SYSTEM</span><i>London</i></div>
            <div className={styles.demandFlow} aria-hidden="true">
              <div><small>01</small><strong>Service</strong><span>Work worth winning</span></div>
              <i>→</i>
              <div><small>02</small><strong>Area</strong><span>Places you serve</span></div>
              <i>→</i>
              <div><small>03</small><strong>Intent</strong><span>Search with purpose</span></div>
              <i>→</i>
              <div><small>04</small><strong>Enquiry</strong><span>Useful next step</span></div>
            </div>
            <p>Build around commercial relevance — then expand when the evidence supports it.</p>
          </div>
        </div>
      </section>

      <section className={base.section} id="local-seo-work" aria-labelledby="work-title">
        <div className="container">
          <div className={base.sharedHeading}>
            <SectionHeading id="work-title" kicker="Selected work" title={<>Real businesses.<br /><span>Real local journeys.</span></>} intro="Proof belongs in the work itself. These projects show how search structure, website experience and enquiry paths can be built around local service demand without inventing ranking or revenue claims." />
          </div>
          <div className={styles.proofGrid}>
            <article>
              <div className={styles.proofSignal}>
                <span>01 / Local search system</span>
                <div><strong>Service architecture</strong><span>Local SEO foundations</span><span>Focused quote journey</span></div>
              </div>
              <p className={`${base.projectMeta} ${styles.proofMeta}`}>London · Stone &amp; worktops</p><h3>SMA Marble</h3><p>Website strategy, responsive UX, service architecture, Local SEO foundations and a focused quote journey for a London stone worktop specialist.</p>
              <Link className={base.textLink} href="/work/sma-marble">View case study <Arrow diagonal /></Link>
            </article>
            <article>
              <div className={styles.proofSignal}>
                <span>02 / Local platform rebuild</span>
                <div><strong>47-route SEO architecture</strong><span>Legacy URL migration</span><span>Clear enquiry paths</span></div>
              </div>
              <p className={`${base.projectMeta} ${styles.proofMeta}`}>London · Roofing</p><h3>MB Legacy Roofing</h3><p>A legacy WordPress presence rebuilt into a faster, structured platform with service and London-area routes, clear enquiry paths and preserved useful URLs.</p>
              <Link className={base.textLink} href="/work/mb-legacy-roofing">View case study <Arrow diagonal /></Link>
            </article>
            <article>
              <div className={styles.proofSignal}>
                <span>03 / Service-led SEO</span>
                <div><strong>Restoration intent</strong><span>Polishing service pages</span><span>Contact &amp; quote paths</span></div>
              </div>
              <p className={`${base.projectMeta} ${styles.proofMeta}`}>London · Stone restoration</p><h3>London Marble Stone</h3><p>Website development and SEO for a London marble restoration and polishing business, connecting specific service intent with clear contact and quote options.</p>
              <a className={base.textLink} href="https://londonmarblestone.co.uk/" target="_blank" rel="noopener noreferrer">Visit website <Arrow diagonal /></a>
            </article>
          </div>
        </div>
      </section>

      <section className={base.approach} aria-labelledby="process-title">
        <div className="container">
          <div className={base.sharedHeading}>
            <SectionHeading id="process-title" kicker="How we work" title={<>No mystery.<br /><span>A clear sequence of decisions.</span></>} intro="The process keeps implementation close to the commercial objective, with each expansion based on evidence rather than URL volume." />
          </div>
          <ol className={styles.processGrid}>{process.map((step, index) => <li key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol>
        </div>
      </section>

      <section className={base.section} aria-labelledby="different-title">
        <div className={`container ${styles.differentGrid}`}>
          <div><p className={base.eyebrow}>Strategy + implementation</p><h2 id="different-title">An SEO recommendation is more useful<br /><span>when the person making it can also build it.</span></h2></div>
          <div>
            <p>A common problem with SEO projects is the handover: an audit identifies changes, then somebody else must redesign the page, modify the code, configure analytics and repair the conversion journey.</p>
            <p>WD Marketing brings search strategy, web development, conversion thinking and measurement into the same conversation — so we can move from “this page should improve” to a practical implementation plan.</p>
            <div className={styles.principles}><span>Strategy before volume.</span><span>Implementation connected.</span><span>Evidence before expansion.</span><span>Founder-led.</span></div>
            <div className={styles.connectedLinks}><Link href="/services/web-conversion">Web &amp; Conversion <Arrow diagonal /></Link><Link href="/services/growth-infrastructure">Growth Infrastructure <Arrow diagonal /></Link><Link href="/work">Selected Work <Arrow diagonal /></Link></div>
          </div>
        </div>
      </section>

      <section className={base.section} id="local-seo-faq" aria-labelledby="faq-title">
        <div className={`container ${base.faqGrid}`}>
          <div><p className={base.eyebrow}>Before we begin</p><h2 id="faq-title">Good questions.<br /><span>Clear answers.</span></h2></div>
          <div className={base.faqList}>{questions.map(({ question, answer }) => <details key={question}><summary>{question}<span className={base.disclosureIcon} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className={base.enquiry} id="local-seo-enquiry" aria-labelledby="enquiry-title">
        <div className={`container ${base.enquiryGrid}`}>
          <div>
            <p className={base.eyebrow}>Your starting point</p>
            <h2 id="enquiry-title">Tell us where you<br /><span>want to be found.</span></h2>
            <p>Send your website, the service you want to grow and the areas you genuinely serve. We will use that context to discuss the current search opportunity and what deserves investigation first.</p>
          </div>
          <div className={base.enquiryAction}>
            <a className={base.primaryButton} href={emailHref}>Email my Local SEO project <Arrow diagonal /></a>
            <p>Opens a structured draft in your email app.<br />No account passwords are needed at this stage.</p>
            <a className={base.emailLink} href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </section>
    </div>
  );
}

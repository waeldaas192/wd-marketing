import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";
import { ArrowIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import styles from "../seo/seo.module.css";
import local from "./local-seo.module.css";

const description = "Local SEO services in London focused on Google Maps visibility, service-area search demand and qualified enquiries. Strategy, website optimisation and tracking by WD Marketing.";
export const metadata = pageMetadata("Local SEO London | Google Maps & Local Search", description, "/services/local-seo-london");

const images = {
  hero: "/images/local-seo-london/local-seo-london-hero.webp",
  maps: "/images/local-seo-london/google-maps-local-seo-london.webp",
  businesses: "/images/local-seo-london/local-business-search-london.webp",
} as const;

const deliverables = [
  { title: "Local search strategy", copy: "We map commercially useful service searches, local modifiers, nearby-search behaviour and competitors against the work you actually want to win.", output: "Local keyword and opportunity map" },
  { title: "Google Business Profile optimisation", copy: "We review categories, services, business information, images, service areas and the connection between your profile and website.", output: "Clearer local business signals" },
  { title: "Service & location architecture", copy: "We decide which search intentions deserve a dedicated page, which should remain together and where another page would only duplicate existing content.", output: "Keyword-to-page architecture" },
  { title: "On-page local SEO", copy: "We improve titles, headings, service context, location relevance, internal links, proof and calls to action around the search intent of each important page.", output: "Search-led service pages" },
  { title: "Technical foundations", copy: "We prioritise crawl, indexation, duplication, speed and template issues that materially affect the pages we want customers to discover.", output: "Prioritised technical fixes" },
  { title: "Local authority & consistency", copy: "We review relevant citations, mentions, links, reviews and business information that support a coherent local presence.", output: "Authority priorities" },
  { title: "Conversion & enquiry tracking", copy: "Where appropriate, we connect GA4, GTM and useful conversion events so organic visibility can be reviewed alongside enquiries rather than rankings alone.", output: "Measurement tied to action" },
];

const steps = [
  { title: "Understand", copy: "Services, locations, commercial priorities and the current customer journey." },
  { title: "Map", copy: "Search demand, competitors, important pages, GBP and local opportunities." },
  { title: "Build", copy: "Technical improvements, service pages, local content and internal architecture." },
  { title: "Strengthen", copy: "Profile quality, authority, citations, reviews and relevant local signals." },
  { title: "Measure", copy: "Visibility, landing pages, calls, forms and useful enquiries." },
  { title: "Expand", copy: "Build further only where the evidence and commercial value justify it." },
];

const questions = [
  { question: "What is Local SEO?", answer: "Local SEO improves how a business is represented and discovered for geographically relevant searches across its website and local search presence. For eligible businesses, Google Business Profile is an important part of that system." },
  { question: "How long does Local SEO take?", answer: "There is no responsible fixed timeframe for every business. Existing authority, competition, location, website quality, previous SEO work and implementation speed all matter. We establish a baseline, implement priorities and review movement rather than promise a ranking date." },
  { question: "Can you guarantee number one on Google or Google Maps?", answer: "No. Search and local positions are not under an agency's control. We improve the elements we can influence, explain the rationale and measure progress, but we do not promise a particular position." },
  { question: "Do you optimise Google Business Profiles?", answer: "Yes, where the business is eligible and the profile forms part of the agreed Local SEO scope. The profile is reviewed alongside the website, services and locations rather than as an isolated checklist." },
  { question: "Do I need a page for every London borough?", answer: "Usually not. A location page should exist because it provides distinct value and supports a genuine search opportunity, not because a list of London boroughs exists." },
  { question: "Can you work with my existing website?", answer: "Yes. We first determine what should be retained, what needs improving and whether the current platform can support the agreed work properly. A rebuild is not automatically required." },
  { question: "Do you work with service-area businesses?", answer: "Yes. The strategy is based on the services you genuinely provide, the locations you can serve and the search opportunities that are commercially relevant." },
  { question: "Do you track calls and enquiries?", answer: "Where technically and commercially appropriate, we can configure measurement around forms, calls and other important actions. Tracking is designed to support decisions without sending enquiry content or personal data to analytics." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Services", item: new URL("/services", site.url).toString() },
    { "@type": "ListItem", position: 3, name: "SEO services", item: new URL("/services/seo", site.url).toString() },
    { "@type": "ListItem", position: 4, name: "Local SEO London", item: new URL("/services/local-seo-london", site.url).toString() },
  ],
};

const emailHref = `mailto:${site.email}?subject=${encodeURIComponent("Local SEO project enquiry — WD Marketing")}&body=${encodeURIComponent("Hello Wael,\n\nMy website: \nPrimary service: \nAreas I want to target: \nWhat I would like Local SEO to achieve: \n\nName: \nCompany: \n")}`;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className={diagonal ? styles.diagonalArrow : styles.arrow} aria-hidden="true"><ArrowIcon /></span>;
}

function GeneratedImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className={styles.imageSlot} style={{ aspectRatio: "1344 / 752" }}>
      <Image
        className={styles.image}
        src={src}
        alt={alt}
        width={1344}
        height={752}
        sizes="(max-width: 760px) calc(100vw - 28px), (max-width: 1024px) calc(100vw - 40px), 640px"
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

export default function LocalSeoLondonPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={serviceSchema({ name: "Local SEO London", description, pathname: "/services/local-seo-london", serviceType: "Local SEO" })} />
      <JsonLd data={breadcrumbSchema} />
      <Breadcrumbs items={[{label:"Services",href:"/services"},{label:"SEO services",href:"/services/seo"},{label:"Local SEO London",href:"/services/local-seo-london"}]} />

      <section className={styles.hero} id="local-seo-content" aria-labelledby="local-seo-title">
        <div className="container">
          <div className={styles.heroTopline}><span>Local SEO / London</span><span>Maps. Website. Enquiries.</span></div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="local-seo-title"><span>Local SEO London.</span>Be found where your customers are already looking.</h1>
              <p className={styles.intro}>WD Marketing connects your Google Business Profile, website, service pages, local search strategy and enquiry tracking into one system designed around commercially relevant local demand.</p>
              <div className={styles.actions}>
                <a className={styles.primaryButton} href="#local-seo-enquiry">Discuss my local SEO project <Arrow /></a>
                <a className={styles.textLink} href="#local-seo-work">See selected work <Arrow diagonal /></a>
              </div>
              <p className={styles.heroNote}>Founder-led. London focused. Search, website and conversion connected.</p>
            </div>
            <div className={styles.heroVisual}>
              <GeneratedImage src={images.hero} alt="Conceptual three-dimensional map of London with connected local search visibility points" priority />
              <div className={styles.heroCaption}><span>Local visibility</span><p>Right service.<br />Right area. Right next step.</p></div>
            </div>
          </div>
          <nav className={styles.sectionNav} aria-label="On this page">
            <a href="#local-seo-system"><span>01</span> Search system</a>
            <a href="#local-seo-deliverables"><span>02</span> What we deliver</a>
            <a href="#local-seo-work"><span>03</span> Selected work</a>
            <a href="#local-seo-faq"><span>04</span> Questions</a>
          </nav>
        </div>
      </section>

      <section className={styles.section} id="local-seo-system" aria-labelledby="journey-title">
        <div className="container">
          <div className={styles.sharedHeading}><SectionHeading id="journey-title" kicker="From search to enquiry" title={<>Being visible is only<br /><span>the first step.</span></>} intro="A local customer searches, compares, checks your profile, visits your website, looks for proof and decides whether to contact you. We work on that whole journey." /></div>
          <div className={local.journey} aria-label="Local search customer journey">
            {["Search","Maps","Website","Enquiry","Measurement"].map((item,index)=><div key={item}><span>0{index+1}</span><strong>{item}</strong></div>)}
          </div>
          <p className={local.journeyNote}>Visibility without a clear next step is unfinished work.</p>
        </div>
      </section>

      <section className={styles.perspective} aria-labelledby="problem-title">
        <div className={`container ${styles.perspectiveGrid}`}>
          <div><p className={styles.eyebrow}>Local search is competitive</p><h2 id="problem-title">Good at the work.<br /><span>Difficult to find.</span></h2></div>
          <div><p>The problem may be your Business Profile, the way services and locations are organised, the page Google chooses to rank, or a website that gets traffic but gives visitors little reason to enquire.</p><p>Local SEO works best when those problems are treated as connected parts of the same system.</p></div>
        </div>
      </section>

      <section className={styles.section} id="local-seo-deliverables" aria-labelledby="deliverables-title">
        <div className="container">
          <div className={styles.sharedHeading}><SectionHeading id="deliverables-title" kicker="The local search system" title={<>Everything important should<br /><span>reinforce everything else.</span></>} intro="We begin with the services you want to grow, the locations you genuinely cover and the searches most likely to create useful enquiries." /></div>
          <div className={styles.deliverables}>{deliverables.map((item,index)=><article key={item.title}><span className={styles.rowNumber}>0{index+1}</span><h3>{item.title}</h3><div><p>{item.copy}</p><p className={styles.output}><span>Output</span>{item.output}</p></div></article>)}</div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="maps-title">
        <div className={`container ${local.split}`}>
          <div>
            <p className={styles.eyebrow}>Google Maps & Business Profile</p>
            <h2 id="maps-title">Maps is not a separate<br /><span>marketing universe.</span></h2>
            <p>Your profile, website, reputation and wider local presence all help customers discover and evaluate your business. We therefore look at the system supporting the profile rather than treating optimisation as a collection of isolated edits.</p>
            <div className={local.flow}><span>GBP</span><b>→</b><span>Website</span><b>→</b><span>Service relevance</span><b>→</b><span>Proof</span><b>→</b><span>Enquiry</span></div>
          </div>
          <GeneratedImage src={images.maps} alt="Smartphone showing a conceptual local map interface with business location pins" />
        </div>
      </section>

      <section className={styles.approach} aria-labelledby="london-title">
        <div className="container">
          <div className={styles.sharedHeading}><SectionHeading id="london-title" kicker="London is not one search market" title={<>One city.<br /><span>Different local situations.</span></>} intro="Competition, proximity, services and customer intent vary across London. We prioritise locations based on real business value rather than producing pages simply because a borough exists." /></div>
          <div className={local.londonGrid}>
            <article><span>01</span><h3>Service value first</h3><p>Prioritise the work you most want to win and the locations you can genuinely serve.</p></article>
            <article><span>02</span><h3>Distinct pages only</h3><p>Create location content where it adds useful, specific value instead of duplicating the same page dozens of times.</p></article>
            <article><span>03</span><h3>Evidence before expansion</h3><p>Use search demand, current visibility and commercial opportunity to decide what deserves to be built next.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="businesses-title">
        <div className={`container ${local.splitReverse}`}>
          <GeneratedImage src={images.businesses} alt="Contemporary London local businesses representing service, hospitality and trade search demand" />
          <div>
            <p className={styles.eyebrow}>Built for local demand</p>
            <h2 id="businesses-title">Local SEO for businesses<br /><span>that need customers.</span></h2>
            <p>This approach is particularly useful where location and service intent influence the buying decision.</p>
            <div className={local.chips}>
              {["Trades & contractors","Property services","Stone & surfaces","Security","Professional services","Hospitality","Automotive services","Clinics & local services"].map(item=><span key={item}>{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="local-seo-work" aria-labelledby="work-title">
        <div className="container">
          <div className={styles.sharedHeading}><SectionHeading id="work-title" kicker="Selected work" title={<>Real businesses.<br /><span>Real search journeys.</span></>} intro="We use project evidence rather than invented ranking claims. These examples show how search architecture, website delivery and conversion thinking come together." /></div>
          <div className={styles.projectPair}>
            <article><div className={styles.projectCopy}><p className={styles.projectMeta}>London · Roofing</p><h3>MB Legacy Roofing</h3><p className={styles.projectService}>Web Design · Local SEO · Conversion</p><p>A legacy WordPress presence rebuilt into a fast, structured London roofing platform with crawlable service and location routes, preserved URLs and clear enquiry paths.</p><Link className={styles.textLink} href="/work/mb-legacy-roofing">View case study <Arrow diagonal /></Link></div></article>
            <article><div className={styles.projectCopy}><p className={styles.projectMeta}>London · Stone & worktops</p><h3>SMA Marble</h3><p className={styles.projectService}>Web Design · Local SEO · Conversion</p><p>A premium quote-led experience organised around material discovery, London service coverage, project proof and clear quote actions.</p><Link className={styles.textLink} href="/work/sma-marble">View case study <Arrow diagonal /></Link></div></article>
          </div>
          <article className={local.workWide}><p className={styles.projectMeta}>London · Stone restoration</p><h3>London Marble Stone</h3><p className={styles.projectService}>Website Development & SEO</p><p>Website and SEO work for a London marble restoration and stone polishing business, structured around specialist services and direct quote actions.</p><a className={styles.textLink} href="https://londonmarblestone.co.uk/" target="_blank" rel="noopener noreferrer">Visit the website <Arrow diagonal /></a></article>
        </div>
      </section>

      <section className={styles.approach} aria-labelledby="process-title">
        <div className="container">
          <div className={styles.sharedHeading}><SectionHeading id="process-title" kicker="How we work" title={<>No mystery.<br /><span>A clear sequence of decisions.</span></>} intro="The work expands only when the next step is justified by the business, the search opportunity and the evidence available." /></div>
          <ol className={local.process}>{steps.map((step,index)=><li key={step.title}><span>0{index+1}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="connected-title">
        <div className={`container ${styles.scopeGrid}`}>
          <div><p className={styles.eyebrow}>Strategy + implementation</p><h2 id="connected-title">An SEO recommendation is more useful<br /><span>when it can be built.</span></h2></div>
          <div>
            <p>A common SEO handover ends with a report and a list of changes for somebody else to design, code and measure. WD Marketing brings search strategy, web development, conversion thinking and measurement into the same conversation.</p>
            <ul><li>Strategy before volume</li><li>Implementation connected</li><li>Evidence before expansion</li><li>Founder-led delivery</li></ul>
            <Link className={styles.textLink} href="/services/web-conversion">Explore Web & Conversion <Arrow diagonal /></Link><br />
            <Link className={styles.textLink} href="/services/growth-infrastructure">Explore Growth Infrastructure <Arrow diagonal /></Link>
          </div>
        </div>
      </section>

      <section className={styles.section} id="local-seo-faq" aria-labelledby="faq-title">
        <div className={`container ${styles.faqGrid}`}>
          <div><p className={styles.eyebrow}>Before we begin</p><h2 id="faq-title">Good questions.<br /><span>Clear answers.</span></h2></div>
          <div className={styles.faqList}>{questions.map(({question,answer})=><details key={question}><summary>{question}<span className={styles.disclosureIcon} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.enquiry} id="local-seo-enquiry" aria-labelledby="enquiry-title">
        <div className={`container ${styles.enquiryGrid}`}>
          <div><p className={styles.eyebrow}>Your starting point</p><h2 id="enquiry-title">Tell us where you<br /><span>want to be found.</span></h2><p>Share your website, your primary service and the areas you want to grow. We will use that information to discuss the current search opportunity and what should be investigated first.</p></div>
          <div className={styles.enquiryAction}><a className={styles.primaryButton} href={emailHref}>Discuss my Local SEO project <Arrow diagonal /></a><p>No SEO passwords or account credentials are required at this stage.</p><a className={styles.emailLink} href={`mailto:${site.email}`}>{site.email}</a></div>
        </div>
      </section>
    </div>
  );
}

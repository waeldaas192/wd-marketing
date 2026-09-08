import type { Metadata } from "next";
import Link from "next/link";
import { SeoImageSlot } from "@/components/seo/SeoImageSlot";
import { seoImages } from "@/data/seoImages";
import { site } from "@/data/site";
import styles from "./seo.module.css";

const description = "SEO services for London businesses, connecting search strategy, website improvements and enquiry tracking. Discuss your project with WD Marketing.";
export const metadata: Metadata = {
  title: "SEO Agency London | SEO Services",
  description,
  alternates: { canonical: `${site.url}/services/seo` },
  openGraph: {
    title: "SEO Agency London | WD Marketing", description,
    url: `${site.url}/services/seo`, type: "website",
    images: [{ url: "/images/brand/wd-marketing-og-cover.jpg", width: 1200, height: 630, alt: "WD Marketing — Digital Growth Systems" }],
  },
  twitter: { card: "summary_large_image", title: "SEO Agency London | WD Marketing", description, images: ["/images/brand/wd-marketing-og-cover.jpg"] },
};

const deliverables = [
  { title: "Search priorities tied to your services", copy: "We review relevant searches, competitors and your existing pages against the work you want to win. The plan shows what to improve, what to create and where another page would simply repeat one you already have.", output: "Keyword-to-page plan" },
  { title: "Technical fixes in a clear order", copy: "We investigate how important pages are discovered and indexed, alongside problems that affect the visitor experience. Each priority has evidence, an implementation owner and a way to check the change.", output: "Prioritised technical action list" },
  { title: "Pages that answer buying questions", copy: "Your service pages should explain who you help, what is included and why someone should trust you. We bring content, design and development together around a clear next step.", output: "Page content, structure and internal links" },
  { title: "Local visibility that reflects your business", copy: "For eligible local businesses, we review Google Business Profile information alongside your service coverage and website content. The work reflects where you actually operate and what you genuinely offer.", output: "Local search priorities" },
  { title: "Reporting that helps you decide", copy: "We review search visibility and landing-page behaviour alongside valid enquiries. Where suitable tracking and sales information are available, we also examine lead quality and use it to choose the next priority.", output: "Progress review and next actions" },
];
const steps = [
  { title: "Understand the business", copy: "Agree which services, customers and locations matter most. Review your website and available measurement so the starting point is clear." },
  { title: "Find the useful opportunities", copy: "Assess the search landscape, important pages and technical barriers. Connect each priority to a problem, its value and the work required." },
  { title: "Make the agreed changes", copy: "Confirm what WD Marketing will deliver and what needs your team. Agree content, design, development and approval responsibilities before implementation." },
  { title: "Review. Refine. Move forward.", copy: "Check the completed work and available performance evidence. Use what we learn to decide what deserves attention next." },
];
const questions = [
  { question: "How long will it take to see results?", answer: "There is no single reliable timetable for every website. Your starting point, competition, scope and speed of implementation all matter. We establish a baseline and review progress at agreed intervals. Delivery milestones can be scheduled; rankings and revenue cannot be guaranteed by a date." },
  { question: "What is included in your SEO service?", answer: "Your proposal defines the work. It may include research, technical investigation, page content, implementation, local visibility and reporting. We specify what WD Marketing will deliver and what needs input from your team." },
  { question: "Do I need a new website?", answer: "Not automatically. We first review whether your current site can support the agreed work. If a template, platform or user journey creates a material limitation, we explain the issue and options before recommending a rebuild." },
  { question: "Can you work with our existing developer?", answer: "Yes, the work can be scoped around your existing development team. We agree responsibilities, technical recommendations, approval points and validation at the start, so each task has a clear owner." },
  { question: "How do you measure success?", answer: "We agree measures around your objective: relevant search visibility, useful landing-page visits and valid enquiries. Where your tracking and sales process support it, we connect this with qualified opportunities. A button click alone is not a confirmed lead." },
  { question: "Can you guarantee first place on Google?", answer: "No. Search positions are not under an agency’s control. We can define the work, explain the rationale and measure progress, but we do not promise a particular ranking or number of leads." },
];
const emailHref = `mailto:${site.email}?subject=${encodeURIComponent("SEO project enquiry — WD Marketing")}&body=${encodeURIComponent("Hello Wael,\n\nMy website: \nThe service or products I want to grow: \nMy target locations: \nWhat I would like SEO to achieve: \n\nName: \nCompany: \n")}`;
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className={styles.arrow} aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function SeoPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#seo-content">Skip to SEO page content</a>
      <section className={styles.hero} id="seo-content" aria-labelledby="seo-title">
        <div className="container">
          <div className={styles.heroTopline}>
            <nav aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page">SEO services</li></ol></nav>
            <span>Search strategy. Website delivery.</span>
          </div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="seo-title"><span>SEO agency London.</span>Built around the work you want to win.</h1>
              <p className={styles.intro}>WD Marketing connects search strategy, practical website improvements and enquiry tracking to help London businesses attract relevant opportunities.</p>
              <div className={styles.actions}><a className={styles.primaryButton} href="#seo-enquiry">Discuss my SEO project <Arrow /></a><a className={styles.textLink} href="#seo-work">Explore our work <Arrow diagonal /></a></div>
              <p className={styles.heroNote}>Founder-led. Clear priorities. Agreed implementation.</p>
            </div>
            <div className={styles.heroVisual}>
              <SeoImageSlot asset={seoImages.hero} number="01" priority />
              <div className={styles.heroCaption}><span>Start with the business.</span><p>The services you want to sell.<br />The people you want to reach.</p></div>
            </div>
          </div>
          <nav className={styles.sectionNav} aria-label="On this page"><a href="#seo-work"><span>01</span> Selected work</a><a href="#seo-deliverables"><span>02</span> What we deliver</a><a href="#seo-approach"><span>03</span> Our approach</a><a href="#seo-faq"><span>04</span> Your questions</a></nav>
        </div>
      </section>

      <section className={styles.section} id="seo-work" aria-labelledby="work-title">
        <div className="container">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Selected work</p><h2 id="work-title">Real businesses.<br /><span>Different search journeys.</span></h2></div><p>A restaurant booking. A stone restoration enquiry. A search for a specific car part. The website needs to match the way its customers search and choose.</p></div>
          <article className={styles.featuredProject}>
            <SeoImageSlot asset={seoImages.naranj} number="02" />
            <div className={styles.featuredCopy}><p className={styles.projectMeta}>Glasgow · Hospitality</p><h3>Naranj Restaurant</h3><p className={styles.projectService}>Website Design &amp; Local SEO</p><p>We built Naranj’s website and delivered local SEO focused on halal and Middle Eastern dining in Glasgow. The restaurant enjoys strong visibility in relevant searches, receives daily bookings and welcomes new customers.</p><a className={styles.textLink} href="https://naranj.co.uk/" target="_blank" rel="noopener noreferrer" aria-label="Visit Naranj Restaurant website (opens in a new tab)">Visit the website <Arrow diagonal /></a></div>
          </article>
          <div className={styles.projectPair}>
            <article><SeoImageSlot asset={seoImages.marble} number="03" /><div className={styles.projectCopy}><p className={styles.projectMeta}>London · Stone restoration</p><h3>London Marble Stone</h3><p className={styles.projectService}>Website Development &amp; SEO</p><p>We built the website and carried out SEO work for this London marble restoration and stone polishing business. Visitors can call, contact the team on WhatsApp or request a quote.</p><a className={styles.textLink} href="https://londonmarblestone.co.uk/" target="_blank" rel="noopener noreferrer" aria-label="Visit London Marble Stone website (opens in a new tab)">Visit the website <Arrow diagonal /></a></div></article>
            <article><SeoImageSlot asset={seoImages.exp} number="04" /><div className={styles.projectCopy}><p className={styles.projectMeta}>United Kingdom · Automotive ecommerce</p><h3>EXP Auto Parts</h3><p className={styles.projectService}>Ecommerce &amp; Product Search</p><p>A car-parts website project centred on product discoverability and part-number searches, helping connect specific search intent with the relevant products.</p><a className={styles.textLink} href="https://expautopart.co.uk/" target="_blank" rel="noopener noreferrer" aria-label="Visit EXP Auto Parts website (opens in a new tab)">Visit the website <Arrow diagonal /></a></div></article>
          </div>
          <aside className={styles.projectNote} aria-labelledby="project-scope-note"><h3 id="project-scope-note">Project scope &amp; ongoing support</h3><p>Each project is shaped by the client’s budget and priorities. Some clients continue with ongoing SEO and website development, while others pause further improvements after the initial work is completed due to budget constraints.</p></aside>
        </div>
      </section>

      <section className={styles.perspective} aria-labelledby="perspective-title"><div className={`container ${styles.perspectiveGrid}`}><div><p className={styles.eyebrow}>Visibility is the beginning</p><h2 id="perspective-title">Being found matters.<br /><span>So does what happens next.</span></h2></div><div><p>Can visitors quickly understand your service, see evidence they trust and make a relevant enquiry? We examine that journey alongside your search performance.</p><p>The priority is a website that helps the right person take the next step.</p><Link className={styles.textLink} href="/services/web-conversion">Explore web &amp; conversion <Arrow diagonal /></Link></div></div></section>

      <section className={styles.section} id="seo-deliverables" aria-labelledby="deliverables-title"><div className="container"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>SEO services, made practical</p><h2 id="deliverables-title">Know what the work<br /><span>is meant to achieve.</span></h2></div><p>A clear plan is useful only when someone can act on it. We agree the priorities, deliverables and responsibilities for your project.</p></div><div className={styles.deliverables}>{deliverables.map((item, index) => <article key={item.title}><span className={styles.rowNumber}>0{index + 1}</span><h3>{item.title}</h3><div><p>{item.copy}</p><p className={styles.output}><span>Output</span>{item.output}</p></div></article>)}</div></div></section>

      <section className={styles.approach} id="seo-approach" aria-labelledby="approach-title"><div className="container"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Our approach</p><h2 id="approach-title">Start with a plan<br /><span>you can inspect.</span></h2></div><p>Your starting point shapes the work. We keep the plan practical, the responsibilities clear and the next decision grounded in evidence.</p></div><ol className={styles.steps}>{steps.map((step, index) => <li key={step.title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol></div></section>

      <section className={styles.section} aria-labelledby="founder-title"><div className={`container ${styles.founderGrid}`}><div className={styles.founderImage}><SeoImageSlot asset={seoImages.founder} number="05" /></div><div className={styles.founderCopy}><p className={styles.eyebrow}>Founder-led, from the start</p><h2 id="founder-title">Strategy and execution.<br /><span>Part of the same conversation.</span></h2><p>WD Marketing is led by Wael, bringing web development, SEO and conversion thinking together around your business priorities.</p><p>Before work begins, you should know who is leading the project, who is making changes and what input is needed from you. Your proposal sets out those responsibilities alongside the scope.</p><div className={styles.founderSignature}><strong>Wael Daas</strong><span>Founder, WD Marketing</span></div><Link className={styles.textLink} href="/about">Meet the founder <Arrow diagonal /></Link></div></div></section>

      <section className={styles.scope} aria-labelledby="scope-title"><div className={`container ${styles.scopeGrid}`}><div><p className={styles.eyebrow}>Scope &amp; investment</p><h2 id="scope-title">What will your<br /><span>SEO project cost?</span></h2></div><div><p>The scope depends on your website, competition, services, locations and the amount of implementation required. A focused service website is different from a large online store.</p><ul><li>Your starting point and technical needs</li><li>The pages and markets that matter</li><li>The implementation and support required</li></ul><p>We’ll clarify the proposed work, responsibilities, fees and terms before you decide whether to proceed.</p><a className={styles.textLink} href="#seo-enquiry">Discuss a suitable scope <Arrow /></a></div></div></section>

      <section className={styles.section} id="seo-faq" aria-labelledby="faq-title"><div className={`container ${styles.faqGrid}`}><div><p className={styles.eyebrow}>Before we begin</p><h2 id="faq-title">Good questions.<br /><span>Clear answers.</span></h2></div><div className={styles.faqList}>{questions.map(({ question, answer }) => <details key={question}><summary>{question}<span className={styles.disclosureIcon} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>

      <section className={styles.enquiry} id="seo-enquiry" aria-labelledby="enquiry-title"><div className={`container ${styles.enquiryGrid}`}><div><p className={styles.eyebrow}>Your next move</p><h2 id="enquiry-title">Tell us about the work<br /><span>you want to win.</span></h2><p>Share your website, the service you want to grow and the problem you want to solve. We’ll use that information to discuss whether WD Marketing is a suitable fit.</p></div><div className={styles.enquiryAction}><a className={styles.primaryButton} href={emailHref}>Email my SEO project <Arrow diagonal /></a><p>Opens a draft in your email app.<br />Review your details, then send.</p><a className={styles.emailLink} href={`mailto:${site.email}`}>{site.email}</a></div></div></section>
    </div>
  );
}

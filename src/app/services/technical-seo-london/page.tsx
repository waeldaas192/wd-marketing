import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TechnicalSeoSystem } from "@/components/seo/TechnicalSeoSystem";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";
import { ArrowIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { site } from "@/data/site";
import base from "../seo/seo.module.css";
import styles from "./technical-seo.module.css";

const description = "Technical SEO London for crawling, indexation, canonicals, Core Web Vitals, structured data and migrations. Audits, fixes and validation by WD Marketing.";

export const metadata = pageMetadata(
  "Technical SEO London | Audits & Fixes",
  description,
  "/services/technical-seo-london",
);

const deliverables = [
  {
    title: "Technical SEO audit",
    copy: "We establish what Google and users can actually access, which pages matter commercially, and where technical issues are creating ambiguity, waste or lost opportunity.",
    output: "Prioritised technical issue map",
  },
  {
    title: "Crawlability & robots",
    copy: "We review robots.txt, response codes, crawl paths, broken links and blocked resources so important pages are reachable without confusing crawl controls with index controls.",
    output: "Crawl access and response plan",
  },
  {
    title: "Indexation & canonical signals",
    copy: "We inspect indexability, canonical tags, duplicate URLs, parameter variants, sitemap inclusion and redirect signals so the preferred URL is consistently reinforced.",
    output: "Indexation and canonical plan",
  },
  {
    title: "Site architecture & internal linking",
    copy: "We map important pages, click depth, orphaned routes and internal links so commercial pages are easier to discover and the site hierarchy reflects what matters.",
    output: "Search-led architecture",
  },
  {
    title: "Rendering & JavaScript",
    copy: "Where the stack relies on JavaScript, we check whether critical content, links and metadata are available in the rendered experience and whether implementation creates avoidable search risk.",
    output: "Rendering priorities",
  },
  {
    title: "Performance & Core Web Vitals",
    copy: "We diagnose layout, loading and interaction bottlenecks without treating a lab score as the business objective. Performance work is prioritised around real templates and user journeys.",
    output: "Performance implementation plan",
  },
  {
    title: "Structured data",
    copy: "We implement and validate structured data only where it accurately represents visible page content and a supported schema type adds useful machine-readable context.",
    output: "Validated schema implementation",
  },
  {
    title: "Migrations, redirects & legacy URLs",
    copy: "We protect useful URLs during redesigns and platform changes with deliberate redirects, canonical consistency, sitemap cleanup and post-launch validation.",
    output: "Migration and redirect map",
  },
];

const auditAreas = [
  { title: "Discovery", items: ["robots.txt", "XML sitemap", "status codes", "crawl paths"] },
  { title: "Indexation", items: ["meta robots", "canonicals", "duplicates", "URL variants"] },
  { title: "Architecture", items: ["click depth", "orphan pages", "internal links", "taxonomy"] },
  { title: "Rendering", items: ["HTML output", "JavaScript", "resource access", "metadata"] },
  { title: "Performance", items: ["LCP", "INP", "CLS", "template weight"] },
  { title: "Search signals", items: ["redirects", "structured data", "hreflang when relevant", "Search Console"] },
];

const process = [
  { title: "Baseline", copy: "Confirm the business-critical pages, current search signals, platform constraints and what has changed recently." },
  { title: "Diagnose", copy: "Crawl, inspect and group issues by impact, confidence and implementation cost rather than handing over a flat list of errors." },
  { title: "Implement", copy: "Fix the highest-value issues in code, templates, routing, metadata or platform configuration where the agreed scope allows it." },
  { title: "Validate", copy: "Re-crawl, test live responses and monitor Search Console so the released change is checked rather than assumed to work." },
];

const questions = [
  {
    question: "What is Technical SEO?",
    answer: "Technical SEO is the work that helps search engines access, render, interpret and index the right pages while reducing conflicting signals. It includes crawling, indexation, canonicals, architecture, redirects, structured data, performance and migration controls.",
  },
  {
    question: "Do I need a Technical SEO audit?",
    answer: "An audit is useful when organic visibility is underperforming, a site has been redesigned or migrated, important pages are not being indexed as expected, or the platform has accumulated technical complexity. The audit should lead to a prioritised implementation plan, not just a long list of warnings.",
  },
  {
    question: "Is robots.txt enough to keep a page out of Google?",
    answer: "No. robots.txt controls crawler access; it is not a reliable indexing switch by itself. Where a page must not be indexed, the correct method depends on whether Google can access the page and read the relevant indexing directive.",
  },
  {
    question: "Can you fix canonical problems?",
    answer: "Yes. We review rel=canonical alongside redirects, internal links, sitemap URLs and duplicate variants. Canonical tags are signals rather than commands, so the surrounding technical signals should point in the same direction.",
  },
  {
    question: "Do Core Web Vitals guarantee rankings?",
    answer: "No. We improve performance because it affects experience and technical quality, but we do not sell a Lighthouse or Core Web Vitals score as a ranking guarantee. A technically fast page still needs relevant content, authority and a clear search purpose.",
  },
  {
    question: "Can you handle website migrations?",
    answer: "Yes. We can plan URL mapping, redirects, canonicals, sitemap changes and post-launch checks for redesigns, CMS changes and coded rebuilds. The exact scope depends on the platform and the number of URLs involved.",
  },
  {
    question: "Can you work with my developer or existing platform?",
    answer: "Yes. We can implement directly where we control the stack, or provide precise developer-ready requirements and validation where another team owns deployment. WordPress, coded sites and ecommerce platforms need different implementation choices.",
  },
  {
    question: "Do you guarantee rankings after fixing technical issues?",
    answer: "No. Technical SEO removes or reduces technical barriers; it does not control Google's rankings. We validate the technical outcome and measure search performance without promising a position that no agency controls.",
  },
];

const emailHref = `mailto:${site.email}?subject=${encodeURIComponent("Technical SEO London project enquiry — WD Marketing")}&body=${encodeURIComponent("Hello Wael,\n\nWebsite: \nPlatform / CMS: \nMain technical concern: \nRecent migration or redesign: \nWhat I need Technical SEO to achieve: \n\nName: \nCompany: \n")}`;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className={diagonal ? base.diagonalArrow : base.arrow} aria-hidden="true"><ArrowIcon /></span>;
}

export default function TechnicalSeoLondonPage() {
  return (
    <div className={base.page}>
      <JsonLd data={serviceSchema({
        name: "Technical SEO London",
        description,
        pathname: "/services/technical-seo-london",
        serviceType: "Technical SEO",
      })} />

      <Breadcrumbs items={[
        { label: "Services", href: "/services" },
        { label: "SEO services", href: "/services/seo" },
        { label: "Technical SEO London", href: "/services/technical-seo-london" },
      ]} />

      <section className={base.hero} id="technical-seo-content" aria-labelledby="technical-seo-title">
        <div className="container">
          <div className={base.heroTopline}>
            <span>Technical SEO / London</span>
            <span>Crawl. Render. Index. Measure.</span>
          </div>

          <div className={base.heroGrid}>
            <div className={base.heroCopy}>
              <h1 id="technical-seo-title">
                <span>Technical SEO London.</span>
                Make every important page easier to crawl, index and understand.
              </h1>
              <p className={base.intro}>Founder-led Technical SEO audits and implementation for London businesses that need clearer crawl paths, cleaner indexation, stronger site architecture and safer migrations.</p>
              <div className={base.actions}>
                <a className={base.primaryButton} href="#technical-seo-enquiry">Discuss my Technical SEO project <Arrow /></a>
                <a className={base.textLink} href="#technical-seo-scope">See what we inspect <Arrow diagonal /></a>
              </div>
              <p className={base.heroNote}>Audit. Prioritise. Implement. Validate.</p>
            </div>

            <div className={base.heroVisual}>
              <TechnicalSeoSystem />
              <div className={base.heroCaption}>
                <span>Technical clarity</span>
                <p>Important URLs should send consistent signals before we ask content or authority to do more work.</p>
              </div>
            </div>
          </div>

          <nav className={base.sectionNav} aria-label="On this page">
            <a href="#technical-seo-deliverables"><span>01</span> What we deliver</a>
            <a href="#technical-seo-scope"><span>02</span> What we inspect</a>
            <a href="#technical-seo-work"><span>03</span> Selected work</a>
            <a href="#technical-seo-faq"><span>04</span> Questions</a>
          </nav>
        </div>
      </section>

      <section className={base.perspective} aria-labelledby="technical-problem-title">
        <div className={`container ${base.perspectiveGrid}`}>
          <div>
            <p className={base.eyebrow}>The technical layer matters</p>
            <h2 id="technical-problem-title">Good content can still sit<br /><span>behind bad signals.</span></h2>
          </div>
          <div>
            <p>A page can be valuable and still be difficult to crawl. It can be crawlable but excluded from the index. It can be indexed while competing with duplicate variants or pointing search engines towards the wrong canonical URL.</p>
            <p>Technical SEO is the work of making those signals clearer, then validating the live result.</p>
          </div>
        </div>
      </section>

      <section className={base.section} id="technical-seo-deliverables" aria-labelledby="deliverables-title">
        <div className="container">
          <div className={base.sharedHeading}>
            <SectionHeading
              id="deliverables-title"
              kicker="Technical SEO services"
              title={<>Fix the foundation.<br /><span>Then strengthen what sits on it.</span></>}
              intro="We do not prioritise issues because a crawler coloured them red. We prioritise them because they affect important URLs, search signals, user experience or the safety of a release."
            />
          </div>

          <div className={base.deliverables}>
            {deliverables.map((item, index) => (
              <article key={item.title}>
                <span className={base.rowNumber}>0{index + 1}</span>
                <h3>{item.title}</h3>
                <div>
                  <p>{item.copy}</p>
                  <p className={base.output}><span>Output</span>{item.output}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={base.approach} id="technical-seo-scope" aria-labelledby="scope-title">
        <div className="container">
          <div className={base.sharedHeading}>
            <SectionHeading
              id="scope-title"
              kicker="What we inspect"
              title={<>A technical audit should show<br /><span>where the search system breaks.</span></>}
              intro="The exact crawl depends on the platform, but these are the systems we normally inspect before deciding what deserves implementation."
            />
          </div>

          <div className={styles.auditGrid}>
            {auditAreas.map((area, index) => (
              <article key={area.title}>
                <span>0{index + 1}</span>
                <h3>{area.title}</h3>
                <ul>{area.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className={styles.checklistCta}>
            <span>Need a practical starting point?</span>
            <Link className={base.textLink} href="/insights/technical-seo-audit-checklist-london">Use the Technical SEO audit checklist <Arrow diagonal /></Link>
            <Link className={base.textLink} href="/insights/why-google-is-not-indexing-my-website">Diagnose why Google is not indexing a page <Arrow diagonal /></Link>
            <Link className={base.textLink} href="/insights/canonical-tags-duplicate-urls">Fix canonical tags &amp; duplicate URLs <Arrow diagonal /></Link>
            <Link className={base.textLink} href="/insights/core-web-vitals-website-speed-seo">Improve Core Web Vitals &amp; website speed <Arrow diagonal /></Link>
          </div>
        </div>
      </section>

      <section className={base.section} aria-labelledby="canonical-title">
        <div className={`container ${styles.split}`}>
          <div>
            <p className={base.eyebrow}>Canonical clarity</p>
            <h2 id="canonical-title">One preferred URL.<br /><span>Signals that agree.</span></h2>
            <p>Google may choose a different canonical from the one specified in markup. That is why we do not treat a canonical tag as a magic switch. Redirects, internal links, sitemap entries and the canonical element should support the same preferred URL wherever practical.</p>
            <Link className={base.textLink} href="/services/seo">Explore SEO &amp; Organic Growth <Arrow diagonal /></Link>
          </div>
          <div className={styles.signalStack} aria-label="Canonical signal alignment example">
            <div><span>301 redirect</span><strong>Preferred URL</strong></div>
            <div><span>Internal links</span><strong>Preferred URL</strong></div>
            <div><span>XML sitemap</span><strong>Preferred URL</strong></div>
            <div><span>rel=canonical</span><strong>Preferred URL</strong></div>
            <p>Four signals. One direction.</p>
          </div>
        </div>
      </section>

      <section className={styles.migrationSection} aria-labelledby="migration-title">
        <div className={`container ${styles.splitReverse}`}>
          <div className={styles.migrationVisual}>
            <div className={styles.routeRow}><span>OLD URL</span><i>301</i><strong>NEW URL</strong></div>
            <div className={styles.routeRow}><span>LEGACY PAGE</span><i>301</i><strong>MONEY PAGE</strong></div>
            <div className={styles.routeRow}><span>DUPLICATE</span><i>→</i><strong>CANONICAL</strong></div>
            <p>Redirects should be deliberate, direct and validated after launch.</p>
          </div>
          <div>
            <p className={styles.darkEyebrow}>Migrations &amp; redesigns</p>
            <h2 id="migration-title">Do not rebuild the website<br /><span>and accidentally rebuild the search problem.</span></h2>
            <p>Platform changes can alter URLs, navigation, rendering, metadata and response behaviour at the same time. We plan the transition before launch, then test the production routes after release.</p>
            <Link className={styles.darkLink} href="/services/web-conversion">Explore Web &amp; Conversion <Arrow diagonal /></Link>
          </div>
        </div>
      </section>

      <section className={base.section} id="technical-seo-work" aria-labelledby="work-title">
        <div className="container">
          <div className={base.sharedHeading}>
            <SectionHeading
              id="work-title"
              kicker="Selected work"
              title={<>Technical decisions.<br /><span>Applied to real builds.</span></>}
              intro="We do not manufacture ranking claims for a technical page. These examples show the architecture, migration and platform work that can sit underneath organic growth."
            />
          </div>

          <div className={styles.proofGrid}>
            <article>
              <p className={base.projectMeta}>London · Roofing</p>
              <h3>MB Legacy Roofing</h3>
              <p className={base.projectService}>Migration · SEO Architecture · Cloudflare</p>
              <p>A fragmented WordPress presence was rebuilt into a coded platform with 47 SEO routes, deliberate legacy redirects and a structured enquiry backend.</p>
              <Link className={base.textLink} href="/work/mb-legacy-roofing">View case study <Arrow diagonal /></Link>
            </article>

            <article>
              <p className={base.projectMeta}>London / UK · Stone &amp; surfaces</p>
              <h3>Stone Pro Worktops</h3>
              <p className={base.projectService}>Scalable Architecture · Technical SEO</p>
              <p>A product-heavy catalogue was structured around materials, colours and commercial landing pages, with technical SEO designed into the page framework.</p>
              <Link className={base.textLink} href="/work/stone-pro-worktops">View case study <Arrow diagonal /></Link>
            </article>

            <article>
              <p className={base.projectMeta}>United Kingdom · Automotive ecommerce</p>
              <h3>EXP Auto Parts</h3>
              <p className={base.projectService}>Catalogue Architecture · Searchability</p>
              <p>Complex product data and categories were organised around cleaner taxonomy, searchability and repeatable import workflows rather than unmanaged catalogue growth.</p>
              <Link className={base.textLink} href="/work/exp-auto-parts">View case study <Arrow diagonal /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className={base.approach} aria-labelledby="process-title">
        <div className="container">
          <div className={base.sharedHeading}>
            <SectionHeading
              id="process-title"
              kicker="How we work"
              title={<>Find the issue.<br /><span>Prove the fix.</span></>}
              intro="The work is organised around decisions and validation, not the number of rows in an audit export."
            />
          </div>
          <ol className={base.steps}>
            {process.map((step, index) => (
              <li key={step.title}>
                <span className={base.stepNumber}>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={base.section} aria-labelledby="connected-title">
        <div className={`container ${base.scopeGrid}`}>
          <div>
            <p className={base.eyebrow}>Connected SEO</p>
            <h2 id="connected-title">Technical SEO is a foundation.<br /><span>Not the entire growth strategy.</span></h2>
          </div>
          <div>
            <p>Once important pages can be crawled, indexed and understood cleanly, the next constraint may be relevance, local visibility, authority or the experience after the click.</p>
            <ul>
              <li>Need broader organic strategy? Use SEO &amp; Organic Growth.</li>
              <li>Need local search and Google Maps? Use Local SEO London.</li>
              <li>Need the website rebuilt around conversion? Use Web &amp; Conversion.</li>
            </ul>
            <div className={styles.connectedLinks}>
              <Link className={base.textLink} href="/services/seo">SEO &amp; Organic Growth <Arrow diagonal /></Link>
              <Link className={base.textLink} href="/services/local-seo-london">Local SEO London <Arrow diagonal /></Link>
              <Link className={base.textLink} href="/services/web-conversion">Web &amp; Conversion <Arrow diagonal /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className={base.section} id="technical-seo-faq" aria-labelledby="faq-title">
        <div className={`container ${base.faqGrid}`}>
          <div>
            <p className={base.eyebrow}>Before we begin</p>
            <h2 id="faq-title">Technical SEO questions.<br /><span>Clear answers.</span></h2>
          </div>
          <div className={base.faqList}>
            {questions.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}<span className={base.disclosureIcon} aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={base.enquiry} id="technical-seo-enquiry" aria-labelledby="enquiry-title">
        <div className={`container ${base.enquiryGrid}`}>
          <div>
            <p className={base.eyebrow}>Your starting point</p>
            <h2 id="enquiry-title">Show us the website.<br /><span>We will find the technical question.</span></h2>
            <p>Send the URL, platform and the problem you are seeing — indexing, migration, duplicate URLs, crawl issues, performance or something less obvious.</p>
          </div>
          <div className={base.enquiryAction}>
            <a className={base.primaryButton} href={emailHref}>Email my Technical SEO project <Arrow diagonal /></a>
            <p>Opens a structured draft in your email app.<br />No Search Console or hosting passwords are needed at this stage.</p>
            <a className={base.emailLink} href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </section>
    </div>
  );
}

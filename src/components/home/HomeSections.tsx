import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import { insights } from "@/data/insights";
import { faqData } from "@/data/faqs";
import { assets } from "@/data/assets";
import { site } from "@/data/site";
import { GrowthEngine } from "@/components/ui/GrowthEngine";
import { ArrowIcon } from "@/components/ui/Icons";
import { HeroStone } from "./HeroStone";
import styles from "./Home.module.css";

/* Scroll reveal hooks for the shared PageMotion controller (content stays visible without JavaScript). */
const reveal = (order = 0, media = false) => ({ "data-reveal": "", "data-reveal-order": order, "data-reveal-travel": "lg", ...(media ? { "data-reveal-media": "true" } : {}) });

const shippedFor = ["Bunyan London", "SMA Marble", "Stone Pro Worktops", "MB Legacy Roofing", "Floor Care London", "EXP Auto Parts"];

export function HomeHero() {
  return <section className={styles.hero} aria-labelledby="home-title" data-home-hero>
    <HeroStone/>
    <div className={`container ${styles.heroInner}`}>
      <p className={styles.heroKicker}>Web design, SEO and paid ads for London stone, worktop and home-service businesses</p>
      <h1 id="home-title" className={styles.heroTitle} data-display>
        <span>Be the one</span> <span>they call.</span>
      </h1>
      <div className={styles.heroFoot}>
        <div className={styles.heroCopy}>
          <p>Most trade firms lose the job before the phone rings: a slow page, a vague ad, a form nobody follows up. I build the website, run the search and ads, and trace every enquiry back to where it came from.</p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primary}>Start a project <ArrowIcon/></Link>
            <Link href="/work" className={styles.ghost}>See the work</Link>
          </div>
        </div>
        <Link href="/about" className={styles.founderChip}>
          <Image src={assets.founder.portrait.src} alt="" width={96} height={96} sizes="48px"/>
          <span>Founder-led from London.<br/>You work with Wael directly.</span>
        </Link>
      </div>
    </div>
    <div className={styles.shipped}>
      <div className={`container ${styles.shippedInner}`}>
        <span>Sites and campaigns shipped for</span>
        <ul aria-label="Clients">{shippedFor.map(name => <li key={name}>{name}</li>)}</ul>
      </div>
    </div>
  </section>;
}

const featuredSlug = "classic-kitchens-bathrooms-crm";
const gridSlugs = ["stone-pro-worktops", "sma-marble", "bunyan-london"];
const bySlug = (slug: string) => projects.find(project => project.slug === slug) as Project;

export function HomeWork() {
  const featured = bySlug(featuredSlug);
  const rest = gridSlugs.map(bySlug).filter(Boolean);
  return <section id="work" className={styles.work} aria-labelledby="work-heading">
    <div className="container">
      <div className={styles.head} {...reveal(0)}>
        <h2 id="work-heading" className={styles.display} data-display>Work that has to win quotes.</h2>
        <p>Each of these projects is judged on one thing: whether the right customers ask for a price and get followed up. Case studies show the build, the systems behind it and what gets measured.</p>
      </div>
      <Link href={`/work/${featured.slug}`} className={styles.feature} {...reveal(1)}>
        <div className={styles.featureMedia}><Image src={featured.image} alt={featured.imageAlt} width={1800} height={1125} sizes="(max-width: 900px) 100vw, 55vw"/></div>
        <div className={styles.featureCopy}>
          <div>
            <span className={styles.sector}>{featured.sector}, London</span>
            <h3>{featured.name}</h3>
            <p>{featured.headline}</p>
          </div>
          <span className={styles.readLink}>Read the case study <ArrowIcon/></span>
        </div>
      </Link>
      <div className={styles.workGrid}>{rest.map((project, index) => <Link key={project.slug} href={`/work/${project.slug}`} className={styles.card} {...reveal(index, true)}>
        <div className={styles.cardMedia}><Image src={project.image} alt={project.imageAlt} width={1200} height={900} sizes="(max-width: 900px) 100vw, 33vw"/></div>
        <span className={styles.sector}>{project.sector}</span>
        <h3>{project.name}</h3>
        <p>{project.headline}</p>
      </Link>)}</div>
      <Link href="/work" className={styles.underline} {...reveal(0)}>See all projects <ArrowIcon/></Link>
    </div>
  </section>;
}

export function HomeJourney() {
  return <section id="services" className={styles.journey} aria-labelledby="journey-heading">
    <div className={`container ${styles.journeyGrid}`}>
      <div className={styles.journeyCopy} {...reveal(0)}>
        <h2 id="journey-heading" className={styles.display} data-display>How a stranger becomes an enquiry.</h2>
        <p>Five moments decide whether you get the call. Most agencies own one of them. I connect all five, and you can start with whichever is leaking most.</p>
        <ul className={styles.serviceList} aria-label="Services">
          <li><Link href="/services/seo">SEO and organic growth</Link></li>
          <li><Link href="/services/local-seo-london">Local SEO London</Link></li>
          <li><Link href="/services/technical-seo-london">Technical SEO</Link></li>
          <li><Link href="/services/paid-acquisition">Google Ads</Link></li>
          <li><Link href="/services/meta-ads">Meta Ads</Link></li>
          <li><Link href="/services/web-conversion">Web design and build</Link></li>
          <li><Link href="/services/conversion-rate-optimisation">Conversion optimisation</Link></li>
          <li><Link href="/services/growth-infrastructure">Tracking, CRM and automation</Link></li>
        </ul>
      </div>
      <div id="process" className={styles.engine} {...reveal(1)}><GrowthEngine/></div>
    </div>
  </section>;
}

export function HomeSectors() {
  return <section className={styles.sectors} aria-labelledby="sectors-heading">
    <div className={`container ${styles.sectorsGrid}`}>
      <h2 id="sectors-heading" className={styles.display} data-display {...reveal(0)}>Trades I already know.</h2>
      <dl className={styles.sectorList} {...reveal(1)}>
        <div><dt><Link href="/industries/stone-worktops">Stone and worktops</Link></dt><dd>Slab catalogues, colour galleries and template-to-fit quote journeys. Most of my work sits here, so you skip the part where an agency learns what quartz is.</dd></div>
        <div><dt>Home services and contractors</dt><dd>Roofing, building, flooring, painting and security: local search, call-first mobile pages and Google Maps visibility across the areas you cover.</dd></div>
        <div><dt>Parts and ecommerce</dt><dd>Large catalogues with vehicle compatibility, product data at scale, and checkout tracking that ties revenue to the campaign behind it.</dd></div>
      </dl>
    </div>
  </section>;
}

export function HomeFounder() {
  const portrait = assets.founder.portrait;
  return <section id="about" className={styles.founder} aria-labelledby="founder-heading">
    <div className={`container ${styles.founderGrid}`}>
      <figure className={styles.portrait} {...reveal(0, true)}>
        <Image src={portrait.src} alt={portrait.alt} width={portrait.width} height={portrait.height} sizes="(max-width: 900px) 100vw, 40vw"/>
        <figcaption><strong>Wael Al-Daas</strong><span>Founder, WD Marketing, London</span></figcaption>
      </figure>
      <div className={styles.founderCopy} {...reveal(1)}>
        <h2 id="founder-heading" className={styles.display} data-display>You deal with the person doing the work.</h2>
        <p>I build the sites, set up the tracking and run the campaigns myself. The person who agrees the plan with you is the one who delivers it, so nothing gets lost between a design agency and an ads agency that never speak.</p>
        <ul className={styles.principles}>
          <li><strong>Strategy first</strong><span>Agree the commercial problem before choosing a channel.</span></li>
          <li><strong>One connected build</strong><span>Site, search, ads and tracking planned as one system.</span></li>
          <li><strong>Evidence over theatre</strong><span>Decisions based on enquiries and revenue, not vanity metrics.</span></li>
        </ul>
        <Link href="/about" className={styles.underline}>More about how I work <ArrowIcon/></Link>
      </div>
    </div>
  </section>;
}

const recentInsights = ["seo-that-generates-leads", "landing-page-before-more-ad-spend", "growth-stack-for-local-services"]
  .map(slug => insights.find(item => item.slug === slug))
  .filter((item): item is (typeof insights)[number] => Boolean(item));

export function HomeFAQ() {
  const items = faqData.rows.flatMap(row => row.faqItems);
  return <section id="faq" className={styles.faq} aria-labelledby="faq-heading" data-faq-section>
    <div className={`container ${styles.faqGrid}`}>
      <div className={styles.faqAside} {...reveal(0)}>
        <h2 id="faq-heading" className={styles.display} data-display>Before you get in touch.</h2>
        <p>Something else on your mind? <Link href="/contact">Ask it in the enquiry form.</Link></p>
        <nav aria-labelledby="insights-label" className={styles.insightLinks}>
          <span id="insights-label">Recent insights</span>
          {recentInsights.map(item => <Link key={item.slug} href={`/insights/${item.slug}`}>{item.title}</Link>)}
          <Link href="/insights" className={styles.underline}>All insights <ArrowIcon/></Link>
        </nav>
      </div>
      <div className={styles.accordion} {...reveal(1)}>{items.map((item, index) => <details key={item.id} open={index === 0}>
        <summary><span>{item.question}</span><i aria-hidden="true"/></summary>
        <p>{item.answer}</p>
      </details>)}</div>
    </div>
  </section>;
}

export function HomeCTA() {
  return <section className={styles.cta} aria-labelledby="cta-heading">
    <HeroStone variant="cta"/>
    <div className={`container ${styles.ctaInner}`} {...reveal(0)}>
      <h2 id="cta-heading" className={styles.ctaTitle} data-display>Tell me what you sell.</h2>
      <p>Send your website and the jobs you want more of. You will get a straight answer on what is holding enquiries back, and what it would take to fix it.</p>
      <div className={styles.actions}>
        <Link href="/contact" className={styles.primary}>Start a project <ArrowIcon/></Link>
        <a href={`mailto:${site.email}`} className={styles.mail}>{site.email}</a>
      </div>
    </div>
  </section>;
}

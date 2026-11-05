import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ArrowIcon } from "@/components/ui/Icons";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";
import { resolveMedia } from "@/lib/media";
import { projects } from "@/data/projects";
import { stoneWorktopsIndustry as industry } from "@/data/industries";
import styles from "./page.module.css";

const pathname = "/industries/stone-worktops";
const description = "Web design, SEO, Google and Meta Ads for stone and worktop companies. Discover real WD Marketing projects involving material catalogues, mobile browsing and quote journeys.";
const featuredSlugs = new Set<string>(industry.projectSlugs);
const featuredProjects = projects.filter(project => featuredSlugs.has(project.slug));

export const metadata = pageMetadata("Stone & Worktop Company Marketing | Web, SEO & Ads", description, pathname);

export default function StoneWorktopsPage() {
  return <>
    <JsonLd data={serviceSchema({
      name: "Websites, SEO and Advertising for Stone & Worktop Companies",
      description,
      pathname,
      serviceType: "Web Design, SEO and Digital Advertising",
    })}/>
    <Breadcrumbs items={[{ label: "Work", href: "/work" }, { label: industry.name, href: pathname }]}/>
    <PageHero eyebrow="Industries / Stone & worktops" title={industry.title} accent={industry.accent} intro={industry.summary}/>

    <section className="section" aria-labelledby="stone-challenges">
      <div className="container">
        <SectionHeading id="stone-challenges" kicker="The commercial challenge" title="Make material discovery lead somewhere useful." intro="A polished gallery matters, but customers also need to understand what is available, where you work and how to request an accurate quote."/>
        <div className={styles.challengeGrid}>
          {industry.challenges.map((challenge, index) => <article key={challenge.title} className={styles.challenge}>
            <span className={styles.number}>0{index + 1}</span>
            <h3>{challenge.title}</h3><p>{challenge.copy}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="stone-work">
      <div className="container">
        <SectionHeading id="stone-work" kicker="Selected real work" title="Projects in stone, surfaces and restoration." intro="These are genuine WD Marketing project pages, not AI-generated client mockups. We describe the delivered structure and customer experience; numerical outcomes are published only when independently verified."/>
        <div className={styles.projectGrid}>
          {featuredProjects.map(project => {
            const asset = resolveMedia({ src: project.image, alt: project.imageAlt, width: 1800, height: 1200 });
            return <article className={styles.project} key={project.slug}>
              {asset.ready && <div className={styles.projectMedia}><MediaFrame asset={asset} label={project.name} sizes="(max-width: 760px) 100vw, 50vw" contain/></div>}
              <div className={styles.projectCopy}>
                <p className="eyebrow">{project.sector}</p>
                <h3><Link href={`/work/${project.slug}`}>{project.name}</Link></h3>
                <p>{project.headline}</p>
                <Link className={styles.inlineLink} href={`/work/${project.slug}`}>View genuine case study <ArrowIcon size={16}/></Link>
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="stone-services">
      <div className="container">
        <SectionHeading id="stone-services" kicker="Connected capabilities" title="Four services. One clear customer journey." intro="Build useful pages first, acquire the right traffic, and measure completed enquiries without treating every click as a qualified lead."/>
        <div className={styles.services}>
          {industry.services.map((service, index) => <article key={service.href} className={styles.service}>
            <span className={styles.number}>0{index + 1}</span>
            <h3><Link href={service.href}>{service.name}</Link></h3>
            <p>{service.copy}</p>
            <Link className={styles.inlineLink} href={service.href}>Explore service <ArrowIcon size={16}/></Link>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="stone-cta">
      <div className={`container ${styles.cta}`}>
        <div>
          <p className="eyebrow">Discuss your project</p>
          <h2 id="stone-cta">Make your products easier to discover — and enquire about.</h2>
          <p>Tell us about your current website, material catalogue or lead generation challenge. We will discuss the scope before recommending a solution.</p>
        </div>
        <Link href="/contact" className="button button-primary">Start a project <ArrowIcon/></Link>
      </div>
    </section>
  </>;
}

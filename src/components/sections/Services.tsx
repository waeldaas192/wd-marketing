import Link from "next/link";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LibraryIcon, type LibraryIconName } from "@/components/ui/LibraryIcon";
import { ArrowIcon } from "@/components/ui/Icons";
import styles from "./Services.module.css";

const capabilities = [
  { icon: "panels-top-left", href: "/services/web-conversion" },
  { icon: "search", href: "/services/seo" },
  { icon: "megaphone", href: "/services/paid-acquisition" },
  { icon: "workflow", href: "/services/growth-infrastructure" },
] as const satisfies readonly { icon: LibraryIconName; href: string }[];

const specialistServices = [
  { label: "Conversion Optimisation", href: "/services/conversion-rate-optimisation", copy: "Landing pages, forms and enquiry journeys." },
  { label: "Local SEO London", href: "/services/local-seo-london", copy: "Google Maps, local search and service-area visibility." },
  { label: "Technical SEO London", href: "/services/technical-seo-london", copy: "Crawling, indexation, canonicals, migrations and performance." },
  { label: "Meta Ads", href: "/services/meta-ads", copy: "Facebook and Instagram lead generation with CRM feedback." },
] as const;

export function Services() {
  return <section id="services" className={styles.section} data-studio-section="services" aria-labelledby="services-heading">
    <div className="container">
      <SectionHeading id="services-heading" kicker="Capabilities" title={<>One growth system. <span>Not disconnected services.</span></>} intro="Web, search, paid acquisition and measurement designed to reinforce each other around one commercial objective." />
      <div className={styles.grid} data-studio-grid>
        {services.map((service, index) => <Link key={service.number} href={capabilities[index].href}
          className={styles.card} data-studio-card data-reveal="copy" data-reveal-order={index % 2}>
          <div data-studio-service-top>
            <span className="library-icon-frame" data-service-icon aria-hidden="true">
              <LibraryIcon name={capabilities[index].icon} />
            </span>
            <span className={styles.number} data-service-index aria-hidden="true">{service.number}</span>
          </div>
          <h3>{service.title}</h3><p>{service.description}</p>
          <ul className={styles.items}>{service.items.map(item => <li key={item}>{item}</li>)}</ul>
          <span className={styles.link}>Explore capability <ArrowIcon /></span>
        </Link>)}
      </div>
      <div className={styles.specialists} aria-label="Specialist services">
        <div className={styles.specialistIntro}>
          <span>Specialist services</span>
          <p>Go deeper when the bottleneck is specific.</p>
        </div>
        <div className={styles.specialistLinks}>
          {specialistServices.map(item => <Link key={item.href} href={item.href}><span><strong>{item.label}</strong><small>{item.copy}</small></span><ArrowIcon /></Link>)}
        </div>
      </div>
    </div>
  </section>;
}

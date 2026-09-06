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
    </div>
  </section>;
}

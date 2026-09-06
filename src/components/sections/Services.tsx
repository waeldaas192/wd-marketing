import Link from "next/link";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sculpture } from "@/components/ui/Sculpture";
import { ArrowIcon } from "@/components/ui/Icons";
import styles from "./Services.module.css";
const objects = ["browser", "search", "plane", "layers"] as const;
const hrefs = ["/services/web-conversion", "/services/seo", "/services/paid-acquisition", "/services/growth-infrastructure"];
export function Services() {
  return <section id="services" className={styles.section} data-studio-section="services" aria-labelledby="services-heading"><div className="container">
    <SectionHeading id="services-heading" kicker="Capabilities" title={<>One growth system. <span>Not disconnected services.</span></>} intro="Web, search, paid acquisition and measurement designed to reinforce each other around one commercial objective." />
    <div className={styles.grid} data-studio-grid>{services.map((service,index) => <Link key={service.number} href={hrefs[index]} className={styles.card} data-studio-card data-reveal="copy" data-reveal-order={index % 2}>
      <div data-studio-service-top><span className={styles.number} data-studio-number>{service.number}</span><Sculpture kind={objects[index]} /></div><h3>{service.title}</h3><p>{service.description}</p>
      <ul className={styles.items}>{service.items.map(item => <li key={item}>{item}</li>)}</ul>
      <span className={styles.link}>Explore capability <ArrowIcon/></span>
    </Link>)}</div>
  </div></section>;
}

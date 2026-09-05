import Link from "next/link";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Services.module.css";
const hrefs = ["/services/web-conversion", "/services/seo", "/services/paid-acquisition", "/services/growth-infrastructure"];
export function Services() {
  return <section id="services" className={styles.section} aria-labelledby="services-heading"><div className="container">
    <SectionHeading id="services-heading" kicker="Capabilities" title={<>One growth system. <span>Not disconnected services.</span></>} intro="Web, search, paid acquisition and measurement designed to reinforce each other around one commercial objective." />
    <div className={styles.grid}>{services.map((service,index) => <Link key={service.number} href={hrefs[index]} className={styles.card} data-reveal="copy" data-reveal-order={index % 2}>
      <span className={styles.number}>{service.number}</span><h3>{service.title}</h3><p>{service.description}</p>
      <ul className={styles.items}>{service.items.map(item => <li key={item}>↳ {item}</li>)}</ul>
      <span className={styles.link}>Explore capability <span aria-hidden="true">→</span></span>
    </Link>)}</div>
  </div></section>;
}

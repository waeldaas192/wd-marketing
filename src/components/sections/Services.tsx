import Link from "next/link";
import { services } from "@/data/services";
import styles from "./Services.module.css";

const serviceHrefs = ["/services/web-conversion", "/services/seo", "/services/paid-acquisition", "/services/growth-infrastructure"];

export function Services() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.kicker}>Capabilities</p>
            <h2 id="services-heading" className={styles.title}>One growth system. <span>Not disconnected services.</span></h2>
          </div>
          <p className={styles.intro}>Web, search, paid acquisition and measurement designed to reinforce each other around one commercial objective.</p>
        </div>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <Link href={serviceHrefs[index]} key={service.number} className={styles.card}>
              <span className={styles.number}>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className={styles.items}>{service.items.map((item) => <span key={item}>↳ {item}</span>)}</div>
              <div className={styles.link}>Explore capability <span>→</span></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

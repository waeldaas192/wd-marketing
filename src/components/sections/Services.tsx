import Link from "next/link";
import { services } from "@/data/services";

const serviceHrefs = ["/services/web-conversion", "/services/seo", "/services/paid-acquisition", "/services/growth-infrastructure"];

export function Services() {
  return (
    <section id="services" className="section border-y border-white/10 bg-white/[.018]">
      <div className="container">
        <p className="eyebrow mb-5">Capabilities</p>
        <h2 className="h2 max-w-[1050px]">
          One growth system.
          <span className="text-white/35"> Not disconnected services.</span>
        </h2>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 md:grid-cols-2">
          {services.map((service, index) => (
            <Link href={serviceHrefs[index]} key={service.number} className="service-home-card bg-[#090c11] p-8 md:p-10">
              <div className="text-xs text-white/28">{service.number}</div>
              <h3 className="mt-8 text-3xl font-semibold tracking-[-.04em]">{service.title}</h3>
              <p className="lead mt-4 max-w-[530px]">{service.description}</p>
              <div className="mt-9 grid gap-2 text-sm text-white/55">
                {service.items.map((item) => <span key={item}>↳ {item}</span>)}
              </div>
              <div className="mt-8 text-sm font-bold">Explore capability →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

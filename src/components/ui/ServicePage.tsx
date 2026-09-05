import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";

export type ServicePageData = {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  outcomes: string[];
  capabilities: { title: string; copy: string }[];
  process: { title: string; copy: string }[];
};

export function ServicePage({ data }: { data: ServicePageData }) {
  return (
    <>
      <PageHero eyebrow={data.eyebrow} title={data.title} accent={data.accent} intro={data.intro} />
      <section className="section border-y border-white/10">
        <div className="container split-heading">
          <div><p className="eyebrow">Commercial outcome</p><h2 className="h2">Built around what the business needs to change.</h2></div>
          <div className="outcome-list">{data.outcomes.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow mb-5">What we build</p>
          <div className="service-detail-grid">{data.capabilities.map((item, index) => <article key={item.title} className="card"><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
        </div>
      </section>
      <section className="section border-y border-white/10 bg-white/[.018]">
        <div className="container">
          <p className="eyebrow mb-5">Delivery model</p>
          <div className="service-process">{data.process.map((item, index) => <div key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></div>)}</div>
        </div>
      </section>
      <section className="section"><div className="container"><div className="inline-cta"><div><p className="eyebrow">Start with the problem</p><h2>Need this capability inside a larger growth system?</h2></div><Link href="/contact" className="button button-primary">Start a project ↗</Link></div></div></section>
    </>
  );
}

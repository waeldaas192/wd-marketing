import { GrowthEngine } from "@/components/ui/GrowthEngine";

export function Hero() {
  return <section className="signature-hero">
    <div className="hero-ambient" aria-hidden="true"/>
    <div className="container">
      <div className="hero-kicker reveal"><span>DIGITAL GROWTH SYSTEMS</span><span>LONDON · UK</span></div>
      <div className="hero-title-wrap">
        <h1 className="signature-title"><span>ATTENTION</span><span className="second">INTO <em>GROWTH.</em></span></h1>
        <p className="hero-side-note reveal">STRATEGY / EXPERIENCE / SEARCH / PAID / MEASUREMENT</p>
      </div>
      <div className="hero-intro reveal">
        <p>We design the digital system between being discovered and being chosen — high-performance websites, search and paid acquisition connected to measurable growth.</p>
        <div className="hero-actions"><a href="/contact" className="button button-primary">Start a project ↗</a><a href="/work" className="hero-link">Explore selected work →</a></div>
      </div>
      <div className="engine-wrap reveal"><GrowthEngine/></div>
      <div className="hero-bottom reveal"><span>SCROLL TO ENTER THE SYSTEM</span><span>01 / 06</span></div>
    </div>
  </section>;
}

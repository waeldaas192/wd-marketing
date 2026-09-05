type PageHeroProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  intro: string;
};

export function PageHero({ eyebrow, title, accent, intro }: PageHeroProps) {
  return (
    <section className="page-hero grid-line">
      <div className="container relative z-10">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}{accent ? <><br /><span>{accent}</span></> : null}</h1>
        <div className="page-hero-intro"><p>{intro}</p></div>
      </div>
    </section>
  );
}

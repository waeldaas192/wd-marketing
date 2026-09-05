const principles = [
  ["01", "Strategy before channels", "We choose the commercial route before the marketing tactic."],
  ["02", "Measurement before scale", "Every meaningful action is designed to be attributable."],
  ["03", "Conversion over vanity", "Traffic only matters when it creates business opportunity."],
];

export function Proof() {
  return (
    <section className="proof-band border-y border-white/10">
      <div className="container">
        <div className="grid gap-0 lg:grid-cols-[.8fr_1.2fr]">
          <div className="py-12 lg:border-r lg:border-white/10 lg:pr-14">
            <p className="eyebrow">The standard</p>
            <h2 className="mt-5 max-w-[480px] text-3xl font-semibold leading-[1.04] tracking-[-.045em] md:text-4xl">
              Marketing should operate like a system, not a collection of tasks.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3">
            {principles.map(([number, title, copy]) => (
              <article key={number} className="proof-principle">
                <span>{number}</span><strong>{title}</strong><p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

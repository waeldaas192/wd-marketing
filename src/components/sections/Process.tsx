const steps = [
  ["01", "Discover", "Understand the commercial problem, market, customer and evidence."],
  ["02", "Strategy", "Choose the channels and positioning with the highest expected leverage."],
  ["03", "Build", "Create the experience, tracking and acquisition infrastructure."],
  ["04", "Acquire", "Capture high-intent demand across organic and paid channels."],
  ["05", "Measure", "Connect behaviour, leads and revenue to decision-making."],
  ["06", "Scale", "Double down on what compounds and remove what does not."],
];

export function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <p className="eyebrow mb-5">Our operating system</p>
        <h2 className="h2 max-w-[900px]">
          Traffic isn&apos;t the goal.
          <span className="text-white/35"> Growth is.</span>
        </h2>

        <div className="mt-16 border-t border-white/10">
          {steps.map(([number, title, copy]) => (
            <div key={number} className="grid gap-4 border-b border-white/10 py-8 md:grid-cols-[80px_300px_1fr] md:items-center">
              <div className="text-xs text-white/30">{number}</div>
              <div className="text-2xl font-semibold tracking-[-.03em]">{title}</div>
              <p className="lead max-w-[600px]">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

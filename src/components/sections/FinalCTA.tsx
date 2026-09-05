import Link from "next/link";
export function FinalCTA() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white p-8 text-black md:p-14 lg:p-20">
          <div className="absolute right-[-10%] top-[-80%] h-[520px] w-[520px] rounded-full bg-[#c9d4ff] blur-3xl" />
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[.15em] text-black/45">Start a project</p>
            <h2 className="mt-6 max-w-[950px] text-[clamp(3rem,7vw,7.5rem)] font-semibold leading-[.88] tracking-[-.07em]">
              Have a growth problem?
              <br />
              Let&apos;s solve it.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="button !border-black/10 !bg-black !text-white">
                Tell us about your project →
              </Link>
              <span className="flex items-center px-3 text-sm text-black/45">
                London · UK · Remote
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

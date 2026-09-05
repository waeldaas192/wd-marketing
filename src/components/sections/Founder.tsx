import Image from "next/image";
import { assets } from "@/data/assets";

export function Founder() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="card grid overflow-hidden md:grid-cols-[.9fr_1.1fr]">
          <div className="relative min-h-[480px] overflow-hidden">
            <Image
              src={assets.founder.portrait.src}
              alt={assets.founder.portrait.alt}
              width={assets.founder.portrait.width}
              height={assets.founder.portrait.height}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          </div>

          <div className="p-8 md:p-12 lg:p-16">
            <p className="eyebrow">Founder-led</p>
            <h2 className="mt-6 text-4xl font-semibold leading-[.98] tracking-[-.055em] md:text-6xl">
              Strategy and execution should not live in different rooms.
            </h2>
            <p className="lead mt-8 max-w-[640px]">
              WD Marketing is led by Wael, combining web development, search,
              paid acquisition and conversion thinking around a single commercial objective:
              helping businesses turn digital attention into measurable opportunity.
            </p>
            <div className="mt-10 text-sm font-bold">
              Wael · Founder & Digital Growth Strategist
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

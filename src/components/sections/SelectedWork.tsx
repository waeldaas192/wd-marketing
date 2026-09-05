import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export function SelectedWork() {
  return (
    <section id="work" className="section">
      <div className="container">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5">Selected work</p>
            <h2 className="h2 max-w-[850px]">Proof lives in the work.</h2>
          </div>
          <p className="lead max-w-[390px]">
            Real business problems approached as connected systems, not isolated marketing tasks.
          </p>
        </div>

        <div className="grid gap-5">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="group card grid min-h-[440px] overflow-hidden md:grid-cols-[.8fr_1.2fr]"
            >
              <div className="flex flex-col justify-between p-8 md:p-10">
                <div>
                  <div className="text-xs text-white/30">0{index + 1}</div>
                  <div className="mt-7 text-xs uppercase tracking-[.15em] text-white/45">
                    {project.type}
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-.045em] md:text-5xl">
                    {project.name}
                  </h3>
                  <p className="lead mt-5 max-w-[500px]">{project.headline}</p>
                </div>

                <Link href={`/work/${project.slug}`} className="mt-10 text-sm font-bold">
                  View case study →
                </Link>
              </div>

              <div className="relative min-h-[320px] overflow-hidden bg-[#0b0f16]">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={1800}
                  height={1200}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

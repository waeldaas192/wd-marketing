import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { projects } from "@/data/projects";
export const metadata: Metadata = { title: "Work", description: "Selected WD Marketing work across web, SEO, acquisition and growth systems." };
export default function WorkPage(){
  return <>
    <PageHero eyebrow="Selected work" title="Business problems." accent="Built into systems." intro="A selection of projects where web, search, acquisition and operations are treated as connected parts of one commercial problem." />
    <section className="section"><div className="container work-index">
      {projects.map((project, index) => <Link href={`/work/${project.slug}`} key={project.slug} className="work-index-card">
        <div><span>0{index + 1}</span><small>{project.type}</small></div>
        <div><h2>{project.name}</h2><p>{project.headline}</p></div><i>↗</i>
      </Link>)}
    </div></section>
  </>;
}

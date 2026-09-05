import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProject } from "@/data/projects";

export function generateStaticParams(){ return projects.map(({slug}) => ({slug})); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const {slug}=await params; const project=getProject(slug); if(!project) return {};
  return { title: project.name, description: project.headline };
}
export default async function CaseStudyPage({ params }: { params: Promise<{slug:string}> }) {
  const {slug}=await params; const project=getProject(slug); if(!project) notFound();
  return <>
    <section className="case-hero grid-line"><div className="container relative z-10">
      <div className="case-meta"><span>{project.type}</span><span>{project.location}</span></div>
      <h1>{project.name}</h1><p>{project.headline}</p>
      <div className="case-visual overflow-hidden">
        <Image src={project.image} alt={project.imageAlt} width={1800} height={1200} className="h-full w-full object-cover" priority />
      </div>
    </div></section>
    <section className="section"><div className="container case-grid"><aside><span>Sector</span><strong>{project.sector}</strong><span>Location</span><strong>{project.location}</strong><span>Scope</span><strong>{project.type}</strong></aside><article><p className="eyebrow">The challenge</p><h2>{project.challenge}</h2></article></div></section>
    <section className="section border-y border-white/10 bg-white/[.018]"><div className="container case-columns"><div><p className="eyebrow">Strategy</p>{project.strategy.map((item,index)=><div className="case-line" key={item}><span>0{index+1}</span><p>{item}</p></div>)}</div><div><p className="eyebrow">Deliverables</p>{project.deliverables.map((item,index)=><div className="case-line" key={item}><span>0{index+1}</span><p>{item}</p></div>)}</div></div></section>
    <section className="section"><div className="container"><div className="grid gap-5 md:grid-cols-12">{project.gallery.map((image,index)=><figure key={image.src} className={index===1 ? "overflow-hidden rounded-[28px] border border-white/10 md:col-span-5" : "overflow-hidden rounded-[28px] border border-white/10 md:col-span-7"}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} className="h-full w-full object-cover" /></figure>)}</div></div></section>
    <section className="section"><div className="container"><div className="evidence-card"><p className="eyebrow">Evidence policy</p><h2>No invented numbers.</h2><p>{project.evidence}</p></div><div className="mt-12"><Link href="/contact" className="button button-primary">Discuss a similar project ↗</Link></div></div></section>
  </>;
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { projects,getProject } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import { resolveMedia } from "@/lib/media";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { CaseGallery } from "@/components/ui/CaseGallery";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
export function generateStaticParams(){return projects.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=getProject(slug);return project?pageMetadata(project.name,project.headline,`/work/${slug}`):{};}
export default async function CaseStudyPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const project=getProject(slug);if(!project)notFound();
  const next=projects[(projects.findIndex(item=>item.slug===slug)+1)%projects.length];
  return <><Breadcrumbs items={[{label:"Work",href:"/work"},{label:project.name,href:`/work/${slug}`} ]}/>
    <section className="case-hero"><div className="container"><div className="case-meta"><span>{project.type}</span><span>{project.location}</span></div><h1>{project.name}</h1><p>{project.headline}</p><div className="case-visual overflow-hidden"><MediaFrame asset={resolveMedia({src:project.image,alt:project.imageAlt,width:1800,height:1200})} label={project.name} priority sizes="(max-width:1280px) 100vw, 1280px"/></div></div></section>
    <section className="section" data-reveal><div className="container case-grid"><aside><span>Sector</span><strong>{project.sector}</strong><span>Location</span><strong>{project.location}</strong><span>Scope</span><strong>{project.type}</strong></aside><article><p className="eyebrow">The challenge</p><h2>{project.challenge}</h2></article></div></section>
    <section className="section" data-reveal><div className="container case-columns"><div><h2 className="eyebrow">Strategy</h2>{project.strategy.map((item,index)=><div className="case-line" key={item}><span>0{index+1}</span><p>{item}</p></div>)}</div><div><h2 className="eyebrow">Deliverables</h2>{project.deliverables.map((item,index)=><div className="case-line" key={item}><span>0{index+1}</span><p>{item}</p></div>)}</div></div></section>
    <section className="section"><div className="container"><h2 className="h2 gallery-title">The experience</h2><CaseGallery images={project.gallery.map(resolveMedia)} project={project.name}/></div></section>
    <section className="section"><div className="container"><div className="evidence-card"><p className="eyebrow">Measurement</p><h2>Evidence before claims.</h2><p>{project.evidence}</p></div><div className="related-navigation"><Link href="/contact" className="button button-primary">Discuss a similar project ↗</Link><Link href={`/work/${next.slug}`}>Next project: {next.name} →</Link></div></div></section>
  </>;
}

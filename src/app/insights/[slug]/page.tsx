import { notFound } from "next/navigation";
import Link from "next/link";
import { insights,getInsight } from "@/data/insights";
import { insightContent,readingTime } from "@/data/insight-content";
import { pageMetadata } from "@/lib/metadata";
import { resolveMedia } from "@/lib/media";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
export function generateStaticParams(){return insights.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=getInsight(slug);return item?pageMetadata(item.title,item.summary,`/insights/${slug}`,true):{};}
export default async function InsightPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const item=getInsight(slug);if(!item)notFound();const sections=insightContent[slug]||[];
  return <><Breadcrumbs items={[{label:"Insights",href:"/insights"},{label:item.title,href:`/insights/${slug}`} ]}/><article className="article-shell"><header className="article-head container"><p className="eyebrow">{item.category} · {readingTime(slug)}</p><h1>{item.title}</h1><p>{item.summary}</p><div className="article-media"><MediaFrame asset={resolveMedia({src:item.image,alt:item.imageAlt,width:1600,height:1000})} label={item.title} priority sizes="(max-width:1280px) 100vw, 1280px"/></div></header><div className="article-body"><nav className="article-toc" aria-label="In this article"><p>In this article</p><ol>{sections.map(section=><li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav>{sections.map(section=><section id={section.id} key={section.id}><h2>{section.title}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</section>)}<aside className="article-note">A practical working framework from WD Marketing. It is not a prediction or guarantee of results.</aside><div className="related-navigation"><Link href="/insights">← All insights</Link><Link href="/contact" className="button button-primary">Discuss your project ↗</Link></div></div></article></>;
}

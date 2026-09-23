import { notFound } from "next/navigation";
import Link from "next/link";
import { insights,getInsight } from "@/data/insights";
import { insightContent,readingTime } from "@/data/insight-content";
import { pageMetadata } from "@/lib/metadata";
import { resolveMedia } from "@/lib/media";
import { articleSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowIcon } from "@/components/ui/Icons";

const relatedServiceByCategory: Record<string, { href: string; label: string }> = {
  "Technical SEO": { href: "/services/technical-seo-london", label: "Technical SEO London" },
  "SEO": { href: "/services/seo", label: "SEO services" },
  "Paid Acquisition": { href: "/services/paid-acquisition", label: "Paid acquisition" },
  "Growth Systems": { href: "/services/growth-infrastructure", label: "Growth infrastructure" },
};
export function generateStaticParams(){return insights.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=getInsight(slug);return item?pageMetadata(item.seoTitle || item.title,item.summary,`/insights/${slug}`,true):{};}
export default async function InsightPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const item=getInsight(slug);if(!item)notFound();const sections=insightContent[slug]||[];const relatedService=relatedServiceByCategory[item.category] || { href: "/services", label: "Explore services" };
  return <><JsonLd data={articleSchema(item)} /><Breadcrumbs items={[{label:"Insights",href:"/insights"},{label:item.title,href:`/insights/${slug}`} ]}/><article className="article-shell"><header className="article-head container"><p className="eyebrow">{item.category} · {readingTime(slug)}</p><h1>{item.title}</h1><p>{item.summary}</p><div className="article-media"><MediaFrame asset={resolveMedia({src:item.image,alt:item.imageAlt,width:1600,height:1000})} label={item.title} priority sizes="(max-width:1280px) 100vw, 1280px"/></div></header><div className="article-body"><nav className="article-toc" aria-label="In this article"><p>In this article</p><ol>{sections.map(section=><li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav>{sections.map(section=><section id={section.id} key={section.id}><h2>{section.title}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.bullets?.length?<ul className="article-checklist">{section.bullets.map(item=><li key={item}><span aria-hidden="true">✓</span><span>{item}</span></li>)}</ul>:null}{section.links?.length?<div className="article-resources" aria-label={`Resources for ${section.title}`}>{section.links.map(link=>link.href.startsWith("/")?<Link key={link.href} href={link.href}>{link.label}<ArrowIcon direction="up-right" size={16}/></Link>:<a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowIcon direction="up-right" size={16}/></a>)}</div>:null}</section>)}<aside className="article-note">A practical working framework from WD Marketing. It is not a prediction or guarantee of results. <Link href={relatedService.href}>Related service: {relatedService.label}</Link>.</aside><div className="related-navigation"><Link href="/insights"><ArrowIcon direction="left" size={18}/>All insights</Link><Link href="/contact" className="button button-primary">Discuss your project<ArrowIcon direction="up-right" size={18}/></Link></div></div></article></>;
}

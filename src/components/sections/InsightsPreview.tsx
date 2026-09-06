import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Icons";
import { insights } from "@/data/insights";
import { readingTime } from "@/data/insight-content";
import { resolveMedia } from "@/lib/media";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function InsightsPreview(){return <section className="section" data-studio-section="insights" aria-labelledby="insights-heading" data-reveal><div className="container"><SectionHeading id="insights-heading" kicker="Insights" title="Better questions. Better decisions." intro="Practical thinking on search, conversion and the systems behind sustainable acquisition."/><div className="resource-grid">{insights.map(item=><article className="resource-card" data-studio-card key={item.slug}><MediaFrame asset={resolveMedia({src:item.image,alt:item.imageAlt,width:1600,height:1000})} label={item.category}/><div className="resource-copy"><span>{item.category} · {readingTime(item.slug)}</span><h3>{item.title}</h3><p>{item.summary}</p><Link href={`/insights/${item.slug}`}>Read insight <ArrowIcon/></Link></div></article>)}</div></div></section>;}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { insights } from "@/data/insights";
export const metadata: Metadata = { title:"Insights", description:"Practical thinking on SEO, paid acquisition, conversion, web and growth infrastructure." };
export default function InsightsPage(){return <><PageHero eyebrow="Insights" title="Useful thinking." accent="No filler." intro="Practical field notes on building acquisition systems, improving websites and turning measurement into better decisions."/><section className="section"><div className="container insight-grid">{insights.map(item=><Link href={`/insights/${item.slug}`} key={item.slug} className="insight-card card !overflow-hidden"><div className="relative -mx-6 -mt-6 mb-6 aspect-[16/10] overflow-hidden md:-mx-7 md:-mt-7"><Image src={item.image} alt={item.imageAlt} width={1600} height={1000} className="h-full w-full object-cover transition duration-700 hover:scale-[1.025]" /></div><div><span>{item.category}</span><small>{item.read}</small></div><h2>{item.title}</h2><p>{item.summary}</p><i>Read insight →</i></Link>)}</div></section></>}

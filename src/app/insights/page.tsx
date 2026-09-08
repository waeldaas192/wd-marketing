import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CollectionIndex } from "@/components/ui/CollectionIndex";
import { insights } from "@/data/insights";
import { resolveMedia } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("Insights","Practical thinking on SEO, paid acquisition, conversion and growth infrastructure.","/insights");
export default function InsightsPage(){return <><Breadcrumbs items={[{label:"Insights",href:"/insights"}]}/><PageHero eyebrow="Insights" title="Useful thinking." accent="No filler." intro="Practical field notes on building acquisition systems, improving websites and turning measurement into better decisions."/><section className="section"><div className="container"><CollectionIndex label="insights" items={insights.map(item=>({title:item.title,href:`/insights/${item.slug}`,summary:item.summary,category:item.category,asset:resolveMedia({src:item.image,alt:item.imageAlt,width:1600,height:1000})}))}/></div></section></>;}

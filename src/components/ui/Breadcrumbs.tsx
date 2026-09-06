import Link from "next/link";
import { site } from "@/data/site";
export function Breadcrumbs({ items }: { items: {label:string;href:string}[] }) {
  const trail=[{label:"Home",href:"/"},...items];
  const schema={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:trail.map((item,index)=>({"@type":"ListItem",position:index+1,name:item.label,item:new URL(item.href,site.url).toString()}))};
  return <><nav className="breadcrumbs container" aria-label="Breadcrumb"><ol>{trail.map((item,index)=><li key={item.href}>{index===trail.length-1?<span aria-current="page">{item.label}</span>:<Link href={item.href}>{item.label}</Link>}</li>)}</ol></nav><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/></>;
}

"use client";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { MediaAsset } from "@/lib/media";
import { MediaFrame } from "./MediaFrame";
import "./CollectionIndex.css";
export type CollectionItem={title:string;href:string;summary:string;category:string;asset:MediaAsset};
export function CollectionIndex({items,label}:{items:CollectionItem[];label:string}){
  const id=useId();const [query,setQuery]=useState(""),[category,setCategory]=useState("All");
  const categories=["All",...new Set(items.map(item=>item.category))];
  const visible=useMemo(()=>items.filter(item=>(category==="All"||item.category===category)&&`${item.title} ${item.summary} ${item.category}`.toLowerCase().includes(query.trim().toLowerCase())),[items,query,category]);
  return <div data-collection><div className="collection-tools"><label htmlFor={`${id}-search`}>Search {label}<input id={`${id}-search`} type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder={`Search ${label}…`}/></label><label htmlFor={`${id}-category`}>Filter by topic<select id={`${id}-category`} value={category} onChange={event=>setCategory(event.target.value)}>{categories.map(item=><option key={item}>{item}</option>)}</select></label></div><p className="collection-count" role="status">{visible.length} {visible.length===1?"result":"results"}</p><div className="resource-grid">{visible.map(item=><article className="resource-card" key={item.href}><MediaFrame asset={item.asset} label={item.title}/><div className="resource-copy"><span>{item.category}</span><h2 className="collection-title"><Link href={item.href}>{item.title}</Link></h2><p>{item.summary}</p><Link href={item.href}>Explore <span aria-hidden="true">→</span></Link></div></article>)}</div>{!visible.length&&<div className="collection-empty"><h2>No matching results.</h2><p>Try a broader search or clear the filters.</p><button className="button button-ghost" type="button" onClick={()=>{setQuery("");setCategory("All");}}>Clear filters</button></div>}</div>;
}

import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { insights } from "@/data/insights";
import { site } from "@/data/site";
export default function sitemap():MetadataRoute.Sitemap{
  const routes=["/","/work","/about","/insights","/contact","/services","/services/web-conversion","/services/seo","/services/paid-acquisition","/services/growth-infrastructure","/privacy","/terms",...projects.map(item=>`/work/${item.slug}`),...insights.map(item=>`/insights/${item.slug}`)];
  // Do not fabricate lastModified timestamps every time the sitemap is generated.
  return routes.map(route=>({url:new URL(route,site.url).toString()}));
}

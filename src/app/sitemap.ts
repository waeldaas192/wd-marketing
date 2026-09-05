import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { insights } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wdmarketing.co.uk";
  const staticRoutes = ["", "/work", "/about", "/insights", "/contact", "/services/web-conversion", "/services/seo", "/services/paid-acquisition", "/services/growth-infrastructure", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...projects.map((project) => ({ url: `${base}/work/${project.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...insights.map((item) => ({ url: `${base}/insights/${item.slug}`, lastModified: new Date(item.date), changeFrequency: "monthly" as const, priority: 0.65 })),
  ];
}

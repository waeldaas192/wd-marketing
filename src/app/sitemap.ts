import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { insights } from "@/data/insights";
import { site } from "@/data/site";

export const dynamic = "force-static";

const coreRoutes = [
  "/",
  "/services",
  "/services/web-conversion",
  "/services/seo",
  "/services/local-seo-london",
  "/services/technical-seo-london",
  "/services/paid-acquisition",
  "/services/meta-ads",
  "/services/conversion-rate-optimisation",
  "/services/growth-infrastructure",
  "/work",
  "/about",
  "/insights",
  "/contact",
] as const;

const legalRoutes = ["/privacy", "/terms", "/cookies"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  // Group commercial/core URLs first for maintenance clarity. Search engines do
  // not need fabricated XML priority/changefreq values to understand importance.
  const routes = [
    ...coreRoutes,
    ...projects.map(item => `/work/${item.slug}`),
    ...insights.map(item => `/insights/${item.slug}`),
    ...legalRoutes,
  ];

  // Do not fabricate lastModified timestamps every time the sitemap is generated.
  return routes.map(route => ({ url: new URL(route, site.url).toString() }));
}

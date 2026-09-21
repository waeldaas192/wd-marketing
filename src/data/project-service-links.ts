export type ProjectServiceLink = {
  label: string;
  href: string;
};

export const workAuthorityPriority = [
  "floor-care-london",
  "london-marble-stone",
  "stone-pro-worktops",
  "exp-auto-parts",
] as const;

const projectServiceLinks: Record<string, readonly ProjectServiceLink[]> = {
  "floor-care-london": [
    { label: "Web Design & Conversion", href: "/services/web-conversion" },
    { label: "Local SEO London", href: "/services/local-seo-london" },
    { label: "SEO & Organic Growth", href: "/services/seo" },
  ],
  "london-marble-stone": [
    { label: "Web Design & Conversion", href: "/services/web-conversion" },
    { label: "Local SEO London", href: "/services/local-seo-london" },
    { label: "SEO & Organic Growth", href: "/services/seo" },
  ],
  "stone-pro-worktops": [
    { label: "Web Design & Conversion", href: "/services/web-conversion" },
    { label: "SEO & Organic Growth", href: "/services/seo" },
    { label: "Technical SEO London", href: "/services/technical-seo-london" },
  ],
  "exp-auto-parts": [
    { label: "Web Design & Conversion", href: "/services/web-conversion" },
    { label: "Technical SEO London", href: "/services/technical-seo-london" },
    { label: "Growth Infrastructure", href: "/services/growth-infrastructure" },
  ],
  "sma-marble": [
    { label: "Web Design & Conversion", href: "/services/web-conversion" },
    { label: "Local SEO London", href: "/services/local-seo-london" },
    { label: "Conversion Optimisation", href: "/services/conversion-rate-optimisation" },
  ],
  "mb-legacy-roofing": [
    { label: "Web Design & Conversion", href: "/services/web-conversion" },
    { label: "Local SEO London", href: "/services/local-seo-london" },
    { label: "Technical SEO London", href: "/services/technical-seo-london" },
  ],
  "marble-stone-polishing": [
    { label: "Web Design & Conversion", href: "/services/web-conversion" },
    { label: "Local SEO London", href: "/services/local-seo-london" },
    { label: "SEO & Organic Growth", href: "/services/seo" },
  ],
  "amici-executive-assistants": [
    { label: "Web Design & Conversion", href: "/services/web-conversion" },
    { label: "Conversion Optimisation", href: "/services/conversion-rate-optimisation" },
    { label: "Growth Infrastructure", href: "/services/growth-infrastructure" },
  ],
  "km-capital-roofing": [
    { label: "Web Design & Conversion", href: "/services/web-conversion" },
    { label: "Local SEO London", href: "/services/local-seo-london" },
  ],
  "tim-paints-tiles": [
    { label: "Web Design & Conversion", href: "/services/web-conversion" },
    { label: "Conversion Optimisation", href: "/services/conversion-rate-optimisation" },
  ],
  "prestige-painters": [
    { label: "Web Design & Conversion", href: "/services/web-conversion" },
  ],
  "naranj-glasgow": [
    { label: "Web Design & Conversion", href: "/services/web-conversion" },
    { label: "Local SEO", href: "/services/local-seo-london" },
  ],
};

export function getProjectServiceLinks(slug: string): readonly ProjectServiceLink[] {
  return projectServiceLinks[slug] ?? [];
}

export function orderProjectsForAuthority<T extends { slug: string }>(items: readonly T[]): T[] {
  const priority = new Map<string, number>(workAuthorityPriority.map((slug, index): [string, number] => [slug, index]));
  return [...items].sort((a, b) => {
    const aRank = priority.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const bRank = priority.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    return aRank - bRank;
  });
}

export type IndustryPageData = {
  slug: string;
  name: string;
  title: string;
  accent: string;
  summary: string;
  projectSlugs: readonly string[];
  challenges: readonly { title: string; copy: string }[];
  services: readonly { name: string; href: string; copy: string }[];
};

export const stoneWorktopsIndustry: IndustryPageData = {
  slug: "stone-worktops",
  name: "Stone & Worktop Companies",
  title: "Websites, SEO & Ads",
  accent: "for Stone & Worktop Companies.",
  summary: "Digital experiences built around how customers discover materials, compare finishes and request a worktop quote. WD Marketing connects useful catalogues, London search visibility, advertising and enquiry tracking.",
  projectSlugs: ["sma-marble", "stone-pro-worktops", "london-marble-stone", "marble-stone-polishing"],
  challenges: [
    { title: "Too many colours, no clear path to a quote", copy: "Material ranges, swatches and finishes need a structured browsing journey, with a clear route to a sample or detailed estimate." },
    { title: "A showroom and a website serving different needs", copy: "Customers may start on Google, compare surfaces on mobile and then arrange a visit. The website should make each next step clear." },
    { title: "Enquiries without useful context", copy: "A relevant landing page and well-structured form can make it easier to identify the material and work requested before following up." },
  ],
  services: [
    { name: "Web Design & Conversion", href: "/services/web-conversion", copy: "Responsive product and service journeys that help buyers compare surfaces and request quotes." },
    { name: "SEO & Organic Growth", href: "/services/seo", copy: "Clear material, service and location pages based on genuine buyer questions." },
    { name: "Paid Acquisition", href: "/services/paid-acquisition", copy: "Relevant adverts aligned with landing pages and meaningful customer actions." },
    { name: "Growth Infrastructure", href: "/services/growth-infrastructure", copy: "GA4, GTM and enquiry tracking so activity is measured rather than assumed." },
  ],
};

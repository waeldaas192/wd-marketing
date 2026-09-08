// Add approved files to public/images/seo-london/, then rebuild.
// Missing files render intentional reserved spaces, without broken requests.
export type SeoImageAsset = {
  src: string; alt: string; width: number; height: number;
  label: string; fit: "cover" | "contain"; position: string;
};
export const seoImages = {
  hero: { src: "/images/seo-london/wd-seo-london-strategy.webp", alt: "Wael reviewing a website and SEO priorities at his desk", width: 1600, height: 1200, label: "Website & search strategy", fit: "cover", position: "50% 50%" },
  naranj: { src: "/images/seo-london/naranj-glasgow-website-seo.webp", alt: "Naranj Restaurant website showing its menu and reservation journey", width: 1600, height: 1000, label: "Naranj Restaurant", fit: "contain", position: "50% 50%" },
  marble: { src: "/images/seo-london/london-marble-stone-website-seo.webp", alt: "London Marble Stone website with marble restoration services and quote options", width: 1600, height: 1000, label: "London Marble Stone", fit: "contain", position: "50% 50%" },
  exp: { src: "/images/seo-london/exp-auto-parts-product-search.webp", alt: "EXP Auto Parts product page showing a part number and product details", width: 1600, height: 1000, label: "EXP Auto Parts", fit: "contain", position: "50% 50%" },
  founder: { src: "/images/seo-london/wael-daas-wd-marketing.webp", alt: "Wael Daas, founder of WD Marketing", width: 1200, height: 1500, label: "Wael Daas · Founder", fit: "cover", position: "50% 35%" },
} satisfies Record<string, SeoImageAsset>;

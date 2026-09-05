export type ProjectGalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  type: string;
  headline: string;
  image: string;
  imageAlt: string;
  sector: string;
  location: string;
  challenge: string;
  strategy: string[];
  deliverables: string[];
  evidence: string;
  gallery: ProjectGalleryImage[];
};

export const projects: Project[] = [
  {
    slug: "stone-pro-worktops",
    name: "Stone Pro Worktops",
    type: "Web · SEO · Conversion",
    headline: "Turning a product-heavy stone business into a search-led acquisition platform.",
    image: "/images/projects/stone-pro/stone-pro-worktops-london-case-study.webp",
    imageAlt: "Stone Pro Worktops website and lead generation case study in London",
    sector: "Stone & surfaces",
    location: "London / UK",
    challenge: "A large catalogue of materials and colours needed to become easy to browse, search-friendly and useful as a lead-generation journey rather than a static gallery.",
    strategy: ["Build a scalable material and colour information architecture", "Create dedicated commercial landing pages around high-intent services", "Connect visual browsing to quote and sample actions", "Design technical SEO into templates from the start"],
    deliverables: ["UX architecture", "Responsive interface system", "SEO page framework", "Colour/product templates", "Lead tracking plan"],
    evidence: "Performance figures will be published only after verified live measurement is available.",
    gallery: [
      { src: "/images/projects/stone-pro/stone-pro-worktops-website-desktop.webp", alt: "Stone Pro Worktops responsive website desktop design", width: 1800, height: 1125 },
      { src: "/images/projects/stone-pro/stone-pro-worktops-mobile-experience.webp", alt: "Stone Pro Worktops mobile website experience", width: 1200, height: 1500 },
      { src: "/images/projects/stone-pro/stone-pro-worktops-colour-gallery.webp", alt: "Stone Pro Worktops quartz and stone colour gallery interface", width: 1800, height: 1125 },
    ],
  },
  {
    slug: "mb-legacy-roofing",
    name: "MB Legacy Roofing",
    type: "Local SEO · Lead Generation",
    headline: "Building a London roofing growth engine around high-intent local demand.",
    image: "/images/projects/roofing/mb-legacy-roofing-london-case-study.webp",
    imageAlt: "MB Legacy Roofing London SEO and lead generation case study",
    sector: "Roofing / home services",
    location: "London",
    challenge: "The business needed a route to qualified roofing enquiries in a competitive London market, with visibility tied to actual commercial service intent rather than broad traffic.",
    strategy: ["Map roofing demand by service, roof type and London location", "Prioritise revenue-driving service pages", "Strengthen local trust and technical SEO", "Design paid-search landing paths to complement organic growth"],
    deliverables: ["Market analysis", "Keyword architecture", "90-day SEO roadmap", "Landing-page strategy", "Conversion measurement plan"],
    evidence: "The case study intentionally avoids unverified lead or ranking claims until campaign data is validated.",
    gallery: [
      { src: "/images/projects/roofing/mb-legacy-roofing-website-desktop.webp", alt: "MB Legacy Roofing London website design", width: 1800, height: 1125 },
      { src: "/images/projects/roofing/mb-legacy-roofing-local-seo-structure.webp", alt: "MB Legacy Roofing London local SEO service architecture", width: 1800, height: 1125 },
      { src: "/images/projects/roofing/mb-legacy-roofing-mobile-lead-page.webp", alt: "MB Legacy Roofing mobile lead generation landing page", width: 1200, height: 1500 },
    ],
  },
  {
    slug: "exp-auto-parts",
    name: "EXP Auto Parts",
    type: "Ecommerce · Automation",
    headline: "Structuring catalog, search and automation for a scalable automotive operation.",
    image: "/images/projects/exp-auto-parts/exp-auto-parts-uk-case-study.webp",
    imageAlt: "EXP Auto Parts UK ecommerce and automation case study",
    sector: "Automotive ecommerce",
    location: "United Kingdom",
    challenge: "A complex parts catalogue required cleaner category logic, stronger searchability and operational automation so product management could scale without increasing manual workload at the same rate.",
    strategy: ["Clean and normalise catalogue taxonomy", "Improve import and category workflows", "Create automation opportunities around product data", "Protect commercial tracking across ecommerce journeys"],
    deliverables: ["Catalogue architecture", "Import workflow", "Category optimisation", "Automation planning", "Tracking structure"],
    evidence: "Verified commercial metrics can be added once the implementation has sufficient measurement history.",
    gallery: [
      { src: "/images/projects/exp-auto-parts/exp-auto-parts-ecommerce-desktop.webp", alt: "EXP Auto Parts ecommerce website desktop interface", width: 1800, height: 1125 },
      { src: "/images/projects/exp-auto-parts/exp-auto-parts-product-catalogue.webp", alt: "EXP Auto Parts product catalogue and category interface", width: 1800, height: 1125 },
      { src: "/images/projects/exp-auto-parts/exp-auto-parts-mobile-shopping.webp", alt: "EXP Auto Parts mobile ecommerce shopping experience", width: 1200, height: 1500 },
    ],
  },
];

export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }

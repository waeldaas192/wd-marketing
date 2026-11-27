import { portfolioAdditions } from "./portfolio-additions";

export type ProjectGalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

/** Publish only when source, timeframe and client approval are documented. */
export type VerifiedProjectResult = {
  label: string;
  value: string;
  source: string;
  period: string;
  evidenceReference: string;
  approvalStatus: "approved";
  context?: string;
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
  website?: string;
  metrics?: ProjectMetric[];
  verifiedResults?: VerifiedProjectResult[];
  technology?: string[];
  gallery: ProjectGalleryImage[];
};

export const projects: Project[] = [
  {
    slug: "classic-kitchens-bathrooms-crm",
    name: "Classic Kitchens & Bathrooms",
    type: "Custom CRM · Meta Lead Ads · WhatsApp · Automation",
    headline: "A custom CRM that brings Meta lead ads, WhatsApp, calls, SMS, email and automation into one dashboard, with no CRM subscription.",
    image: "/images/projects/classic-kitchens-bathrooms/classic-crm-dashboard.webp",
    imageAlt: "Custom CRM dashboard for Classic Kitchens and Bathrooms on a laptop with the WhatsApp inbox on a mobile phone",
    sector: "Kitchens & bathrooms",
    location: "London, United Kingdom",
    website: "https://classickb.co.uk/",
    challenge: "Leads arrived from the website and Meta lead ads, but follow-up was spread across a phone, WhatsApp, email and separate documents. The business needed one secure place to capture, contact and convert every lead, without paying for a generic CRM.",
    strategy: [
      "Capture website and Meta Lead Ads enquiries automatically, with campaign data and duplicate protection",
      "Model the pipeline on the real sales journey: cold, warm, quotation, invoice, installation, closed",
      "Put WhatsApp, phone calls, SMS and email on every customer profile, sent from the business",
      "Automate first replies, owner alerts, missed-call text-backs and follow-ups, with quiet hours",
      "Keep the system private, encrypted, backed up and fast, on the company's own website",
    ],
    deliverables: [
      "Private CRM dashboard with staff roles",
      "Meta Lead Ads integration and past-lead import",
      "WhatsApp Business Cloud API inbox and templates",
      "Browser calling, call routing and call log (Twilio)",
      "SMS fallback, owner alerts and follow-up automations",
      "Quotations, invoices and a branded email inbox",
    ],
    evidence: "Screenshots are taken from the live dashboard with customer names, phone numbers, emails and postcodes replaced by fictional examples. The WhatsApp, call log, automation and email views use fictional demonstration data. Features are documented as delivered; no sales, conversion or response-time results are claimed.",
    metrics: [
      { value: "4", label: "Contact channels on every profile" },
      { value: "7", label: "Pipeline stages, cold to closed" },
      { value: "5", label: "Automated follow-up rules" },
      { value: "£0", label: "CRM licence or per-user fees" },
    ],
    technology: ["Next.js 15 + React 19", "Cloudflare Workers + D1", "WhatsApp Business Cloud API", "Meta Lead Ads webhooks", "Twilio Voice & SMS", "Clerk authentication"],
    gallery: [
      { src: "/images/projects/classic-kitchens-bathrooms/classic-crm-command.webp", alt: "Command menu in the custom CRM searching customers, enquiries and actions", width: 1800, height: 1200 },
      { src: "/images/projects/classic-kitchens-bathrooms/classic-crm-meta-leads.webp", alt: "Meta Leads manager listing Facebook and Instagram lead ad enquiries with campaigns", width: 1800, height: 1200 },
      { src: "/images/projects/classic-kitchens-bathrooms/classic-crm-pipeline-dark.webp", alt: "Sales pipeline in the CRM's dark mode", width: 1800, height: 1200 },
    ],
  },
  {
    slug: "bunyan-london",
    name: "Bunyan London",
    type: "Construction Web Design · Local SEO · Conversion",
    headline: "A responsive, quote-first website experience for a London building and renovation company.",
    image: "/images/projects/bunyan-london/bunyan-london-construction-website-mockup.webp",
    imageAlt: "Bunyan London construction website design case study desktop and mobile mockup created in Higgsfield",
    sector: "Construction & home renovation",
    location: "London, United Kingdom",
    website: "https://bunyanlondon.co.uk/",
    challenge: "London homeowners comparing building and renovation contractors need to understand the scope of services, feel confident in the business and request an estimate without unnecessary friction. The website needed to communicate end-to-end delivery while staying useful on mobile.",
    strategy: [
      "Build a clear position around London building, renovation and first-fix-to-finish services",
      "Prioritise local service relevance and descriptive headings for both search engines and real customers",
      "Place the quote enquiry journey prominently beside the homepage value proposition",
      "Design calls, proof points and quote actions for desktop and mobile visitors",
      "Structure navigation around renovations, kitchens, bathrooms, roofing and structural work"
    ],
    deliverables: [
      "Responsive construction website design",
      "Desktop and mobile conversion experience",
      "Quote request form and prominent call actions",
      "Construction service information architecture",
      "On-page SEO structure and local-search messaging"
    ],
    evidence: "The supplied desktop and mobile screenshots show a headline focused on London building services, an itemised-quote proposition, a prominent enquiry form, click-to-call actions and a mobile sticky contact bar. Visual presentation is documented; ranking, traffic and lead outcomes have not been independently verified.",
    gallery: [
      { src: "/images/projects/bunyan-london/bunyan-london-construction-website-mockup.webp", alt: "Bunyan London responsive construction web design desktop and mobile website mockup", width: 1536, height: 864 },
      { src: "/images/projects/bunyan-london/bunyan-london-responsive-mobile-website.webp", alt: "Bunyan London London builder website mobile responsive quote journey mockup", width: 1024, height: 1280 }
    ]
  },
  {
    slug: "sma-marble",
    name: "SMA Marble",
    type: "Web Design · Local SEO · Conversion",
    headline: "Creating a premium, quote-led digital experience for a London stone worktop specialist.",
    image: "/images/projects/sma-marble/sma-marble-london-case-study.webp",
    imageAlt: "SMA Marble luxury stone worktops website design in London",
    sector: "Stone & worktops",
    location: "London",
    challenge: "SMA Marble needed to present a wide range of premium surfaces without overwhelming visitors, while turning high-intent searches into clear quote enquiries across desktop and mobile.",
    strategy: ["Lead with material quality and London service coverage", "Organise quartz, marble, granite and porcelain around buyer intent", "Connect project proof to a short quote journey", "Build trust through workmanship, reviews and service-area signals"],
    deliverables: ["Website strategy", "Responsive UX and visual design", "Worktop service architecture", "Local SEO foundations", "Quote conversion journey"],
    evidence: "The live experience brings worktop discovery, completed-project proof and quote capture into one focused customer journey.",
    website: "https://smamarble.co.uk/",
    gallery: [
      { src: "/images/projects/sma-marble/sma-marble-worktop-services.webp", alt: "SMA Marble premium quartz, marble, granite and porcelain worktop range", width: 1800, height: 1125 },
      { src: "/images/projects/sma-marble/sma-marble-project-gallery.webp", alt: "SMA Marble craftsmanship, trust signals and completed London projects", width: 1800, height: 1125 },
    ],
  },
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
    type: "Web Design · Local SEO · Conversion",
    headline: "Rebuilding a legacy WordPress presence as a fast, structured London roofing platform.",
    image: "/images/projects/roofing/mb-legacy-roofing-london-case-study.webp",
    imageAlt: "MB Legacy Roofing London SEO and lead generation case study",
    sector: "Roofing / home services",
    location: "London",
    challenge: "The existing site needed to move beyond a slow, fragmented WordPress experience without losing useful roofing content or established URLs. The new platform had to make urgent and planned enquiries clear on every screen while creating a scalable foundation for service and London-area search demand.",
    strategy: ["Rebuild the customer journey around repair, replacement and emergency intent", "Structure service and location content as crawlable routes with unique metadata", "Preserve useful legacy URLs through permanent redirects", "Connect responsive quote journeys to a protected enquiry backend"],
    deliverables: ["Next.js 16 website build", "Responsive conversion UX", "47-route SEO architecture", "Cloudflare Worker and D1 enquiries", "Legacy URL migration"],
    evidence: "Google PageSpeed Insights lab snapshot captured 13 September 2026: 99 desktop performance, 90 mobile performance, 97 accessibility, 96 best practices and 100 SEO. Lab scores can vary by run and do not represent lead, revenue or ranking guarantees.",
    website: "https://mblegacyroofing.co.uk/",
    metrics: [
      { value: "99", label: "Desktop performance" },
      { value: "90", label: "Mobile performance" },
      { value: "100", label: "SEO" },
      { value: "47", label: "SEO routes" },
    ],
    technology: ["Next.js 16", "React 19", "Tailwind CSS 4", "Cloudflare Workers + D1"],
    gallery: [
      { src: "/images/projects/roofing/mb-legacy-roofing-responsive-website.webp", alt: "MB Legacy Roofing responsive website on desktop and mobile with roofing services, call and quote actions", width: 1800, height: 1200 },
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
    website: "https://expautopart.co.uk/",
    gallery: [
      { src: "/images/projects/exp-auto-parts/exp-auto-parts-ecommerce-desktop.webp", alt: "EXP Auto Parts homepage with vehicle search and spare parts imagery", width: 1800, height: 1200 },
      { src: "/images/projects/exp-auto-parts/exp-auto-parts-product-catalogue.webp", alt: "EXP Auto Parts Mercedes air strut product page with SKU and vehicle compatibility details", width: 1800, height: 1200 },
    ],
  },
  ...portfolioAdditions,
];

export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }

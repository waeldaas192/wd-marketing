import type { ServicePageData } from "@/components/ui/ServicePage";

export const servicePages: Record<string, ServicePageData> = {
  web: {
    eyebrow: "01 / Web & Conversion",
    title: "Digital experiences",
    accent: "built to convert.",
    intro: "We design and develop fast, credible websites and landing systems around user intent, commercial clarity and measurable action — not decoration alone.",
    outcomes: ["More qualified enquiries", "Higher landing-page conversion", "Faster user journeys", "Cleaner attribution"],
    capabilities: [
      { title: "Strategy & UX", copy: "Information architecture, customer journeys, offer structure and conversion paths before visual execution." },
      { title: "Interface Design", copy: "Distinctive responsive design systems with clear hierarchy, premium interaction and purposeful motion." },
      { title: "Development", copy: "Modern front-end builds focused on performance, maintainability, accessibility and technical SEO." },
      { title: "Conversion Layer", copy: "Forms, calls, WhatsApp, booking journeys, analytics and event tracking connected to the commercial goal." },
    ],
    process: [
      { title: "Diagnose", copy: "Audit the offer, traffic source, current site and measurement gaps." },
      { title: "Architect", copy: "Define journeys, page roles, proof, objections and conversion architecture." },
      { title: "Design & Build", copy: "Create the interface system and production implementation together." },
      { title: "Measure", copy: "Instrument the experience and iterate from behaviour and lead quality." },
    ],
  },
  seo: {
    eyebrow: "02 / Organic Growth",
    title: "Search visibility",
    accent: "with commercial intent.",
    intro: "SEO is treated as market capture: identify demand, build the right information architecture, strengthen technical foundations and create pages that deserve to rank and convert.",
    outcomes: ["Capture high-intent search demand", "Grow local market share", "Improve indexability and relevance", "Turn organic sessions into leads"],
    capabilities: [
      { title: "Market & Keyword Strategy", copy: "Opportunity mapping by intent, location, service economics and realistic competitive difficulty." },
      { title: "Technical SEO", copy: "Crawlability, indexing, internal architecture, performance, canonicalisation, schema and technical hygiene." },
      { title: "Local SEO", copy: "Location-led service architecture, Google Business Profile alignment and local proof signals." },
      { title: "Content Systems", copy: "Commercial pages, supporting content and internal linking designed as a coherent topical network." },
    ],
    process: [
      { title: "Research", copy: "Map demand, competitors, SERPs and the economic value behind search terms." },
      { title: "Prioritise", copy: "Sequence opportunities around conversion potential, effort and business capacity." },
      { title: "Build Authority", copy: "Improve pages, architecture, entities, proof and content depth." },
      { title: "Compound", copy: "Measure leads and rankings, expand winning clusters and repair weak pages." },
    ],
  },
  paid: {
    eyebrow: "03 / Paid Acquisition",
    title: "Paid media",
    accent: "connected to conversion.",
    intro: "Campaigns are designed with the offer, landing experience and tracking system in the same room — so budget decisions are made from business outcomes, not platform vanity metrics.",
    outcomes: ["Increase qualified lead volume", "Reduce wasted spend", "Improve landing relevance", "Measure revenue contribution"],
    capabilities: [
      { title: "Google Ads", copy: "Search-first campaign architecture, query control, ad messaging, extensions, audience layers and ongoing optimisation." },
      { title: "Meta Ads", copy: "Creative and audience testing mapped to a clear funnel and conversion objective." },
      { title: "Landing Systems", copy: "Campaign-specific journeys aligned to search intent, offer and friction reduction." },
      { title: "Attribution", copy: "GA4, GTM and conversion events structured so campaign optimisation is based on meaningful actions." },
    ],
    process: [
      { title: "Economics", copy: "Understand margin, lead value, close rate, capacity and acceptable acquisition cost." },
      { title: "Structure", copy: "Build campaign and landing architecture around intent and measurement." },
      { title: "Launch", copy: "Control queries, creatives, bids, budgets and conversion instrumentation." },
      { title: "Optimise", copy: "Use search terms, lead quality and economics to reallocate spend." },
    ],
  },
  infrastructure: {
    eyebrow: "04 / Growth Infrastructure",
    title: "Measurement and automation",
    accent: "behind the growth.",
    intro: "The invisible layer matters: analytics, CRM logic, attribution and automation turn campaigns and websites into an operating system the business can actually learn from.",
    outcomes: ["Cleaner lead attribution", "Faster follow-up", "Less manual admin", "More useful reporting"],
    capabilities: [
      { title: "Analytics", copy: "GA4 and GTM event architecture around meaningful funnel actions and decision-making." },
      { title: "CRM Workflows", copy: "Lead routing, pipeline stages, notifications and operational handoffs designed around the sales process." },
      { title: "Automation", copy: "Reduce repetitive work and connect forms, email, CRM and internal workflows." },
      { title: "Reporting", copy: "Decision-oriented dashboards that connect channel activity to leads and commercial outcomes." },
    ],
    process: [
      { title: "Map", copy: "Document the current journey from click to lead to customer." },
      { title: "Instrument", copy: "Define events, fields, stages, sources and naming conventions." },
      { title: "Connect", copy: "Wire the tools together with robust routing and fallbacks." },
      { title: "Improve", copy: "Use the resulting data to remove friction and improve allocation." },
    ],
  },
};

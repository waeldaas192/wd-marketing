import { ServicePage, type ServicePageData } from "@/components/ui/ServicePage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicePages } from "@/data/servicePages";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";

const description = "Founder-led web design and development in London, connecting responsive UX, landing pages, technical SEO and conversion tracking.";
export const metadata = pageMetadata(
  "Web Design Agency London | Conversion Websites",
  description,
  "/services/web-conversion",
);

const webPageData = {
  ...servicePages.web,
  intro: "Founder-led web design agency in London for businesses that need more than a polished interface. WD Marketing designs and develops responsive websites, landing pages and conversion journeys around customer intent, commercial clarity, technical SEO and measurable enquiries.",
  capabilities: [
    ...servicePages.web.capabilities,
    {
      title: "Website redesign & SEO migration",
      copy: "Rebuild an existing website without treating search visibility as an afterthought. We audit valuable pages, preserve useful URLs where appropriate, map redirects, carry forward technical signals and validate the new journey after launch.",
      deliverable: "Redirect map, migration checklist and rebuilt page system",
    },
  ],
  proof: {
    ...servicePages.web.proof,
    eyebrow: "Selected website work",
    title: "The structure follows the business model.",
    copy: "The strongest design decisions come from understanding how customers search, compare, browse and enquire. These projects show different commercial journeys rather than one recycled agency template.",
    points: [
      {
        label: "Stone Pro Worktops — structured product and colour discovery around search and quote intent",
        href: "/work/stone-pro-worktops",
      },
      {
        label: "EXP Auto Parts — scalable catalogue architecture for vehicle and product discovery",
        href: "/work/exp-auto-parts",
      },
      {
        label: "MB Legacy Roofing — local-service journey aligned with high-intent quote searches",
        href: "/work/mb-legacy-roofing",
      },
    ],
  },
  related: {
    eyebrow: "Related strategy",
    title: "A stronger website works with the traffic around it.",
    links: [
      { label: "Conversion Rate Optimisation for existing traffic", href: "/services/conversion-rate-optimisation" },
      { label: "SEO & Organic Growth", href: "/services/seo" },
      { label: "Fix the landing page before buying more clicks", href: "/insights/landing-page-before-more-ad-spend" },
      { label: "The growth stack for a local service business", href: "/insights/growth-stack-for-local-services" },
    ],
  },
  faqs: [
    ...servicePages.web.faqs,
    {
      question: "How much does a business website cost?",
      answer: "Cost depends on the number and type of pages, content requirements, integrations, catalogue or ecommerce complexity, migration work, tracking and who supplies the assets. We define the scope before quoting so the price corresponds to the work rather than a generic page count.",
    },
    {
      question: "Will I own the website?",
      answer: "Ownership, licences and handover are defined in the project agreement. Our normal approach is to leave the client with appropriate access to the website, domain, hosting and measurement accounts rather than creating unnecessary dependency on WD Marketing.",
    },
    {
      question: "Can you redesign my website without damaging SEO?",
      answer: "We plan the migration to reduce avoidable SEO loss: valuable URLs are reviewed, redirects are mapped where needed, crawlable navigation and metadata are checked, and the site is compared before and after launch. Rankings can still move after a significant rebuild, so we do not promise that every position will remain unchanged.",
    },
  ],
} satisfies ServicePageData;

export default function Page() {
  return <><JsonLd data={serviceSchema({ name: "Web Design & Conversion", description, pathname: "/services/web-conversion", serviceType: "Web Design & Conversion" })} /><Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: "Web & Conversion", href: "/services/web-conversion" }]} /><ServicePage data={webPageData} /></>;
}

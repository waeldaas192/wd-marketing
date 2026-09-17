import Link from "next/link";
import { ServicePage, type ServicePageData } from "@/components/ui/ServicePage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicePages } from "@/data/servicePages";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";
import styles from "./paid-acquisition.module.css";

const description="Google Ads and paid-media management for London businesses, connecting search intent, landing pages, conversion tracking and lead quality.";
export const metadata=pageMetadata("Google Ads Agency London | PPC Management",description,"/services/paid-acquisition");

const paidPageData = {
  ...servicePages.paid,
  related: {
    eyebrow: "Conversion performance",
    title: "Paid traffic works harder when the landing journey keeps its promise.",
    links: [
      { label: "Conversion Rate Optimisation for landing pages and lead journeys", href: "/services/conversion-rate-optimisation" },
      { label: "Fix the landing page before buying more clicks", href: "/insights/landing-page-before-more-ad-spend" },
      { label: "GA4, GTM, CRM & lead-quality measurement", href: "/services/growth-infrastructure" },
    ],
  },
} satisfies ServicePageData;

export default function Page(){return <><JsonLd data={serviceSchema({name:"Paid Acquisition",description,pathname:"/services/paid-acquisition",serviceType:"Paid Acquisition"})}/><Breadcrumbs items={[{label:"Services",href:"/services"},{label:"Paid Acquisition",href:"/services/paid-acquisition"}]}/><aside className={styles.metaBridge}><div className="container"><div><span>Facebook &amp; Instagram specialist service</span><strong>Need a dedicated Meta lead-generation system?</strong></div><Link href="/services/meta-ads">Explore Meta Ads →</Link></div></aside><ServicePage data={paidPageData}/></>;}

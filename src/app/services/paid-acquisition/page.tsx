import Link from "next/link";
import { ServicePage, type ServicePageData } from "@/components/ui/ServicePage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicePages } from "@/data/servicePages";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";
import styles from "./paid-acquisition.module.css";
import { ArrowIcon } from "@/components/ui/Icons";

const description="Google Ads and paid-media management for London businesses, connecting search intent, landing pages, conversion tracking and lead quality.";
export const metadata=pageMetadata("Google Ads Agency London | PPC Management",description,"/services/paid-acquisition");

const paidPageData = {
  ...servicePages.paid,
  related: {
    eyebrow: "Improve the traffic you already pay for",
    title: "Paid acquisition and conversion optimisation should share the same landing-page evidence.",
    links: [
      { label: "Conversion Rate Optimisation Agency London", href: "/services/conversion-rate-optimisation" },
      { label: "Web Design & Landing Pages", href: "/services/web-conversion" },
      { label: "GA4, GTM, CRM & Automation", href: "/services/growth-infrastructure" },
      { label: "Fix the landing page before buying more clicks", href: "/insights/landing-page-before-more-ad-spend" },
    ],
  },
} satisfies ServicePageData;

export default function Page(){return <><JsonLd data={serviceSchema({name:"Paid Acquisition",description,pathname:"/services/paid-acquisition",serviceType:"Paid Acquisition"})}/><Breadcrumbs items={[{label:"Services",href:"/services"},{label:"Paid Acquisition",href:"/services/paid-acquisition"}]}/><aside className={styles.metaBridge}><div className="container"><div><span>Facebook &amp; Instagram specialist service</span><strong>Need a dedicated Meta lead-generation system?</strong></div><Link href="/services/meta-ads">Explore Meta Ads<ArrowIcon size={16}/></Link></div></aside><ServicePage data={paidPageData}/></>;}

import { ServicePage, type ServicePageData } from "@/components/ui/ServicePage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicePages } from "@/data/servicePages";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";

const description="Analytics, Google Tag Manager, CRM workflows and marketing automation built around reliable customer journeys and useful business decisions.";
export const metadata=pageMetadata("GA4, GTM, CRM & Marketing Automation",description,"/services/growth-infrastructure");

const infrastructurePageData = {
  ...servicePages.infrastructure,
  related: {
    eyebrow: "Measurement connected to improvement",
    title: "Tracking becomes more valuable when it explains where the conversion journey can improve.",
    links: [
      { label: "Conversion Rate Optimisation Agency London", href: "/services/conversion-rate-optimisation" },
      { label: "The growth stack for a local service business", href: "/insights/growth-stack-for-local-services" },
    ],
  },
} satisfies ServicePageData;

export default function Page(){return <><JsonLd data={serviceSchema({name:"Analytics, CRM & Automation",description,pathname:"/services/growth-infrastructure",serviceType:"Analytics, CRM & Automation"})}/><Breadcrumbs items={[{label:"Services",href:"/services"},{label:"Growth Infrastructure",href:"/services/growth-infrastructure"}]}/><ServicePage data={infrastructurePageData}/></>;}

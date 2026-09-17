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
    eyebrow: "Use the signal",
    title: "Measurement becomes valuable when it changes the customer journey.",
    links: [
      { label: "Conversion Rate Optimisation for landing pages, forms and lead quality", href: "/services/conversion-rate-optimisation" },
      { label: "Web Design & Conversion", href: "/services/web-conversion" },
      { label: "The growth stack for a local service business", href: "/insights/growth-stack-for-local-services" },
    ],
  },
} satisfies ServicePageData;

export default function Page(){return <><JsonLd data={serviceSchema({name:"Analytics, CRM & Automation",description,pathname:"/services/growth-infrastructure",serviceType:"Analytics, CRM & Automation"})}/><Breadcrumbs items={[{label:"Services",href:"/services"},{label:"Growth Infrastructure",href:"/services/growth-infrastructure"}]}/><ServicePage data={infrastructurePageData}/></>;}

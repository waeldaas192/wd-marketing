import { ServicePage } from "@/components/ui/ServicePage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicePages } from "@/data/servicePages";
import { pageMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/structured-data";
const description="Analytics, Google Tag Manager, CRM workflows and marketing automation built around reliable customer journeys and useful business decisions.";
export const metadata=pageMetadata("GA4, GTM, CRM & Marketing Automation",description,"/services/growth-infrastructure");
export default function Page(){return <><JsonLd data={serviceSchema({name:"Analytics, CRM & Automation",description,pathname:"/services/growth-infrastructure",serviceType:"Analytics, CRM & Automation"})}/><Breadcrumbs items={[{label:"Services",href:"/services"},{label:"Growth Infrastructure",href:"/services/growth-infrastructure"}]}/><ServicePage data={servicePages.infrastructure}/></>;}

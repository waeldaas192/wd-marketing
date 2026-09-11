import { ServicePage } from "@/components/ui/ServicePage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { servicePages } from "@/data/servicePages";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("GA4, GTM, CRM & Marketing Automation","Analytics, Google Tag Manager, CRM workflows and marketing automation built around reliable customer journeys and useful business decisions.","/services/growth-infrastructure");
export default function Page(){return <><Breadcrumbs items={[{label:"Services",href:"/services"},{label:"Growth Infrastructure",href:"/services/growth-infrastructure"}]}/><ServicePage data={servicePages.infrastructure}/></>;}

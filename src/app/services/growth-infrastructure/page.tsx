import { ServicePage } from "@/components/ui/ServicePage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { servicePages } from "@/data/servicePages";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("Analytics, CRM & Automation","Growth infrastructure covering analytics, CRM workflows, automation and attribution.","/services/growth-infrastructure");
export default function Page(){return <><Breadcrumbs items={[{label:"Services",href:"/services"},{label:"Growth Infrastructure",href:"/services/growth-infrastructure"}]}/><ServicePage data={servicePages.infrastructure}/></>;}

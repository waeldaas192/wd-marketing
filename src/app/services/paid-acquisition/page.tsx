import { ServicePage } from "@/components/ui/ServicePage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { servicePages } from "@/data/servicePages";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("Google Ads Agency London | PPC Management","Google Ads and paid-media management for London businesses, connecting search intent, landing pages, conversion tracking and lead quality.","/services/paid-acquisition");
export default function Page(){return <><Breadcrumbs items={[{label:"Services",href:"/services"},{label:"Paid Acquisition",href:"/services/paid-acquisition"}]}/><ServicePage data={servicePages.paid}/></>;}

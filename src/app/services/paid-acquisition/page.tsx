import { ServicePage } from "@/components/ui/ServicePage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { servicePages } from "@/data/servicePages";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("Google Ads & Paid Acquisition","Paid acquisition systems connected to landing pages, conversion and measurement.","/services/paid-acquisition");
export default function Page(){return <><Breadcrumbs items={[{label:"Services",href:"/services"},{label:"Paid Acquisition",href:"/services/paid-acquisition"}]}/><ServicePage data={servicePages.paid}/></>;}

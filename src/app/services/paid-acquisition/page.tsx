import { ServicePage } from "@/components/ui/ServicePage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicePages } from "@/data/servicePages";
import { pageMetadata } from "@/lib/metadata";
import { serviceStructuredData } from "@/lib/structured-data";
const description="Google Ads and paid-media management for London businesses, connecting search intent, landing pages, conversion tracking and lead quality.";
export const metadata=pageMetadata("Google Ads Agency London | PPC Management",description,"/services/paid-acquisition");
export default function Page(){return <><JsonLd value={serviceStructuredData({name:"Google Ads & Paid Acquisition",description,pathname:"/services/paid-acquisition",serviceType:"Paid search advertising management"})}/><Breadcrumbs items={[{label:"Services",href:"/services"},{label:"Paid Acquisition",href:"/services/paid-acquisition"}]}/><ServicePage data={servicePages.paid}/></>;}

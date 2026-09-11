import { ServicePage } from "@/components/ui/ServicePage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { servicePages } from "@/data/servicePages";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("Web Design Agency London | Conversion-Focused Websites","Founder-led web design and development in London, connecting responsive UX, landing pages, technical SEO and conversion tracking.","/services/web-conversion");
export default function Page(){return <><Breadcrumbs items={[{label:"Services",href:"/services"},{label:"Web & Conversion",href:"/services/web-conversion"}]}/><ServicePage data={servicePages.web}/></>;}

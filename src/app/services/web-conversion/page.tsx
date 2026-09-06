import { ServicePage } from "@/components/ui/ServicePage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { servicePages } from "@/data/servicePages";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("Web Design & Conversion","High-performance web design, development and conversion systems by WD Marketing.","/services/web-conversion");
export default function Page(){return <><Breadcrumbs items={[{label:"Services",href:"/services"},{label:"Web & Conversion",href:"/services/web-conversion"}]}/><ServicePage data={servicePages.web}/></>;}

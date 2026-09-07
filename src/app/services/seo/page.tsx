import { ServicePage } from "@/components/ui/ServicePage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { servicePages } from "@/data/servicePages";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("SEO & Organic Growth","Commercial SEO, technical SEO, local SEO and content architecture by WD Marketing.","/services/seo");
export default function Page(){return <><Breadcrumbs items={[{label:"Services",href:"/services"},{label:"SEO & Organic Growth",href:"/services/seo"}]}/><ServicePage data={servicePages.seo}/></>;}

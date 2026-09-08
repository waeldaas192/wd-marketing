import { PageHero } from "@/components/ui/PageHero";
import { Services } from "@/components/sections/Services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("Web, SEO & Paid Acquisition Services","Connect your website, organic search, advertising and measurement with WD Marketing.","/services");
export default function ServicesPage(){return <><Breadcrumbs items={[{label:"Services",href:"/services"}]}/><PageHero eyebrow="Capabilities" title="The right pieces." accent="Working together." intro="Start with one priority or connect the full customer journey. The commercial problem defines the scope, not a fixed bundle of disconnected services."/><Services/><FinalCTA/></>;}

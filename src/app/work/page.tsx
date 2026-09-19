import { PageHero } from "@/components/ui/PageHero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("Web Design & SEO Case Studies","WD Marketing case studies across web design, SEO, conversion, ecommerce and growth systems.","/work");
export default function WorkPage(){return <><Breadcrumbs items={[{label:"Work",href:"/work"}]}/><PageHero eyebrow="Selected work" title="Business problems." accent="Built into systems." intro="A selection of projects where web, search, acquisition and operations are treated as connected parts of one commercial problem."/><SelectedWork/></>;}

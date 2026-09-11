import { PageHero } from "@/components/ui/PageHero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("Selected Work","WD Marketing project work across web, search, conversion and growth systems.","/work");
export default function WorkPage(){return <><Breadcrumbs items={[{label:"Work",href:"/work"}]}/><PageHero eyebrow="Selected work" title="Business problems." accent="Built into systems." intro="A selection of projects where web, search, acquisition and operations are treated as connected parts of one commercial problem."/><SelectedWork/></>;}

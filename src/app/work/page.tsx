import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("Web Design & SEO Case Studies","WD Marketing case studies across web design, SEO, conversion, ecommerce and growth systems.","/work");
export default function WorkPage(){return <><Breadcrumbs items={[{label:"Work",href:"/work"}]}/><PageHero eyebrow="Selected work" title="Business problems." accent="Built into systems." intro="A selection of projects where web, search, acquisition and operations are treated as connected parts of one commercial problem."/><section className="section" aria-label="Specialist sectors"><div className="container"><Link href="/industries/stone-worktops" className="button button-ghost">Explore stone & worktop projects</Link></div></section><SelectedWork/></>;}

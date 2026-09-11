import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ui/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
export const metadata=pageMetadata("Start a Project","Tell WD Marketing about your business goal, project scope and the problem you need to solve.","/contact");
export default function ContactPage(){return <><Breadcrumbs items={[{label:"Start a project",href:"/contact"}]}/><PageHero eyebrow="Start a project" title="Tell us the problem." accent="Let's find the next step." intro="Tell us what your business needs to achieve, what is blocking it and what already exists. You can review your answers before submitting."/><section className="section pt-0"><div className="container contact-layout"><aside><div><span>Direct</span><a href={`mailto:${site.email}`}>{site.email}</a></div><div><span>Location</span><p>{site.location}</p></div><div><span>What happens next</span><p>We review the scope and identify what needs to be clarified before recommending a plan. No payment is collected through this form.</p></div></aside><ContactForm/></div></section></>;}

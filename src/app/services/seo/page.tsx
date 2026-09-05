import type { Metadata } from "next";
import { ServicePage } from "@/components/ui/ServicePage";
import { servicePages } from "@/data/servicePages";
export const metadata: Metadata = { title: "SEO & Organic Growth", description: "Commercial SEO, technical SEO, local SEO and content architecture by WD Marketing." };
export default function Page(){ return <ServicePage data={servicePages.seo} />; }

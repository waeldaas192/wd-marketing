import type { Metadata } from "next";
import { ServicePage } from "@/components/ui/ServicePage";
import { servicePages } from "@/data/servicePages";
export const metadata: Metadata = { title: "Web Design & Conversion", description: "High-performance web design, development and conversion systems by WD Marketing." };
export default function Page(){ return <ServicePage data={servicePages.web} />; }

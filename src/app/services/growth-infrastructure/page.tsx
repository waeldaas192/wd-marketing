import type { Metadata } from "next";
import { ServicePage } from "@/components/ui/ServicePage";
import { servicePages } from "@/data/servicePages";
export const metadata: Metadata = { title: "Analytics, CRM & Automation", description: "Growth infrastructure covering analytics, CRM workflows, automation and attribution." };
export default function Page(){ return <ServicePage data={servicePages.infrastructure} />; }

import type { Metadata } from "next";
import { ServicePage } from "@/components/ui/ServicePage";
import { servicePages } from "@/data/servicePages";
export const metadata: Metadata = { title: "Google Ads & Paid Acquisition", description: "Paid acquisition systems connected to landing pages, conversion and measurement." };
export default function Page(){ return <ServicePage data={servicePages.paid} />; }

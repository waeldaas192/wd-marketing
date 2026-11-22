import { HomeHero, HomeWork, HomeJourney, HomeSectors, HomeFounder, HomeFAQ, HomeCTA } from "@/components/home/HomeSections";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("Web Design & SEO London | Google Ads & Tracking","London web design, SEO and Google & Meta Ads connected to conversion tracking. Specialist experience with stone, worktop and home-service businesses.","/");
export default function Home(){return <div data-home-page><HomeHero/><HomeWork/><HomeJourney/><HomeSectors/><HomeFounder/><HomeFAQ/><HomeCTA/></div>;}

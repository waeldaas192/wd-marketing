import { Hero } from "@/components/sections/Hero";
import { Proof } from "@/components/sections/Proof";
import { Services } from "@/components/sections/Services";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Process } from "@/components/sections/Process";
import { Founder } from "@/components/sections/Founder";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { FAQ } from "@/components/sections/FAQ";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("Web Design & SEO London | Google Ads & Tracking","London web design, SEO and Google & Meta Ads connected to conversion tracking. Specialist experience with stone, worktop and home-service businesses.","/");
export default function Home(){return <div data-studio-page><Hero/><SelectedWork limit={4}/><Proof/><Services/><Process/><Founder/><InsightsPreview/><FAQ/><FinalCTA/></div>;}

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
export const metadata=pageMetadata("Web Design, SEO & Google Ads London","Founder-led web design, SEO and paid advertising in London. Connect your website, acquisition and measurement with WD Marketing.","/");
export default function Home(){return <><Hero/><Proof/><SelectedWork/><Services/><Process/><Founder/><InsightsPreview/><FAQ/><FinalCTA/></>;}

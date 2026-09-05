import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Proof } from "@/components/sections/Proof";
import { Services } from "@/components/sections/Services";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Process } from "@/components/sections/Process";
import { Founder } from "@/components/sections/Founder";
import { FinalCTA } from "@/components/sections/FinalCTA";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() { return <><Hero/><Proof/><SelectedWork/><Services/><Process/><Founder/><FinalCTA/></>; }

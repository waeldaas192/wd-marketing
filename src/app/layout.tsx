import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import "./completion.css";
import "@/styles/studio-theme.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageMotion } from "@/components/ui/PageMotion";
import { CookieConsent } from "@/components/privacy/CookieConsent";
import { JsonLd } from "@/components/seo/JsonLd";
import { brandIcons } from "@/data/brand-icons";
import { siteGraph } from "@/lib/structured-data";
const inter=Inter({subsets:["latin"],variable:"--font-body",display:"swap"});
const themeInitScript=`(function(){try{var k="wd-theme";var t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"&&t!=="system")t="system";var d=t==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;var r=document.documentElement;r.dataset.theme=t;r.dataset.colorScheme=d;r.style.colorScheme=d;}catch(e){var r=document.documentElement;var d=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";r.dataset.theme="system";r.dataset.colorScheme=d;r.style.colorScheme=d;}})();`;
export const metadata: Metadata={metadataBase:new URL("https://wdmarketing.co.uk"),title:{default:"Web Design, SEO & Google Ads London | WD Marketing",template:"%s | WD Marketing"},description:"Founder-led web design, SEO and paid advertising in London. WD Marketing connects websites, acquisition and measurement around your business goals.",openGraph:{title:"WD Marketing — Digital Growth Systems",description:"Web design, SEO and paid acquisition, built as one connected system.",type:"website",siteName:"WD Marketing",locale:"en_GB",images:[{url:"/images/brand/wd-marketing-og-cover.jpg",width:1200,height:630,alt:"WD Marketing — Digital Growth Systems"}]},twitter:{card:"summary_large_image",title:"WD Marketing — Digital Growth Systems",description:"Websites, search and paid acquisition.",images:["/images/brand/wd-marketing-og-cover.jpg"]},icons:brandIcons,verification:{google:process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:ReactNode}){
  return <html lang="en" data-scroll-behavior="smooth" className={inter.variable} suppressHydrationWarning><head><meta name="color-scheme" content="light dark"/><script dangerouslySetInnerHTML={{__html:themeInitScript}}/></head><body><a href="#main-content" className="skip-link">Skip to content</a><JsonLd data={siteGraph()} /><Header/><main id="main-content" tabIndex={-1}>{children}</main><Footer/><PageMotion/><CookieConsent/></body></html>;
}

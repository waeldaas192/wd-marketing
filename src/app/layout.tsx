import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import "./completion.css";
import "@/styles/studio-theme.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageMotion } from "@/components/ui/PageMotion";
const inter=Inter({subsets:["latin"],variable:"--font-body",display:"swap"});
export const metadata: Metadata={metadataBase:new URL("https://wdmarketing.co.uk"),title:{default:"Web Design, SEO & Google Ads London | WD Marketing",template:"%s | WD Marketing"},description:"Founder-led web design, SEO and paid advertising in London. WD Marketing connects websites, acquisition and measurement around your business goals.",openGraph:{title:"WD Marketing — Digital Growth Systems",description:"Web design, SEO and paid acquisition, built as one connected system.",type:"website",siteName:"WD Marketing",locale:"en_GB",images:[{url:"/images/brand/wd-marketing-og-cover.jpg",width:1200,height:630,alt:"WD Marketing — Digital Growth Systems"}]},twitter:{card:"summary_large_image",title:"WD Marketing — Digital Growth Systems",description:"Websites, search and paid acquisition.",images:["/images/brand/wd-marketing-og-cover.jpg"]},icons:{icon:"/images/brand/wd-marketing-mark.svg"},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:ReactNode}){
  const schema={"@context":"https://schema.org","@type":"ProfessionalService","@id":"https://wdmarketing.co.uk/#business",name:"WD Marketing",url:"https://wdmarketing.co.uk",email:"hello@wdmarketing.co.uk",areaServed:"United Kingdom",address:{"@type":"PostalAddress",addressLocality:"London",addressCountry:"GB"},description:"Founder-led web design, SEO, paid acquisition and analytics."};
  return <html lang="en" data-scroll-behavior="smooth" className={inter.variable}><body><a href="#main-content" className="skip-link">Skip to content</a><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/><Header/><main id="main-content" tabIndex={-1}>{children}</main><Footer/><PageMotion/></body></html>;
}

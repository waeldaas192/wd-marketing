import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://wdmarketing.co.uk"),
  title: { default: "WD Marketing — Digital Growth Systems", template: "%s | WD Marketing" },
  description: "Founder-led digital growth studio combining high-performance websites, SEO, paid acquisition, analytics and automation.",
  openGraph: { title:"WD Marketing — Digital Growth Systems", description:"Websites. Search. Paid Acquisition. Conversion. Built as one growth system.", type:"website", url:"https://wdmarketing.co.uk", images:[{url:"/images/brand/wd-marketing-og-cover.jpg", width:1200, height:630, alt:"WD Marketing — Digital Growth Systems"}] },
  twitter: { card:"summary_large_image", title:"WD Marketing — Digital Growth Systems", description:"Websites. Search. Paid Acquisition. Conversion. Built as one growth system.", images:["/images/brand/wd-marketing-og-cover.jpg"] },
  icons: { icon:"/images/brand/wd-marketing-mark.svg", shortcut:"/images/brand/wd-marketing-mark.svg" },
  robots: { index:true, follow:true },
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "WD Marketing",
    url: "https://wdmarketing.co.uk",
    email: "hello@wdmarketing.co.uk",
    areaServed: "United Kingdom",
    address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
    description: "Founder-led digital growth studio combining high-performance websites, SEO, paid acquisition, analytics and automation."
  };
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}/><Header/><main>{children}</main><Footer/></body></html>;
}

import type { Metadata } from "next";
import { site } from "@/data/site";
import { assets } from "@/data/assets";
export function pageMetadata(title: string, description: string, pathname: string, article = false): Metadata {
  return { title, description, alternates: { canonical: pathname }, openGraph: { title: `${title} | ${site.name}`, description, url: new URL(pathname,site.url).toString(), type: article ? "article" : "website", siteName: site.name, locale: "en_GB", images: [{url:assets.brand.og.src,width:1200,height:630,alt:assets.brand.og.alt}] }, twitter: {card:"summary_large_image",title,description,images:[assets.brand.og.src]} };
}

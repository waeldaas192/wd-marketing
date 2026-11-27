import type { Metadata } from "next";
import { site } from "@/data/site";
import { assets } from "@/data/assets";
export function pageMetadata(title: string, description: string, pathname: string, article = false, image?: {src:string;alt:string}): Metadata {
  const og = image ?? assets.brand.og;
  return { title, description, alternates: { canonical: pathname }, openGraph: { title: `${title} | ${site.name}`, description, url: new URL(pathname,site.url).toString(), type: article ? "article" : "website", siteName: site.name, locale: "en_GB", images: [{url:og.src,width:1200,height:630,alt:og.alt}] }, twitter: {card:"summary_large_image",title,description,images:[og.src]} };
}

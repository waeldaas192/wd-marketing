import { assets } from "@/data/assets";
import { site } from "@/data/site";

const organizationId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;
const founderId = `${site.url}/#founder`;
const founderProfiles = site.socialProfiles
  .filter((profile) => profile.name === "LinkedIn" || profile.name === "YouTube")
  .map((profile) => profile.href);

const areaServed = [
  { "@type": "City", name: "London" },
  { "@type": "Country", name: "United Kingdom" },
] as const;

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        url: site.url,
        email: site.email,
        description: site.description,
        logo: new URL(assets.brand.mark.src, site.url).toString(),
        image: new URL(assets.brand.og.src, site.url).toString(),
        sameAs: site.socialProfiles.map((profile) => profile.href),
        founder: { "@id": founderId },
        areaServed,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en-GB",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: "Wael Daas",
        url: `${site.url}/about`,
        image: new URL(assets.founder.portraitWide.src, site.url).toString(),
        jobTitle: "Founder / Digital Growth Strategist",
        worksFor: { "@id": organizationId },
        sameAs: founderProfiles,
      },
    ],
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  pathname: string;
  serviceType: string;
}) {
  const url = new URL(input.pathname, site.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    description: input.description,
    url,
    serviceType: input.serviceType,
    provider: { "@id": organizationId },
    areaServed,
  };
}

export function articleSchema(input: {
  slug: string;
  title: string;
  summary: string;
  date: string;
  image: string;
}) {
  const url = `${site.url}/insights/${input.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: input.title,
    description: input.summary,
    mainEntityOfPage: url,
    image: [new URL(input.image, site.url).toString()],
    datePublished: input.date,
    dateModified: input.date,
    author: { "@id": founderId },
    publisher: { "@id": organizationId },
    inLanguage: "en-GB",
  };
}

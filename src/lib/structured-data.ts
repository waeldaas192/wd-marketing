import { site } from "@/data/site";

const organizationId = `${site.url}/#organization`;
const founderId = `${site.url}/#founder`;
const websiteId = `${site.url}/#website`;

const areaServed = [
  { "@type": "City", name: "London" },
  { "@type": "Country", name: "United Kingdom" },
];

export function rootStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": organizationId,
        name: site.name,
        url: site.url,
        email: site.email,
        description: site.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "London",
          addressCountry: "GB",
        },
        areaServed,
        founder: { "@id": founderId },
        sameAs: site.socialProfiles.map(profile => profile.href),
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: "Wael Daas",
        jobTitle: "Founder",
        url: `${site.url}/about`,
        worksFor: { "@id": organizationId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: site.name,
        url: site.url,
        inLanguage: "en-GB",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

type ServiceStructuredDataInput = {
  name: string;
  description: string;
  pathname: string;
  serviceType: string;
};

export function serviceStructuredData({ name, description, pathname, serviceType }: ServiceStructuredDataInput) {
  const url = new URL(pathname, site.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    serviceType,
    provider: { "@id": organizationId },
    areaServed,
  };
}

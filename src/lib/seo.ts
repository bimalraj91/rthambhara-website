import type { Metadata } from "next";
import {
  absoluteUrl,
  contact,
  defaultOgImage,
  shortName,
  siteDescription,
  siteName,
  socialProfiles,
} from "./site";

type PageMetaInput = {
  // Short page title; the root layout adds " | Rtambhara Academy".
  title: string;
  description: string;
  // Path starting with "/", used for the canonical URL.
  path: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  type?: "website" | "article";
  keywords?: string[];
  publishedTime?: string;
  section?: string;
  noIndex?: boolean;
};

// One place to build every page's metadata, so titles, canonical links and
// social cards stay consistent.
export function pageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
  type = "website",
  keywords,
  publishedTime,
  section,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${shortName}`;
  const ogImage = { ...image, url: absoluteUrl(image.url) };

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      type,
      url,
      siteName,
      locale: "en_IN",
      images: [ogImage],
      ...(type === "article" && publishedTime
        ? { publishedTime, section, authors: [siteName] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

// Structured data -------------------------------------------------------------

export const organizationId = absoluteUrl("/#organization");
export const websiteId = absoluteUrl("/#website");

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": organizationId,
    name: siteName,
    alternateName: shortName,
    description: siteDescription,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/assets/brand/rtambhara-emblem.png"),
    },
    image: absoluteUrl(defaultOgImage.url),
    telephone: contact.phone,
    email: contact.email,
    priceRange: "$$",
    address: { "@type": "PostalAddress", ...contact.address },
    geo: { "@type": "GeoCoordinates", ...contact.geo },
    areaServed: "Tripunithura, Kochi, Kerala",
    foundingDate: "2012",
    ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
    knowsAbout: [
      "Bharatanatyam",
      "Kalaripayattu",
      "Contemporary dance",
      "Mohiniyattam",
      "Yoga",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: absoluteUrl("/"),
    name: siteName,
    inLanguage: "en-IN",
    publisher: { "@id": organizationId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageSchema({
  name,
  description,
  path,
  type = "WebPage",
  image,
}: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    ...(image ? { primaryImageOfPage: absoluteUrl(image) } : {}),
  };
}

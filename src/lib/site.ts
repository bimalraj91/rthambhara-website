// Site-wide constants for SEO: canonical URLs, sitemaps and structured data.
// Set NEXT_PUBLIC_SITE_URL in the environment; the fallback is only a placeholder.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rtambhara.com"
).replace(/\/$/, "");

export const siteName = "Rtambhara Academy for Performing & Visual Arts";
export const shortName = "Rtambhara Academy";

export const siteDescription =
  "Rtambhara Academy for Performing and Visual Arts in Tripunithura preserves the depth of Kerala's classical traditions while making space for contemporary practice.";

export const contact = {
  phone: "+91 99612 60009",
  email: "mail@rtambhara.com",
  address: {
    streetAddress: "TRRA 66, Mahalakshmi, Thevarakkavu Road",
    addressLocality: "Tripunithura",
    addressRegion: "Kerala",
    postalCode: "682301",
    addressCountry: "IN",
  },
  // Approximate centre of Tripunithura.
  geo: { latitude: 9.9436, longitude: 76.3463 },
};

// Public profiles, used for structured data. Add the real URLs here.
export const socialProfiles: string[] = [];

export const defaultOgImage = {
  url: "/assets/images/hero-rhythm-of-creation.webp",
  width: 1672,
  height: 941,
  alt: "Dancers of Rtambhara Academy in motion",
};

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

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
  // Registration number, shown in the footer and the mobile menu.
  regNo: "EKM/TC/164/2016",
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

// The academy's public profiles. Every link on the site, and the structured
// data below, reads from here.
export const socialLinks = {
  facebook: "https://www.facebook.com/RtambharaKochi/",
  instagram: "https://www.instagram.com/rtambharakochi",
  youtube: "https://www.youtube.com/channel/UCvlvZRziHX9U4uC4sR0-IMA",
} as const;

export const socialProfiles: string[] = Object.values(socialLinks);

// The same profiles with their gold line icons, for the footer and the mobile
// menu.
export const socialIcons = [
  {
    label: "Facebook",
    icon: "/assets/icons/social-facebook.svg",
    href: socialLinks.facebook,
  },
  {
    label: "Instagram",
    icon: "/assets/icons/social-instagram.svg",
    href: socialLinks.instagram,
  },
  {
    label: "YouTube",
    icon: "/assets/icons/social-youtube.svg",
    href: socialLinks.youtube,
  },
];

// The WhatsApp number the floating chat widget opens, in international format
// without "+" or spaces.
export const whatsapp = {
  number: "919847105776",
  display: "+91 98471 05776",
  message:
    "Namaste! I'd like to know more about the classes at Rtambhara Academy.",
};

export function whatsappLink(message: string = whatsapp.message) {
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;
}

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

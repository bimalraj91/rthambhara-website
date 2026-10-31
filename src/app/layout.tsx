import type { Metadata } from "next";
import {
  Cinzel,
  Cormorant_Garamond,
  DM_Sans,
  Inter,
  Playfair_Display,
  Plus_Jakarta_Sans,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const liberationMono = localFont({
  variable: "--font-liberation-mono",
  src: [
    {
      path: "./fonts/LiberationMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/LiberationMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["Courier New", "monospace"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const description =
  "Rtambhara Academy for Performing and Visual Arts in Tripunithura preserves the depth of Kerala's classical traditions while making space for contemporary practice.";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Rtambhara Academy for Performing & Visual Arts",
    template: "%s | Rtambhara Academy",
  },
  description,
  applicationName: "Rtambhara Academy",
  keywords: [
    "Bharatanatyam",
    "Kalaripayattu",
    "Yoga",
    "Kerala performing arts",
    "Tripunithura",
    "dance academy",
  ],
  openGraph: {
    title: "Rtambhara Academy for Performing & Visual Arts",
    description,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/assets/images/hero-rhythm-of-creation.webp",
        width: 1672,
        height: 941,
        alt: "Dancers of Rtambhara Academy in motion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rtambhara Academy for Performing & Visual Arts",
    description,
    images: ["/assets/images/hero-rhythm-of-creation.webp"],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "96x96" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Rtambhara Academy for Performing & Visual Arts",
  description,
  logo: "/assets/brand/rtambhara-emblem.png",
  telephone: "+91 99612 60009",
  email: "mail@rtambhara.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "TRRA 66, Mahalakshmi, Thevarakkavu Road",
    addressLocality: "Tripunithura",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Bharatanatyam",
    "Kalaripayattu",
    "Contemporary dance",
    "Yoga",
    "Kathakali",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${cinzel.variable} ${playfair.variable} ${inter.variable} ${jakarta.variable} ${liberationMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}

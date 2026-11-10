import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.scss";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import IntroCurtain from "@/components/IntroCurtain";
import Header from "@/components/Header";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SmoothAnchors from "@/components/SmoothAnchors";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { defaultOgImage, siteDescription, siteName, siteUrl } from "@/lib/site";

// Only the faces every page uses are declared (and so preloaded) here. The
// display faces live in src/fonts and are imported by the sections that use
// them, so a page only downloads the fonts it actually shows.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
});

// The italic cut shares the family name, so italic text picks it up by itself.
const cormorantItalic = Cormorant_Garamond({
  variable: "--font-cormorant-italic",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#681722",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Rtambhara Academy",
  },
  description: siteDescription,
  applicationName: "Rtambhara Academy",
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "education",
  keywords: [
    "Bharatanatyam",
    "Kalaripayattu",
    "Yoga",
    "Kerala performing arts",
    "Tripunithura",
    "dance academy",
    "classical dance classes Kochi",
  ],
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: "/" },
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: "website",
    locale: "en_IN",
    siteName,
    url: "/",
    images: [{ ...defaultOgImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [defaultOgImage.url],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "96x96" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${cormorantItalic.variable} ${dmSans.variable} ${jakarta.variable}`}
    >
      <body>
        <IntroCurtain />
        <ScrollProgress />
        <SmoothAnchors />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <BackToTop />
        <WhatsAppWidget />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}

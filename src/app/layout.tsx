import type { Metadata, Viewport } from "next";
import {
  Amita,
  Cinzel,
  Cormorant_Garamond,
  DM_Sans,
  Inter,
  Playfair_Display,
  Plus_Jakarta_Sans,
} from "next/font/google";
import localFont from "next/font/local";
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
  weight: ["400", "700"],
  display: "swap",
});

const amita = Amita({
  variable: "--font-amita",
  subsets: ["latin"],
  weight: "700",
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
      className={`${cormorant.variable} ${dmSans.variable} ${cinzel.variable} ${amita.variable} ${playfair.variable} ${inter.variable} ${jakarta.variable} ${liberationMono.variable}`}
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

import type { Metadata } from "next";
import GalleryBoard from "@/components/GalleryBoard";
import { landingItems } from "@/data/gallery";
import { absoluteUrl, siteName } from "@/lib/site";

const title = "Gallery";
const description =
  "Moments that move us: photographs of Bharatanatyam, contemporary dance, healthy ageing, events and workshops at Rtambhara Academy in Tripunithura.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/gallery") },
  openGraph: {
    title: `${title} | Rtambhara Academy`,
    description,
    type: "website",
    locale: "en_IN",
    url: absoluteUrl("/gallery"),
    images: [
      { url: absoluteUrl(landingItems[0].src), alt: landingItems[0].alt },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Rtambhara Academy`,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: `${siteName} Gallery`,
  description,
  url: absoluteUrl("/gallery"),
  image: landingItems.map((item) => ({
    "@type": "ImageObject",
    contentUrl: absoluteUrl(item.src),
    name: item.title,
    caption: item.alt,
    description: item.caption,
  })),
};

export default function GalleryPage() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GalleryBoard
        mode="landing"
        blocks={[landingItems]}
        titleId="gallery-title"
      />
    </main>
  );
}

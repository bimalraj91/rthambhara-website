import type { Metadata } from "next";
import GalleryBoard from "@/components/GalleryBoard";
import { landingItems } from "@/data/gallery";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteName } from "@/lib/site";

const title = "Gallery";
const description =
  "Moments that move us: photographs of Bharatanatyam, contemporary dance, healthy ageing, events and workshops at Rtambhara Academy in Tripunithura.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/gallery",
  image: { url: landingItems[0].src, alt: description },
});

const gallerySchema = {
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

const jsonLd = [
  gallerySchema,
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: title, path: "/gallery" },
  ]),
];

export default function GalleryPage() {
  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <GalleryBoard
        mode="landing"
        blocks={[landingItems]}
        titleId="gallery-title"
      />
    </main>
  );
}

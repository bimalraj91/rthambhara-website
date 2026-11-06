import type { Metadata } from "next";
import GalleryBoard from "@/components/GalleryBoard";
import { expandedBlocks } from "@/data/gallery";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/seo";

const title = "Full Gallery";
const description =
  "Every moment from Rtambhara Academy: performances, rehearsals, workshops and celebrations in Bharatanatyam, contemporary dance and yoga.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/gallery/all",
  image: {
    url: "/assets/gallery/bharatanatyam-portrait.webp",
    alt: description,
  },
});

const jsonLd = [
  webPageSchema({
    name: title,
    description,
    path: "/gallery/all",
    type: "CollectionPage",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: title, path: "/gallery/all" },
  ]),
];

export default function FullGalleryPage() {
  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <GalleryBoard
        mode="expanded"
        blocks={expandedBlocks}
        titleId="gallery-all-title"
      />
    </main>
  );
}

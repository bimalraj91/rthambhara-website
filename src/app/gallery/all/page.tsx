import type { Metadata } from "next";
import GalleryBoard from "@/components/GalleryBoard";
import { expandedBlocks } from "@/data/gallery";
import { absoluteUrl } from "@/lib/site";

const title = "Full Gallery";
const description =
  "Every moment from Rtambhara Academy: performances, rehearsals, workshops and celebrations in Bharatanatyam, contemporary dance and yoga.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/gallery/all") },
  openGraph: {
    title: `${title} | Rtambhara Academy`,
    description,
    type: "website",
    locale: "en_IN",
    url: absoluteUrl("/gallery/all"),
  },
};

export default function FullGalleryPage() {
  return (
    <main id="main">
      <GalleryBoard
        mode="expanded"
        blocks={expandedBlocks}
        titleId="gallery-all-title"
      />
    </main>
  );
}

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/seo";
import ProgramsAgeing from "@/components/ProgramsAgeing";
import ProgramsBharatanatyam from "@/components/ProgramsBharatanatyam";
import ProgramsContemporary from "@/components/ProgramsContemporary";
import ProgramsHero from "@/components/ProgramsHero";
import ProgramsMarquee from "@/components/ProgramsMarquee";

const title = "Programs";
const description =
  "Explore the programmes at Rtambhara Academy: Bharatanatyam, contemporary dance inspired by Kalaripayattu, and a healthy ageing programme of Mohiniyattam and yoga in Tripunithura.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/programs",
  image: { url: "/assets/programs/hero-bg.webp", alt: description },
});

const jsonLd = [
  webPageSchema({
    name: title,
    description,
    path: "/programs",
    type: "CollectionPage",
    image: "/assets/programs/hero-bg.webp",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: title, path: "/programs" },
  ]),
];

export default function ProgramsPage() {
  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <ProgramsHero />
      <ProgramsMarquee />
      <ProgramsBharatanatyam />
      <ProgramsContemporary />
      <ProgramsAgeing />
    </main>
  );
}

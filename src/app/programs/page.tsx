import type { Metadata } from "next";
import ProgramsAgeing from "@/components/ProgramsAgeing";
import ProgramsBharatanatyam from "@/components/ProgramsBharatanatyam";
import ProgramsContemporary from "@/components/ProgramsContemporary";
import ProgramsHero from "@/components/ProgramsHero";
import ProgramsMarquee from "@/components/ProgramsMarquee";

const title = "Programs";
const description =
  "Explore the programmes at Rtambhara Academy: Bharatanatyam, contemporary dance inspired by Kalaripayattu, and a healthy ageing programme of Mohiniyattam and yoga in Tripunithura.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | Rtambhara Academy`,
    description,
    type: "website",
    locale: "en_IN",
  },
};

export default function ProgramsPage() {
  return (
    <main id="main">
      <ProgramsHero />
      <ProgramsMarquee />
      <ProgramsBharatanatyam />
      <ProgramsContemporary />
      <ProgramsAgeing />
    </main>
  );
}

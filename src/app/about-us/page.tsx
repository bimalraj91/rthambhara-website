import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/seo";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import AboutVisionMission from "@/components/AboutVisionMission";
import AboutWhy from "@/components/AboutWhy";
import ProgramsMarquee from "@/components/ProgramsMarquee";

const title = "About Us";
const description =
  "Discover the story of Rtambhara Academy for Performing and Visual Arts: a home for Bharatanatyam, contemporary movement, and a living artistic tradition in Tripunithura.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/about-us",
  image: { url: "/assets/about/hero-about.webp", alt: description },
});

const jsonLd = [
  webPageSchema({
    name: title,
    description,
    path: "/about-us",
    type: "AboutPage",
    image: "/assets/about/hero-about.webp",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: title, path: "/about-us" },
  ]),
];

export default function AboutUsPage() {
  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <AboutHero />
      <ProgramsMarquee
        items={["Tradition", "Grace", "Discipline", "Devotion", "Joy"]}
      />
      <AboutStory />
      <AboutVisionMission />
      <AboutWhy />
    </main>
  );
}

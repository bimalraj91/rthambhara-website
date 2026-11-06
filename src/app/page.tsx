import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { siteDescription, siteName } from "@/lib/site";
import AmbientMusic from "@/components/AmbientMusic";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Concept from "@/components/Concept";
import Specialties from "@/components/Specialties";
import Experience from "@/components/Experience";
import Journal from "@/components/Journal";
import News from "@/components/News";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Stories from "@/components/Stories";

export const metadata: Metadata = {
  ...pageMetadata({
    title: siteName,
    description: siteDescription,
    path: "/",
  }),
  // The home page keeps the full site name as its title.
  title: { absolute: siteName },
};

const jsonLd = webPageSchema({
  name: siteName,
  description: siteDescription,
  path: "/",
  image: "/assets/images/hero-rhythm-of-creation.webp",
});

export default function Home() {
  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <AmbientMusic />
      <Hero />
      <Intro />
      <Concept />
      <Specialties />
      <Experience />
      <Journal />
      <News />
      <Team />
      <Contact />
      <Stories />
    </main>
  );
}

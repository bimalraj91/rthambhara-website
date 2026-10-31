import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import AboutVisionMission from "@/components/AboutVisionMission";
import AboutWhy from "@/components/AboutWhy";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const title = "About Us";
const description =
  "Discover the story of Rtambhara Academy for Performing and Visual Arts: a home for Bharatanatyam, contemporary movement, and a living artistic tradition in Tripunithura.";

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

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main id="main">
        <AboutHero />
        <AboutStory />
        <AboutVisionMission />
        <AboutWhy />
      </main>
      <Footer />
    </>
  );
}

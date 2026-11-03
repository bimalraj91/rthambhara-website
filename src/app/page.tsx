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

export default function Home() {
  return (
    <main id="main">
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

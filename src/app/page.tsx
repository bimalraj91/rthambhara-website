import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Vision from "@/components/Vision";
import Concept from "@/components/Concept";
import Specialties from "@/components/Specialties";
import News from "@/components/News";
import Journal from "@/components/Journal";
import Community from "@/components/Community";
import Team from "@/components/Team";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Intro />
      <Vision />
      <Concept />
      <Specialties />
      <News />
      <Journal />
      <Community />
      <Team />
      <Contact />
    </main>
  );
}

import Header from "@/components/Header";
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
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <section id="top" className="relative">
        <Hero />
      </section>

      <Intro />

      <Vision />

      <Concept />

      <Specialties />

      <News />

      <Journal />

      <Community />

      <Team />

      <Contact />

      <Footer />
    </>
  );
}
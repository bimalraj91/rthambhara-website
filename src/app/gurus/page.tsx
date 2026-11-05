import type { Metadata } from "next";
import GurusHero from "@/components/GurusHero";
import GurusProfiles from "@/components/GurusProfiles";

const title = "Gurus";
const description =
  "Meet the gurus of Rtambhara Academy: Girija Ravindranath, the soul of tradition, and Satyajit Ravindranath, whose movement goes beyond limits.";

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

export default function GurusPage() {
  return (
    <main id="main">
      <GurusHero />
      <GurusProfiles />
    </main>
  );
}

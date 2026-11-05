import type { Metadata } from "next";
import NewsEvents from "@/components/NewsEvents";
import NewsHero from "@/components/NewsHero";

const title = "News & Events";
const description =
  "Upcoming recitals, workshops and celebrations at Rtambhara Academy, plus news and highlights from our gurus and disciples in Tripunithura.";

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

export default function NewsEventsPage() {
  return (
    <main id="main">
      <NewsHero />
      <NewsEvents />
    </main>
  );
}

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/seo";
import NewsEvents from "@/components/NewsEvents";
import NewsHero from "@/components/NewsHero";

const title = "News & Events";
const description =
  "Recitals, workshops, lecture-demonstrations and celebrations at Rtambhara Academy for Performing & Visual Arts, with news and highlights from our gurus and disciples in Tripunithura.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/news-events",
  image: { url: "/assets/contact/hero.webp", alt: description },
});

const jsonLd = [
  webPageSchema({
    name: title,
    description,
    path: "/news-events",
    type: "CollectionPage",
    image: "/assets/contact/hero.webp",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: title, path: "/news-events" },
  ]),
];

export default function NewsEventsPage() {
  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <NewsHero />
      <NewsEvents />
    </main>
  );
}

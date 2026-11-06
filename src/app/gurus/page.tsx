import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/seo";
import GurusHero from "@/components/GurusHero";
import GurusProfiles from "@/components/GurusProfiles";

const title = "Gurus";
const description =
  "Meet the gurus of Rtambhara Academy: Girija Ravindranath, the soul of tradition, and Satyajit Ravindranath, whose movement goes beyond limits.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/gurus",
  image: { url: "/assets/gurus/hero.webp", alt: description },
});

const jsonLd = [
  webPageSchema({
    name: title,
    description,
    path: "/gurus",
    type: "CollectionPage",
    image: "/assets/gurus/hero.webp",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: title, path: "/gurus" },
  ]),
];

export default function GurusPage() {
  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <GurusHero />
      <GurusProfiles />
    </main>
  );
}

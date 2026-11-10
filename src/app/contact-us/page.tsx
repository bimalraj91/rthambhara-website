import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/seo";
import ContactDetails from "@/components/ContactDetails";
import ContactHero from "@/components/ContactHero";
import ContactUs from "@/components/ContactUs";

const title = "Contact us";
const description =
  "Get in touch with Rtambhara Academy in Tripunithura: call, email or leave an enquiry for trial classes, admissions and a little guidance.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/contact-us",
  image: { url: "/assets/contact/hero.webp", alt: description },
});

const jsonLd = [
  webPageSchema({
    name: title,
    description,
    path: "/contact-us",
    type: "ContactPage",
    image: "/assets/contact/hero.webp",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: title, path: "/contact-us" },
  ]),
];

export default function ContactUsPage() {
  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <ContactHero />
      <ContactUs />
      <ContactDetails />
    </main>
  );
}

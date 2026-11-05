import type { Metadata } from "next";
import ContactDetails from "@/components/ContactDetails";
import ContactHero from "@/components/ContactHero";

const title = "Contact us";
const description =
  "Get in touch with Rtambhara Academy in Tripunithura: call, email or leave an enquiry for trial classes, admissions and a little guidance.";

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

export default function ContactUsPage() {
  return (
    <main id="main">
      <ContactHero />
      <ContactDetails />
    </main>
  );
}

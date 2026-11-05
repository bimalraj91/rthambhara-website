import type { Metadata } from "next";
import BlogHero from "@/components/BlogHero";
import BlogList from "@/components/BlogList";
import { blogPosts } from "@/data/blogs";
import { absoluteUrl, siteName } from "@/lib/site";

const title = "Blogs";
const description =
  "Stories, reflections and the art within: articles on Bharatanatyam, Carnatic music, yoga and life at Rtambhara Academy in Tripunithura.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/blogs") },
  openGraph: {
    title: `${title} | Rtambhara Academy`,
    description,
    type: "website",
    locale: "en_IN",
    url: absoluteUrl("/blogs"),
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Rtambhara Academy`,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${siteName} Blog`,
  description,
  url: absoluteUrl("/blogs"),
  publisher: { "@type": "Organization", name: siteName },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    url: absoluteUrl(`/blogs/${post.slug}`),
  })),
};

export default function BlogsPage() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHero
        titleId="blogs-hero-title"
        titleLines={["Stories, Reflections &", "The art within."]}
        bgSrc="/assets/blogs/hero-landing.webp"
        bgAlt="A Bharatanatyam dancer in a deep red setting"
        dancer
      />
      <BlogList posts={blogPosts} />
    </main>
  );
}

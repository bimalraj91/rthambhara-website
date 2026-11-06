import type { Metadata } from "next";
import BlogHero from "@/components/BlogHero";
import BlogList from "@/components/BlogList";
import { blogPosts } from "@/data/blogs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteName } from "@/lib/site";

const title = "Blogs";
const description =
  "Stories, reflections and the art within: articles on Bharatanatyam, Carnatic music, yoga and life at Rtambhara Academy in Tripunithura.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/blogs",
  image: { url: "/assets/blogs/hero-landing.webp", alt: description },
});

const blogSchema = {
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

const jsonLd = [
  blogSchema,
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: title, path: "/blogs" },
  ]),
];

export default function BlogsPage() {
  return (
    <main id="main">
      <JsonLd data={jsonLd} />
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

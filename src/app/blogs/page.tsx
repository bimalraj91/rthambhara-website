import type { Metadata } from "next";
import BlogHero from "@/components/BlogHero";
import BlogList from "@/components/BlogList";
import BlogsEmpty from "@/components/BlogsEmpty";
import { blogPosts } from "@/data/blogs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteName } from "@/lib/site";

const title = "Blogs";
const description =
  "Stories, reflections and the art within: articles on Bharatanatyam, Carnatic music, yoga and life at Rtambhara Academy in Tripunithura.";

// With nothing published the page is only a note, so search engines are asked
// to leave it out until there are posts to index.
const hasPosts = blogPosts.length > 0;

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/blogs",
  image: { url: "/assets/blogs/hero-landing.webp", alt: description },
  noIndex: !hasPosts,
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
  ...(hasPosts ? [blogSchema] : []),
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
      {hasPosts ? <BlogList posts={blogPosts} /> : <BlogsEmpty />}
    </main>
  );
}

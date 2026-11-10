import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlogArticle from "@/components/BlogArticle";
import BlogHero from "@/components/BlogHero";
import PageFallback from "@/components/PageFallback";
import {
  blogPosts,
  formatBlogDateLong,
  getBlogPost,
  type BlogPost,
} from "@/data/blogs";
import { absoluteUrl, siteName } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  const params = blogPosts.map((post) => ({ slug: post.slug }));
  // With Cache Components the build needs at least one sample path. While there
  // are no posts it is a placeholder that resolves to the not-found page below;
  // as soon as there are posts, every real post is prerendered instead.
  return params.length > 0 ? params : [{ slug: "__no-posts-yet__" }];
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const path = absoluteUrl(`/blogs/${post.slug}`);
  const title = `${post.title} | Rtambhara Academy`;

  return {
    // The root layout template adds the site name, so keep this short.
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: post.excerpt,
      type: "article",
      locale: "en_IN",
      url: path,
      publishedTime: post.date,
      section: post.category,
      tags: post.keywords,
      images: [{ url: absoluteUrl(post.cover), alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [absoluteUrl(post.cover)],
    },
  };
}

function structuredData(post: BlogPost) {
  const url = absoluteUrl(`/blogs/${post.slug}`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: absoluteUrl(post.cover),
      datePublished: post.date,
      dateModified: post.date,
      articleSection: post.category,
      keywords: post.keywords.join(", "),
      inLanguage: "en-IN",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: { "@type": "Organization", name: siteName },
      publisher: { "@type": "Organization", name: siteName },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blogs",
          item: absoluteUrl("/blogs"),
        },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
}

async function Article({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(post)),
        }}
      />
      <BlogHero
        titleId="blog-post-title"
        titleLines={[post.title]}
        bgSrc="/assets/blogs/hero-detail.webp"
        bgAlt="A Bharatanatyam dancer in traditional jewellery"
        compact
        meta={
          <>
            <time dateTime={post.date}>{formatBlogDateLong(post.date)}</time>
            <i aria-hidden="true">•</i>
            <span>{post.readMinutes} min read</span>
          </>
        }
      />
      <BlogArticle post={post} />
    </>
  );
}

export default function BlogPostPage({ params }: { params: Params }) {
  return (
    <main id="main">
      <Suspense fallback={<PageFallback hero />}>
        <Article params={params} />
      </Suspense>
    </main>
  );
}

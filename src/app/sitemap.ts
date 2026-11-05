import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogs";
import { newsItems } from "@/data/news";
import { absoluteUrl } from "@/lib/site";

const pages = [
  "/",
  "/about-us",
  "/programs",
  "/gurus",
  "/news-events",
  "/blogs",
  "/gallery",
  "/gallery/all",
  "/contact-us",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...newsItems.map((item) => ({
      url: absoluteUrl(`/news-events/${item.slug}`),
      lastModified: item.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blogs/${post.slug}`),
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

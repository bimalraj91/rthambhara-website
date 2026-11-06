import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogs";
import { expandedItems, landingItems } from "@/data/gallery";
import { newsItems } from "@/data/news";
import { absoluteUrl } from "@/lib/site";

// The sitemap is generated when the site is built. It reads the same data
// files the pages use (src/data/blogs.ts, news.ts, gallery.ts), so adding,
// removing or editing an entry and rebuilding updates the sitemap with it.
// Nothing here needs editing when content changes.

// Built once per deploy, so static pages carry the date of the last build.
const builtAt = new Date();

type Entry = MetadataRoute.Sitemap[number];

const staticPages: {
  path: string;
  priority: number;
  changeFrequency: Entry["changeFrequency"];
  images?: string[];
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about-us", priority: 0.8, changeFrequency: "monthly" },
  { path: "/programs", priority: 0.9, changeFrequency: "monthly" },
  { path: "/gurus", priority: 0.7, changeFrequency: "monthly" },
  { path: "/news-events", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blogs", priority: 0.8, changeFrequency: "weekly" },
  {
    path: "/gallery",
    priority: 0.6,
    changeFrequency: "monthly",
    images: landingItems.map((item) => item.src),
  },
  {
    path: "/gallery/all",
    priority: 0.5,
    changeFrequency: "monthly",
    images: [...new Set(expandedItems.map((item) => item.src))],
  },
  { path: "/contact-us", priority: 0.7, changeFrequency: "yearly" },
];

// Upcoming events have future dates; a sitemap must never claim a page was
// modified in the future, so dates are capped at the build time.
function toDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return builtAt;
  return date > builtAt ? builtAt : date;
}

// A listing page is as fresh as the newest item it lists.
function newest(dates: string[]) {
  return new Date(Math.max(...dates.map((d) => toDate(d).getTime())));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const listings: Record<string, Date> = {
    "/news-events": newest(newsItems.map((item) => item.date)),
    "/blogs": newest(blogPosts.map((post) => post.date)),
  };

  const pages: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: listings[page.path] ?? builtAt,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    ...(page.images ? { images: page.images.map(absoluteUrl) } : {}),
  }));

  const news: MetadataRoute.Sitemap = newsItems.map((item) => ({
    url: absoluteUrl(`/news-events/${item.slug}`),
    lastModified: toDate(item.date),
    changeFrequency: "monthly",
    priority: item.kind === "event" ? 0.7 : 0.6,
    images: [absoluteUrl(item.image)],
  }));

  const blogs: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blogs/${post.slug}`),
    lastModified: toDate(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
    images: [absoluteUrl(post.cover), absoluteUrl(post.featured)],
  }));

  return [...pages, ...news, ...blogs];
}

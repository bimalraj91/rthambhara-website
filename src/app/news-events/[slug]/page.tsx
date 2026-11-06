import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import NewsDetail from "@/components/NewsDetail";
import NewsHero from "@/components/NewsHero";
import JsonLd from "@/components/JsonLd";
import { getNewsItem, newsItems, type NewsItem } from "@/data/news";
import { breadcrumbSchema, organizationId, pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteName } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) return {};

  return pageMetadata({
    title: item.title,
    description: item.excerpt,
    path: `/news-events/${item.slug}`,
    image: { url: item.image, alt: item.imageAlt },
    type: "article",
    publishedTime: item.date,
    section: item.category,
  });
}

// "6:30 PM — 8:30 PM IST" -> ISO date-time in India time.
function startDateTime(item: NewsItem) {
  const match = item.time?.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return item.date;
  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === "PM") hours += 12;
  return `${item.date}T${String(hours).padStart(2, "0")}:${match[2]}:00+05:30`;
}

function structuredData(item: NewsItem) {
  const url = absoluteUrl(`/news-events/${item.slug}`);
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "News & Events", path: "/news-events" },
    { name: item.title, path: `/news-events/${item.slug}` },
  ]);

  if (item.kind === "event") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "Event",
        name: item.title,
        description: item.excerpt,
        image: [absoluteUrl(item.image)],
        startDate: startDateTime(item),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: item.venue,
          address: item.venue,
        },
        organizer: { "@id": organizationId },
        url,
      },
      breadcrumbs,
    ];
  }

  return [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: item.title,
      description: item.excerpt,
      image: [absoluteUrl(item.image)],
      datePublished: item.date,
      dateModified: item.date,
      articleSection: item.category,
      inLanguage: "en-IN",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: { "@type": "Organization", name: siteName },
      publisher: { "@id": organizationId },
    },
    breadcrumbs,
  ];
}

async function Article({ params }: { params: Params }) {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) notFound();

  return (
    <>
      <JsonLd data={structuredData(item)} />
      <NewsDetail item={item} />
    </>
  );
}

export default function NewsEventPage({ params }: { params: Params }) {
  return (
    <main id="main">
      <NewsHero />
      <Suspense fallback={null}>
        <Article params={params} />
      </Suspense>
    </main>
  );
}

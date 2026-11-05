import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import NewsDetail from "@/components/NewsDetail";
import NewsHero from "@/components/NewsHero";
import { getNewsItem, newsItems } from "@/data/news";

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

  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: `${item.title} | Rtambhara Academy`,
      description: item.excerpt,
      type: "article",
      locale: "en_IN",
    },
  };
}

async function Article({ params }: { params: Params }) {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) notFound();

  return <NewsDetail item={item} />;
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

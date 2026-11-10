# SEO guide

## Before going live

Set these environment variables (for example in your host's dashboard):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The real site address, e.g. `https://www.rtambhara.com`. Used for canonical links, social cards, the sitemap and structured data. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional. Google Search Console verification token. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Optional. Bing Webmaster Tools verification token. |

Then add the academy's real profile links to `socialProfiles` in `src/lib/site.ts`
(Facebook, Instagram, YouTube). They are published in the structured data.

## How the sitemap stays up to date

`src/app/sitemap.ts` runs **when the site is built** (`next build`). It reads the
same data files the pages use:

- `src/data/blogs.ts` → every published blog post (`blogPosts`, empty for now; the
  posts in `sampleBlogPosts` are reference only and are not published)
- `src/data/news.ts` → every news item and event
- `src/data/gallery.ts` → the gallery photos (listed as image entries)

So the update method is simply: **edit the data, rebuild, deploy**. A new blog post
gets its own page, its own sitemap entry, `lastmod` from its date, and its images.
Nothing else needs to be touched. Dates in the future (upcoming events) are capped
at the build time, because a sitemap must not claim a page changed in the future.

The sitemap is served at `/sitemap.xml` and advertised in `/robots.txt`. After the
first deploy, submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## What each page gets

Everything goes through `pageMetadata()` in `src/lib/seo.ts`, so pages stay consistent:

- A unique title and meta description
- A canonical URL
- Open Graph and Twitter cards with an image
- `BreadcrumbList` and `WebPage` structured data
- Blog posts: `BlogPosting`; events: `Event`; news: `NewsArticle`; gallery: `ImageGallery`
- Site-wide: `EducationalOrganization` + `LocalBusiness` and `WebSite` structured data

To add a new page, export `metadata = pageMetadata({ title, description, path })`
and render `<JsonLd data={...} />`.

## Other SEO pieces

- `lang="en-IN"`, viewport and theme colour, web app manifest
- A real `404` page (`noindex`) with links back into the site
- Security and caching headers in `next.config.ts`
- Images served as AVIF/WebP with responsive sizes
- One `<h1>` per page, descriptive link text, alt text on content images

## Checking Lighthouse scores

```bash
npm run build
npm run start -- -p 3100        # in one terminal
npm run lighthouse              # in another (LH_PRESET=both for mobile + desktop)
```

Results are written to `lighthouse-reports/SUMMARY.md`. Test the production build,
not `npm run dev`: development mode is much slower and gives misleading scores.

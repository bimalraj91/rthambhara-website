// Absolute site URL, used for canonical links, sitemaps and structured data.
// Set NEXT_PUBLIC_SITE_URL in the environment; the fallback is only a placeholder.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rtambhara.com"
).replace(/\/$/, "");

export const siteName = "Rtambhara Academy for Performing & Visual Arts";

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

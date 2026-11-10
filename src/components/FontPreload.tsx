"use client";

import { preloadFonts, type DisplayFont } from "@/lib/fonts";

// Dropped into a section that uses a display face (Cinzel, Playfair, Amita or
// Liberation Mono) so that the page preloads the font file.
//
// It is a client component on purpose. A hint issued from a server component
// also travels in the route's prefetch data, which made every page that links
// to this one download its fonts too.
export default function FontPreload({ fonts }: { fonts: DisplayFont[] }) {
  preloadFonts(...fonts);
  return null;
}

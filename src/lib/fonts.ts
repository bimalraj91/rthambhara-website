import { preload } from "react-dom";

// The display faces declared in src/styles/_display-fonts.scss. A section
// that uses one calls `preloadFonts(...)` while it renders, which adds a
// preload hint for that page only: the font then downloads alongside the
// stylesheet instead of being discovered after it.
const files = {
  cinzel: ["/fonts/cinzel-latin.woff2"],
  playfair: ["/fonts/playfair-display-italic-latin.woff2"],
  amita: ["/fonts/amita-bold-latin.woff2"],
  mono: [
    "/fonts/liberation-mono-regular.woff2",
    "/fonts/liberation-mono-bold.woff2",
  ],
} as const;

export type DisplayFont = keyof typeof files;

export function preloadFonts(...names: DisplayFont[]) {
  for (const name of names) {
    for (const href of files[name]) {
      preload(href, {
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      });
    }
  }
}

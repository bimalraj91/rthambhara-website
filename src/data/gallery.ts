// Sample gallery content. Replace the images and details later: each entry
// needs a unique id, an image under /public and the text shown in the lightbox.

export type GalleryShape = "arch" | "soft" | "round";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: GalleryCategory;
  caption: string;
  date: string;
  venue: string;
  shape: GalleryShape;
  // Width / height, used when the tiles flow (filters, tablet, mobile).
  ratio: number;
  // Position in the desktop mosaic (0-8).
  slot: number;
};

export type GalleryCategory =
  | "Bharatanatyam"
  | "Contemporary Dance"
  | "Healthy Ageing"
  | "Events"
  | "Workshops";

export const galleryCategories = [
  "All",
  "Bharatanatyam",
  "Contemporary Dance",
  "Healthy Ageing",
  "Events",
  "Workshops",
] as const;

type Photo = Omit<GalleryItem, "id" | "slot" | "shape" | "ratio">;

const A = "/assets/gallery";

const photos: Record<string, Photo> = {
  portrait: {
    src: `${A}/bharatanatyam-portrait.webp`,
    alt: "A Bharatanatyam dancer in a blue and red costume holding a graceful hand gesture",
    title: "The Language of the Hands",
    category: "Bharatanatyam",
    caption:
      "A senior disciple holds an alapadma mudra during the annual recital, with the full jewellery and costume of the classical tradition.",
    date: "12 Apr 2026",
    venue: "Rtambhara Studio, Tripunithura",
  },
  light: {
    src: `${A}/light-dancers.webp`,
    alt: "Two dancers reaching upwards in a beam of light with a third resting on the floor",
    title: "Rays of Stillness",
    category: "Contemporary Dance",
    caption:
      "A contemporary piece choreographed by Guru Satyajit, exploring the pause between two movements.",
    date: "28 Mar 2026",
    venue: "Kalakshetra Auditorium, Chennai",
  },
  orange: {
    src: `${A}/orange-dancer.webp`,
    alt: "A dancer in an orange costume mid-turn against a dark stage",
    title: "Turn of the Tillana",
    category: "Bharatanatyam",
    caption:
      "The closing tillana of the evening, a joyful burst of rhythm and footwork.",
    date: "10 Mar 2026",
    venue: "Town Hall, Ernakulam",
  },
  fire: {
    src: `${A}/fire-group.webp`,
    alt: "A group of dancers in red costumes striking a pose against glowing orange light",
    title: "Festival of Fire",
    category: "Events",
    caption:
      "The full ensemble on stage for the Nritya Sandhya festival night.",
    date: "23 Nov 2025",
    venue: "Rtambhara Open Stage",
  },
  yoga: {
    src: `${A}/yoga.webp`,
    alt: "Three people in a bright studio holding their palms together in prayer pose",
    title: "Morning Sadhana",
    category: "Healthy Ageing",
    caption:
      "A calm start to the day with our yoga sadhana group, open to every age.",
    date: "22 Feb 2026",
    venue: "Ladies Club Hall, Tripunithura",
  },
  mohini: {
    src: `${A}/mohiniyattam.webp`,
    alt: "A Mohiniyattam dancer in a white and gold saree with arms outstretched",
    title: "Grace of Mohiniyattam",
    category: "Healthy Ageing",
    caption:
      "A member of our healthy-ageing programme performs a Mohiniyattam piece in the traditional white and gold.",
    date: "05 Feb 2026",
    venue: "Ladies Club Hall, Tripunithura",
  },
  shield: {
    src: `${A}/kalari-shield.webp`,
    alt: "A woman holding a sword and shield in a Kalaripayattu pose",
    title: "Sword and Shield",
    category: "Contemporary Dance",
    caption:
      "Kalaripayattu weapon training that informs our contemporary choreography.",
    date: "18 Jan 2026",
    venue: "Rtambhara Studio, Tripunithura",
  },
  spear: {
    src: `${A}/kalari-spear.webp`,
    alt: "A Kalaripayattu practitioner in a low lunge holding a spear in a dim hall",
    title: "The Low Lunge",
    category: "Workshops",
    caption:
      "A practitioner demonstrates a long spear sequence at our weekend Kalaripayattu workshop.",
    date: "14 Dec 2025",
    venue: "Rtambhara Studio, Tripunithura",
  },
};

// Desktop mosaic: each slot is a fixed picture shape.
const slots: {
  photo: keyof typeof photos;
  shape: GalleryShape;
  ratio: number;
}[] = [
  { photo: "portrait", shape: "arch", ratio: 320 / 429 },
  { photo: "light", shape: "arch", ratio: 384 / 515 },
  { photo: "orange", shape: "round", ratio: 403 / 330 },
  { photo: "fire", shape: "soft", ratio: 411 / 330 },
  { photo: "portrait", shape: "soft", ratio: 275 / 330 },
  { photo: "yoga", shape: "soft", ratio: 429 / 240 },
  { photo: "mohini", shape: "soft", ratio: 432 / 420 },
  { photo: "shield", shape: "arch", ratio: 280 / 330 },
  { photo: "spear", shape: "soft", ratio: 403 / 330 },
];

function buildBlock(block: number, withCta: boolean): GalleryItem[] {
  return slots
    .map((slot, index) => ({ slot, index }))
    .filter(({ index }) => !(index === 4 && withCta))
    .map(({ slot, index }) => ({
      ...photos[slot.photo],
      id: `${slot.photo}-${block}-${index}`,
      shape: slot.shape,
      ratio: slot.ratio,
      slot: index,
    }));
}

// Landing page: one mosaic, with the "Explore More" tile in the fifth slot.
export const landingItems = buildBlock(1, true);

// Expanded page: three mosaics, the first with the tagline tile.
export const expandedBlocks: GalleryItem[][] = [
  buildBlock(1, true),
  buildBlock(2, false),
  buildBlock(3, false),
];

export const expandedItems = expandedBlocks.flat();

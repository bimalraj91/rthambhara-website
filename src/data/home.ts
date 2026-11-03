export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "Programs", href: "/#programs" },
  { label: "News & Events", href: "/#news" },
  { label: "Gurus", href: "/#team" },
  { label: "Blogs", href: "/#journal" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact us", href: "/#contact" },
] as const;

const heroMarker = "Tripunithura · Established 2012";

export const heroSlides = [
  {
    image: "/assets/home/hero-bg.png",
    alt: "A Bharatanatyam dancer in a deep red fresco setting framed by temple arches",
    imagePosition: "center",
    marker: heroMarker,
    lines: [
      "Every movement holds",
      "a memory.",
      "Every expression,",
      "a world of its own.",
    ],
    label: "Every movement holds a memory",
  },
  {
    image: "/assets/home/stories-background.png",
    alt: "A dancer framed by the golden arches of a temple",
    imagePosition: "center 42%",
    marker: heroMarker,
    lines: [
      "Every movement holds",
      "a memory.",
      "Every expression,",
      "a world of its own.",
    ],
    label: "Every expression, a world of its own",
  },
  {
    image: "/assets/home/concept-background.png",
    alt: "A dancer moving through a field of golden paisley motifs",
    imagePosition: "center 38%",
    marker: heroMarker,
    lines: [
      "Every movement holds",
      "a memory.",
      "Every expression,",
      "a world of its own.",
    ],
    label: "A world of its own",
  },
] as const;

export const programs = [
  {
    title: "Bharatanatyam",
    description:
      "The poetry of ancient traditions, preserved in every gesture, expression and measured step.",
    image: "/assets/home/offering-bharatanatyam.png",
    alt: "A Bharatanatyam dancer holding a classical pose",
  },
  {
    title: "Contemporary dance",
    description:
      "The fierce spirit of Kalari, finding new meaning through the freedom of contemporary movement.",
    image: "/assets/home/offering-contemporary.png",
    alt: "A contemporary dancer in motion",
  },
  {
    title: "Thiruvathira",
    description:
      "Familiar songs, graceful circles, and the beautiful togetherness of a tradition we grew up loving.",
    image: "/assets/home/offering-thiruvathira.png",
    alt: "Dancers moving together in a Thiruvathira circle",
  },
  {
    title: "Yoga",
    description:
      "The gentle art of listening to your body, caring for its strength and growing gracefully with time.",
    image: "/assets/home/offering-yoga.png",
    alt: "A yoga practitioner in a calm seated pose",
  },
] as const;

const newsStory = {
  category: "Classical heritage",
  title: "Raghaveeyam",
  excerpt:
    'rtambhara Academy for Performing and Visual Arts presents: "RAGHAVEEYAM –"',
  href: "#journal",
};

export const news = {
  feature: {
    ...newsStory,
    excerpt:
      'rtambhara Academy for Performing and Visual Arts presents: "RAGHAVEEYAM – Observance of Ramayana Month, Bhagavatpadham Bharathanatyam" at Sreepoornathrayeesa Temple, Tripunithura on 13th August 2026.',
    image: "/assets/home/news-feature.jpg",
    alt: "A dancer performing beneath warm temple lights",
    imagePosition: "center 42%",
  },
  stories: [
    {
      ...newsStory,
      image: "/assets/home/news-small-1.png",
      alt: "A classical dance performance on stage",
      imagePosition: "center 30%",
    },
    {
      ...newsStory,
      image: "/assets/home/news-small-3.png",
      alt: "A Bharatanatyam recital in progress",
      imagePosition: "center 34%",
    },
  ],
  gallery: [
    {
      image: "/assets/home/news-small-2.jpg",
      alt: "Students practising yoga together",
      imagePosition: "center 36%",
    },
    {
      image: "/assets/home/news-small-4.jpg",
      alt: "A Kalaripayattu practitioner mid-movement",
      imagePosition: "center 28%",
    },
  ],
} as const;

export const team = [
  {
    name: "Girija Ravindranath",
    role: "Music & Dance",
    image: "/assets/home/team-girija.png",
    alt: "Portrait of Girija Ravindranath",
    imagePosition: "center 24%",
  },
  {
    name: "Satyajit Ravindranath",
    role: "Contemporary Dance",
    image: "/assets/home/team-satyajit.png",
    alt: "Portrait of Satyajit Ravindranath",
    imagePosition: "center 22%",
  },
] as const;

export const story = {
  slides: [
    {
      image: "/assets/home/gallery-1.jpg",
      feature: "/assets/home/story-video.png",
      alt: "An ensemble Bharatanatyam performance on stage",
      quote:
        "A journey that began with curiosity transformed into a beautiful expression of discipline, dedication and artistic excellence.",
      name: "Ananya Menon",
      role: "Classical Dance Artist",
    },
    {
      image: "/assets/home/gallery-2.jpg",
      feature: "/assets/home/gallery-2.jpg",
      alt: "Expressive footwork adorned with traditional ghungroo bells",
      quote:
        "Every rhythm I learned here taught me patience first, and then the joy of letting the body speak without hurry.",
      name: "Meera Krishnan",
      role: "Bharatanatyam Student",
    },
    {
      image: "/assets/home/gallery-3.png",
      feature: "/assets/home/gallery-3.png",
      alt: "A dancer silhouetted against a full moon and sacred temples",
      quote:
        "The studio felt like a temple courtyard. I arrived as a spectator and left as a performer carrying a living tradition.",
      name: "Divya Nair",
      role: "Mohiniyattam Artist",
    },
    {
      image: "/assets/home/gallery-4.jpg",
      feature: "/assets/home/gallery-4.jpg",
      alt: "Kathakali artists in traditional costumes",
      quote:
        "Watching the masters rehearse changed how I see stories. Art here is handed down with care, one gesture at a time.",
      name: "Arjun Varma",
      role: "Kathakali Enthusiast",
    },
  ],
} as const;

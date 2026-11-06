// Sample content for the News & Events pages. Replace with real entries later:
// every item needs a unique `slug`, which becomes /news-events/<slug>.

export type NewsKind = "event" | "news";

export type NewsItem = {
  slug: string;
  kind: NewsKind;
  title: string;
  category: string;
  // Small label shown beside the category, e.g. the art form.
  discipline?: string;
  // ISO date (yyyy-mm-dd).
  date: string;
  time?: string;
  venue?: string;
  access?: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  // Optional picture and focal point used by the homepage News widget.
  homeImage?: string;
  homeImagePosition?: string;
  body: string[];
  bannerCaptionTitle: string;
  bannerCaption: string;
  bodyAfter: string[];
};

export const categories = [
  "All",
  "Performances",
  "Workshops",
  "Celebrations",
  "Achievements",
  "Gurukulam",
  "Community",
] as const;

const EVENT_IMAGE = "/assets/news/nritya.webp";
const NEWS_IMAGE = "/assets/news/youth.webp";

const margam = [
  "In the classical lexicon of the Natya Shastra, a Margam is not merely a sequence of choreographed movements; it is a sacred pilgrimage traversing bodily geometry, emotional surrender, and spiritual dissolution. This recital anchors itself in the lineage of the Thanjavur Quartet, celebrated for its structural discipline, sculptural stability (*Araimandi*), and emotional depth (*Sattvika Abhinaya*).",
  "Each item in the evening builds on the one before it, from the invocation to the closing tillana, so that the audience travels the full arc of the tradition within a single sitting.",
];

const margamAfter = [
  "The senior disciples of Rtambhara Gurukulam present the evening under the guidance of their gurus, with live music accompanying every item.",
  "Seating is limited, so we recommend arriving a little early. Light refreshments will be served after the performance.",
];

export const newsItems: NewsItem[] = [
  {
    slug: "nritya-sandhya",
    kind: "event",
    title: "Nritya Sandhya — An Evening of Classical Margam",
    category: "Performances",
    discipline: "Bharatanatyam",
    date: "2026-11-23",
    time: "6:30 PM — 8:30 PM IST",
    venue: "Kalakshetra Auditorium, Chennai",
    access: "Ticketed / Open to All",
    excerpt:
      "Presented by senior disciples of Rtambhara Gurukulam. Featuring a consecrated Varnam in Raga Shankarabharanam set to Adi Talam, followed by a closing Tillana.",
    image: EVENT_IMAGE,
    imageAlt: "Dancers performing on stage in warm lights",
    homeImage: "/assets/home/news-feature.jpg",
    homeImagePosition: "center 42%",
    body: margam,
    bannerCaptionTitle: "Sacred geometry",
    bannerCaption:
      "A senior disciple holding the Natyarambha line during technical rehearsal at the Mandapam.",
    bodyAfter: margamAfter,
  },
  {
    slug: "abhinaya-workshop",
    kind: "event",
    title: "Abhinaya Workshop — The Grammar of Expression",
    category: "Workshops",
    discipline: "Bharatanatyam",
    date: "2026-12-07",
    time: "10:00 AM — 1:00 PM IST",
    venue: "Rtambhara Studio, Tripunithura",
    access: "Registration required",
    excerpt:
      "A hands-on morning exploring Sattvika Abhinaya, hastas and the nine rasas with our gurus. Open to students and enthusiasts of every level.",
    image: EVENT_IMAGE,
    imageAlt: "Dancers performing on stage in warm lights",
    body: margam,
    bannerCaptionTitle: "Hands and eyes",
    bannerCaption:
      "Students practising hasta mudras in the studio ahead of the workshop.",
    bodyAfter: margamAfter,
  },
  {
    slug: "thiruvathira-celebration",
    kind: "event",
    title: "Thiruvathira Celebration — A Night of Circle and Song",
    category: "Celebrations",
    discipline: "Mohiniyattam",
    date: "2026-12-21",
    time: "5:30 PM — 7:30 PM IST",
    venue: "Ladies Club Hall, Tripunithura",
    access: "Open to All",
    excerpt:
      "Join our healthy-ageing group for the traditional Thiruvathira circle dance, with songs, lamps and festive food.",
    image: EVENT_IMAGE,
    imageAlt: "Dancers performing on stage in warm lights",
    body: margam,
    bannerCaptionTitle: "Circle of grace",
    bannerCaption:
      "Members of the healthy-ageing programme rehearsing the Thiruvathira circle.",
    bodyAfter: margamAfter,
  },
  {
    slug: "kalaripayattu-contemporary-showcase",
    kind: "event",
    title: "Kalaripayattu Meets Contemporary — A Studio Showcase",
    category: "Performances",
    discipline: "Contemporary",
    date: "2027-01-11",
    time: "6:00 PM — 7:30 PM IST",
    venue: "Rtambhara Studio, Tripunithura",
    access: "Open to All",
    excerpt:
      "An evening of movement where the ancient martial art of Kalaripayattu meets contemporary dance, choreographed by Guru Satyajit.",
    image: EVENT_IMAGE,
    imageAlt: "Dancers performing on stage in warm lights",
    body: margam,
    bannerCaptionTitle: "Beyond limits",
    bannerCaption:
      "Rehearsal of the closing sequence, blending Kalaripayattu footwork with contemporary lines.",
    bodyAfter: margamAfter,
  },
  {
    slug: "disciples-shine-youth-festival-2024",
    kind: "news",
    title: "Our Disciples Shine at Youth Festival 2024",
    category: "Achievements",
    date: "2024-10-15",
    excerpt:
      "Rtambhara students bring home accolades with their dedication and artistry.",
    image: NEWS_IMAGE,
    imageAlt: "Young dancers in costume after a performance",
    body: [
      "Our young disciples returned from the Youth Festival with a string of awards in Bharatanatyam and group dance, the fruit of many months of patient practice.",
      "The gurus thank every parent and student for the commitment that made this possible, and look forward to the next season.",
    ],
    bannerCaptionTitle: "Moments from the stage",
    bannerCaption: "Our disciples on stage at the Youth Festival 2024.",
    bodyAfter: [
      "Congratulations to every participant. The next batch of festival preparation classes begins soon.",
    ],
  },
  {
    slug: "new-gurukulam-batch",
    kind: "news",
    title: "A New Gurukulam Batch Begins This Season",
    category: "Gurukulam",
    date: "2024-09-02",
    excerpt:
      "Admissions are open for the new Bharatanatyam batch for young students, with classes at Ladies Club Hall.",
    image: NEWS_IMAGE,
    imageAlt: "Young dancers in costume after a performance",
    body: [
      "Rtambhara opens a new gurukulam batch this season, giving young students a gentle, disciplined introduction to Bharatanatyam.",
      "Classes follow a steady rhythm of adavus, rhythm exercises and stories, taught by experienced gurus.",
    ],
    bannerCaptionTitle: "First steps",
    bannerCaption: "Beginners learning their first adavus.",
    bodyAfter: [
      "To enrol, leave us a note on the contact page and we will be in touch about trial classes.",
    ],
  },
  {
    slug: "community-dance-day",
    kind: "news",
    title: "Community Dance Day Brings Tripunithura Together",
    category: "Community",
    date: "2024-08-18",
    excerpt:
      "Families, neighbours and friends joined an open afternoon of workshops and short performances.",
    image: NEWS_IMAGE,
    imageAlt: "Young dancers in costume after a performance",
    body: [
      "Our open afternoon welcomed families and neighbours for short workshops in Bharatanatyam, Kalaripayattu and yoga.",
      "It was a joyful reminder that the arts belong to everyone in the community.",
    ],
    bannerCaptionTitle: "Open to all",
    bannerCaption: "Visitors trying a short movement workshop.",
    bodyAfter: ["We look forward to hosting the next community day soon."],
  },
  {
    slug: "annual-day-celebration",
    kind: "news",
    title: "Annual Day Celebrates Ten Years of Rtambhara",
    category: "Celebrations",
    date: "2024-07-06",
    excerpt:
      "A decade of dance was marked with performances by students of every age and a tribute to our gurus.",
    image: NEWS_IMAGE,
    imageAlt: "Young dancers in costume after a performance",
    body: [
      "Our annual day marked ten years of Rtambhara with performances by students of every age.",
      "The evening closed with a tribute to the gurus whose teaching has shaped the academy.",
    ],
    bannerCaptionTitle: "A decade of dance",
    bannerCaption: "The finale of the annual day programme.",
    bodyAfter: ["Thank you to everyone who joined us on this special evening."],
  },
];

export const events = newsItems.filter((item) => item.kind === "event");
export const news = newsItems.filter((item) => item.kind === "news");

export function getNewsItem(slug: string) {
  return newsItems.find((item) => item.slug === slug);
}

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return {
    day: String(day).padStart(2, "0"),
    month: MONTHS[month - 1],
    year: String(year),
  };
}

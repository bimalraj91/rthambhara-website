// Content for the News & Events pages, the homepage Journal and News sections.
// Every item needs a unique `slug`, which becomes /news-events/<slug>.
//
// To add an event or a news item, add an entry to `newsItems` below. The order
// here does not matter: the pages sort by date themselves. For an event, fill
// in `schedule` to list its sessions on the event's own page.

export type NewsKind = "event" | "news";

// One session in an event's programme.
export type ScheduleItem = {
  time: string;
  title: string;
  // Who presents it, e.g. "Workshop by Kum. Gopika S. Pai".
  by?: string;
  // Extra lines, e.g. "Chief Guest: Sri Kavalam Sreekumar".
  notes?: string[];
};

// The sessions of one day that take place in the same hall.
export type ScheduleHall = {
  hall: string;
  items: ScheduleItem[];
};

export type NewsItem = {
  slug: string;
  kind: NewsKind;
  title: string;
  category: string;
  // Small label shown beside the category, e.g. "Day 1 of 3".
  discipline?: string;
  // ISO date (yyyy-mm-dd).
  date: string;
  time?: string;
  venue?: string;
  access?: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  // Which part of the picture stays in view where it is cropped to fit a card
  // (a CSS object-position), e.g. "center top" to keep the top of a poster.
  imagePosition?: string;
  // Optional picture and focal point used by the homepage News widget.
  homeImage?: string;
  homeImagePosition?: string;
  body: string[];
  bannerCaptionTitle: string;
  bannerCaption: string;
  bodyAfter: string[];
  // The programme for the day, hall by hall.
  schedule?: ScheduleHall[];
};

const POSTER = "/assets/news/dasabdi-mahothsavam.webp";
const POSTER_ALT =
  "Poster for Dasābdi Mahōthsavam, 13 to 15 November 2026 at TDM Hall, Ernakulam, listing the programme for Ganga Hall and Kaveri Hall.";
const VENUE = "TDM Hall, Ernakulam";
const FESTIVAL = "Dasābdi Mahōthsavam";
const PRESENTER = "Rtambhara Academy for Performing & Visual Arts";

export const newsItems: NewsItem[] = [
  {
    slug: "dasabdi-mahothsavam-day-1",
    kind: "event",
    title: `Day 1 · ${FESTIVAL} — Inauguration & Music Concert`,
    category: "Festival",
    discipline: "Day 1 of 3",
    date: "2026-11-13",
    time: "6:00 PM onwards",
    venue: VENUE,
    excerpt:
      "Inauguration with Chief Guest Sri Kavalam Sreekumar, a recital by senior students of Rtambhara Academy and a music concert, all in Ganga Hall.",
    image: POSTER,
    imageAlt: POSTER_ALT,
    imagePosition: "center top",
    homeImagePosition: "center top",
    body: [
      `${FESTIVAL} opens on 13 November 2026 at TDM Hall, Ernakulam, presented by ${PRESENTER}. The first evening takes place in Ganga Hall.`,
      "It begins with the inauguration at 6:00 PM, with Sri Kavalam Sreekumar as Chief Guest and Smt. Kalakshetra Vilasini as Guest of Honour. Senior students of Rtambhara Academy then present a recital, and the evening closes with a music concert by Sri Kavalam Sreekumar.",
    ],
    bannerCaptionTitle: `${FESTIVAL} · Day 1`,
    bannerCaption: `13 – 15 November 2026 at ${VENUE}, presented by ${PRESENTER}.`,
    bodyAfter: [
      "The festival continues on 14 and 15 November with workshops, lecture-demonstrations and performances in Kaveri Hall and Ganga Hall.",
    ],
    schedule: [
      {
        hall: "Ganga Hall",
        items: [
          {
            time: "6:00 PM – 6:30 PM",
            title: "Inauguration",
            notes: [
              "Chief Guest: Sri Kavalam Sreekumar",
              "Guest of Honour: Smt. Kalakshetra Vilasini",
            ],
          },
          {
            time: "6:30 PM – 7:30 PM",
            title: "Recital by Senior Students",
            by: "Rtambhara Academy",
          },
          {
            time: "7:30 PM",
            title: "Music Concert",
            by: "Sri Kavalam Sreekumar",
          },
        ],
      },
    ],
  },
  {
    slug: "dasabdi-mahothsavam-day-2",
    kind: "event",
    title: `Day 2 · ${FESTIVAL} — Workshops, Lec-Dems & “SATI”`,
    category: "Festival",
    discipline: "Day 2 of 3",
    date: "2026-11-14",
    time: "10:00 AM — 8:00 PM",
    venue: VENUE,
    excerpt:
      "Workshops and lecture-demonstrations in Kaveri Hall, then “Anthara Sandhya” and Rtambhara's own production “SATI” in Ganga Hall.",
    image: POSTER,
    imageAlt: POSTER_ALT,
    imagePosition: "center top",
    homeImagePosition: "center top",
    body: [
      `The second day of ${FESTIVAL}, 14 November 2026, begins in Kaveri Hall at 10:00 AM with a dance movement therapy workshop by Kum. Gopika S. Pai. Two lecture-demonstrations follow: gender in Kathakali practices by Smt. Geetha Varma, and sacred and secular music by Kum. Aditi Gopinath.`,
      "In the evening the programme moves to Ganga Hall for “Anthara Sandhya”, a Bharatanatyam recital by Dr. Sreelatha Vinod and disciples, and “SATI”, a Rtambhara production by Sri Satyajit Ravindranath.",
    ],
    bannerCaptionTitle: `${FESTIVAL} · Day 2`,
    bannerCaption: `13 – 15 November 2026 at ${VENUE}, presented by ${PRESENTER}.`,
    bodyAfter: [
      "The festival closes on 15 November with a theatre workshop, two more sessions in Kaveri Hall, the valedictory function and “Bhagawad Gita on Wheels”.",
    ],
    schedule: [
      {
        hall: "Kaveri Hall",
        items: [
          {
            time: "10:00 AM – 1:00 PM",
            title: "Dance Movement Therapy",
            by: "Workshop by Kum. Gopika S. Pai",
          },
          {
            time: "2:00 PM – 3:30 PM",
            title: "Gender in Kathakali Practices",
            by: "Lec-Dem by Smt. Geetha Varma",
          },
          {
            time: "4:00 PM – 5:00 PM",
            title: "Sacred & Secular Music",
            by: "Lec-Dem by Kum. Aditi Gopinath",
          },
        ],
      },
      {
        hall: "Ganga Hall",
        items: [
          {
            time: "6:00 PM – 7:00 PM",
            title: "“Anthara Sandhya”",
            by: "Bharatanatyam by Dr. Sreelatha Vinod & Disciples",
          },
          {
            time: "7:30 PM – 8:00 PM",
            title: "“SATI”",
            by: "A Rtambhara Production by Sri Satyajit Ravindranath",
          },
        ],
      },
    ],
  },
  {
    slug: "dasabdi-mahothsavam-day-3",
    kind: "event",
    title: `Day 3 · ${FESTIVAL} — Theatre, Yoga & Bhagawad Gita on Wheels`,
    category: "Festival",
    discipline: "Day 3 of 3",
    date: "2026-11-15",
    time: "10:00 AM onwards",
    venue: VENUE,
    excerpt:
      "A theatre workshop, a lec-dem and a yoga, kalari and wellness session, then the valedictory function and “Bhagawad Gita on Wheels”.",
    image: POSTER,
    imageAlt: POSTER_ALT,
    imagePosition: "center top",
    homeImagePosition: "center top",
    body: [
      `The final day of ${FESTIVAL}, 15 November 2026, spends the daytime in Kaveri Hall: a theatre workshop by Smt. Shirley Somasundaram, a lecture-demonstration by Sri Vinod Gopalakrishnan on nurturing an informed artist, and a yoga, kalari and wellness workshop by Sri Satyajit Ravindranath.`,
      "In the evening, Ganga Hall hosts the valedictory function at 6:00 PM, followed at 6:30 PM by “Bhagawad Gita on Wheels”, a world-first divine dance production by extraordinary wheelchair dancers.",
    ],
    bannerCaptionTitle: `${FESTIVAL} · Day 3`,
    bannerCaption: `13 – 15 November 2026 at ${VENUE}, presented by ${PRESENTER}.`,
    bodyAfter: [],
    schedule: [
      {
        hall: "Kaveri Hall",
        items: [
          {
            time: "10:00 AM – 1:00 PM",
            title: "Theatre Workshop",
            by: "By Smt. Shirley Somasundaram",
          },
          {
            time: "2:00 PM – 3:30 PM",
            title: "Beyond Technique – Nurturing an Informed Artist",
            by: "Lec-Dem by Sri Vinod Gopalakrishnan",
          },
          {
            time: "4:00 PM – 5:00 PM",
            title: "Yoga, Kalari & Wellness",
            by: "Workshop by Sri Satyajit Ravindranath",
          },
        ],
      },
      {
        hall: "Ganga Hall",
        items: [
          {
            time: "6:00 PM",
            title: "Valedictory Function",
          },
          {
            time: "6:30 PM",
            title: "Bhagawad Gita on Wheels",
            by: "A World-First Divine Dance Production by Extraordinary Wheelchair Dancers",
          },
        ],
      },
    ],
  },
];

// The filter chips on the News & Events page: "All" plus every category in use.
export const categories: string[] = [
  "All",
  ...new Set(newsItems.map((item) => item.category)),
];

const byDateAscending = (a: NewsItem, b: NewsItem) =>
  a.date.localeCompare(b.date);
const byDateDescending = (a: NewsItem, b: NewsItem) =>
  b.date.localeCompare(a.date);

// Events in date order, the soonest first. News, newest first.
export const events = newsItems
  .filter((item) => item.kind === "event")
  .sort(byDateAscending);
export const news = newsItems
  .filter((item) => item.kind === "news")
  .sort(byDateDescending);

/** An event is upcoming until the day after it takes place. */
export function isUpcoming(
  item: Pick<NewsItem, "kind" | "date">,
  today: string | null,
) {
  return item.kind === "event" && today !== null && item.date >= today;
}

/** Puts a list of events in date order: the upcoming ones first, soonest
 *  first, then the ones already held, most recent first. Before `today` is
 *  known (on the server) they are simply listed by date, soonest first. */
export function sortEvents(list: NewsItem[], today: string | null) {
  if (today === null) return [...list].sort(byDateAscending);

  return [
    ...list.filter((item) => item.date >= today).sort(byDateAscending),
    ...list.filter((item) => item.date < today).sort(byDateDescending),
  ];
}

/** The part of a title before the dash: "Day 1 · Dasābdi Mahōthsavam". Used
 *  where there is room for only a short heading, so whatever tells entries
 *  apart should come first in a title. */
export function shortTitle(item: Pick<NewsItem, "title">) {
  return item.title.split(" — ")[0];
}

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

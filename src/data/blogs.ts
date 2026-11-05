// Sample blog content. Replace with real articles later: every post needs a
// unique `slug`, which becomes its own page at /blogs/<slug>.

export type BlogSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  // ISO date (yyyy-mm-dd).
  date: string;
  readMinutes: number;
  excerpt: string;
  cover: string;
  coverAlt: string;
  featured: string;
  featuredAlt: string;
  quote: string;
  sections: BlogSection[];
  keywords: string[];
};

export type BlogCategory = "Dance" | "Music" | "Yoga" | "Life";

export const blogCategories = [
  "All",
  "Dance",
  "Music",
  "Yoga",
  "Life",
] as const;

const COVER = "/assets/blogs/cover.webp";
const FEATURED = "/assets/blogs/featured.webp";
const COVER_ALT = "A Bharatanatyam dancer in traditional costume on stage";
const FEATURED_ALT =
  "A dancer's hands in a sacred mudra pose, lit by a brass oil lamp";
const QUOTE = "Bharatanatyam is not just a dance, it is a way of life.";

function section(id: string, heading: string, ...paragraphs: string[]) {
  return { id, heading, paragraphs };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "the-timeless-beauty-of-bharatanatyam",
    title: "The Timeless Beauty of Bharatanatyam",
    category: "Dance",
    date: "2026-04-12",
    readMinutes: 6,
    excerpt:
      "From its rich history to its enduring relevance, Bharatanatyam continues to inspire generations.",
    cover: COVER,
    coverAlt: COVER_ALT,
    featured: FEATURED,
    featuredAlt: FEATURED_ALT,
    quote: QUOTE,
    keywords: ["Bharatanatyam", "classical dance", "Kerala", "Tamil Nadu"],
    sections: [
      section(
        "the-origins",
        "The Origins",
        "Bharatanatyam traces its roots to the ancient temples of Tamil Nadu, where it was once a sacred offering to the deities. Known as Sadir in its early days, it was performed by devadasis as a form of worship and service.",
      ),
      section(
        "the-elements",
        "The Elements",
        "The beauty of Bharatanatyam lies in its unique combination of rhythm, music, expression and movement. Every gesture, eye movement and footstep carries meaning, creating a language that speaks without words.",
      ),
      section(
        "a-living-tradition",
        "A Living Tradition",
        "Today, Bharatanatyam continues to evolve, inspiring new generations while staying rooted in its rich tradition. It is a celebration of discipline, artistry and the eternal connection between the human spirit and the divine.",
      ),
      section(
        "why-it-still-matters",
        "Why It Still Matters",
        "In a fast-changing world, Bharatanatyam reminds us of the beauty of slowing down, of finding meaning in simplicity, and of keeping our cultural roots alive.",
      ),
    ],
  },
  {
    slug: "understanding-the-nine-rasas",
    title: "Understanding the Nine Rasas of Classical Dance",
    category: "Dance",
    date: "2026-03-28",
    readMinutes: 5,
    excerpt:
      "Love, laughter, courage and calm: how dancers shape emotion into a language every audience can feel.",
    cover: COVER,
    coverAlt: COVER_ALT,
    featured: FEATURED,
    featuredAlt: FEATURED_ALT,
    quote: "Every face on stage is a doorway into a feeling.",
    keywords: ["navarasa", "abhinaya", "Bharatanatyam expression"],
    sections: [
      section(
        "what-is-a-rasa",
        "What Is a Rasa?",
        "A rasa is the essence of an emotion as it is tasted by the audience. Classical dance names nine of them, and a dancer trains for years to bring each one to life with the face, the eyes and the whole body.",
      ),
      section(
        "the-nine-moods",
        "The Nine Moods",
        "From shringara, the rasa of love, to shanta, the rasa of peace, the navarasas give a performer a complete palette. Abhinaya is the art of mixing that palette so a story unfolds without a single spoken word.",
      ),
      section(
        "learning-expression",
        "Learning Expression",
        "Students begin with simple facial exercises and short phrases, slowly connecting breath, gaze and gesture. With patience the expression stops being practised and becomes honest.",
      ),
    ],
  },
  {
    slug: "raga-and-rhythm-the-soul-of-carnatic-music",
    title: "Raga and Rhythm: The Soul of Carnatic Music",
    category: "Music",
    date: "2026-03-10",
    readMinutes: 7,
    excerpt:
      "Why the melodic frame of a raga and the cycle of a tala are the heartbeat of every Bharatanatyam recital.",
    cover: COVER,
    coverAlt: COVER_ALT,
    featured: FEATURED,
    featuredAlt: FEATURED_ALT,
    quote: "Music is the breath, and dance is the body that listens.",
    keywords: ["Carnatic music", "raga", "tala", "mridangam"],
    sections: [
      section(
        "the-melodic-frame",
        "The Melodic Frame",
        "A raga is more than a scale. It carries a mood, a time of day and a set of phrases that a musician explores with great freedom while staying faithful to its character.",
      ),
      section(
        "the-cycle-of-time",
        "The Cycle of Time",
        "Tala organises rhythm into repeating cycles. For a dancer, the mridangam and the cymbals are a constant conversation, with every adavu landing exactly on the beat.",
      ),
      section(
        "dancing-to-live-music",
        "Dancing to Live Music",
        "A live orchestra responds to the dancer as much as the dancer responds to the music. That listening is what gives a recital its quiet electricity.",
      ),
    ],
  },
  {
    slug: "morning-yoga-for-dancers",
    title: "A Morning Yoga Routine for Dancers",
    category: "Yoga",
    date: "2026-02-22",
    readMinutes: 4,
    excerpt:
      "Ten gentle minutes that open the hips, steady the breath and prepare the body for a full day of practice.",
    cover: COVER,
    coverAlt: COVER_ALT,
    featured: FEATURED,
    featuredAlt: FEATURED_ALT,
    quote: "A calm breath is the first step of every graceful movement.",
    keywords: ["yoga for dancers", "flexibility", "breathing"],
    sections: [
      section(
        "begin-with-breath",
        "Begin With Breath",
        "Sit comfortably and take a few slow breaths, letting the exhale be a little longer than the inhale. This settles the mind and tells the body that practice is about to begin.",
      ),
      section(
        "open-the-hips",
        "Open the Hips",
        "Bharatanatyam asks a lot of the hips and knees in the araimandi position. A few gentle stretches, held with patience, protect the joints and improve the line of every posture.",
      ),
      section(
        "close-with-stillness",
        "Close With Stillness",
        "Finish with a minute of quiet standing, feeling the weight in both feet. It is a small ritual that carries calm into the rest of the day.",
      ),
    ],
  },
  {
    slug: "the-role-of-the-guru-in-a-gurukulam",
    title: "The Role of the Guru in a Gurukulam",
    category: "Life",
    date: "2026-02-05",
    readMinutes: 5,
    excerpt:
      "In the gurukulam tradition, learning is a relationship. What does it mean to learn at the feet of a teacher?",
    cover: COVER,
    coverAlt: COVER_ALT,
    featured: FEATURED,
    featuredAlt: FEATURED_ALT,
    quote: "A guru does not give you answers, but teaches you how to look.",
    keywords: ["guru shishya parampara", "gurukulam", "learning"],
    sections: [
      section(
        "a-relationship",
        "A Relationship",
        "The guru-shishya parampara is built on trust. A student does not simply collect steps; they absorb a way of seeing, of listening and of carrying oneself.",
      ),
      section(
        "patience-and-discipline",
        "Patience and Discipline",
        "Progress in classical arts is slow by design. The guru sets the pace, and the student learns that depth comes from returning to the basics again and again.",
      ),
      section(
        "carrying-it-forward",
        "Carrying It Forward",
        "Every student eventually becomes a keeper of the tradition, passing on what they were given. That chain of teaching is what keeps the art alive.",
      ),
    ],
  },
  {
    slug: "kalaripayattu-and-the-dancers-body",
    title: "Kalaripayattu and the Dancer's Body",
    category: "Dance",
    date: "2026-01-18",
    readMinutes: 6,
    excerpt:
      "How the ancient martial art of Kerala builds strength, balance and presence that dancers can use on stage.",
    cover: COVER,
    coverAlt: COVER_ALT,
    featured: FEATURED,
    featuredAlt: FEATURED_ALT,
    quote: "Strength and grace are not opposites; they are partners.",
    keywords: ["Kalaripayattu", "contemporary dance", "conditioning"],
    sections: [
      section(
        "an-ancient-art",
        "An Ancient Art",
        "Kalaripayattu is one of the oldest martial arts in the world, born in Kerala. Its training builds agility, flexibility and a calm, focused mind.",
      ),
      section(
        "from-the-kalari-to-the-stage",
        "From the Kalari to the Stage",
        "The low stances, quick turns and controlled breathing of Kalaripayattu carry naturally into dance. Our contemporary classes borrow from it to build a body that is both strong and fluid.",
      ),
      section(
        "balance-and-presence",
        "Balance and Presence",
        "Practitioners learn to hold their ground with relaxed alertness. That stillness before movement is exactly what makes a dancer compelling to watch.",
      ),
    ],
  },
  {
    slug: "why-children-should-learn-classical-dance",
    title: "Why Children Should Learn Classical Dance",
    category: "Life",
    date: "2025-12-14",
    readMinutes: 4,
    excerpt:
      "Beyond steps and costumes, classical dance gives children focus, confidence and a lasting bond with their culture.",
    cover: COVER,
    coverAlt: COVER_ALT,
    featured: FEATURED,
    featuredAlt: FEATURED_ALT,
    quote: "What a child learns with joy, they carry for life.",
    keywords: [
      "children dance classes",
      "Bharatanatyam for kids",
      "Tripunithura",
    ],
    sections: [
      section(
        "focus-and-discipline",
        "Focus and Discipline",
        "Learning adavus and rhythm patterns trains attention and memory in a way that feels like play. Children discover that steady effort brings real progress.",
      ),
      section(
        "confidence-on-stage",
        "Confidence on Stage",
        "Performing in front of an audience, even a small one, teaches a child to trust themselves. The applause matters less than the quiet pride that follows.",
      ),
      section(
        "a-connection-to-culture",
        "A Connection to Culture",
        "Stories from the epics, songs in classical languages and the courtesies of the studio give children a living link to their heritage.",
      ),
    ],
  },
  {
    slug: "breathing-practices-for-stage-confidence",
    title: "Breathing Practices for Stage Confidence",
    category: "Yoga",
    date: "2025-11-30",
    readMinutes: 4,
    excerpt:
      "Simple pranayama techniques that calm pre-performance nerves and keep the voice and body steady.",
    cover: COVER,
    coverAlt: COVER_ALT,
    featured: FEATURED,
    featuredAlt: FEATURED_ALT,
    quote: "Steady breath, steady mind, steady step.",
    keywords: ["pranayama", "stage fright", "performance"],
    sections: [
      section(
        "why-breath-matters",
        "Why Breath Matters",
        "Nerves live in the breath. When the breath is short and high, the whole body tightens; when it is slow and low, the body softens and the mind clears.",
      ),
      section(
        "three-simple-practices",
        "Three Simple Practices",
        "Try slow belly breathing, a gentle alternate-nostril practice and a long humming exhale. Each takes only a couple of minutes and can be done in the green room.",
      ),
      section(
        "making-it-a-habit",
        "Making It a Habit",
        "Practised daily, these techniques become a reliable anchor. By the day of the performance, calm is something the body already knows how to find.",
      ),
    ],
  },
  {
    slug: "listening-to-the-mridangam",
    title: "Listening to the Mridangam",
    category: "Music",
    date: "2025-11-12",
    readMinutes: 5,
    excerpt:
      "The twin-headed drum that speaks in syllables and guides every footstep of a Bharatanatyam performance.",
    cover: COVER,
    coverAlt: COVER_ALT,
    featured: FEATURED,
    featuredAlt: FEATURED_ALT,
    quote: "The drum speaks, and the feet answer.",
    keywords: ["mridangam", "percussion", "jathi"],
    sections: [
      section(
        "a-drum-that-speaks",
        "A Drum That Speaks",
        "The mridangam is played with the fingers and palms, producing syllables that dancers and drummers both understand. Each syllable has its own sound and its own footstep.",
      ),
      section(
        "conversation-with-the-dancer",
        "Conversation With the Dancer",
        "During a jathi the dancer recites the syllables and the drummer answers them in sound. The two build intricate patterns together and land on the same beat.",
      ),
      section(
        "learning-to-listen",
        "Learning to Listen",
        "Students spend time simply listening to the mridangam before they dance to it. Hearing the rhythm clearly is the first step to dancing it well.",
      ),
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  const current = getBlogPost(slug);
  const others = blogPosts.filter((post) => post.slug !== slug);
  // Same category first, then the most recent.
  return others
    .sort((a, b) => {
      const sameA = a.category === current?.category ? 1 : 0;
      const sameB = b.category === current?.category ? 1 : 0;
      return sameB - sameA || b.date.localeCompare(a.date);
    })
    .slice(0, limit);
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
const MONTHS_LONG = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// "12 APR 2026" for cards.
export function formatBlogDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${String(day).padStart(2, "0")} ${MONTHS[month - 1]} ${year}`;
}

// "12 Apr 2026" for the article header.
export function formatBlogDateLong(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${String(day).padStart(2, "0")} ${MONTHS_LONG[month - 1]} ${year}`;
}

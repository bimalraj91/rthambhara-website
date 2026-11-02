export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "Programs", href: "/#programs" },
  { label: "News", href: "/#news" },
  { label: "Events", href: "/#journal" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact us", href: "/#contact" },
] as const;

export const heroSlides = [
  {
    image: "/assets/images/hero-rhythm-of-creation.webp",
    alt: "A Bharatanatyam dancer in a red-toned fresco setting, framed by a peacock and temple arches",
    imagePosition: "center",
    marker: "Tripunithura · Established 2012",
    lines: ["Celebrating Tradition", "Inspiring Generations."],
    aside: ["Ritambhara", "Academy for Performing & Visual Arts"],
    label: "Celebrating tradition, inspiring generations",
  },
  {
    image: "/assets/about/hero-about.webp",
    alt: "A dancer in a red-toned temple setting",
    imagePosition: "center 42%",
    marker: "Bharatanatyam · Kalakshetra Legacy",
    lines: ["Rooted in Ritual", "Alive in Motion."],
    aside: ["Classical technique,", "carried by a living voice"],
    label: "Rooted in ritual, alive in motion",
  },
  {
    image: "/assets/about/why-dancer.webp",
    alt: "A dancer mid-movement in warm stage light",
    imagePosition: "center 38%",
    marker: "Bharatanatyam · Kalaripayattu · Yoga",
    lines: ["Strength in Stillness", "Fire in Motion."],
    aside: ["The body as archive,", "the breath as guide"],
    label: "Strength in stillness, fire in motion",
  },
  {
    image: "/assets/about/vision-dancer.webp",
    alt: "A dancer framed by a golden circle",
    imagePosition: "center 44%",
    marker: "Performance · Community · Culture",
    lines: ["A Home for the Arts", "A Place to Belong."],
    aside: ["Learn. Practise. Perform.", "Belong."],
    label: "A home for the arts, a place to belong",
  },
] as const;

export const programs = [
  {
    title: "Bharatanatyam",
    description:
      "Regular Bharatanatyam classes are being conducted for young students at the Ladies Club Hall, Tripunithura.",
    image: "/assets/images/program-bharatanatyam.webp",
    alt: "A Bharatanatyam dancer holding a classical pose",
    imagePosition: "center 50%",
  },
  {
    title: "Contemporary Kalaripayattu",
    description:
      "Rtambhara presents Contemporary Kalaripayattu designed for building strength and flexibility of traditional Kalari.",
    image: "/assets/images/program-kalaripayattu.webp",
    alt: "A Kalaripayattu practitioner in a wide stance",
    imagePosition: "center 46%",
  },
  {
    title: "Training Programs",
    description:
      "Classes for Music, Violin and Yogas. Conducting regular classes for Art Lovers and young aspiring artists and beginners.",
    image: "/assets/images/program-training-programs.webp",
    alt: "A group of dancers moving together in a studio",
    imagePosition: "center 38%",
  },
] as const;

export const news = [
  {
    kind: "feature",
    category: "Classical Heritage",
    title: "Raghaveeyam",
    excerpt:
      'Rtambhara Academy for Performing and Visual Arts presents: "RAGHAVEEYAM – Observance of Ramayana Month, Bhagavatpadham Bharathanatyam" at Sreepoornathrayeesa Temple, Tripunithura on 13th August 2026.',
    image: "/assets/images/news-kalari-performance.webp",
    alt: "Two Kalaripayattu practitioners facing each other in a performance",
    imagePosition: "center 45%",
  },
  {
    kind: "cream",
    category: "Classical Heritage",
    title: "Raghaveeyam",
    excerpt:
      'Rtambhara Academy for Performing and Visual Arts presents: "RAGHAVEEYAM –',
    image: "/assets/images/news-aritha-dhara-poster.webp",
    alt: "Aritha Dhara event poster",
    imagePosition: "center 26%",
  },
  {
    kind: "cream",
    category: "Classical Heritage",
    title: "Raghaveeyam",
    excerpt:
      'Rtambhara Academy for Performing and Visual Arts presents: "RAGHAVEEYAM –',
    image: "/assets/images/news-raghaveeyam-poster.webp",
    alt: "Raghaveeyam event poster",
    imagePosition: "center 30%",
  },
  {
    kind: "narrow",
    category: "",
    title: "",
    excerpt: "",
    image: "/assets/images/news-yoga-class.webp",
    alt: "Students practicing yoga together in the studio",
    imagePosition: "center 38%",
  },
  {
    kind: "narrow",
    category: "",
    title: "",
    excerpt: "",
    image: "/assets/images/news-kalari-warrior.webp",
    alt: "A Kalaripayattu practitioner mid-movement",
    imagePosition: "center 28%",
  },
] as const;

export const team = [
  {
    name: "Girija Ravindranath",
    role: "Music & Dance",
    image: "/assets/images/team-girija-ravindranath.webp",
    alt: "Portrait of Girija Ravindranath",
    imagePosition: "center 24%",
  },
  {
    name: "Satyajit Ravindranath",
    role: "Contemporary Dance",
    image: "/assets/images/team-satyajit-ravindranath.webp",
    alt: "Portrait of Satyajit Ravindranath",
    imagePosition: "center 22%",
  },
  {
    name: "Geetha Varma",
    role: "Kathakali & Dance",
    image: "/assets/images/team-geetha-varma.webp",
    alt: "Portrait of Geetha Varma",
    imagePosition: "center 24%",
  },
] as const;

export const footerColumns = {
  quickLinks: [
    { label: "Home", href: "#top" },
    { label: "About Academy", href: "#about" },
    { label: "Training Programs", href: "#programs" },
    { label: "News & Events", href: "#news" },
    { label: "Photo Gallery", href: "#gallery" },
  ],
  disciplines: [
    { label: "Bharatanatyam Masterclasses", href: "#programs" },
    { label: "Contemporary Kalaripayattu", href: "#programs" },
    { label: "Yoga Sadhana", href: "#programs" },
  ],
  bottomLinks: [
    { label: "Privacy Policy", href: "#contact" },
    { label: "Terms of Heritage", href: "#contact" },
    { label: "Join Community", href: "#contact" },
  ],
  socials: [
    {
      label: "Facebook",
      icon: "/assets/icons/social-facebook.svg",
    },
    {
      label: "Instagram",
      icon: "/assets/icons/social-instagram.svg",
    },
    {
      label: "YouTube",
      icon: "/assets/icons/social-youtube.svg",
    },
  ],
} as const;

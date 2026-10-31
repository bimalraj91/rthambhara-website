import Image from "next/image";
import Link from "next/link";
import SectionMarker from "./SectionMarker";
import styles from "./AboutHero.module.scss";

const chapters = [
  { number: "01", label: "Who we are", href: "#who-we-are" },
  { number: "02", label: "Vision & mission", href: "#vision-mission" },
  { number: "03", label: "Why Rtambhara", href: "#why-rtambhara" },
];

const letters = [
  { src: "/assets/about/hero-letter-6.svg", className: styles.letter6 },
  { src: "/assets/about/hero-letter-5.svg", className: styles.letter5 },
  { src: "/assets/about/hero-letter-4.svg", className: styles.letter4 },
  { src: "/assets/about/hero-letter-3.svg", className: styles.letter3 },
  { src: "/assets/about/hero-letter-2.svg", className: styles.letter2 },
  { src: "/assets/about/hero-letter-1.svg", className: styles.letter1 },
];

export default function AboutHero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="about-hero-title">
      <Image
        src="/assets/about/hero-about.webp"
        alt="Four Bharatanatyam dancers in a dimly lit temple hall, framed by carved stone and brass lamps"
        fill
        priority
        sizes="100vw"
        className={styles.background}
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.word} aria-hidden="true">
        {letters.map((letter) => (
          <Image
            key={letter.src}
            src={letter.src}
            alt=""
            width={210}
            height={215}
            unoptimized
            className={`${styles.letter} ${letter.className}`}
          />
        ))}
      </div>

      <div className={styles.frame}>
        <div className={styles.card}>
          <SectionMarker
            tone="light"
            lineWidth={24}
            className={styles.marker}
          >
            About Rtambhara
          </SectionMarker>

          <h1 id="about-hero-title" className={styles.title}>
            <span>Every Movement Holds</span>
            <span>A Memory.</span>
            <span>Every Expression,</span>
            <span className={styles.titleUpper}>A World of Its Own.</span>
          </h1>
        </div>
      </div>

      <div className={styles.chapter}>
        <div className={styles.chapterInner}>
          <p className={styles.chapterIntro}>An introduction to our world</p>
          <nav className={styles.chapters} aria-label="About page sections">
            {chapters.map((chapter) => (
              <Link key={chapter.number} href={chapter.href}>
                <span>{chapter.number}</span>
                {chapter.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

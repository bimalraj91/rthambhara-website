"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import SplitText from "./motion/SplitText";
import styles from "./ProgramsHero.module.scss";

const chapters = [
  { number: "01", label: "The Language of Grace", href: "#language-of-grace" },
  {
    number: "02",
    label: "Beyond Boundaries, Beyond Rhythm",
    href: "#beyond-boundaries",
  },
  {
    number: "03",
    label: "Gracefully Growing, Joyfully Living",
    href: "#growing-joyfully",
  },
];

const letters = [
  { src: "/assets/about/hero-letter-6.svg", className: styles.letter6 },
  { src: "/assets/about/hero-letter-5.svg", className: styles.letter5 },
  { src: "/assets/about/hero-letter-4.svg", className: styles.letter4 },
  { src: "/assets/about/hero-letter-3.svg", className: styles.letter3 },
  { src: "/assets/about/hero-letter-2.svg", className: styles.letter2 },
  { src: "/assets/about/hero-letter-1.svg", className: styles.letter1 },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const letterGroup: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.5, staggerChildren: 0.08 },
  },
};

const letterItem: Variants = {
  hidden: { opacity: 0, y: 60, rotate: 4 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 1.2, ease: EASE },
  },
};

export default function ProgramsHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className={styles.hero}
      aria-labelledby="programs-hero-title"
    >
      <motion.div
        className={styles.backgroundWrap}
        initial={shouldReduceMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <Image
          src="/assets/programs/hero-bg.webp"
          alt="A Bharatanatyam dancer in a candle-lit temple hall"
          fill
          priority
          sizes="100vw"
          className={styles.background}
        />
        <span className={styles.shade} aria-hidden="true" />
      </motion.div>

      <div className={styles.frame}>
        <motion.div
          className={styles.word}
          aria-hidden="true"
          variants={shouldReduceMotion ? undefined : letterGroup}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
        >
          {letters.map((letter) => (
            <motion.div
              key={letter.src}
              className={`${styles.letter} ${letter.className}`}
              variants={shouldReduceMotion ? undefined : letterItem}
            >
              <Image src={letter.src} alt="" fill sizes="170px" unoptimized />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.dancer}
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
        >
          <div className={styles.dancerSway}>
            <Image
              src="/assets/programs/bharatham-hero.webp"
              alt=""
              fill
              priority
              sizes="443px"
              className={styles.dancerImage}
            />
          </div>
        </motion.div>

        <motion.div
          className={styles.card}
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 44, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        />

        <motion.p
          className={styles.cue}
          initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
        >
          TRIPUNITHURA · ESTABLISHED 2012
        </motion.p>

        <SplitText
          id="programs-hero-title"
          as="h1"
          className={styles.title}
          lines={[
            "The earth has its rhythm.",
            "The heart has its own.",
            {
              words: [
                { text: "rtambhara", className: styles.italic },
                "is where they meet",
              ],
            },
          ]}
          mount
          delay={0.75}
          stagger={0.06}
          duration={1}
        />
      </div>

      <motion.div
        className={styles.chapter}
        initial={shouldReduceMotion ? false : { y: 88, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.15 }}
      >
        <p className={styles.chapterIntro}>An introduction to our world</p>
        {chapters.map((chapter, index) => (
          <motion.span
            key={chapter.number}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.35 + index * 0.08 }}
          >
            <Link href={chapter.href}>
              <i className={styles.num}>{chapter.number}</i>
              {"  "}
              {chapter.label}
            </Link>
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}

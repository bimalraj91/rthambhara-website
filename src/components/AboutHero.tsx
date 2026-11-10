"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import SplitText from "./motion/SplitText";
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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const letterGroup: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.45, staggerChildren: 0.075 },
  },
};

const letterItem: Variants = {
  hidden: { opacity: 0, y: 70, rotate: 5 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 1.1, ease: EASE },
  },
};

export default function AboutHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className={styles.hero}
      aria-labelledby="about-hero-title"
    >
      <motion.div
        className={styles.backgroundWrap}
        initial={shouldReduceMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <Image
          src="/assets/about/hero-about.webp"
          alt="Four Bharatanatyam dancers in a dimly lit temple hall, framed by carved stone and brass lamps"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={styles.background}
        />
      </motion.div>

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
            <Image src={letter.src} alt="" fill sizes="210px" unoptimized />
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.frame}>
        <div
          className={`${styles.card} enter`}
          aria-hidden="true"
          style={
            {
              "--enter-y": "44px",
              "--enter-scale": "0.98",
              "--enter-dur": "1.1s",
              "--enter-delay": "0.35s",
            } as React.CSSProperties
          }
        />

        <p
          className={`${styles.cue} enter`}
          style={
            {
              "--enter-x": "-20px",
              "--enter-dur": "0.8s",
              "--enter-delay": "0.6s",
            } as React.CSSProperties
          }
        >
          TRIPUNITHURA · ESTABLISHED 2012
        </p>

        <SplitText
          id="about-hero-title"
          as="h1"
          className={styles.title}
          lines={[
            "Every body has its own poetry. Sometimes,",
            {
              words: [
                "all it needs is the",
                { text: "freedom", className: styles.italic },
                "to discover.",
              ],
            },
          ]}
          mount
          delay={0.75}
          stagger={0.07}
          duration={1}
        />
      </div>

      <div
        className={`${styles.chapter} enter`}
        style={
          {
            "--enter-y": "88px",
            "--enter-dur": "0.9s",
            "--enter-delay": "1.15s",
          } as React.CSSProperties
        }
      >
        <p className={styles.chapterIntro}>An introduction to our world</p>
        {chapters.map((chapter, index) => (
          <motion.span
            key={chapter.number}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: EASE,
              delay: 1.35 + index * 0.08,
            }}
          >
            <Link href={chapter.href}>
              <i className={styles.num}>{chapter.number}</i>
              {"  "}
              {chapter.label}
            </Link>
          </motion.span>
        ))}
      </div>
    </section>
  );
}

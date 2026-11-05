"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import SplitText from "./motion/SplitText";
import styles from "./NewsHero.module.scss";

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

export default function NewsHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="top" className={styles.hero} aria-labelledby="news-hero-title">
      <motion.div
        className={styles.backgroundWrap}
        initial={shouldReduceMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <Image
          src="/assets/contact/hero.webp"
          alt="A Bharatanatyam dancer beside carved temple pillars"
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
              src="/assets/contact/dancer.webp"
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
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 44, scale: 0.98 }
          }
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
          id="news-hero-title"
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
    </section>
  );
}

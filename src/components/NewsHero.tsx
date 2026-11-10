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
          src="/assets/programs/hero-bg.webp"
          alt="A Bharatanatyam dancer beside carved temple pillars"
          fill
          priority
          fetchPriority="high"
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

        <div
          className={`${styles.dancer} enter`}
          aria-hidden="true"
          style={
            {
              "--enter-x": "60px",
              "--enter-dur": "1.4s",
              "--enter-delay": "0.4s",
            } as React.CSSProperties
          }
        >
          <div className={styles.dancerSway}>
            <Image
              src="/assets/contact/dancer.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 190px, 443px"
              className={styles.dancerImage}
            />
          </div>
        </div>

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
          id="news-hero-title"
          as="h1"
          className={styles.title}
          lineClassName={styles.titleLine}
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

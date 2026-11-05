"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import SplitText from "./motion/SplitText";
import styles from "./BlogHero.module.scss";

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

type BlogHeroProps = {
  titleId: string;
  titleLines: string[];
  bgSrc: string;
  bgAlt: string;
  dancer?: boolean;
  meta?: ReactNode;
  compact?: boolean;
};

export default function BlogHero({
  titleId,
  titleLines,
  bgSrc,
  bgAlt,
  dancer = false,
  meta,
  compact = false,
}: BlogHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="top" className={styles.hero} aria-labelledby={titleId}>
      <motion.div
        className={styles.backgroundWrap}
        initial={shouldReduceMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <Image
          src={bgSrc}
          alt={bgAlt}
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

        {dancer && (
          <motion.div
            className={styles.dancer}
            aria-hidden="true"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
          >
            <div className={styles.dancerSway}>
              <Image
                src="/assets/gurus/dancer.webp"
                alt=""
                fill
                priority
                sizes="680px"
                className={styles.dancerImage}
              />
            </div>
          </motion.div>
        )}

        <motion.div
          className={styles.card}
          aria-hidden="true"
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 44, scale: 0.98 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        />

        <div className={styles.copy}>
          <motion.p
            className={styles.cue}
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          >
            BLOGS
          </motion.p>

          <SplitText
            id={titleId}
            as="h1"
            className={`${styles.title} ${compact ? styles.titleCompact : ""}`}
            lines={titleLines}
            mount
            delay={0.75}
            stagger={0.06}
            duration={1}
          />

          {meta && (
            <motion.div
              className={styles.meta}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.3 }}
            >
              {meta}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SplitText from "./motion/SplitText";
import styles from "./GurusHero.module.scss";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function GurusHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={styles.hero} aria-labelledby="gurus-hero-title">
      <motion.div
        className={styles.backgroundWrap}
        initial={shouldReduceMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <Image
          src="/assets/gurus/hero.webp"
          alt="A Bharatanatyam dancer in a warmly lit hall"
          fill
          priority
          sizes="100vw"
          className={styles.background}
        />
        <span className={styles.shade} aria-hidden="true" />
      </motion.div>

      <div className={styles.frame}>
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
          id="gurus-hero-title"
          as="h1"
          className={styles.title}
          lines={[
            "Every movement holds",
            "a memory.",
            "Every expression,",
            { words: ["a world of its own."], className: styles.warm },
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

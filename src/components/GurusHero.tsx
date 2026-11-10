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
          fetchPriority="high"
          sizes="100vw"
          className={styles.background}
        />
        <span className={styles.shade} aria-hidden="true" />
      </motion.div>

      <div className={styles.frame}>
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
              src="/assets/gurus/dancer.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 190px, 680px"
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

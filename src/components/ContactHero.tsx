"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SplitText from "./motion/SplitText";
import styles from "./ContactHero.module.scss";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ContactHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={styles.hero} aria-labelledby="contact-hero-title">
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
          id="contact-hero-title"
          as="h1"
          className={styles.title}
          lines={[
            "The earth has its rhythm.",
            "The heart has its own.",
            { words: [{ text: "rtambhara", className: styles.italic }] },
            "is where they meet",
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

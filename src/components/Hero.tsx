"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import SectionLabel from "./SectionLabel";
import SplitText from "./motion/SplitText";
import { heroSlides } from "@/data/home";
import styles from "./Hero.module.scss";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const dancerY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const slide = heroSlides[index];
  const total = heroSlides.length;

  const paginate = (step: number) => {
    setIndex((current) => (current + step + total) % total);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      <motion.div
        className={styles.media}
        aria-hidden="true"
        style={{ y: shouldReduceMotion ? 0 : mediaY }}
      >
        {heroSlides.map((item, slideIndex) => {
          const active = slideIndex === index;

          return (
            <motion.div
              key={item.image}
              className={styles.backgroundSlide}
              initial={false}
              animate={{
                opacity: active ? 1 : 0,
                scale: active ? 1 : 1.04,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1.2,
                ease: EASE,
              }}
            >
              <Image
                src={item.image}
                alt={active ? item.alt : ""}
                fill
                priority={slideIndex === 0}
                sizes="100vw"
                className={styles.background}
                style={{ objectPosition: item.imagePosition }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.frame}>
        <motion.div
          className={styles.card}
          style={
            shouldReduceMotion ? undefined : { y: cardY, opacity: cardOpacity }
          }
        >
          <SectionLabel
            tone="gold"
            lineWidth={28}
            strong
            className={styles.marker}
          >
            {slide.marker}
          </SectionLabel>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              className={styles.titleWrap}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0, transition: { duration: 0 } }
                  : { opacity: 0, y: -18, transition: { duration: 0.35 } }
              }
              transition={{ duration: 0.7, ease: EASE }}
            >
              <SplitText
                id="hero-title"
                as="h1"
                className={styles.title}
                lines={[
                  "Every movement holds",
                  "a memory.",
                  "Every expression,",
                  {
                    words: ["a", "world", "of", "its", "own."],
                    className: styles.lastLine,
                  },
                ]}
                mount
                delay={2}
                stagger={0.055}
                duration={1}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className={styles.dancer}
          aria-hidden="true"
          initial={
            shouldReduceMotion ? false : { opacity: 0, x: 60, scale: 0.98 }
          }
          animate={{ opacity: 1, x: 0, scale: 1 }}
          style={{ y: shouldReduceMotion ? 0 : dancerY }}
          transition={{ duration: 1.3, ease: EASE, delay: 1.9 }}
        >
          <Image
            src="/assets/home/hero-dancer.png"
            alt=""
            width={680}
            height={790}
            priority
            sizes="(max-width: 900px) 70vw, 680px"
            className={styles.dancerImage}
          />
        </motion.div>

        <motion.div
          className={styles.controls}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 2.7 }}
        >
          <p className={styles.counter} aria-hidden="true">
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <span className={styles.counterLine} />
            <span>{String(total).padStart(2, "0")}</span>
          </p>

          <div className={styles.arrows} role="group" aria-label="Hero slides">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous slide"
            >
              <Image
                src="/assets/icons/slider-prev-light.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next slide"
            >
              <Image
                src="/assets/icons/slider-next-light.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
          </div>
        </motion.div>

        <p className={styles.srOnly} aria-live="polite">
          {`Slide ${index + 1} of ${total}: ${slide.label}`}
        </p>
      </div>
    </section>
  );
}

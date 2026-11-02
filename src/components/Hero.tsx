"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import SectionMarker from "./SectionMarker";
import Parallax from "./motion/Parallax";
import SplitText from "./motion/SplitText";
import { heroSlides } from "@/data/home";
import styles from "./Hero.module.scss";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const AUTOPLAY_MS = 6500;

const copyVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 44 : -44,
    rotateX: direction > 0 ? 10 : -10,
    filter: "blur(10px)",
  }),
  center: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE, delay: 0.12 },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -30 : 30,
    rotateX: direction > 0 ? -8 : 8,
    filter: "blur(8px)",
    transition: { duration: 0.4, ease: EASE },
  }),
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const slide = heroSlides[index];
  const total = heroSlides.length;

  useEffect(() => {
    if (shouldReduceMotion || paused) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [index, paused, shouldReduceMotion, total]);

  const paginate = (step: number) => {
    setDirection(step);
    setIndex((current) => (current + step + total) % total);
  };

  return (
    <section
      id="top"
      className={styles.hero}
      aria-labelledby="hero-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <Parallax className={styles.backgroundLayer} strength={110}>
        {heroSlides.map((item, slideIndex) => {
          const active = slideIndex === index;

          return (
            <motion.div
              key={item.image}
              className={styles.backgroundSlide}
              aria-hidden={!active}
              initial={false}
              animate={
                active
                  ? {
                      opacity: 1,
                      scale: 1,
                      clipPath: "inset(0% 0% 0% 0%)",
                    }
                  : {
                      opacity: 0,
                      scale: 1.06,
                      clipPath: "inset(0% 0% 0% 100%)",
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 1.15,
                ease: EASE,
              }}
              style={{ zIndex: active ? 2 : 1 }}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                priority={slideIndex === 0}
                sizes="100vw"
                className={styles.background}
                style={{ objectPosition: item.imagePosition }}
              />
            </motion.div>
          );
        })}
      </Parallax>

      <motion.div
        className={styles.overlay}
        aria-hidden="true"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      />

      {!shouldReduceMotion && (
        <motion.div
          key={index}
          className={styles.sweep}
          aria-hidden="true"
          initial={{
            x: direction > 0 ? "-120%" : "120%",
            opacity: 0.55,
          }}
          animate={{ x: direction > 0 ? "120%" : "-120%", opacity: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      )}

      <div className={styles.frame}>
        <SectionMarker tone="light" lineWidth={24} className={styles.marker}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={slide.marker}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ display: "inline-block" }}
            >
              {slide.marker}
            </motion.span>
          </AnimatePresence>
        </SectionMarker>

        <div className={styles.titleWrap}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.label}
              custom={direction}
              variants={shouldReduceMotion ? undefined : copyVariants}
              initial={shouldReduceMotion ? false : "enter"}
              animate={shouldReduceMotion ? { opacity: 1 } : "center"}
              exit={
                shouldReduceMotion
                  ? { opacity: 0, transition: { duration: 0 } }
                  : "exit"
              }
              style={{ transformPerspective: 900 }}
            >
              <SplitText
                id="hero-title"
                as="h1"
                className={styles.title}
                lines={[...slide.lines]}
                mount
                delay={0.08}
                stagger={0.06}
                duration={1}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.aside}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.label}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
            >
              <p>{slide.aside[0]}</p>
              <p>{slide.aside[1]}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className={styles.controls}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.4 }}
        >
          <p className={styles.counter} aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.strong
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.strong>
            </AnimatePresence>
            <span className={styles.counterLine} aria-hidden="true" />
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

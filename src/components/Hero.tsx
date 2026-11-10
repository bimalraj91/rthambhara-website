"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import SectionLabel from "./SectionLabel";
import SplitText from "./motion/SplitText";
import { heroSlides } from "@/data/home";
import FontPreload from "./FontPreload";
import styles from "./Hero.module.scss";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// How long each slide stays before the next one arrives.
const AUTOPLAY_MS = 7000;
// Phones advance faster.
const AUTOPLAY_MOBILE_MS = 3500;

// The way a slide arrives and leaves. A different one is picked at random for
// every change, so the hero never feels repetitive.
const effects = {
  zoomIn: {
    enter: { opacity: 0, scale: 1.14 },
    exit: { opacity: 0, scale: 1.05 },
  },
  driftLeft: {
    enter: { opacity: 0, x: "5%", scale: 1.06 },
    exit: { opacity: 0, x: "-5%", scale: 1.06 },
  },
  driftRight: {
    enter: { opacity: 0, x: "-5%", scale: 1.06 },
    exit: { opacity: 0, x: "5%", scale: 1.06 },
  },
  riseUp: {
    enter: { opacity: 0, y: "4%", scale: 1.06 },
    exit: { opacity: 0, y: "-4%", scale: 1.06 },
  },
  settleDown: {
    enter: { opacity: 0, y: "-4%", scale: 1.06 },
    exit: { opacity: 0, y: "4%", scale: 1.06 },
  },
  dissolve: {
    enter: { opacity: 0, scale: 1.02 },
    exit: { opacity: 0, scale: 1 },
  },
} as const;

type EffectName = keyof typeof effects;
const effectNames = Object.keys(effects) as EffectName[];

const slideVariants: Variants = {
  enter: (name: EffectName) => effects[name].enter,
  center: { opacity: 1, x: "0%", y: "0%", scale: 1 },
  exit: (name: EffectName) => effects[name].exit,
};

function pickEffect(previous: EffectName): EffectName {
  const options = effectNames.filter((name) => name !== previous);
  return options[Math.floor(Math.random() * options.length)];
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [effect, setEffect] = useState<EffectName>("dissolve");
  // False until the slides first change. The opening title waits for the
  // curtain; every later title follows the picture almost immediately.
  const [played, setPlayed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [preloadOthers, setPreloadOthers] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
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

  const paginate = useCallback(
    (step: number) => {
      setPlayed(true);
      setEffect((previous) => pickEffect(previous));
      setIndex((current) => (current + step + total) % total);
    },
    [total],
  );

  // Phone-sized screens use a shorter autoplay interval, and touch screens
  // never pause on "hover" (a tap would otherwise leave the slides stuck).
  useEffect(() => {
    const phone = window.matchMedia("(max-width: 759px)");
    const touch = window.matchMedia("(hover: none)");
    const sync = () => {
      setIsMobile(phone.matches);
      setIsTouch(touch.matches);
    };
    sync();
    phone.addEventListener("change", sync);
    touch.addEventListener("change", sync);
    return () => {
      phone.removeEventListener("change", sync);
      touch.removeEventListener("change", sync);
    };
  }, []);

  // Autoplay: moves on every few seconds, and waits while a mouse visitor is
  // hovering or focused on the hero, the tab is hidden, or reduced motion is on.
  useEffect(() => {
    if (shouldReduceMotion || tabHidden || (hovered && !isTouch)) return;
    const timer = window.setTimeout(
      () => paginate(1),
      isMobile ? AUTOPLAY_MOBILE_MS : AUTOPLAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [index, hovered, isTouch, isMobile, tabHidden, shouldReduceMotion, paginate]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Fetch the other slides' pictures once the first one has had time to paint,
  // so later transitions never wait on a download.
  useEffect(() => {
    const timer = window.setTimeout(() => setPreloadOthers(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className={styles.hero}
      aria-labelledby="hero-title"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <FontPreload fonts={["mono"]} />
      <motion.div
        className={styles.media}
        aria-hidden="true"
        style={{ y: shouldReduceMotion ? 0 : mediaY }}
      >
        <AnimatePresence initial={false} custom={effect}>
          <motion.div
            key={index}
            className={styles.backgroundSlide}
            custom={effect}
            variants={shouldReduceMotion ? undefined : slideVariants}
            initial={shouldReduceMotion ? false : "enter"}
            animate={shouldReduceMotion ? undefined : "center"}
            exit={shouldReduceMotion ? undefined : "exit"}
            transition={{ duration: isMobile ? 1.1 : 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : undefined}
              sizes="100vw"
              className={styles.background}
              style={{ objectPosition: slide.imagePosition }}
            />
          </motion.div>
        </AnimatePresence>

        {preloadOthers && (
          <div className={styles.preload}>
            {heroSlides.map((item, slideIndex) =>
              slideIndex === index ? null : (
                <Image
                  key={`${slideIndex}-${item.image}`}
                  src={item.image}
                  alt=""
                  fill
                  loading="eager"
                  fetchPriority="low"
                  sizes="100vw"
                />
              ),
            )}
          </div>
        )}
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
                  : {
                      opacity: 0,
                      y: -14,
                      transition: { duration: 0.3, ease: "easeIn" },
                    }
              }
              transition={{ duration: 0.7, ease: EASE }}
            >
              <SplitText
                id="hero-title"
                as="h1"
                className={styles.title}
                lines={slide.lines.map((line, lineIndex, all) =>
                  lineIndex === all.length - 1
                    ? { words: [line], className: styles.lastLine }
                    : line,
                )}
                mount
                delay={played ? 0.2 : 2}
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
            src="/assets/home/hero-dancer.webp"
            alt=""
            width={680}
            height={790}
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

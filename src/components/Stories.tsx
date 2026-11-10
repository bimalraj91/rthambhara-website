"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import { story } from "@/data/home";
import styles from "./Stories.module.scss";

const slides = story.slides;
const count = slides.length;
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Stories() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = slides[active];

  const go = (delta: number) => setActive((i) => (i + delta + count) % count);

  // The active slide sits in the second slot (as in the design); the strip loops.
  const strip = Array.from({ length: count }, (_, slot) => {
    const index = (active - 1 + slot + count) % count;
    return { index, slide: slides[index] };
  });

  return (
    <section
      id="gallery"
      className={styles.stories}
      aria-labelledby="stories-title"
    >
      <div className={styles.backgroundWrap} aria-hidden="true">
        <Image
          src="/assets/home/stories-background.webp"
          alt=""
          fill
          sizes="100vw"
          className={styles.background}
        />
        <div className={styles.topFade} />
      </div>

      <div className={styles.inner}>
        <SectionLabel tone="white" lineWidth={32} className={styles.label}>
          09 / Success stories
        </SectionLabel>

        <SplitText
          id="stories-title"
          as="h2"
          className={styles.title}
          delay={0.08}
          stagger={0.05}
          lines={[
            { words: ["Stories", "that"], className: styles.whiteLine },
            {
              words: ["Inspire", "the", "Generations"],
              className: styles.goldLine,
            },
          ]}
        />

        <Reveal className={styles.video} delay={0.1}>
          <div className={styles.videoInner}>
            <AnimatePresence initial={false}>
              <motion.div
                key={current.feature}
                className={styles.videoSlide}
                initial={reduce ? false : { opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Image
                  src={current.feature}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 649px"
                  className={styles.videoImage}
                />
              </motion.div>
            </AnimatePresence>
            <div className={styles.controls} aria-hidden="true">
              <div className={styles.controlsLeft}>
                <Image src="/assets/icons/story-play.svg" alt="" width={16} height={16} />
                <span className={styles.time}>0:00 / 2:15</span>
                <span className={styles.progress}>
                  <span className={styles.progressFill} />
                </span>
              </div>
              <div className={styles.controlsRight}>
                <Image src="/assets/icons/story-volume.svg" alt="" width={16} height={16} />
                <Image src="/assets/icons/story-fullscreen.svg" alt="" width={16} height={16} />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className={styles.testimonial} delay={0.18}>
          <figure aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <blockquote className={styles.quote}>
                  <p>{current.quote}</p>
                </blockquote>
                <figcaption>
                  <span className={styles.name}>{current.name}</span>
                  <span className={styles.role}>{current.role}</span>
                </figcaption>
              </motion.div>
            </AnimatePresence>
          </figure>
          <div className={styles.nav}>
            <button type="button" aria-label="Previous story" onClick={() => go(-1)}>
              <Image src="/assets/icons/story-prev.svg" alt="" width={16} height={16} />
            </button>
            <button
              type="button"
              aria-label="Next story"
              className={styles.navNext}
              onClick={() => go(1)}
            >
              <Image src="/assets/icons/story-next.svg" alt="" width={16} height={16} />
            </button>
          </div>
        </Reveal>

        <Reveal className={styles.gallery} delay={0.2}>
          <ul className={styles.track}>
            {strip.map(({ index, slide }) => (
              <motion.li
                key={slide.image}
                layout={!reduce}
                transition={{ duration: 0.6, ease: EASE }}
                className={styles.slot}
              >
                <button
                  type="button"
                  className={`${styles.tile} ${index === active ? styles.tileActive : ""}`}
                  onClick={() => setActive(index)}
                  aria-label={`Show story by ${slide.name}`}
                  aria-current={index === active}
                >
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 45vw, 280px"
                    className={styles.tileImage}
                  />
                </button>
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { news } from "@/data/home";
import SectionMarker from "./SectionMarker";
import SplitText from "./motion/SplitText";
import styles from "./News.module.scss";

const [feature, creamOne, creamTwo, narrowOne, narrowTwo] = news;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function News() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ prev: false, next: false });
  const shouldReduceMotion = useReducedMotion();

  const updateScrollState = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    setCanScroll({
      prev: rail.scrollLeft > 4,
      next: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    updateScrollState();
    rail.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(rail);

    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * rail.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  return (
    <section id="news" className={styles.news} aria-labelledby="news-title">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <SectionMarker tone="red" lineWidth={24}>
              05 / The Academy News
            </SectionMarker>
            <SplitText
              id="news-title"
              as="h2"
              lines={["Art, beyond the classroom."]}
              delay={0.1}
            />
          </div>

          <motion.div
            className={styles.controls}
            aria-label="News carousel controls"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            <button
              type="button"
              onClick={() => scrollRail(-1)}
              disabled={!canScroll.prev}
              aria-label="Scroll news backwards"
            >
              <Image
                src="/assets/icons/slider-prev-dark.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
            <button
              type="button"
              onClick={() => scrollRail(1)}
              disabled={!canScroll.next}
              className={styles.next}
              aria-label="Scroll news forwards"
            >
              <Image
                src="/assets/icons/slider-next-dark.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
          </motion.div>
        </div>

        <div className={styles.railWrap}>
          <div
            ref={railRef}
            className={styles.rail}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Academy news"
          >
            <motion.article
              className={styles.feature}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 46, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <Image
                src={feature.image}
                alt={feature.alt}
                fill
                sizes="(max-width: 760px) 88vw, 529px"
                className={styles.featureImage}
                style={{ objectPosition: feature.imagePosition }}
              />
              <div className={styles.featureShade} aria-hidden="true" />
              <div className={styles.featurePanel}>
                <p className={styles.featureCategory}>{feature.category}</p>
                <h3>{feature.title}</h3>
                <p className={styles.featureCopy}>{feature.excerpt}</p>
                <a href="#journal" className={styles.featureLink}>
                  Read full story
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.article>

            <div className={styles.middle}>
              {[creamOne, creamTwo].map((item, index) => (
                <motion.article
                  className={styles.creamCard}
                  key={`${item.image}-${index}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 34 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.12 + index * 0.12 }}
                >
                  <div className={styles.creamImage}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="190px"
                      className={styles.cardImage}
                      style={{ objectPosition: item.imagePosition }}
                    />
                  </div>
                  <div className={styles.creamCopy}>
                    <p className={styles.cardCategory}>{item.category}</p>
                    <h3>{item.title}</h3>
                    <p className={styles.cardExcerpt}>{item.excerpt}</p>
                    <a href="#journal" className={styles.cardLink}>
                      Read full story
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className={styles.side}>
              {[narrowOne, narrowTwo].map((item, index) => (
                <motion.article
                  className={styles.sideCard}
                  key={`${item.image}-${index}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 34 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.24 + index * 0.12 }}
                >
                  <div className={styles.sideImage}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="190px"
                      className={styles.cardImage}
                      style={{ objectPosition: item.imagePosition }}
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className={styles.fade} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

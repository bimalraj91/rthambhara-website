"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { news } from "@/data/home";
import SectionMarker from "./SectionMarker";
import styles from "./News.module.scss";

const [feature, creamOne, creamTwo, narrowOne, narrowTwo] = news;

export default function News() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ prev: false, next: false });

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
            <h2 id="news-title">Art, beyond the classroom.</h2>
          </div>

          <div className={styles.controls} aria-label="News carousel controls">
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
          </div>
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
            <article className={styles.feature}>
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
            </article>

            <div className={styles.middle}>
              {[creamOne, creamTwo].map((item, index) => (
                <article className={styles.creamCard} key={`${item.image}-${index}`}>
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
                </article>
              ))}
            </div>

            <div className={styles.side}>
              {[narrowOne, narrowTwo].map((item, index) => (
                <article className={styles.sideCard} key={`${item.image}-${index}`}>
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
                </article>
              ))}
            </div>
          </div>

          <div className={styles.fade} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

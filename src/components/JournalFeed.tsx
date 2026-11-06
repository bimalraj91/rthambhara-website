"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Reveal from "./motion/Reveal";
import styles from "./Journal.module.scss";

export type JournalEntry = {
  slug: string;
  kind: "event" | "news";
  category: string;
  day: string;
  month: string;
  year: string;
  title: string;
  excerpt: string;
};

const INTERVAL_MS = 3500;

// Cross-fades through the latest academy entries. Every entry sits in the same
// grid cell, so the block keeps the height of the tallest one and nothing jumps.
export default function JournalFeed({ entries }: { entries: JournalEntry[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || entries.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % entries.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused, entries.length, active]);

  return (
    <Reveal className={styles.event} delay={0.18}>
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
      <div className={styles.rule} aria-hidden="true" />

      <div className={styles.slides} aria-live="off">
        {entries.map((entry, index) => (
          <div
            key={entry.slug}
            className={`${styles.slide} ${index === active ? styles.slideActive : ""}`}
            aria-hidden={index === active ? undefined : true}
            inert={index === active ? undefined : true}
          >
            <div className={styles.eventGrid}>
              <div className={styles.date}>
                <p className={styles.day}>{entry.day}</p>
                <p className={styles.month}>
                  {entry.month} {entry.year}
                </p>
              </div>

              <div className={styles.narrative}>
                <p className={styles.category}>
                  {entry.category.toUpperCase()} ·{" "}
                  {entry.kind === "event" ? "EVENT" : "NEWS"}
                </p>
                <h3 className={styles.eventTitle}>{entry.title}</h3>
                <p className={styles.copy}>{entry.excerpt}</p>
                <Link
                  href={`/news-events/${entry.slug}`}
                  className={styles.link}
                >
                  <span>Read full story</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {entries.length > 1 && (
        <div className={styles.dots} role="group" aria-label="Choose an entry">
          {entries.map((entry, index) => (
            <button
              key={entry.slug}
              type="button"
              className={`${styles.dot} ${index === active ? styles.dotActive : ""}`}
              aria-label={`Show ${entry.title}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      )}
      </div>
    </Reveal>
  );
}

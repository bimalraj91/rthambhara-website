"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { isUpcoming } from "@/data/news";
import { useToday } from "@/hooks/useToday";
import Reveal from "./motion/Reveal";
import styles from "./Journal.module.scss";

export type JournalEntry = {
  slug: string;
  kind: "event" | "news";
  category: string;
  // ISO date (yyyy-mm-dd), used to tell upcoming events from past ones.
  date: string;
  day: string;
  month: string;
  year: string;
  title: string;
  excerpt: string;
};

const INTERVAL_MS = 3500;
const MAX_ENTRIES = 5;

// Upcoming events come first, soonest first. If there are none, or room is
// left, the rest follow, newest first. Before today's date is known (on the
// server) the events are simply listed by date.
function pickEntries(entries: JournalEntry[], today: string | null) {
  const asc = (a: JournalEntry, b: JournalEntry) => a.date.localeCompare(b.date);
  const desc = (a: JournalEntry, b: JournalEntry) => b.date.localeCompare(a.date);

  if (today === null) {
    const events = entries.filter((entry) => entry.kind === "event").sort(asc);
    const others = entries.filter((entry) => entry.kind !== "event").sort(desc);
    return [...events, ...others].slice(0, MAX_ENTRIES);
  }

  const upcoming = entries.filter((entry) => isUpcoming(entry, today));
  const rest = entries.filter((entry) => !isUpcoming(entry, today));
  return [...upcoming.sort(asc), ...rest.sort(desc)].slice(0, MAX_ENTRIES);
}

// Cross-fades through the upcoming events and latest academy entries. Every
// entry sits in the same grid cell, so the block keeps the height of the
// tallest one and nothing jumps.
export default function JournalFeed({
  entries: all,
}: {
  entries: JournalEntry[];
}) {
  const today = useToday();
  const entries = useMemo(() => pickEntries(all, today), [all, today]);
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  // The list can get shorter once today's date is known.
  const active = selected % Math.max(entries.length, 1);

  useEffect(() => {
    if (paused || entries.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setSelected((i) => (i + 1) % entries.length),
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
                  {isUpcoming(entry, today)
                    ? `UPCOMING EVENT · ${entry.category.toUpperCase()}`
                    : `${entry.category.toUpperCase()} · ${entry.kind === "event" ? "EVENT" : "NEWS"}`}
                </p>
                <h3 className={styles.eventTitle}>{entry.title}</h3>
                <p className={styles.copy}>{entry.excerpt}</p>
                <Link
                  href={`/news-events/${entry.slug}`}
                  className={styles.link}
                >
                  <span>
                    {entry.kind === "event"
                      ? "View event details"
                      : "Read full story"}
                  </span>
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
              onClick={() => setSelected(index)}
            />
          ))}
        </div>
      )}
      </div>
    </Reveal>
  );
}

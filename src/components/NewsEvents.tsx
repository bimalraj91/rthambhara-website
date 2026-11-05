"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useRef, useState } from "react";
import {
  categories,
  events,
  formatDate,
  news,
  type NewsItem,
} from "@/data/news";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import styles from "./NewsEvents.module.scss";

type View = "grid" | "list";

const ICONS = "/assets/news/icons";

function Icon({
  name,
  size,
  className,
}: {
  name: string;
  size: number;
  className?: string;
}) {
  return (
    <Image
      src={`${ICONS}/${name}.svg`}
      alt=""
      width={size}
      height={size}
      unoptimized
      aria-hidden="true"
      className={className}
    />
  );
}

function matches(item: NewsItem, category: string, query: string) {
  if (category !== "All" && item.category !== category) return false;
  if (!query) return true;
  const haystack = [
    item.title,
    item.excerpt,
    item.venue,
    item.discipline,
    item.category,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function KnowMore({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      className={`${styles.pill} ${tone === "dark" ? styles.pillDark : ""}`}
    >
      <span>Know more</span>
      <span className={styles.pillCircle}>
        <Icon name={tone === "dark" ? "arrow-light" : "arrow-dark"} size={16} />
      </span>
    </span>
  );
}

function EventCard({ item }: { item: NewsItem }) {
  const date = formatDate(item.date);
  return (
    <Link href={`/news-events/${item.slug}`} className={styles.eventCard}>
      <span className={styles.eventMedia}>
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 760px) 90vw, (max-width: 1280px) 45vw, 290px"
          className={styles.cover}
        />
        <span className={styles.dateChip}>
          <strong>{date.day}</strong>
          <span>{date.month}</span>
        </span>
      </span>
      <span className={styles.eventBody}>
        <span className={styles.knot}>
          <i aria-hidden="true" />
          {item.time?.replace(" IST", "").replace(" — ", " – ")}
        </span>
        <h3>{item.title.split(" — ")[0]}</h3>
        <p className={styles.eventDesc}>{item.excerpt}</p>
        <span className={styles.eventVenue}>
          <Icon name="pin-small" size={14} />
          {item.venue}
        </span>
      </span>
      <span className={styles.eventAction}>
        <KnowMore />
      </span>
    </Link>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  const date = formatDate(item.date);
  return (
    <Link href={`/news-events/${item.slug}`} className={styles.newsCard}>
      <span className={styles.newsMedia}>
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 760px) 90vw, (max-width: 1280px) 45vw, 290px"
          className={styles.cover}
        />
      </span>
      <span className={styles.newsBody}>
        <span className={styles.newsMeta}>
          <span>
            {date.day} {date.month} {date.year}
          </span>
          <b>{item.category}</b>
        </span>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
      </span>
      <span className={styles.readMore}>
        Read More
        <Icon name="read-more-arrow" size={8} />
      </span>
    </Link>
  );
}

export function Row({ item }: { item: NewsItem }) {
  const date = formatDate(item.date);
  return (
    <Link href={`/news-events/${item.slug}`} className={styles.row}>
      <span className={styles.badge}>
        <strong>{date.day}</strong>
        <span>
          {date.month} {date.year}
        </span>
      </span>

      <span className={styles.rowInfo}>
        <span className={styles.tags}>
          <span className={styles.tag}>{item.discipline ?? item.category}</span>
          <span className={styles.dot} aria-hidden="true">
            •
          </span>
          <span className={styles.tagKind}>
            {item.kind === "event" ? item.category : "News"}
          </span>
        </span>
        <h3>{item.title}</h3>
        {item.kind === "event" && (
          <span className={styles.details}>
            <span>
              <Icon name="clock" size={13} />
              {item.time}
            </span>
            <span>
              <Icon name="pin" size={13} />
              {item.venue}
            </span>
            <span>
              <Icon name="ticket" size={13} />
              {item.access}
            </span>
          </span>
        )}
        <p>{item.excerpt}</p>
      </span>

      <span className={styles.rowMedia}>
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 900px) 90vw, 288px"
          className={styles.cover}
        />
        <span className={styles.rowAction}>
          <KnowMore tone="dark" />
        </span>
      </span>
    </Link>
  );
}

export default function NewsEvents() {
  const [category, setCategory] = useState<string>("All");
  const [view, setView] = useState<View>("grid");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchId = useId();

  const visibleEvents = useMemo(
    () => events.filter((item) => matches(item, category, query)),
    [category, query],
  );
  const visibleNews = useMemo(
    () => news.filter((item) => matches(item, category, query)),
    [category, query],
  );
  const isEmpty = visibleEvents.length === 0 && visibleNews.length === 0;

  function toggleSearch() {
    setSearchOpen((open) => {
      const next = !open;
      if (next) window.setTimeout(() => searchRef.current?.focus(), 0);
      else setQuery("");
      return next;
    });
  }

  const groupKey = `${view}-${category}-${query}`;

  return (
    <section className={styles.section} aria-label="News and events">
      <div className={`${styles.wash} ${styles.washLeft}`} aria-hidden="true">
        <Image src="/assets/news/sheet.webp" alt="" fill sizes="800px" />
      </div>
      <div className={`${styles.wash} ${styles.washRight}`} aria-hidden="true">
        <Image src="/assets/news/sheet.webp" alt="" fill sizes="800px" />
      </div>
      <div className={styles.emblem} aria-hidden="true">
        <Image
          src="/assets/gurus/logo.webp"
          alt=""
          width={325}
          height={291}
          sizes="529px"
        />
      </div>

      <div className={styles.shell}>
        <div className={styles.toolbar}>
          <div
            className={styles.filters}
            role="group"
            aria-label="Filter by category"
          >
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                className={`${styles.chip} ${category === name ? styles.chipActive : ""}`}
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className={styles.controls}>
            <div className={styles.viewSwitch} role="group" aria-label="Layout">
              <button
                type="button"
                className={`${styles.viewButton} ${view === "grid" ? styles.viewActive : ""}`}
                aria-pressed={view === "grid"}
                aria-label="Grid view"
                title="Grid view"
                onClick={() => setView("grid")}
              >
                <Icon name="view-grid" size={16} />
              </button>
              <button
                type="button"
                className={`${styles.viewButton} ${view === "list" ? styles.viewActive : ""}`}
                aria-pressed={view === "list"}
                aria-label="List view"
                title="List view"
                onClick={() => setView("list")}
              >
                <Icon name="view-list" size={16} />
              </button>
            </div>

            <div
              className={`${styles.search} ${searchOpen ? styles.searchOpen : ""}`}
            >
              <label htmlFor={searchId} className={styles.srOnly}>
                Search news and events
              </label>
              <input
                ref={searchRef}
                id={searchId}
                type="search"
                value={query}
                placeholder="Search…"
                onChange={(event) => setQuery(event.target.value)}
                tabIndex={searchOpen ? 0 : -1}
              />
              <button
                type="button"
                className={styles.searchButton}
                aria-label={searchOpen ? "Close search" : "Search"}
                aria-expanded={searchOpen}
                title="Search"
                onClick={toggleSearch}
              >
                <Icon name="search" size={16} />
              </button>
            </div>
          </div>
        </div>

        {isEmpty && (
          <p className={styles.empty} role="status">
            Nothing matches that yet. Try another category or search.
          </p>
        )}

        {visibleEvents.length > 0 && (
          <div className={styles.group}>
            <Reveal className={styles.groupHead} y={24}>
              <h2>Upcoming Events</h2>
              <p>
                Explore our upcoming classical recitals, abhinaya workshops, and
                cultural milestones curated within the sacred parampara
                tradition.
              </p>
            </Reveal>

            <StaggerGroup
              key={`events-${groupKey}`}
              as="ul"
              className={view === "grid" ? styles.grid : styles.list}
              stagger={0.1}
            >
              {visibleEvents.map((item) => (
                <StaggerItem key={item.slug} as="li" y={30}>
                  {view === "grid" ? (
                    <EventCard item={item} />
                  ) : (
                    <Row item={item} />
                  )}
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}

        {visibleNews.length > 0 && (
          <div className={styles.group}>
            <Reveal className={`${styles.groupHead} ${styles.newsHead}`} y={24}>
              <h2>News &amp; Highlights</h2>
              {view === "grid" && (
                <span className={styles.divider} aria-hidden="true">
                  <i />
                  <Icon name="divider-lotus" size={16} />
                  <i />
                </span>
              )}
            </Reveal>

            <StaggerGroup
              key={`news-${groupKey}`}
              as="ul"
              className={view === "grid" ? styles.grid : styles.list}
              stagger={0.1}
            >
              {visibleNews.map((item) => (
                <StaggerItem key={item.slug} as="li" y={30}>
                  {view === "grid" ? (
                    <NewsCard item={item} />
                  ) : (
                    <Row item={item} />
                  )}
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}
      </div>
    </section>
  );
}

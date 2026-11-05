"use client";

import { useEffect, useState } from "react";
import styles from "./BlogArticle.module.scss";

type Item = { id: string; heading: string };

// "On this page" list that follows the reader through the article.
export default function BlogToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -55% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const index = Math.max(
    0,
    items.findIndex((item) => item.id === active),
  );

  return (
    <nav className={styles.toc} aria-label="On this page">
      <p className={styles.tocLabel}>On this page</p>
      <ol className={styles.tocList}>
        <span
          className={styles.tocMarker}
          style={{ transform: `translateY(${index * 40}px)` }}
          aria-hidden="true"
        />
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={item.id === active ? styles.tocActive : undefined}
              aria-current={item.id === active ? "location" : undefined}
            >
              {item.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

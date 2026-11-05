"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { blogCategories, type BlogPost } from "@/data/blogs";
import BlogCard from "./BlogCard";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import styles from "./BlogList.module.scss";

const PER_PAGE = 6;

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const searchId = useId();

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (category !== "All" && post.category !== category) return false;
      if (!needle) return true;
      return `${post.title} ${post.excerpt} ${post.category}`
        .toLowerCase()
        .includes(needle);
    });
  }, [posts, category, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PER_PAGE;
  const visible = new Set(
    filtered.slice(start, start + PER_PAGE).map((p) => p.slug),
  );

  function changeCategory(name: string) {
    setCategory(name);
    setPage(1);
  }

  function goTo(next: number) {
    setPage(next);
    document
      .getElementById("blog-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className={styles.section} aria-label="Blog articles">
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
          sizes="505px"
        />
      </div>

      <div className={styles.shell}>
        <div className={styles.toolbar}>
          <div
            className={styles.filters}
            role="group"
            aria-label="Filter by topic"
          >
            {blogCategories.map((name) => (
              <button
                key={name}
                type="button"
                className={`${styles.chip} ${category === name ? styles.chipActive : ""}`}
                aria-pressed={category === name}
                onClick={() => changeCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className={styles.search}>
            <label htmlFor={searchId} className={styles.srOnly}>
              Search articles
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              placeholder="Search articles..."
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
            />
            <Image
              src="/assets/blogs/icons/search.svg"
              alt=""
              width={16}
              height={16}
              unoptimized
              aria-hidden="true"
              className={styles.searchIcon}
            />
          </div>
        </div>

        {filtered.length === 0 && (
          <p className={styles.empty} role="status">
            No articles match that yet. Try another topic or search.
          </p>
        )}

        {/* Every article stays in the HTML (so crawlers can follow each link);
            only the current page is shown. */}
        <StaggerGroup
          key={`${category}-${query}-${current}`}
          as="ul"
          className={styles.grid}
          stagger={0.08}
        >
          <span id="blog-grid" className={styles.anchor} aria-hidden="true" />
          {posts.map((post) => (
            <StaggerItem
              key={post.slug}
              as="li"
              y={28}
              className={visible.has(post.slug) ? styles.item : styles.hidden}
            >
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {pageCount > 1 && (
          <nav className={styles.pagination} aria-label="Blog pages">
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (number) => (
                <button
                  key={number}
                  type="button"
                  className={`${styles.pageButton} ${number === current ? styles.pageActive : ""}`}
                  aria-label={`Page ${number}`}
                  aria-current={number === current ? "page" : undefined}
                  onClick={() => goTo(number)}
                >
                  {number}
                </button>
              ),
            )}
            {current < pageCount && (
              <button
                type="button"
                className={styles.pageButton}
                aria-label="Next page"
                onClick={() => goTo(current + 1)}
              >
                ›
              </button>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}

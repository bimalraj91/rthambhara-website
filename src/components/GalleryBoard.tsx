"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { galleryCategories, type GalleryItem } from "@/data/gallery";
import GalleryLightbox from "./GalleryLightbox";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import styles from "./GalleryBoard.module.scss";

type Props = {
  mode: "landing" | "expanded";
  blocks: GalleryItem[][];
  titleId: string;
};

export default function GalleryBoard({ mode, blocks, titleId }: Props) {
  const [category, setCategory] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);

  const all = useMemo(() => blocks.flat(), [blocks]);
  const filtered = useMemo(
    () =>
      category === "All"
        ? all
        : all.filter((item) => item.category === category),
    [all, category],
  );

  const indexOf = useMemo(() => {
    const map = new Map<string, number>();
    filtered.forEach((item, i) => map.set(item.id, i));
    return map;
  }, [filtered]);

  const close = useCallback(() => setActive(null), []);

  function renderTile(item: GalleryItem, order: number) {
    const index = indexOf.get(item.id) ?? 0;
    return (
      <Reveal
        key={item.id}
        className={`${styles.cell} ${styles[`slot${item.slot}`]} ${styles[item.shape]}`}
        y={26}
        scale={0.97}
        delay={(order % 3) * 0.07}
        once
      >
        <button
          type="button"
          className={styles.tile}
          style={{ ["--ratio" as string]: item.ratio }}
          onClick={() => setActive(index)}
          aria-label={`Open photo: ${item.title}`}
          aria-haspopup="dialog"
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 760px) 50vw, (max-width: 1280px) 46vw, 430px"
            className={styles.photo}
          />
          <span className={styles.veil} aria-hidden="true">
            <i>{item.category}</i>
            <b>{item.title}</b>
            <em>View</em>
          </span>
        </button>
      </Reveal>
    );
  }

  const showMosaic = category === "All";

  return (
    <div className={styles.page}>
      <div className={styles.stage} aria-hidden="true">
        <Image
          src="/assets/gallery/stage-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.stageImage}
        />
        <span className={styles.shade} />
        <span className={styles.lamp} />
        <span className={`${styles.lamp} ${styles.lampAlt}`} />
      </div>

      <section className={styles.hero} aria-labelledby={titleId}>
        <Image
          src="/assets/gallery/ghost-word.svg"
          alt=""
          width={905}
          height={219}
          unoptimized
          aria-hidden="true"
          className={styles.ghost}
        />
        <div
          className={`${styles.card} enter`}
          style={
            {
              "--enter-y": "44px",
              "--enter-scale": "0.98",
              "--enter-dur": "1.1s",
              "--enter-delay": "0.2s",
            } as React.CSSProperties
          }
        >
          <p
            className={`${styles.cue} enter`}
            style={
              {
                "--enter-x": "-20px",
                "--enter-dur": "0.8s",
                "--enter-delay": "0.5s",
              } as React.CSSProperties
            }
          >
            rtambhara
          </p>
          <SplitText
            id={titleId}
            as="h1"
            className={styles.title}
            lines={["Moments that", "moves us"]}
            mount
            delay={0.6}
            stagger={0.07}
            duration={1}
          />
        </div>

        <div
          className={`${styles.filters} enter`}
          role="group"
          aria-label="Filter the gallery"
          style={
            {
              "--enter-y": "24px",
              "--enter-dur": "0.9s",
              "--enter-delay": "0.9s",
            } as React.CSSProperties
          }
        >
          {galleryCategories.map((name) => (
            <button
              key={name}
              type="button"
              className={`${styles.chip} ${category === name ? styles.chipActive : ""}`}
              aria-pressed={category === name}
              onClick={() => {
                setCategory(name);
                setActive(null);
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.gallery} aria-label="Photographs">
        {showMosaic ? (
          blocks.map((block, blockIndex) => (
            <div key={blockIndex} className={styles.block}>
              {block.slice(0, 4).map((item, i) => renderTile(item, i))}

              {blockIndex === 0 && (
                <Reveal
                  className={`${styles.cell} ${styles.slot4} ${styles.cta}`}
                  y={26}
                  once
                >
                  <div className={styles.ctaCard}>
                    <Image
                      src="/assets/gallery/paper.webp"
                      alt=""
                      fill
                      sizes="280px"
                      className={styles.paper}
                    />
                    <p>Art lives in every moment</p>
                    {mode === "landing" && (
                      <Link href="/gallery/all" className={styles.explore}>
                        <span>Explore More</span>
                        <i aria-hidden="true" />
                      </Link>
                    )}
                    {mode === "expanded" && (
                      <Link href="/gallery" className={styles.back}>
                        Back to highlights
                      </Link>
                    )}
                  </div>
                </Reveal>
              )}

              {block.slice(4).map((item, i) => renderTile(item, i + 4))}
            </div>
          ))
        ) : (
          <div className={styles.flow}>
            {filtered.length === 0 && (
              <p className={styles.empty}>Nothing in this collection yet.</p>
            )}
            {filtered.map((item, i) => renderTile({ ...item, slot: 9 }, i))}
          </div>
        )}

        {showMosaic && mode === "landing" && (
          <p className={styles.more}>
            <Link href="/gallery/all">
              See every moment <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
        )}
      </section>

      <GalleryLightbox
        items={filtered}
        index={active}
        onClose={close}
        onChange={setActive}
      />
    </div>
  );
}

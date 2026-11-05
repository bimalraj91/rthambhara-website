import Image from "next/image";
import type { ReactNode } from "react";
import Crop from "./about/Crop";
import Reveal from "./motion/Reveal";
import { Row } from "./NewsEvents";
import { formatDate, newsItems, type NewsItem } from "@/data/news";
import listStyles from "./NewsEvents.module.scss";
import styles from "./NewsDetail.module.scss";

const ICONS = "/assets/news/icons";

// Turns *word* into emphasised text.
function inline(text: string): ReactNode[] {
  return text
    .split(/(\*[^*]+\*)/g)
    .map((part, index) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <em key={index}>{part.slice(1, -1)}</em>
      ) : (
        part
      ),
    );
}

export default function NewsDetail({ item }: { item: NewsItem }) {
  const date = formatDate(item.date);
  const more = newsItems
    .filter((other) => other.slug !== item.slug)
    .slice(0, 2);

  return (
    <section className={styles.section} aria-labelledby="news-detail-title">
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

      <div className={styles.canvas}>
        <Reveal className={styles.tags} y={16}>
          <span className={styles.tag}>{item.discipline ?? item.category}</span>
          <span className={styles.dot} aria-hidden="true">
            •
          </span>
          <span className={styles.tagKind}>
            {item.kind === "event" ? item.category : "News"}
          </span>
        </Reveal>

        <Reveal as="h2" id="news-detail-title" className={styles.title} y={30}>
          {item.title}
        </Reveal>

        <div className={styles.layout}>
          <div className={styles.copy}>
            {item.body.map((paragraph) => (
              <Reveal as="p" key={paragraph} y={22}>
                {inline(paragraph)}
              </Reveal>
            ))}
          </div>

          <Reveal as="div" className={styles.meta} delay={0.1} y={26}>
            {item.time && (
              <p>
                <Image
                  src={`${ICONS}/clock.svg`}
                  alt=""
                  width={13}
                  height={13}
                  unoptimized
                />
                {item.time}
              </p>
            )}
            {item.venue && (
              <p>
                <Image
                  src={`${ICONS}/pin.svg`}
                  alt=""
                  width={11}
                  height={13}
                  unoptimized
                />
                {item.venue}
              </p>
            )}
            {item.access && (
              <p>
                <Image
                  src={`${ICONS}/ticket.svg`}
                  alt=""
                  width={13}
                  height={11}
                  unoptimized
                />
                {item.access}
              </p>
            )}
            <span className={styles.badge}>
              <strong>{date.day}</strong>
              <span>
                {date.month} {date.year}
              </span>
            </span>
          </Reveal>
        </div>

        <Reveal as="figure" className={styles.banner} y={36} scale={0.98}>
          <div className={styles.bannerFrame}>
            <Crop
              src="/assets/news/banner.webp"
              alt={item.bannerCaption}
              sizes="(max-width: 1280px) 100vw, 1160px"
              box={{
                height: "171.56%",
                left: "0",
                top: "-20.4%",
                width: "100%",
              }}
            />
          </div>
          <figcaption>
            <b>{item.bannerCaptionTitle}</b>
            <span>{item.bannerCaption}</span>
          </figcaption>
        </Reveal>

        <div className={`${styles.copy} ${styles.after}`}>
          {item.bodyAfter.map((paragraph) => (
            <Reveal as="p" key={paragraph} y={22}>
              {inline(paragraph)}
            </Reveal>
          ))}
        </div>

        <div className={styles.more}>
          <Reveal as="h2" className={styles.moreTitle} y={24}>
            News &amp; Highlights
          </Reveal>
          <ul className={listStyles.list}>
            {more.map((other) => (
              <li key={other.slug}>
                <Row item={other} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

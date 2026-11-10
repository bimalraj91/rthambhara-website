import Image from "next/image";
import SectionLabel from "./SectionLabel";
import JournalFeed, { type JournalEntry } from "./JournalFeed";
import SplitText from "./motion/SplitText";
import { formatDate, newsItems } from "@/data/news";
import styles from "./Journal.module.scss";

// The latest entries from the News & Events data, newest first.
const entries: JournalEntry[] = [...newsItems]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 5)
  .map((item) => ({
    slug: item.slug,
    kind: item.kind,
    category: item.category,
    ...formatDate(item.date),
    title: item.title,
    excerpt: item.excerpt,
  }));

export default function Journal() {
  return (
    <section
      id="journal"
      className={styles.journal}
      aria-labelledby="journal-title"
    >
      <Image
        src="/assets/home/journal-background.png"
        alt=""
        width={1456}
        height={637}
        sizes="(max-width: 760px) 100vw, 1456px"
        aria-hidden="true"
        className={styles.background}
      />

      <div className={styles.inner}>
        <div className={styles.heading}>
          <SectionLabel tone="white" lineWidth={24}>
            05 / The Academy Journal
          </SectionLabel>

          <SplitText
            id="journal-title"
            as="h2"
            className={styles.title}
            delay={0.08}
            stagger={0.055}
            lines={["Art, beyond the", "classroom."]}
          />
        </div>

        <JournalFeed entries={entries} />
      </div>
    </section>
  );
}

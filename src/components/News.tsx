import Image from "next/image";
import Link from "next/link";
import PillButton from "./PillButton";
import SectionLabel from "./SectionLabel";
import Drift from "./motion/Drift";
import NewsMarquee from "./NewsMarquee";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import { landingItems } from "@/data/gallery";
import {
  events,
  formatDate,
  news as newsPosts,
  shortTitle,
} from "@/data/news";
import styles from "./News.module.scss";

const feature = events[0];
// The first event stays pinned; everything else rolls past beside it.
const stories = [...events.slice(1), ...newsPosts];

function label(item: { category: string; date: string }) {
  const date = formatDate(item.date);
  return `${item.category} · ${date.day} ${date.month} ${date.year}`;
}

export default function News() {
  return (
    <section id="news" className={styles.news} aria-labelledby="news-title">
      <div className={styles.dancer} aria-hidden="true">
        <Image
          src="/assets/home/news-dancer.webp"
          alt=""
          width={1358}
          height={1358}
          sizes="(max-width: 760px) 480px, 1358px"
          className={styles.dancerImage}
        />
      </div>

      <Drift className={styles.mandala} from={60} to={-60}>
        <Image
          src="/assets/home/news-mandala.webp"
          alt=""
          width={414}
          height={582}
          sizes="(max-width: 760px) 219px, 414px"
          className={styles.fill}
        />
      </Drift>

      <div className={styles.inner}>
        <SectionLabel tone="maroon" lineWidth={24} className={styles.label}>
          05 / Academy News
        </SectionLabel>

        <SplitText
          id="news-title"
          as="h2"
          className={styles.title}
          delay={0.08}
          stagger={0.05}
          lines={[
            {
              words: [
                { text: "Art,", className: styles.dark },
                { text: "beyond", className: styles.dark },
                { text: "the", className: styles.maroon },
                { text: "classroom.", className: styles.maroon },
              ],
            },
          ]}
        />

        <Reveal className={styles.viewAllWrap} delay={0.18}>
          <PillButton href="/news-events">Explore</PillButton>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.feature} delay={0.1}>
            <Image
              src={feature.homeImage ?? feature.image}
              alt={feature.imageAlt}
              fill
              sizes="(max-width: 760px) 90vw, 529px"
              className={styles.featureImage}
              style={{ objectPosition: feature.homeImagePosition ?? "center" }}
            />
            <div className={styles.featureOverlay} aria-hidden="true" />
            <div className={styles.featurePanel}>
              <p className={styles.featureCategory}>{label(feature)}</p>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureCopy}>{feature.excerpt}</p>
              <Link
                href={`/news-events/${feature.slug}`}
                className={styles.featureLink}
              >
                <span>Read full story</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>

          <NewsMarquee
            className={styles.storyColumn}
            label="More news and events"
            duration={stories.length * 7}
          >
            {stories.map((story) => (
              <div key={story.slug} className={styles.story}>
                <div className={styles.storyImage}>
                  <Image
                    src={story.homeImage ?? story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="190px"
                    className={styles.cover}
                    style={{
                      objectPosition: story.homeImagePosition ?? "center",
                    }}
                  />
                </div>
                <div className={styles.storyBody}>
                  <p className={styles.category}>{label(story)}</p>
                  <h3 className={styles.storyTitle}>{shortTitle(story)}</h3>
                  <p className={styles.storyCopy}>{story.excerpt}</p>
                  <Link
                    href={`/news-events/${story.slug}`}
                    className={styles.storyLink}
                  >
                    <span>Read full story</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </NewsMarquee>

          <NewsMarquee
            className={styles.galleryColumn}
            label="Photo highlights"
            duration={landingItems.length * 6}
            reverse
            sidewaysOnTablet
          >
            {landingItems.map((item) => (
              <div key={item.id} className={styles.galleryCard}>
                <Link
                  href="/gallery"
                  className={styles.galleryLink}
                  aria-label={`Open the gallery: ${item.title}`}
                >
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="238px"
                    className={styles.cover}
                  />
                </Link>
              </div>
            ))}
          </NewsMarquee>
        </div>

        <div className={styles.fade} aria-hidden="true" />
      </div>
    </section>
  );
}

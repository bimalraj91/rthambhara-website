import Image from "next/image";
import Link from "next/link";
import PillButton from "./PillButton";
import SectionLabel from "./SectionLabel";
import Drift from "./motion/Drift";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import { news } from "@/data/home";
import styles from "./News.module.scss";

export default function News() {
  return (
    <section id="news" className={styles.news} aria-labelledby="news-title">
      <div className={styles.dancer} aria-hidden="true">
        <Image
          src="/assets/home/news-dancer.png"
          alt=""
          width={1358}
          height={1358}
          className={styles.dancerImage}
        />
      </div>

      <Drift className={styles.mandala} from={60} to={-60}>
        <Image
          src="/assets/home/news-mandala.png"
          alt=""
          width={414}
          height={582}
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
          <PillButton href="/about-us#news">Explore</PillButton>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.feature} delay={0.1}>
            <Image
              src={news.feature.image}
              alt={news.feature.alt}
              fill
              sizes="(max-width: 760px) 90vw, 529px"
              className={styles.featureImage}
              style={{ objectPosition: news.feature.imagePosition }}
            />
            <div className={styles.featureOverlay} aria-hidden="true" />
            <div className={styles.featurePanel}>
              <p className={styles.featureCategory}>{news.feature.category}</p>
              <h3 className={styles.featureTitle}>{news.feature.title}</h3>
              <p className={styles.featureCopy}>{news.feature.excerpt}</p>
              <Link href="/about-us#news" className={styles.featureLink}>
                <span>Read full story</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>

          <div className={styles.storyColumn}>
            {news.stories.map((story, index) => (
              <Reveal
                key={`${story.image}-${index}`}
                className={styles.story}
                delay={0.12 + index * 0.08}
              >
                <div className={styles.storyImage}>
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    sizes="190px"
                    className={styles.cover}
                    style={{ objectPosition: story.imagePosition }}
                  />
                </div>
                <div className={styles.storyBody}>
                  <p className={styles.category}>{story.category}</p>
                  <h3 className={styles.storyTitle}>{story.title}</h3>
                  <p className={styles.storyCopy}>{story.excerpt}</p>
                  <Link href="/about-us#news" className={styles.storyLink}>
                    <span>Read full story</span>
                <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <div className={styles.galleryColumn}>
            {news.gallery.map((item, index) => (
              <Reveal
                key={`${item.image}-${index}`}
                className={styles.galleryCard}
                delay={0.16 + index * 0.08}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="238px"
                  className={styles.cover}
                  style={{ objectPosition: item.imagePosition }}
                />
              </Reveal>
            ))}
          </div>
        </div>

        <div className={styles.fade} aria-hidden="true" />
      </div>
    </section>
  );
}

import Image from "next/image";
import SectionLabel from "./SectionLabel";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { story } from "@/data/home";
import styles from "./Stories.module.scss";

export default function Stories() {
  return (
    <section
      id="gallery"
      className={styles.stories}
      aria-labelledby="stories-title"
    >
      <div className={styles.backgroundWrap} aria-hidden="true">
        <Image
          src="/assets/home/stories-background.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.background}
        />
        <div className={styles.topFade} />
      </div>

      <div className={styles.inner}>
        <SectionLabel tone="white" lineWidth={32} className={styles.label}>
          09 / Success stories
        </SectionLabel>

        <SplitText
          id="stories-title"
          as="h2"
          className={styles.title}
          delay={0.08}
          stagger={0.05}
          lines={[
            { words: ["Stories", "that"], className: styles.whiteLine },
            {
              words: ["Inspire", "the", "Generations"],
              className: styles.goldLine,
            },
          ]}
        />

        <Reveal className={styles.video} delay={0.1}>
          <div className={styles.videoInner}>
            <Image
              src={story.video.image}
              alt={story.video.alt}
              fill
              sizes="(max-width: 900px) 100vw, 649px"
              className={styles.videoImage}
            />
            <div className={styles.controls} aria-hidden="true">
              <div className={styles.controlsLeft}>
                <Image src="/assets/icons/story-play.svg" alt="" width={16} height={16} />
                <span className={styles.time}>0:00 / 2:15</span>
                <span className={styles.progress}>
                  <span className={styles.progressFill} />
                </span>
              </div>
              <div className={styles.controlsRight}>
                <Image src="/assets/icons/story-volume.svg" alt="" width={16} height={16} />
                <Image src="/assets/icons/story-fullscreen.svg" alt="" width={16} height={16} />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className={styles.testimonial} delay={0.18}>
          <figure>
            <blockquote className={styles.quote}>
              <p>{story.quote}</p>
            </blockquote>
            <figcaption>
              <span className={styles.name}>{story.name}</span>
              <span className={styles.role}>{story.role}</span>
            </figcaption>
          </figure>
          <div className={styles.nav}>
            <button type="button" aria-label="Previous story">
              <Image src="/assets/icons/story-prev.svg" alt="" width={16} height={16} />
            </button>
            <button type="button" aria-label="Next story" className={styles.navNext}>
              <Image src="/assets/icons/story-next.svg" alt="" width={16} height={16} />
            </button>
          </div>
        </Reveal>

        <StaggerGroup className={styles.gallery} stagger={0.09}>
          {story.gallery.map((item, index) => (
            <StaggerItem
              key={item.image}
              as="div"
              className={`${styles.tile} ${index === 1 ? styles.tileActive : ""}`}
              y={28}
              scale={0.96}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 760px) 45vw, 280px"
                className={styles.tileImage}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

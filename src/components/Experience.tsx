import Image from "next/image";
import SectionLabel from "./SectionLabel";
import Drift from "./motion/Drift";
import ImageReveal from "./motion/ImageReveal";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import styles from "./Experience.module.scss";

export default function Experience() {
  return (
    <section
      id="experience"
      className={styles.experience}
      aria-labelledby="experience-title"
    >
      <Drift className={styles.ornament} from={50} to={-50}>
          <Image
        src="/assets/home/ornament-sheet-11.webp"
        alt=""
        width={753}
        height={827}
        sizes="(max-width: 760px) 300px, 753px"
        className={styles.fill}
      />
        </Drift>

      <div className={styles.inner}>
        <div className={styles.visual}>
          <ImageReveal className={styles.imageWrap}>
            <Image
              src="/assets/home/experience-temple.webp"
              alt="The candlelit interior of a Kerala temple, its wooden pillars carved with stories"
              fill
              sizes="(max-width: 900px) 92vw, 689px"
              className={styles.image}
            />
          </ImageReveal>
          <Image
            src="/assets/home/experience-torn-top.webp"
            alt=""
            width={665}
            height={139}
            sizes="(max-width: 760px) 100vw, 665px"
            aria-hidden="true"
            className={styles.torn}
          />
        </div>

        <div className={styles.content}>
          <SectionLabel tone="maroon" lineWidth={24}>
            04 / The Rtambhara experience
          </SectionLabel>

          <SplitText
            id="experience-title"
            as="h2"
            className={styles.title}
            delay={0.08}
            stagger={0.05}
            lines={[
              { words: ["Even", "the", "walls", "seem", "to"], className: styles.titleDark },
              { words: ["know", "the", "rhythm."], className: styles.titleMaroon },
            ]}
          />

          <Reveal className={styles.copy} delay={0.16}>
            <p>
              There is an intimacy to the way art travels through generations.
              In the patient hands of a teacher, the eager footsteps of a child,
              and the years of devotion that make every movement meaningful.
            </p>
            <p>
              Born from Smt. Girija’s 23 years of dedication to classical dance,
              rtambhara has grown into a cherished home for Bharatanatyam,
              contemporary dance, Thiruvathira, yoga and artistic exploration
              through workshops and performances.
            </p>
            <p>
              For a decade, we have held close the discipline of tradition, the
              beauty of expression, and the simple, profound joy of seeing
              another generation fall in love with the arts.
            </p>
          </Reveal>

          <div className={styles.rule} aria-hidden="true" />

          <Reveal className={styles.quote} delay={0.2}>
            <blockquote>
              A place to arrive with curiosity, linger with joy, and leave
              carrying a little of its peace within you.
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

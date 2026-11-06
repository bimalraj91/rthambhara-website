import Image from "next/image";
import PillButton from "./PillButton";
import SectionLabel from "./SectionLabel";
import Drift from "./motion/Drift";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import styles from "./Intro.module.scss";

export default function Intro() {
  return (
    <section id="about" className={styles.intro} aria-labelledby="intro-title">
      <div className={styles.inner}>
        <div className={styles.dancer} aria-hidden="true">
          <Image
            src="/assets/home/intro-dancer-1.webp"
            alt=""
            width={531}
            height={713}
            sizes="(max-width: 900px) 62vw, 531px"
            className={styles.dancerImage}
          />
        </div>

        <div className={styles.emblem} aria-hidden="true">
          <Image
            src="/assets/gurus/logo.webp"
            alt=""
            width={325}
            height={291}
            sizes="(max-width: 900px) 60vw, 505px"
          />
        </div>

        <Image
          src="/assets/home/ornament-sheet-10.png"
          alt=""
          width={726}
          height={734}
          aria-hidden="true"
          className={styles.ornamentLeft}
        />
        <Drift className={styles.ornamentRight} from={30} to={-30}>
          <Image
            src="/assets/home/ornament-sheet-9.png"
            alt=""
            width={753}
            height={827}
            className={styles.fill}
          />
        </Drift>
        {/* <Image
          src="/assets/home/gold-collage-3.png"
          alt=""
          width={400}
          height={285}
          aria-hidden="true"
          className={styles.goldCollage}
        /> */}
        <Drift className={styles.lotus} from={-14} to={14}>
          <Image
            src="/assets/home/lotus.png"
            alt=""
            width={162}
            height={125}
            className={styles.fill}
          />
        </Drift>

        <div className={styles.content}>
          <SectionLabel tone="maroon" lineWidth={24}>
            01 / Our story
          </SectionLabel>

          <SplitText
            id="intro-title"
            as="h2"
            className={styles.title}
            delay={0.08}
            stagger={0.04}
            lines={[
              { words: ["rtambhara."], className: styles.titleDark },
              {
                words: ["A", "rhythm", "centuries", "in"],
                className: styles.titleMaroon,
              },
              { words: ["the", "making."], className: styles.titleMaroon },
            ]}
          />

          <Reveal className={styles.copy} delay={0.15}>
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

          <Reveal delay={0.22} className={styles.action}>
            <PillButton href="/about-us">Read More</PillButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

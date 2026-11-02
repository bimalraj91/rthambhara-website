import SectionMarker from "./SectionMarker";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import styles from "./Intro.module.scss";

export default function Intro() {
  return (
    <section id="about" className={styles.intro} aria-labelledby="intro-title">
      <div className={styles.inner}>
        <SectionMarker tone="gold" lineWidth={24}>
          01 / The Cultural Forum
        </SectionMarker>

        <div className={styles.grid}>
          <SplitText
            id="intro-title"
            as="h2"
            className={styles.title}
            delay={0.1}
            stagger={0.07}
            lines={[
              "Art is not only",
              "Something",
              "We learn. It is a way",
              { words: ["We come to belong."], className: styles.gold },
            ]}
          />

          <Reveal className={styles.copy} delay={0.25} y={30}>
            <p>
              Ritambhara is a cultural forum dedicated to the promotion of
              performing and visual arts, nurturing cultural awareness among the
              younger generation.
            </p>
            <p>
              Through education, shared practice and creative exploration, we
              bring art, culture and values into everyday life.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

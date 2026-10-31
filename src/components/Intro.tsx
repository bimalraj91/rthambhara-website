import type { CSSProperties } from "react";
import SectionMarker from "./SectionMarker";
import styles from "./Intro.module.scss";

export default function Intro() {
  return (
    <section id="about" className={styles.intro} aria-labelledby="intro-title">
      <div className={styles.inner}>
        <SectionMarker tone="gold" lineWidth={24}>
          01 / The Cultural Forum
        </SectionMarker>

        <div className={styles.grid}>
          <h2 id="intro-title" className={styles.title} data-reveal>
            <span>Art is not only</span>
            <span>Something</span>
            <span>We learn. It is a way</span>
            <span className={styles.gold}>We come to belong.</span>
          </h2>

          <div
            className={styles.copy}
            data-reveal
            style={{ "--reveal-delay": "120ms" } as CSSProperties}
          >
            <p>
              Ritambhara is a cultural forum dedicated to the promotion of
              performing and visual arts, nurturing cultural awareness among the
              younger generation.
            </p>
            <p>
              Through education, shared practice and creative exploration, we
              bring art, culture and values into everyday life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

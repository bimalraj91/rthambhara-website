import Image from "next/image";
import SectionLabel from "./SectionLabel";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import styles from "./Journal.module.scss";

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

        <Reveal className={styles.event} delay={0.18}>
          <div className={styles.rule} aria-hidden="true" />

          <div className={styles.eventGrid}>
            <div className={styles.date}>
              <p className={styles.day}>13</p>
              <p className={styles.month}>AUG 2026</p>
            </div>

            <div className={styles.narrative}>
              <p className={styles.category}>PERFORMANCE · PAST EVENT</p>
              <h3 className={styles.eventTitle}>Raghaveeyam</h3>
              <p className={styles.copy}>
                An observance of Ramayana Month. Bhagavatpadham Bharathanatyam
                at Sreepoornathrayeesa Temple, Tripunithura.
              </p>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import styles from "./Journal.module.scss";

export default function Journal() {
  return (
    <section id="journal" className={styles.journal} aria-labelledby="journal-title">
      <Image
        src="/assets/images/journal-torn-paper.webp"
        alt=""
        fill
        sizes="100vw"
        className={styles.background}
      />
      <div className={styles.veil} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.heading} data-reveal>
          <p className={styles.eyebrow}>06 / The Academy Journal</p>
          <h2 id="journal-title">Art, beyond the classroom.</h2>
        </div>

        <div className={styles.event} data-reveal>
          <div className={styles.rule} aria-hidden="true" />
          <div className={styles.eventContent}>
            <div className={styles.date}>
              <p className={styles.day}>13</p>
              <p className={styles.month}>Aug 2026</p>
            </div>

            <div className={styles.narrative}>
              <p className={styles.type}>Performance · Past Event</p>
              <h3>Raghaveeyam</h3>
              <p className={styles.copy}>
                An observance of Ramayana Month. Bhagavatpadham Bharathanatyam
                at Sreepoornathrayeesa Temple, Tripunithura.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

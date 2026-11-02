import Image from "next/image";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import SplitText from "./motion/SplitText";
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
        <div className={styles.heading}>
          <Reveal as="p" className={styles.eyebrow} y={20} delay={0.1}>
            06 / The Academy Journal
          </Reveal>
          <SplitText
            id="journal-title"
            as="h2"
            lines={["Art, beyond the classroom."]}
            delay={0.15}
          />
        </div>

        <Reveal as="div" className={styles.event} delay={0.2} y={34}>
          <Reveal as="div" className={styles.rule} y={0} blur={0} scale={1} duration={1.1} />
          <StaggerGroup className={styles.eventContent} stagger={0.14} delay={0.15}>
            <StaggerItem as="div" className={styles.date} y={24}>
              <p className={styles.day}>13</p>
              <p className={styles.month}>Aug 2026</p>
            </StaggerItem>

            <StaggerItem as="div" className={styles.narrative} y={24}>
              <p className={styles.type}>Performance · Past Event</p>
              <h3>Raghaveeyam</h3>
              <p className={styles.copy}>
                An observance of Ramayana Month. Bhagavatpadham Bharathanatyam
                at Sreepoornathrayeesa Temple, Tripunithura.
              </p>
            </StaggerItem>
          </StaggerGroup>
        </Reveal>
      </div>
    </section>
  );
}

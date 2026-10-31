import Image from "next/image";
import SectionMarker from "./SectionMarker";
import styles from "./Vision.module.scss";

export default function Vision() {
  return (
    <section className={styles.vision} aria-labelledby="vision-title">
      <div className={styles.visual} aria-hidden="true">
        <Image
          src="/assets/images/vision-sculptural-ghungroo.webp"
          alt=""
          fill
          sizes="(max-width: 900px) 70vw, 539px"
          className={styles.image}
        />
      </div>

      <div className={styles.inner}>
        <div className={styles.content}>
          <SectionMarker tone="gold" lineWidth={24}>
            02 / Vision &amp; Mission
          </SectionMarker>

          <h2 id="vision-title" className={styles.title} data-reveal>
            <span>Tradition is our</span>
            <span>beginning.</span>
            <span>Not our boundary.</span>
          </h2>

          <p className={styles.lead} data-reveal>
            With Bharatanatyam at its core, Ritambhara preserves the integrity
            of classical arts while making room for new perspectives and
            creative expression.
          </p>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.row}>
            <p className={styles.label}>Our vision</p>
            <p>
              To keep classical arts alive, meaningful and accessible to a new
              generation.
            </p>
          </div>

          <div className={styles.row}>
            <p className={styles.label}>Our mission</p>
            <p>
              To nurture disciplined practice, cultural awareness and the
              freedom to create.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

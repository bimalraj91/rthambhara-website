import Image from "next/image";
import SectionMarker from "./SectionMarker";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
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

          <SplitText
            id="vision-title"
            as="h2"
            className={styles.title}
            delay={0.1}
            lines={[
              "Tradition is our",
              "beginning.",
              "Not our boundary.",
            ]}
          />

          <Reveal as="p" className={styles.lead} delay={0.2} y={28}>
            With Bharatanatyam at its core, Ritambhara preserves the integrity
            of classical arts while making room for new perspectives and
            creative expression.
          </Reveal>

          <Reveal
            as="div"
            className={styles.divider}
            y={0}
            blur={0}
            duration={1.2}
            delay={0.1}
          />

          <Reveal as="div" className={styles.row} delay={0.1} y={24}>
            <p className={styles.label}>Our vision</p>
            <p>
              To keep classical arts alive, meaningful and accessible to a new
              generation.
            </p>
          </Reveal>

          <Reveal as="div" className={styles.row} delay={0.2} y={24}>
            <p className={styles.label}>Our mission</p>
            <p>
              To nurture disciplined practice, cultural awareness and the
              freedom to create.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

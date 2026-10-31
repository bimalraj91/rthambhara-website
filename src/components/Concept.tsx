import Image from "next/image";
import type { CSSProperties } from "react";
import SectionMarker from "./SectionMarker";
import styles from "./Concept.module.scss";

const principles = [
  {
    name: "Srishti",
    label: "Creation",
    copy: "The impulse to imagine, explore and bring something new into being.",
    offset: "top",
  },
  {
    name: "Sthiti",
    label: "Preservation",
    copy: "The care and continuity that keep a living tradition grounded.",
    offset: "low",
  },
  {
    name: "Laya",
    label: "Dissolution",
    copy: "The release of one form, making space for renewal and transformation.",
    offset: "low",
  },
  {
    name: "Bhava",
    label: "Expression",
    copy: "The feeling that gives movement, music and gesture their meaning.",
    offset: "top",
  },
] as const;

export default function Concept() {
  return (
    <section className={styles.concept} aria-labelledby="concept-title">
      <div className={styles.inner}>
        <SectionMarker tone="light" lineWidth={24}>
          03 / Our Concept
        </SectionMarker>

        <div className={styles.introduction}>
          <p className={styles.rtam} data-reveal>
            Rtam.
          </p>

          <div className={styles.narrative}>
            <h2 id="concept-title">
              An underlying harmony.
              <br />
              A living cycle of art.
            </h2>
            <p>
              Our approach connects creation, preservation, dissolution and
              expression — each part giving meaning to the whole.
            </p>
          </div>
        </div>

        <div className={styles.cycle}>
          <div className={styles.thread} aria-hidden="true">
            <Image
              src="/assets/patterns/cycle-thread.svg"
              alt=""
              fill
              sizes="1280px"
              className={styles.threadImage}
            />
          </div>

          <div className={styles.principles}>
            {principles.map((principle, index) => (
              <article
                key={principle.name}
                className={`${styles.principle} ${styles[principle.offset]}`}
                data-reveal
                style={
                  { "--reveal-delay": `${index * 90}ms` } as CSSProperties
                }
              >
                <span className={styles.bead} aria-hidden="true">
                  <Image
                    src="/assets/patterns/thread-bead.svg"
                    alt=""
                    width={7}
                    height={7}
                  />
                </span>
                <h3>{principle.name}</h3>
                <p className={styles.label}>{principle.label}</p>
                <p className={styles.copy}>{principle.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

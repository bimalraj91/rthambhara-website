import Image from "next/image";
import SectionMarker from "./SectionMarker";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import SplitText from "./motion/SplitText";
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
          <SplitText
            as="p"
            className={styles.rtam}
            lines={["Rtam."]}
            delay={0}
            stagger={0.08}
            duration={1.2}
          />

          <div className={styles.narrative}>
            <SplitText
              id="concept-title"
              as="h2"
              lines={[
                "An underlying harmony.",
                "A living cycle of art.",
              ]}
              delay={0.1}
            />
            <Reveal as="p" delay={0.2} y={24}>
              Our approach connects creation, preservation, dissolution and
              expression — each part giving meaning to the whole.
            </Reveal>
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

          <StaggerGroup
            className={styles.principles}
            stagger={0.14}
            amount={0.2}
          >
            {principles.map((principle) => (
              <StaggerItem
                key={principle.name}
                as="article"
                className={`${styles.principle} ${styles[principle.offset]}`}
                y={40}
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
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

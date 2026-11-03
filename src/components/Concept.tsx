import Image from "next/image";
import SectionLabel from "./SectionLabel";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import styles from "./Concept.module.scss";

const principles = [
  {
    name: "Srishti",
    meaning: "Creation",
    description:
      "The impulse to imagine, explore and bring something new into being.",
    bead: "/assets/home/thread-bead.svg",
  },
  {
    name: "Sthiti",
    meaning: "Preservation",
    description:
      "The care and continuity that keep a living tradition grounded.",
    bead: "/assets/home/thread-bead-2.svg",
  },
  {
    name: "Laya",
    meaning: "Dissolution",
    description:
      "The release of one form, making space for renewal and transformation.",
    bead: "/assets/home/thread-bead.svg",
  },
];

export default function Concept() {
  return (
    <section
      id="concept"
      className={styles.concept}
      aria-labelledby="concept-title"
    >
      <div className={styles.panel}>
        <div className={styles.backgroundWrap} aria-hidden="true">
          <Image
            src="/assets/home/concept-bg-clean.png"
            alt=""
            fill
            sizes="100vw"
            className={styles.background}
          />
        </div>

        <Image
          src="/assets/home/concept-corner.png"
          alt=""
          width={193}
          height={123}
          aria-hidden="true"
          className={styles.corner}
        />
        <div className={styles.transition} aria-hidden="true" />

        <div className={styles.inner}>
          <SectionLabel
            tone="gold"
            lineWidth={24}
            compact
            className={styles.label}
          >
            02/ Our concept
          </SectionLabel>

          <Reveal className={styles.rtamWrap}>
            <p className={styles.rtam}>Rtam.</p>
          </Reveal>

          <div className={styles.narrative}>
            <SplitText
              id="concept-title"
              as="h2"
              className={styles.title}
              delay={0.08}
              stagger={0.05}
              lines={["An underlying harmony.", "A living cycle of art."]}
            />
            <Reveal delay={0.16}>
              <p className={styles.copy}>
                Our approach connects creation, preservation, dissolution and
                expression — each part giving meaning to the whole.
              </p>
            </Reveal>
          </div>

          <div className={styles.cycle}>
            <Image
              src="/assets/home/cycle-thread.svg"
              alt=""
              width={1280}
              height={101}
              aria-hidden="true"
              className={styles.thread}
            />

            <div className={styles.principles}>
              {principles.map((principle, index) => (
                <Reveal
                  key={principle.name}
                  className={styles.principle}
                  delay={0.1 + index * 0.1}
                >
                  <Image
                    src={principle.bead}
                    alt=""
                    width={7}
                    height={7}
                    aria-hidden="true"
                    className={styles.bead}
                  />
                  <p className={styles.principleName}>{principle.name}</p>
                  <p className={styles.principleMeaning}>
                    {principle.meaning}
                  </p>
                  <p className={styles.principleCopy}>
                    {principle.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

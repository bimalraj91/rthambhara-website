import Crop from "./about/Crop";
import Drift from "./motion/Drift";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import SectionLabel from "./SectionLabel";
import styles from "./ProgramsContemporary.module.scss";

const P = "/assets/programs";

const pillars = [
  { number: "01", label: "Expression" },
  { number: "02", label: "Movement" },
  { number: "03", label: "Rhythm" },
];

export default function ProgramsContemporary() {
  return (
    <section
      id="beyond-boundaries"
      className={styles.section}
      aria-labelledby="contemporary-title"
    >
      <div className={styles.canvas}>
        <div className={`${styles.deco} ${styles.ghost}`} aria-hidden="true">
          <Drift from={-34} to={34} className={styles.fill}>
            <div className={styles.ghostFrame}>
              <Crop
                src={`${P}/contemporary-ghost.webp`}
                sizes="390px"
                box={{ height: "134.47%", left: "-31.7%", top: "-24.48%", width: "189.69%" }}
              />
            </div>
          </Drift>
        </div>

        <Reveal as="div" className={styles.dancer} x={-40} y={20} blur={6} duration={1.2}>
          <Crop
            src={`${P}/contemporary-dancer.webp`}
            alt="A contemporary dancer caught mid-turn with arms raised"
            sizes="736px"
            cover
          />
        </Reveal>

        <SectionLabel className={styles.cue}>
          02 / BEYOND BOUNDARIES, BEYOND RHYTHM
        </SectionLabel>

        <SplitText
          id="contemporary-title"
          as="h2"
          className={styles.title}
          lines={["Contemporary Dance"]}
          delay={0.05}
          stagger={0.09}
        />

        <div className={styles.flow}>
          <Reveal as="p" delay={0.05} y={26}>
            There is something extraordinary about the way a body learns to
            speak. The strength in a leap, the poetry of a turn, the silence
            between two movements. Every gesture holds a feeling, every
            movement carries a story.
          </Reveal>
          <Reveal as="p" delay={0.05} y={26}>
            At rtambhara, our contemporary dance draws inspiration from
            Kalaripayattu, Kerala&apos;s ancient martial art, bringing its
            remarkable strength, agility, balance, and fluidity into the
            expressive world of contemporary movement.
          </Reveal>
          <Reveal as="p" className={styles.wide} delay={0.05} y={26}>
            Guided by Satyajith Ravindranath, our classes explore the beautiful
            relationship between physical discipline and artistic imagination.
            Through dynamic movements, floor work, improvisation, and
            expressive choreography, students discover the possibilities of
            their own bodies, learning to move with greater confidence,
            control, and freedom.
          </Reveal>

          <StaggerGroup as="ul" className={styles.pillars} stagger={0.12} delay={0.05}>
            {pillars.map((pillar) => (
              <StaggerItem
                key={pillar.number}
                as="li"
                className={styles.pillar}
                y={22}
                scale={0.96}
              >
                <span className={styles.badge}>{pillar.number}</span>
                <span className={styles.pillarLabel}>{pillar.label}</span>
                <span className={styles.arrow} aria-hidden="true" />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal as="p" className={styles.afterPillars} delay={0.05} y={26}>
            Our sessions welcome curious beginners and experienced dancers
            alike, with learning thoughtfully adapted to their abilities and
            artistic growth. We nurture the courage to experiment, the patience
            to master a movement, and the sensitivity to give it meaning.
          </Reveal>
          <Reveal as="p" delay={0.05} y={26}>
            For we believe that every body has its own poetry. Sometimes, all it
            needs is the freedom to discover it.
          </Reveal>
        </div>
      </div>
    </section>
  );
}

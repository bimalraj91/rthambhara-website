import Image from "next/image";
import { team } from "@/data/home";
import Parallax from "./motion/Parallax";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import SplitText from "./motion/SplitText";
import styles from "./Team.module.scss";

export default function Team() {
  return (
    <section id="team" className={styles.team} aria-labelledby="team-title">
      <Parallax className={styles.background} strength={70}>
        <Image
          src="/assets/images/team-temple-background.webp"
          alt=""
          fill
          sizes="100vw"
          className={styles.backgroundImage}
        />
      </Parallax>
      <div className={styles.fadeTop} aria-hidden="true" />
      <div className={styles.fadeBottom} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.intro}>
          <Reveal as="div" className={styles.cue} delay={0.1} y={26}>
            <p className={styles.eyebrow}>08 / Our Team</p>
            <p>
              The people who guide the practice, the performance and the
              academy&apos;s care for every learner.
            </p>
          </Reveal>

          <SplitText
            id="team-title"
            as="h2"
            lines={[
              "People who teach,",
              "shape the practice.",
            ]}
            delay={0.15}
          />
        </div>

        <StaggerGroup className={styles.members} stagger={0.13} amount={0.15}>
          {team.map((member) => (
            <StaggerItem
              as="article"
              className={styles.member}
              key={member.name}
              y={44}
            >
              <div className={styles.portrait}>
                <Image
                  src={member.image}
                  alt={member.alt}
                  fill
                  sizes="(max-width: 760px) 86vw, 328px"
                  className={styles.portraitImage}
                  style={{ objectPosition: member.imagePosition }}
                />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

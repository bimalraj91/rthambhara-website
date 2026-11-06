import Image from "next/image";
import PillButton from "./PillButton";
import SectionLabel from "./SectionLabel";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import { team } from "@/data/home";
import styles from "./Team.module.scss";

export default function Team() {
  return (
    <section id="team" className={styles.team} aria-labelledby="team-title">
      <div className={styles.backgroundWrap} aria-hidden="true">
        <Image
          src="/assets/home/team-background.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.background}
        />
        <div className={styles.topFade} />
      </div>

      <div className={styles.emblem} aria-hidden="true">
        <Image
          src="/assets/gurus/logo.webp"
          alt=""
          width={325}
          height={291}
          sizes="(max-width: 900px) 60vw, 505px"
        />
      </div>

      <div className={styles.inner}>
        <SectionLabel tone="white" lineWidth={24} className={styles.label}>
          07 / Our team
        </SectionLabel>

        <SplitText
          id="team-title"
          as="h2"
          className={styles.title}
          delay={0.08}
          stagger={0.045}
          lines={[
            {
              words: ["The", "hands", "that", "nurture", "the", "art,"],
              className: styles.whiteLine,
            },
            {
              words: ["the", "hearts", "that", "keep", "it", "alive."],
              className: styles.goldLine,
            },
          ]}
        />

        <Reveal className={styles.exploreWrap} delay={0.18}>
          <PillButton href="/gurus" variant="glass">
            Explore
          </PillButton>
        </Reveal>

        <div className={styles.portraits}>
          {team.map((member, index) => (
            <Reveal
              key={member.name}
              className={styles.member}
              delay={0.12 + index * 0.1}
            >
              <div className={styles.portrait}>
                <Image
                  src={member.image}
                  alt={member.alt}
                  fill
                  sizes="(max-width: 760px) 72vw, 270px"
                  className={styles.image}
                  style={{ objectPosition: member.imagePosition }}
                />
              </div>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              <p className={styles.description}>{member.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

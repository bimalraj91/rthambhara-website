import Image from "next/image";
import { team } from "@/data/home";
import styles from "./Team.module.scss";

export default function Team() {
  return (
    <section id="team" className={styles.team} aria-labelledby="team-title">
      <div className={styles.background} aria-hidden="true">
        <Image
          src="/assets/images/team-temple-background.webp"
          alt=""
          fill
          sizes="100vw"
          className={styles.backgroundImage}
        />
      </div>
      <div className={styles.fadeTop} aria-hidden="true" />
      <div className={styles.fadeBottom} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.intro}>
          <div className={styles.cue}>
            <p className={styles.eyebrow}>08 / Our Team</p>
            <p>
              The people who guide the practice, the performance and the
              academy&apos;s care for every learner.
            </p>
          </div>

          <h2 id="team-title" data-reveal>
            People who teach,
            <br />
            shape the practice.
          </h2>
        </div>

        <div className={styles.members}>
          {team.map((member) => (
            <article className={styles.member} key={member.name}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

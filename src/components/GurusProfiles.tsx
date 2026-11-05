import Image from "next/image";
import Reveal from "./motion/Reveal";
import ImageReveal from "./motion/ImageReveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import styles from "./GurusProfiles.module.scss";

const A = "/assets/gurus";

const gurus = [
  {
    id: "girija",
    className: styles.girija,
    name: "Girija Ravindranath",
    role: "The Soul of Tradition",
    photo: `${A}/guru-girija.webp`,
    alt: "Portrait of Guru Girija Ravindranath",
    bio: "A distinguished disciple of Kalamandalam, with over five decades of experience, Guru Girija has dedicated her life to the art of Bharatanatyam, inspiring generations with grace, discipline and devotion. A distinguished disciple of Kalamandalam, with over five decades of experience, Guru Girija has dedicated her life to the art of Bharatanatyam, inspiring generations with grace, discipline and devotion.",
    pillars: ["Grace", "Tradition", "Expression"],
    from: "left" as const,
  },
  {
    id: "satyajit",
    className: styles.satyajit,
    name: "Satyajit Ravindranath",
    role: "Movement Beyond Limits",
    photo: `${A}/guru-satyajit.webp`,
    alt: "Portrait of Guru Satyajit Ravindranath",
    bio: "A renowned choreographer and performer, Guru Satyajit brings a fresh perspective to dance, blending classical roots with contemporary expression. A renowned choreographer and performer, Guru Satyajit brings a fresh perspective to dance, blending classical roots with contemporary expression.",
    pillars: ["Expression", "Innovation", "Movement"],
    from: "right" as const,
  },
];

export default function GurusProfiles() {
  return (
    <section className={styles.section} aria-label="Our gurus">
      <div className={styles.canvas}>
        <div
          className={`${styles.deco} ${styles.washRight}`}
          aria-hidden="true"
        >
          <Image
            src={`${A}/gemini1.webp`}
            alt=""
            fill
            sizes="1100px"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={`${styles.deco} ${styles.washLeft}`} aria-hidden="true">
          <div className={styles.washLeftFlip}>
            <Image
              src={`${A}/gemini2.webp`}
              alt=""
              width={1109}
              height={944}
              sizes="1000px"
              style={{
                position: "absolute",
                maxWidth: "none",
                height: "100.06%",
                left: "-14.64%",
                top: "-0.03%",
                width: "114.64%",
              }}
            />
          </div>
        </div>

        <div className={`${styles.deco} ${styles.emblem}`} aria-hidden="true">
          <Image
            src={`${A}/logo.webp`}
            alt=""
            width={325}
            height={291}
            sizes="505px"
            style={{
              position: "absolute",
              maxWidth: "none",
              height: "127.73%",
              left: 0,
              top: "-0.02%",
              width: "100%",
            }}
          />
        </div>

        {gurus.map((guru) => (
          <article key={guru.id} className={`${styles.guru} ${guru.className}`}>
            <ImageReveal className={styles.photoWrap} from={guru.from}>
              <div className={styles.photo}>
                <Image
                  src={guru.photo}
                  alt={guru.alt}
                  width={268}
                  height={342}
                  sizes="464px"
                  style={{
                    position: "absolute",
                    maxWidth: "none",
                    height: "108.08%",
                    left: "0.06%",
                    top: "-0.01%",
                    width: "100%",
                  }}
                />
              </div>
            </ImageReveal>

            <div className={styles.heading}>
              <Reveal as="h2" y={26} delay={0.05} className={styles.name}>
                {guru.name}
              </Reveal>
              <Reveal as="p" y={20} delay={0.12} className={styles.role}>
                {guru.role}
              </Reveal>
            </div>

            <Reveal as="p" y={24} delay={0.18} className={styles.bio}>
              {guru.bio}
            </Reveal>

            <StaggerGroup as="ul" className={styles.pillars} stagger={0.1}>
              {guru.pillars.map((pillar) => (
                <StaggerItem
                  key={`${guru.id}-${pillar}`}
                  as="li"
                  y={18}
                  blur={4}
                >
                  <span className={styles.pillar}>{pillar}</span>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </article>
        ))}
      </div>
    </section>
  );
}

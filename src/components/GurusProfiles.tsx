import Image from "next/image";
import Crop from "./about/Crop";
import Reveal from "./motion/Reveal";
import ImageReveal from "./motion/ImageReveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import styles from "./GurusProfiles.module.scss";

const A = "/assets/gurus";

type Guru = {
  id: string;
  className: string;
  name: string;
  role: string;
  photo: string;
  alt: string;
  // The opening paragraph beside the portrait.
  bio: string;
  pillars: string[];
  // Longer biography set beneath the pillars, and a closing note that runs
  // wider across the page.
  story?: string[];
  more?: string;
  from: "left" | "right";
};

const gurus: Guru[] = [
  {
    id: "girija",
    className: styles.girija,
    name: "Smt. Girija Ravindranath",
    role: "The Soul of Tradition",
    photo: `${A}/guru-girija.png`,
    alt: "Portrait of Smt. Girija Ravindranath",
    bio: "Smt. Girija Ravindranath, a postgraduate in Bharatanatyam from the renowned Kalakshetra, Chennai, is dedicated to Bharatanatyam and has been nurturing and kindling her passion for dance forms since her childhood.",
    pillars: ["Grace", "Tradition", "Expression"],
    story: [
      "She deeply imbibed the values of the ancient Indian Culture, while on her journey through the path of dance, initiated in her childhood by well-known Gurus in Tripunithura. Close guru-shishya association for 11 years with honorable Smt. Rukmini Devi, the founder Director of Kalakshetra, has been an invaluable experience for Smt. Girija that changed her world view, especially towards art forms, for the rest of her life, apart from instilling a transcending relationship with the dance form she graduated in. She is an awardee of Govt. of India Scholarship for Advanced Studies in Bharatanatyam (1980 - 82).",
      "She participated in many of the applauded dance dramas of Rukmini Devi during the latter 6 years of her student life at Kalakshetra and was an integral member of the Kalakshetra team that went around many cities of India and various other countries like China, Hong Kong, North Korea, Vietnam, Philippines, Sri Lanka etc presenting their dance dramas in packed auditoriums.",
    ],
    more: "She has been conducting a Bharatanatya Kalari at Tripunithura Ladies Club Hall for the past 25 years. Blending of her proficiency in Carnatic vocal and violin along with her creativity in choreography in Bharatanatyam, has culminated in the creation of a wide range of laudable Bharatanatyam items that were performed by her students during the past decades. As a teacher she has always vouched to preserve and nurture the traditional style of the art form in the pure Kalakshetra bani and still continues to do so with perseverance and dedication with no compromise whatsoever.",
    from: "left",
  },
  {
    id: "satyajit",
    className: styles.satyajit,
    name: "Satyajit Ravindranath",
    role: "Assistant Director",
    photo: `${A}/guru-satyajit.png`,
    alt: "Portrait of Guru Satyajit Ravindranath",
    bio: "Mr. Satyajit Ravindranath, a graduate (B.A. Hons) from the London Contemporary Dance School, London, has been professionally engaged in the field of contemporary dance for over a decade. He has been teaching for the last 10+ years.",
    pillars: ["Expression", "Innovation", "Movement"],
    story: [
      "He has worked with numerous prestigious institutions and has participated in several major contemporary dance festivals in India and abroad. He is a trained yoga practitioner.",
      "He has also trained in Sanskrit and folk theatre under the guidance of Sri Kavalam Narayana Panicker at the Sopanam Institute of Theatre and Advanced Research, Thiruvananthapuram.",
    ],
    from: "right",
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
            sizes="(max-width: 760px) 380px, 1100px"
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
              sizes="(max-width: 760px) 425px, 1000px"
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

            {guru.story && (
              <div className={styles.story}>
                {guru.story.map((paragraph, index) => (
                  <Reveal
                    key={paragraph.slice(0, 24)}
                    as="p"
                    y={24}
                    delay={0.05 + index * 0.1}
                  >
                    {paragraph}
                  </Reveal>
                ))}
              </div>
            )}

            {guru.more && (
              <Reveal as="p" y={24} delay={0.05} className={styles.more}>
                {guru.more}
              </Reveal>
            )}
          </article>
        ))}

        {/* Faint ornaments laid over the page, as the design stacks them. */}
        <div className={`${styles.deco} ${styles.sheet}`} aria-hidden="true">
          <div className={styles.sheetTile}>
            <Crop
              src="/assets/about/figma/sheet10.webp"
              sizes="(max-width: 760px) 360px, 620px"
              box={{
                height: "314.1%",
                left: "-378.6%",
                top: "-24.53%",
                width: "478.6%",
              }}
            />
          </div>
        </div>

        <div
          className={`${styles.deco} ${styles.silhouette}`}
          aria-hidden="true"
        >
          <Image
            src={`${A}/dancer-silhouette.webp`}
            alt=""
            fill
            sizes="(max-width: 760px) 219px, 352px"
          />
        </div>
      </div>
    </section>
  );
}

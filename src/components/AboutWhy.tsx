import Image from "next/image";
import SectionMarker from "./SectionMarker";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import styles from "./AboutWhy.module.scss";

type Feature = "portrait" | "lamp" | "arch";

type Pillar = {
  number: string;
  title: string;
  body: string;
  position: string;
  feature?: Feature;
  caption?: {
    name: string;
    role: string;
  };
  stat?: {
    number: string;
    label: string;
    note: string;
  };
};

const pillars: Pillar[] = [
  {
    number: "01",
    title: "A legacy to cherish",
    body: "Guided by Smt. Girija and the wisdom of her mentor, Smt. Rukmini Devi Arundale, we carry the grace and philosophy of Kalakshetra into every lesson.",
    position: "card1",
    feature: "portrait",
    caption: {
      name: "Smt. Girija Ravindranath",
      role: "A living teaching tradition",
    },
  },
  {
    number: "02",
    title: "Learning with purpose",
    body: "A thoughtfully structured, Kalakshetra-inspired curriculum, enriched by 23 years of teaching experience and the recognition of BSS certification.",
    position: "card2",
    stat: {
      number: "23",
      label: "years of teaching experience",
      note: "Kalakshetra-inspired curriculum · BSS-certified",
    },
  },
  {
    number: "03",
    title: "Wisdom beyond our walls",
    body: "Workshops and intimate learning sessions with renowned artists, where a lifetime of experience finds its way into eager young hearts.",
    position: "card3",
  },
  {
    number: "04",
    title: "The joy of the stage",
    body: "Our own productions and performances give every student the beautiful experience of bringing their learning to life before an audience.",
    position: "card4",
  },
  {
    number: "05",
    title: "Art that travels",
    body: "Through collaborations with like-minded institutions, we open doors to new perspectives, shared traditions, and the wider world of art.",
    position: "card5",
  },
  {
    number: "06",
    title: "Dreams beyond borders",
    body: "We aspire to take our students to national and international stages, where their years of devotion can find new audiences and possibilities.",
    position: "card6",
  },
  {
    number: "07",
    title: "A bond beyond Arangettam",
    body: "The relationship we share with our students continues long after their Arangettam. There is always a place to return to, an art to revisit, and a family that remembers.",
    position: "card7",
    feature: "lamp",
  },
  {
    number: "08",
    title: "A home steeped in tradition",
    body: "Beautiful traditional architecture, spacious surroundings, and an atmosphere that invites the mind to settle and the artist to flourish.",
    position: "card8",
  },
  {
    number: "09",
    title: "The beauty of every age",
    body: "From little feet discovering their first rhythm to graceful years enriched by Thiruvathira and yoga, we celebrate movement through every season of life. At Rtambhara, we hope every student leaves with something beautiful to carry, and a reason to return..",
    position: "card9",
    feature: "arch",
  },
];

export default function AboutWhy() {
  return (
    <section id="why-rtambhara" className={styles.section} aria-labelledby="why-title">
      <Image
        src="/assets/about/ritual-word.svg"
        alt=""
        width={1198}
        height={232}
        unoptimized
        className={styles.bigWord}
      />

      <div className={styles.inner}>
        <header className={styles.header}>
          <SectionMarker tone="red" lineWidth={28}>
            03 / Why Rtambhara
          </SectionMarker>
          <SplitText
            id="why-title"
            as="h2"
            className={styles.title}
            delay={0.1}
            lines={[
              {
                words: ["Why", { text: "Rtambhara?", className: styles.accent }],
              },
            ]}
          />
        </header>

        <div className={styles.stage}>
          {pillars.map((pillar, index) => (
            <Reveal
              as="article"
              key={pillar.number}
              className={`${styles.card} ${styles[pillar.position]}`}
              delay={(index % 3) * 0.08}
              y={36}
              amount={0.2}
            >
              {pillar.feature === "portrait" && (
                <>
                  <Image
                    src="/assets/about/spotlight.webp"
                    alt=""
                    width={640}
                    height={640}
                    className={styles.cardSpotlight}
                  />
                  <div className={styles.cardPortrait}>
                    <Image
                      src="/assets/about/girija-portrait.webp"
                      alt="Smt. Girija Ravindranath"
                      fill
                      sizes="540px"
                      className={styles.cardPortraitImage}
                    />
                  </div>
                </>
              )}

              {pillar.feature === "lamp" && (
                <Image
                  src="/assets/about/lamp.png"
                  alt=""
                  width={260}
                  height={300}
                  className={styles.cardLamp}
                />
              )}

              {pillar.feature === "arch" && (
                <Image
                  src="/assets/about/arch.webp"
                  alt=""
                  width={239}
                  height={236}
                  className={styles.cardArch}
                />
              )}

              <div className={styles.cardHead}>
                <span className={styles.badge}>{pillar.number}</span>
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
              </div>
              <p className={styles.cardBody}>{pillar.body}</p>

              {pillar.stat && (
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{pillar.stat.number}</span>
                  <span className={styles.statLabel}>{pillar.stat.label}</span>
                  <span className={styles.statNote}>{pillar.stat.note}</span>
                </div>
              )}

              {pillar.caption && (
                <div className={styles.cardCaption}>
                  <p>{pillar.caption.name}</p>
                  <span>{pillar.caption.role}</span>
                </div>
              )}
            </Reveal>
          ))}

          <Image
            src="/assets/about/hanging-lotus.webp"
            alt=""
            width={320}
            height={640}
            className={styles.stageChandelier}
          />

          <Image
            src="/assets/about/why-traveler.png"
            alt="A Bharatanatyam dancer with her hands raised"
            width={367}
            height={486}
            className={styles.traveler}
          />

          <Reveal as="figure" className={styles.dancer} delay={0.05} y={30}>
            <Image
              src="/assets/about/why-dancer.webp"
              alt="A Bharatanatyam dancer in a red and gold costume"
              width={1536}
              height={1024}
              className={styles.dancerImage}
            />
          </Reveal>

          <Image
            src="/assets/about/thread.svg"
            alt=""
            width={1087}
            height={2861}
            unoptimized
            className={styles.thread}
          />
        </div>
      </div>
    </section>
  );
}

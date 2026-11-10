import Image from "next/image";
import type { CSSProperties } from "react";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import Crop from "./about/Crop";
import FontPreload from "./FontPreload";
import styles from "./AboutWhy.module.scss";

const A = "/assets/about/figma";

type Vars = Record<`--${string}`, number>;

const vars = (v: Vars) => v as unknown as CSSProperties;

type Card = {
  n: string;
  title: string;
  body: string;
  // Card box in Figma page coordinates (y is page y), then everything inside it
  // relative to the card's own top-left.
  box: [x: number, y: number, w: number, h: number];
  badge: [x: number, y: number, w?: number, h?: number];
  head: [x: number, y: number, w: number];
  text: [x: number, y: number, w: number];
  tone: "plain" | "photo" | "soft" | "clear" | "wide";
  extra?: "signature" | "stat" | "timeline" | "arch";
};

// Page y of this section's top edge in Figma.
const TOP = 4920;

const cards: Card[] = [
  {
    n: "01",
    title: "A legacy to cherish",
    body: "Guided by Smt. Girija and the wisdom of her mentor, Smt. Rukmini Devi Arundale, we carry the grace and philosophy of Kalakshetra into every lesson.",
    box: [173, 5218, 540, 598],
    badge: [72, 42, 43.585, 44],
    head: [135.4, 42, 280.33],
    text: [72, 118, 420],
    tone: "photo",
    extra: "signature",
  },
  {
    n: "02",
    title: "Learning with purpose",
    body: "A thoughtfully structured, Kalakshetra-inspired curriculum, enriched by 23 years of teaching experience and the recognition of BSS certification.",
    box: [733, 5218, 559, 287],
    badge: [20, 40],
    head: [79, 40, 484],
    text: [79, 99, 480],
    tone: "plain",
    extra: "stat",
  },
  {
    n: "03",
    title: "Wisdom beyond our walls",
    body: "Workshops and intimate learning sessions with renowned artists, where a lifetime of experience finds its way into eager young hearts.",
    box: [733, 5529, 559, 287],
    badge: [26, 62],
    head: [84, 62, 484],
    text: [84, 121, 468],
    tone: "plain",
  },
  {
    n: "04",
    title: "The joy of the stage",
    body: "Our own productions and performances give every student the beautiful experience of bringing their learning to life before an audience.",
    box: [173, 5864, 1099, 191],
    badge: [52, 36, 39, 38],
    head: [107, 36, 484],
    text: [107, 95, 639],
    tone: "wide",
  },
  {
    n: "05",
    title: "Art that travels",
    body: "Through collaborations with like-minded institutions, we open doors to new perspectives, shared traditions, and the wider world of art.",
    box: [546, 6139, 607, 213],
    badge: [35, 37],
    head: [98, 37, 484],
    text: [98, 96, 468],
    tone: "plain",
  },
  {
    n: "06",
    title: "Dreams beyond borders",
    body: "We aspire to take our students to national and international stages, where their years of devotion can find new audiences and possibilities.",
    box: [126, 6407, 559, 232],
    badge: [33, 57],
    head: [96, 57, 484],
    text: [96, 116, 415],
    tone: "plain",
  },
  {
    n: "07",
    title: "A bond beyond Arangettam",
    body: "The relationship we share with our students continues long after their Arangettam. There is always a place to return to, an art to revisit, and a family that remembers.",
    box: [133, 6662, 552, 287],
    badge: [33, 61.93],
    head: [96, 61.93, 484],
    text: [96, 120.93, 442],
    tone: "soft",
    extra: "timeline",
  },
  {
    n: "08",
    title: "A home steeped in tradition",
    body: "Beautiful traditional architecture, spacious surroundings, and an atmosphere that invites the mind to settle and the artist to flourish.",
    box: [133, 6970, 552, 226],
    badge: [33, 44],
    head: [96, 44, 484],
    text: [96, 103, 389],
    tone: "soft",
  },
  {
    n: "09",
    title: "The beauty of every age",
    body: "From little feet discovering their first rhythm to graceful years enriched by Thiruvathira and yoga, we celebrate movement through every season of life. At Rtambhara, we hope every student leaves with something beautiful to carry, and a reason to return.",
    box: [126, 7217, 1155, 194],
    badge: [33, 22],
    head: [96, 22, 484],
    text: [96, 81, 734],
    tone: "clear",
    extra: "arch",
  },
];

export default function AboutWhy() {
  return (
    <section
      id="why-rtambhara"
      className={styles.section}
      aria-labelledby="why-title"
    >
      <FontPreload fonts={["cinzel"]} />
      <div className={styles.canvas}>
        <div className={`${styles.deco} ${styles.dancer}`} aria-hidden="true">
          <div className={styles.dancerTile}>
            <Crop
              src={`${A}/rect16.webp`}
              sizes="(max-width: 760px) 680px, 840px"
              box={{ height: "100%", left: "-48.16%", top: "0.02%", width: "151.56%" }}
            />
          </div>
        </div>

        <div className={`${styles.deco} ${styles.word}`} aria-hidden="true">
          <Image src={`${A}/word-wide.svg`} alt="" fill unoptimized sizes="1198px" />
        </div>

        <div className={styles.header}>
          <p className={styles.cue}>03 / WHY CHOOSE US</p>
          <SplitText
            id="why-title"
            as="h2"
            className={styles.title}
            delay={0.1}
            lines={[{ words: ["Why", { text: "rtambhara?", className: styles.accent }] }]}
          />
        </div>

        <div className={`${styles.deco} ${styles.sheet}`} aria-hidden="true">
          <Crop
            src={`${A}/sheet10.webp`}
            sizes="270px"
            box={{ height: "175.04%", left: "-189.18%", top: "0", width: "573.13%" }}
          />
        </div>

        <div className={`${styles.deco} ${styles.thread}`} aria-hidden="true">
          <Crop
            src={`${A}/thread.svg`}
            unoptimized
            sizes="1100px"
            box={{ height: "116.05%", left: "0", top: "0", width: "199.03%" }}
          />
        </div>

        <div className={`${styles.deco} ${styles.traveler}`} aria-hidden="true">
          <Crop src={`${A}/download8.webp`} sizes="370px" cover />
        </div>

        <div className={`${styles.deco} ${styles.natya}`} aria-hidden="true">
          <span>नाट्य</span>
        </div>

        <div className={`${styles.deco} ${styles.spotlight}`} aria-hidden="true">
          <div className={styles.spotlightTile}>
            <Crop
              src={`${A}/spotlight.webp`}
              sizes="370px"
              box={{ height: "125.56%", left: "-14.37%", top: "-12.87%", width: "128.67%" }}
            />
          </div>
        </div>

        {cards.map((card, index) => {
          const [x, y, w, h] = card.box;

          return (
            <Reveal
              as="article"
              key={card.n}
              className={`${styles.card} ${styles[card.tone]}`}
              delay={(index % 3) * 0.08}
              y={36}
              amount={0.2}
              style={vars({ "--x": x, "--y": y - TOP, "--w": w, "--h": h })}
            >
              {card.tone === "photo" && (
                <div className={styles.portrait}>
                  <Crop
                    src={`${A}/gemini.webp`}
                    sizes="(max-width: 760px) 370px, 540px"
                    cover
                  />
                </div>
              )}

              {card.extra === "timeline" && (
                <div className={styles.timeline} aria-hidden="true">
                  <Crop
                    src={`${A}/timeline.webp`}
                    sizes="150px"
                    box={{ height: "142.51%", left: "-79.31%", top: "-42.51%", width: "236.45%" }}
                  />
                </div>
              )}

              {card.extra === "arch" && (
                <div className={styles.arch} aria-hidden="true">
                  <Crop
                    src={`${A}/arch.webp`}
                    sizes="190px"
                    box={{ height: "100%", left: "-0.03%", top: "0", width: "100.06%" }}
                  />
                </div>
              )}

              <span
                className={styles.badge}
                style={vars({
                  "--x": card.badge[0],
                  "--y": card.badge[1],
                  "--w": card.badge[2] ?? 44,
                  "--h": card.badge[3] ?? 44,
                })}
              >
                {card.n}
              </span>

              <div className={styles.text}>
                <h3
                  className={styles.headline}
                  style={vars({ "--x": card.head[0], "--y": card.head[1], "--w": card.head[2] })}
                >
                  {card.title}
                </h3>
                <p
                  className={styles.body}
                  style={vars({ "--x": card.text[0], "--y": card.text[1], "--w": card.text[2] })}
                >
                  {card.body}
                </p>

                {card.extra === "signature" && (
                  <p className={styles.signature}>
                    <span>Smt. Girija Ravindranath</span>
                    <span>A living teaching tradition</span>
                  </p>
                )}

                {card.extra === "stat" && (
                  <p className={styles.stat}>
                    <span className={styles.statNumber}>23</span>
                    <span className={styles.statCopy}>
                      <span>years of teaching experience</span>
                      <span>Kalakshetra-inspired curriculum · BSS-certified</span>
                    </span>
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

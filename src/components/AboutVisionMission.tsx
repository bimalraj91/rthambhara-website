import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import Crop from "./about/Crop";
import FontPreload from "./FontPreload";
import styles from "./AboutVisionMission.module.scss";

const A = "/assets/about/figma";

const missionTop = [
  "We wish to see the beauty of our traditions find a home in every generation. To place the wisdom of centuries into young hands, and watch it unfold in ways even we may never have imagined.",
  "At Rtambhara, we carry this wish into every lesson, every rehearsal, and every moment spent with our students. We hope to nurture artists who understand the stories behind their movements, who find meaning in the smallest gestures, and who come to love the discipline and devotion that give an art its depth. We want our children to grow with the confidence to express themselves, the curiosity to explore, and the sensitivity to appreciate the world around them. Through Bharatanatyam and other forms of artistic expression, we seek to cultivate patience, awareness, creativity, and a lifelong affection for the arts.",
];

const missionBottom = [
  "We also wish to make movement a cherished part of life at every age. A place where children discover their abilities, young artists find their voices, and older generations continue to experience the pleasure of rhythm, togetherness, and well being.",
  "Above all, we hope to preserve the precious relationship between a teacher, a student, and an art that has been lovingly entrusted from one generation to another. For every student who learns with us, we hope there will come a day when the rhythm feels like their own, the art feels like home, and all that we have shared continues to live through them.",
];

export default function AboutVisionMission() {
  return (
    <section
      id="vision-mission"
      className={styles.section}
      aria-labelledby="vision-title"
    >
      <FontPreload fonts={["cinzel"]} />
      <div className={styles.canvas}>
        <div className={`${styles.deco} ${styles.circle}`} aria-hidden="true">
          <div className={styles.circleTile}>
            <div className={styles.circleHalf}>
              <Crop
                src={`${A}/ellipse20.webp`}
                sizes="(max-width: 760px) 219px, 880px"
              />
            </div>
          </div>
        </div>

        <div
          className={`${styles.deco} ${styles.sheetLeft}`}
          aria-hidden="true"
        >
          <Crop
            src={`${A}/sheet1.webp`}
            sizes="(max-width: 760px) 420px, 1080px"
            box={{
              height: "267.96%",
              left: "-197.47%",
              top: "-94.17%",
              width: "388.86%",
            }}
          />
        </div>

        <div
          className={`${styles.deco} ${styles.sheetRight}`}
          aria-hidden="true"
        >
          <div className={styles.sheetRightTile}>
            <Crop
              src={`${A}/sheet10.webp`}
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

        <div className={`${styles.deco} ${styles.emblem}`} aria-hidden="true">
          <Crop
            src="/assets/gurus/logo.webp"
            sizes="529px"
            box={{ height: "127.73%", left: "0", top: "-0.02%", width: "100%" }}
          />
        </div>

        <div className={styles.forum}>
          <p className={styles.cue}>02 / VISION &amp; MISSION</p>
          <SplitText
            id="vision-title"
            as="h2"
            className={styles.title}
            delay={0.1}
            lines={[
              { words: ["Our", { text: "Vision", className: styles.accent }] },
            ]}
          />
        </div>

        <div className={styles.cards}>
          <Reveal
            as="article"
            className={`${styles.card} ${styles.srishti}`}
            delay={0}
            y={30}
          >
            <div className={styles.cardInner}>
              <span className={styles.badge}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${A}/ellipse21.svg`}
                  alt=""
                  className={styles.badgeRing}
                />
                <span className={styles.badgeGold} aria-hidden="true">
                  <Crop src={`${A}/sheet5.webp`} sizes="100px" cover />
                </span>
              </span>
              <h3 className={styles.cardName}>Srishti</h3>
              <p className={styles.cardMeaning}>Creation</p>
            </div>
          </Reveal>

          <Reveal
            as="article"
            className={`${styles.card} ${styles.sthiti}`}
            delay={0.12}
            y={30}
          >
            <span className={styles.sthitiBadge}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${A}/ellipse22.svg`}
                alt=""
                className={styles.badgeRing}
              />
              <span className={styles.sthitiGold} aria-hidden="true">
                <Crop
                  src={`${A}/sheet6.webp`}
                  sizes="100px"
                  box={{
                    height: "151.72%",
                    left: "-6.41%",
                    top: "-33.09%",
                    width: "249.72%",
                  }}
                />
              </span>
            </span>
            <div className={styles.sthitiText}>
              <h3 className={styles.sthitiName}>Sthiti</h3>
              <p className={styles.sthitiMeaning}>PRESERVATION</p>
            </div>
          </Reveal>

          <Reveal
            as="article"
            className={`${styles.card} ${styles.laya}`}
            delay={0.24}
            y={30}
          >
            <div className={styles.cardInner}>
              <span className={styles.badge}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${A}/ellipse21.svg`}
                  alt=""
                  className={styles.badgeRing}
                />
                <span className={styles.badgeGold} aria-hidden="true">
                  <Crop src={`${A}/sheet7.webp`} sizes="100px" cover />
                </span>
              </span>
              <h3 className={styles.cardName}>laya</h3>
              <p className={`${styles.cardMeaning} ${styles.cardMeaningSans}`}>
                Dissolution
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal as="p" className={styles.visionOne} delay={0.1} y={26}>
          There is a beautiful wisdom in the way the universe moves. In all that
          is born, all that is lovingly preserved, and all that must eventually
          make way for something new.
        </Reveal>
        <Reveal as="p" className={styles.visionTwo} delay={0.14} y={26}>
          With Bharatanatyam at our heart, we nurture a space where tradition is
          cherished and creativity is given room to flourish. Through
          contemporary dance and the many languages of performing and visual
          arts, we hope to awaken an enduring love for culture and the freedom
          of artistic expression.
        </Reveal>

        <div className={`${styles.deco} ${styles.moon}`} aria-hidden="true">
          <Crop
            src={`${A}/whatsapp.webp`}
            sizes="(max-width: 760px) 540px, 800px"
            box={{
              height: "164.61%",
              left: "0",
              top: "-48.46%",
              width: "100%",
            }}
          />
        </div>

        <figure className={styles.figure}>
          <div
            className={`${styles.frame} ${styles.frameLeft}`}
            aria-hidden="true"
          />
          <div className={`${styles.portrait} ${styles.portraitLeft}`}>
            <Crop
              src={`${A}/tradition-left.webp`}
              sizes="324px"
              box={{
                height: "123.67%",
                left: "0",
                top: "-1.79%",
                width: "100%",
              }}
            />
          </div>
          <figcaption className={styles.captionBlock}>
            <span className={`${styles.caption} ${styles.captionLeft}`}>
              Rooted in Tradition
            </span>
            <span
              className={`${styles.captionSmall} ${styles.captionSmallLeft}`}
            >
              Bharatanatyam
            </span>
          </figcaption>
        </figure>

        <figure className={styles.figure}>
          <div
            className={`${styles.frame} ${styles.frameRight}`}
            aria-hidden="true"
          />
          <div className={`${styles.portrait} ${styles.portraitRight}`}>
            <Crop src={`${A}/tradition-right.webp`} sizes="318px" cover />
          </div>
          <figcaption className={styles.captionBlock}>
            <span className={`${styles.caption} ${styles.captionRight}`}>
              Inspired by Tomorrow
            </span>
            <span
              className={`${styles.captionSmall} ${styles.captionSmallRight}`}
            >
              Contemporary
            </span>
          </figcaption>
        </figure>

        <Reveal as="p" className={styles.narrativeOne} delay={0.1} y={26}>
          We wish for every young artist who walks through our doors to carry a
          little of this awareness into the world. To understand where their art
          comes from, to discover what it means to them, and to find their own
          place within its continuing story.
        </Reveal>
        <Reveal as="p" className={styles.narrativeTwo} delay={0.14} y={26}>
          For we believe that culture lives in the people who remember it,
          practise it, question it, and pass it on with love. And if, through
          Rtambhara, even one young heart learns to cherish an art that might
          otherwise have faded from their world, a beautiful part of our vision
          has found its meaning…
        </Reveal>

        <div
          className={`${styles.deco} ${styles.sheetNine}`}
          aria-hidden="true"
        >
          <Crop
            src={`${A}/sheet9.webp`}
            sizes="(max-width: 760px) 400px, 760px"
            cover
            className={styles.bottomAligned}
          />
        </div>
        <div className={`${styles.deco} ${styles.handLeft}`} aria-hidden="true">
          <Crop src={`${A}/download3.webp`} sizes="480px" cover />
        </div>
        <span className={`${styles.deco} ${styles.glow}`} aria-hidden="true" />

        <div className={styles.missionTitleWrap}>
          <SplitText
            as="h2"
            className={styles.title}
            delay={0.05}
            lines={[
              { words: ["Our", { text: "Mission", className: styles.accent }] },
            ]}
          />
        </div>

        <Reveal as="p" className={styles.missionOne} delay={0.1} y={26}>
          {missionTop[0]}
        </Reveal>
        <Reveal as="p" className={styles.missionTwo} delay={0.14} y={26}>
          {missionTop[1]}
        </Reveal>

        <Reveal as="p" className={styles.missionBelief} delay={0.1} y={24}>
          To nurture the art,
          <br />
          and the hearts that carry it.
        </Reveal>

        <div className={`${styles.deco} ${styles.lotus}`} aria-hidden="true">
          <Crop
            src={`${A}/lotus-line.webp`}
            sizes="(max-width: 760px) 200px, 380px"
            cover
          />
        </div>
        <div
          className={`${styles.deco} ${styles.handRight}`}
          aria-hidden="true"
        >
          <Crop
            src={`${A}/hand-right.webp`}
            sizes="480px"
            box={{
              height: "100%",
              left: "-39.83%",
              top: "0",
              width: "139.83%",
            }}
          />
        </div>

        <Reveal as="p" className={styles.missionThree} delay={0.1} y={26}>
          {missionBottom[0]}
        </Reveal>
        <Reveal as="p" className={styles.missionFour} delay={0.14} y={26}>
          {missionBottom[1]}
        </Reveal>
      </div>
    </section>
  );
}

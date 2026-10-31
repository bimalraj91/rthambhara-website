import Image from "next/image";
import SectionMarker from "./SectionMarker";
import styles from "./AboutVisionMission.module.scss";

const visionCards = [
  {
    title: "Srishti",
    subtitle: "Creation",
    icon: "/assets/about/lotus-icon.webp",
    variant: "light",
  },
  {
    title: "Sthiti",
    subtitle: "Preservation",
    icon: "/assets/about/lotus-bud-icon.webp",
    variant: "dark",
  },
  {
    title: "Laya",
    subtitle: "Dissolution",
    icon: "/assets/about/lotus-icon.webp",
    variant: "light",
  },
] as const;

export default function AboutVisionMission() {
  return (
    <section
      id="vision-mission"
      className={styles.section}
      aria-labelledby="vision-title"
    >
      <Image
        src="/assets/about/ornament-sheet-9.webp"
        alt=""
        width={1024}
        height={683}
        className={styles.visionMandala}
      />
      <Image
        src="/assets/about/vision-circle.webp"
        alt=""
        width={1024}
        height={1536}
        className={styles.feet}
      />

      <div className={styles.portrait} aria-hidden="true">
        <Image
          src="/assets/about/vision-portrait.webp"
          alt=""
          fill
          sizes="949px"
          className={styles.portraitImage}
        />
      </div>

      <div className={styles.visionCopy}>
        <SectionMarker tone="red" lineWidth={28}>
          02 / Vision &amp; mission
        </SectionMarker>

        <h2 id="vision-title" className={styles.visionTitle}>
          Our <span>Vision</span>
        </h2>

        <div className={styles.visionCards}>
          {visionCards.map((card) => (
            <article
              key={card.title}
              className={`${styles.visionCard} ${styles[card.variant]}`}
            >
              <span className={styles.visionIcon}>
                <Image
                  src={card.icon}
                  alt=""
                  width={86}
                  height={86}
                  className={styles.visionIconImage}
                />
              </span>
              <h3>{card.title}</h3>
              <p>{card.subtitle}</p>
            </article>
          ))}
        </div>

        <div className={styles.visionBody}>
          <p>
            There is a beautiful wisdom in the way the universe moves. In all
            that is born, all that is lovingly preserved, and all that must
            eventually make way for something new.
          </p>
          <p>
            With Bharatanatyam at our heart, we nurture a space where tradition
            is cherished and creativity is given room to flourish. Through
            contemporary dance and the many languages of performing and visual
            arts, we hope to awaken an enduring love for culture and the freedom
            of artistic expression.
          </p>
        </div>
      </div>

      <div className={styles.visionLower}>
        <figure className={styles.photoLeft}>
          <div className={styles.photoFrame}>
            <Image
              src="/assets/about/tradition-bharatanatyam.webp"
              alt="A Bharatanatyam dancer in a red costume holding a classical pose"
              width={1536}
              height={1024}
              className={styles.cropTradition}
            />
          </div>
          <figcaption className={styles.caption}>
            <h3>Rooted in Tradition</h3>
            <p>Bharatanatyam</p>
          </figcaption>
        </figure>

        <div className={styles.visionNarrative}>
          <span className={styles.arrowLeft} aria-hidden="true">
            ‹
          </span>
          <div>
            <p>
              We wish for every young artist who walks through our doors to
              carry a little of this awareness into the world. To understand
              where their art comes from, to discover what it means to them, and
              to find their own place within this continuing story.
            </p>
            <p>
              For we believe that culture lives in the people who remember it,
              practise it, question it, and pass it on with love. And if,
              through Rtambhara, even one young heart learns to cherish an art
              that might otherwise have faded from their world, a beautiful part
              of our vision has found its meaning...
            </p>
          </div>
          <span className={styles.arrowRight} aria-hidden="true">
            ›
          </span>
        </div>

        <figure className={styles.photoRight}>
          <div className={styles.photoFrame}>
            <Image
              src="/assets/about/tradition-contemporary.webp"
              alt="A contemporary dancer moving with a flowing red fabric"
              width={1536}
              height={1024}
              className={styles.cropContemporary}
            />
          </div>
          <figcaption className={styles.caption}>
            <h3>Inspired by Tomorrow</h3>
            <p>Contemporary</p>
          </figcaption>
        </figure>
      </div>

      <div className={styles.mission}>
        <Image
          src="/assets/about/lotus-line.webp"
          alt=""
          width={407}
          height={615}
          className={styles.missionLotusLeft}
        />
        <Image
          src="/assets/about/lotus-line.webp"
          alt=""
          width={407}
          height={615}
          className={styles.missionLotusRight}
        />
        <Image
          src="/assets/about/hand-mudra.webp"
          alt=""
          width={736}
          height={1034}
          className={styles.missionHand}
        />
        <Image
          src="/assets/about/mission-screenshot.webp"
          alt=""
          width={640}
          height={280}
          className={styles.missionHandRight}
        />

        <div className={styles.missionRight}>
          <h2 className={styles.missionTitle}>
            Our <span>Mission</span>
          </h2>
          <div className={styles.missionBody}>
            <p>
              We wish to see the beauty of our traditions find a home in every
              generation. To place the wisdom of centuries into young hands, and
              watch it unfold in ways we may never have imagined.
            </p>
            <p>
              At Rtambhara, we carry this wish into every lesson, every
              rehearsal, and every moment spent with our students. We hope to
              nurture artists who understand the stories behind their movements,
              who find meaning in the smallest gestures, and who come to love
              the discipline and devotion that give an art its depth. We want
              our children to grow with the confidence to express themselves,
              the curiosity to explore, and the sensitivity to appreciate the
              world around them. Through Bharatanatyam and other forms of
              artistic expression, we seek to cultivate patience, awareness,
              creativity, and a lifelong affection for the arts.
            </p>
          </div>
        </div>

        <p className={styles.missionBelief}>
          To nurture the art,
          <br />
          and the hearts that carry it.
        </p>

        <div className={styles.missionBottom}>
          <p>
            We also wish to make movement a cherished part of life at every age.
            A place where children discover their abilities, young artists find
            their voices, and older generations continue to experience the
            pleasure of rhythm, togetherness, and well being.
          </p>
          <p>
            Above all, we hope to preserve the precious relationship between a
            teacher, a student, and an art that has been lovingly entrusted from
            one generation to another. For every student who learns with us, we
            hope there will come a day when the rhythm feels like their own, the
            art feels like home, and all that we have shared continues to live
            through them..
          </p>
        </div>
      </div>
    </section>
  );
}

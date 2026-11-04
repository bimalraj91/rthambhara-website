import Crop from "./about/Crop";
import Drift from "./motion/Drift";
import ImageReveal from "./motion/ImageReveal";
import Reveal from "./motion/Reveal";
import SectionLabel from "./SectionLabel";
import styles from "./ProgramsBharatanatyam.module.scss";

const P = "/assets/programs";

export default function   ProgramsBharatanatyam() {
  return (
    <section
      id="language-of-grace"
      className={styles.section}
      aria-labelledby="bharatanatyam-title"
    >
      <div className={styles.canvas}>
        <div className={`${styles.deco} ${styles.texture}`} aria-hidden="true">
          <Crop src={`${P}/texture-gemini.webp`} sizes="1112px" cover />
        </div>

        <div className={`${styles.deco} ${styles.sheetLeft}`} aria-hidden="true">
          <Drift from={-30} to={30} className={styles.fill}>
            <Crop src={`${P}/sheet-9.webp`} sizes="800px" />
          </Drift>
        </div>

        <div className={`${styles.deco} ${styles.sheetStage}`} aria-hidden="true">
          <div className={styles.sheetTile}>
            <Crop
              src={`${P}/sheet-10.webp`}
              sizes="620px"
              box={{ height: "314.1%", left: "-378.6%", top: "-24.53%", width: "478.6%" }}
            />
          </div>
        </div>

        <div className={styles.portrait}>
          <ImageReveal className={styles.fill} from="bottom">
            <Crop
              src={`${P}/bharatanatyam-portrait.webp`}
              alt="A Bharatanatyam dancer in a deep blue and gold costume, holding a graceful pose"
              sizes="525px"
              cover
            />
          </ImageReveal>
        </div>

        <div className={`${styles.deco} ${styles.swoosh}`} aria-hidden="true">
          <Drift from={-14} to={14} className={styles.fill}>
            <div className={styles.swooshTile}>
              <Crop src={`${P}/swoosh.webp`} sizes="613px" />
            </div>
          </Drift>
        </div>

        <div className={styles.hand}>
          <ImageReveal className={styles.fill} from="left">
            <Crop
              src={`${P}/hand-mudra.webp`}
              alt="A dancer's hands shaped in a classical mudra"
              sizes="408px"
              cover
            />
          </ImageReveal>
        </div>

        <SectionLabel className={styles.cue}>
          01 / THE LANGUAGE OF GRACE
        </SectionLabel>

        <h2 id="bharatanatyam-title" className={styles.srOnly}>
          Bharatanatyam
        </h2>
        <div className={styles.titleArt}>
          <ImageReveal className={styles.fill} from="left">
            <span className={styles.titleInner}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${P}/bharatanatyam-title.svg`} alt="" />
            </span>
          </ImageReveal>
        </div>

        <Reveal as="p" className={styles.intro} delay={0.1} y={26}>
          There is a beautiful language in Bharatanatyam, spoken through the
          eyes, felt through the heart, and carried in the rhythm of every
          movement. A language that has lived for centuries, holding within it
          the poetry of our traditions, the wisdom of our ancestors, and the
          stories that continue to find new meaning with every generation.
        </Reveal>

        <span className={styles.rule} aria-hidden="true" />

        <Reveal as="p" className={styles.quote} delay={0.1} y={24}>
          An ancient art, a lifelong journey of expression.
        </Reveal>

        <div className={styles.body}>
          <Reveal as="p" delay={0.05} y={26}>
            At rtambhara, we teach this art with the depth, discipline, and
            devotion it deserves. Rooted in the Kalakshetra tradition, our
            classes embrace the intricate beauty of adavus, the precision of
            tala, the emotional richness of abhinaya, and the philosophies
            woven into every composition. We encourage our students to
            understand the stories they portray, to recognise the emotions they
            express, and to discover the profound relationship between
            movement, music, and meaning. For our little ones, learning begins
            with the joy of rhythm. Through lively, engaging sessions, we
            nurture coordination, concentration, confidence, and a growing
            affection for the art. As they progress, each lesson gently unfolds
            another layer of its beauty.
          </Reveal>
          <Reveal as="p" delay={0.05} y={26}>
            Our thoughtfully structured classes welcome every stage of
            learning, from curious beginners taking their first steps to
            experienced dancers refining their technique, expression, and
            artistic understanding. Every student is guided at a pace that
            respects their abilities, with the attention and encouragement
            their journey deserves. With the teachings of Smt. Rukmini Devi
            Arundale carried forward through our founder, Smt. Girija
            Ravindranath, we hope to preserve the finest nuances of
            Bharatanatyam while nurturing artists who bring their own
            sensitivity and sincerity to its expression.
          </Reveal>
          <Reveal as="p" delay={0.05} y={26}>
            For us, the beauty of teaching Bharatanatyam lies in watching an
            ancient art find a new life in every student who learns to love it.
          </Reveal>
        </div>
      </div>
    </section>
  );
}

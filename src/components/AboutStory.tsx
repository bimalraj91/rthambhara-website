import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import Crop from "./about/Crop";
import styles from "./AboutStory.module.scss";

const A = "/assets/about/figma";

// The younger-students paragraph breaks where the design breaks it.
const youngerLines = [
  "For our younger students, dance becomes a gentle companion in growing up. Rhythm sharpens their attention, movement nurtures coordination, and every opportunity to perform helps them find confidence in themselves. We take particular joy ",
  "in watching hesitant little feet grow certain of their steps, and in seeing our students take their learning beyond the classroom and onto the stage. Even the space we call home reflects what we hold dear.",
  "Built with a love for traditional architecture and its quiet elegance, Rtambhara offers spacious, ",
  "beautiful surroundings where students can ",
  "learn, practise, and simply enjoy being",
  " part of the arts. As a BSS-certified institution, ",
  "we remain committed to nurturing learning with ",
  "care, discipline, and artistic integrity.",
];

export default function AboutStory() {
  return (
    <section id="who-we-are" className={styles.story} aria-labelledby="story-title">
      <div className={styles.canvas}>
        <div className={`${styles.deco} ${styles.sheet}`} aria-hidden="true">
          <div className={styles.sheetTile}>
            <Crop
              src={`${A}/sheet10.webp`}
              sizes="620px"
              box={{ height: "314.1%", left: "-378.6%", top: "-24.53%", width: "478.6%" }}
            />
          </div>
        </div>

        <div className={`${styles.deco} ${styles.handTop}`} aria-hidden="true">
          <Crop
            src={`${A}/download2.webp`}
            sizes="380px"
            box={{ height: "100%", left: "-30.05%", top: "0", width: "130.09%" }}
          />
        </div>

        <div className={`${styles.deco} ${styles.ghungroo}`} aria-hidden="true">
          <div className={styles.ghungrooTile}>
            <Crop
              src={`${A}/ghungroo.webp`}
              sizes="400px"
              box={{ height: "100%", left: "-14.01%", top: "0", width: "121.71%" }}
            />
          </div>
        </div>

        <div className={`${styles.deco} ${styles.handFlip}`} aria-hidden="true">
          <Crop src={`${A}/download11.webp`} sizes="470px" cover />
        </div>

        <div className={`${styles.deco} ${styles.word}`} aria-hidden="true">
          <div className={styles.wordTile}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/word-vertical.svg`} alt="" />
          </div>
        </div>

        <p className={styles.cue}>01 / WHO WE ARE</p>

        <SplitText
          id="story-title"
          as="h2"
          className={styles.title}
          delay={0.1}
          lines={[
            "More than an art form.",
            { words: ["A way of belonging."], className: styles.accent },
          ]}
        />

        <Reveal as="p" className={styles.copyLeft} delay={0.12} y={26}>
          Some traditions are too beautiful to be left in the past. They deserve
          to be lived, loved, and passed from one generation to the next. At
          Rtambhara, we have spent the last ten years giving that belief a home.
          A home where the sound of anklets is familiar, where every movement
          carries a meaning, and where the wisdom of generations finds its way
          into young, eager hearts.
        </Reveal>

        <Reveal as="p" className={styles.copyRight} delay={0.16} y={26}>
          Our story begins with Smt. Girija Ravindranath, whose life has been
          devoted to the art of Bharatanatyam. For over 23 years, she has
          carried forward the teachings of her guru and mentor, the legendary
          Smt. Rukmini Devi Arundale, founder of Kalakshetra, Chennai. Her
          teaching holds close the discipline, grace, spiritual depth, and
          exquisite nuances of a tradition she has cherished all her life.
        </Reveal>

        <span className={styles.rule} aria-hidden="true" />

        <Reveal as="p" className={styles.belief} delay={0.1} y={24}>
          We learn the art.
          <br />
          We carry its spirit.
        </Reveal>

        <Reveal as="p" className={styles.copyBelieve} delay={0.1} y={26}>
          We believe there is something deeply intimate about learning an art
          that has travelled through centuries. A gesture once taught by a guru
          finds expression in another pair of hands. An ancient story discovers
          a new voice. And somewhere between rhythm, expression, and stillness,
          a student begins to understand something about themselves. This is the
          spirit in which we teach.
        </Reveal>

        <Reveal as="div" className={styles.younger} delay={0.1} y={26}>
          {youngerLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </Reveal>

        <Reveal as="p" className={styles.decade} delay={0.1} y={26}>
          Ten years have passed since Rtambhara first opened its doors. In that
          time, we have watched children grow, friendships form, artists find
          their voices, and countless stories unfold through dance. And perhaps
          that is what we cherish most. That a tradition entrusted to us
          continues to find a place in so many lives. At Rtambhara, we hope that
          long after the music ends, something of the dance remains within you.
        </Reveal>

        <div className={styles.vision}>
          <span className={styles.visionTextile} aria-hidden="true" />
          <span className={styles.visionBleed} aria-hidden="true" />
          <span className={styles.visionEdge} aria-hidden="true" />
          <Reveal as="p" className={styles.visionCopy} delay={0.1} y={26}>
            Rooted in the classical heritage of Bharatanatyam, our learning
            embraces its mythology, philosophy, aesthetics, and the deeper
            consciousness that art can awaken. We want our students to feel the
            stories they tell, understand the emotions they express, and grow
            into artists who carry their learning with sincerity. Alongside this
            cherished tradition, Satyajith Ravindranath brings his own artistic
            sensibility through contemporary dance, allowing another language of
            movement to find its place within Rtambhara. Our doors also welcome
            those discovering dance at different seasons of life. Through
            Thiruvathira and yoga, including thoughtfully guided sessions for
            adults above 50, we celebrate the joy of movement, physical
            well-being, and the beauty of growing older with strength and grace.
          </Reveal>
          <span className={styles.visionRule} aria-hidden="true" />
          <p className={styles.visionQuote}>Culture, carried forward.</p>
        </div>
      </div>
    </section>
  );
}

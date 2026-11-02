import Image from "next/image";
import SectionMarker from "./SectionMarker";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import SplitText from "./motion/SplitText";
import styles from "./AboutStory.module.scss";

export default function AboutStory() {
  return (
    <section id="who-we-are" className={styles.story} aria-labelledby="story-title">
      <Image
        src="/assets/about/ornament-sheet-9.webp"
        alt=""
        width={1024}
        height={683}
        className={styles.topLotus}
      />
      <Image
        src="/assets/about/ornament-sheet-9.webp"
        alt=""
        width={1024}
        height={683}
        className={styles.bottomLotus}
      />
      <Image
        src="/assets/about/ritual-word.svg"
        alt=""
        width={1198}
        height={232}
        unoptimized
        className={styles.sideWord}
      />

      <div className={styles.inner}>
        <div className={styles.intro}>
          <SectionMarker tone="red" lineWidth={28}>
            01 / Who we are
          </SectionMarker>

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

          <Reveal as="p" className={styles.lede} delay={0.16} y={26}>
            Some traditions are too beautiful to be left in the past. They
            deserve to be lived, loved, and passed from one generation to the
            next. At Rtambhara, we have spent the last ten years giving that
            belief a home. A home where the sound of anklets is familiar, where
            every movement carries a meaning, and where the wisdom of
            generations finds its way into young, eager hearts.
          </Reveal>

          <Reveal as="div" className={styles.belief} delay={0.2} y={24}>
            <p>
              We learn the art.
              <br />
              We carry its spirit.
            </p>
          </Reveal>

          <Reveal as="div" className={styles.panel} delay={0.1} y={34}>
            <p className={styles.panelText}>
              Rooted in the classical heritage of Bharatanatyam, our learning
              embraces its mythology, philosophy, aesthetics, and the deeper
              consciousness that art can awaken. We want our students to feel
              the stories they tell, understand the emotions they express, and
              grow into artists who carry their learning with sincerity.
              Alongside this cherished tradition, Satyajith Ravindranath brings
              his own artistic sensibility through contemporary dance, allowing
              another language of movement to find its place within Rtambhara.
              Our doors also welcome those discovering dance at different
              seasons of life. Through Thiruvathira and yoga, including
              thoughtfully guided sessions for adults above 50, we celebrate the
              joy of movement, physical well-being, and the beauty of growing
              older with strength and grace.
            </p>
            <p className={styles.panelQuote}>Culture, carried forward.</p>
          </Reveal>
        </div>

        <StaggerGroup as="div" className={styles.body} stagger={0.09} amount={0.08}>
          <StaggerItem as="p" y={28}>
            Our story begins with Smt. Girija Ravindranath, whose life has been
            devoted to the art of Bharatanatyam. For over 23 years, she has
            carried forward the teachings of her guru and mentor, the legendary
            Smt. Rukmini Devi Arundale, founder of Kalakshetra, Chennai. Her
            teaching holds close the discipline, grace, spiritual depth, and
            exquisite nuances of a tradition she has cherished all her life.
          </StaggerItem>
          <StaggerItem as="p" y={28}>
            We believe there is something deeply intimate about learning an art
            that has travelled through centuries. A gesture once taught by a
            guru finds expression in another pair of hands. An ancient story
            discovers a new voice. And somewhere between rhythm, expression, and
            stillness, a student begins to understand something about
            themselves. This is the spirit in which we teach.
          </StaggerItem>
          <StaggerItem as="p" y={28}>
            For our younger students, dance becomes a gentle companion in
            growing up. Rhythm sharpens their attention, movement nurtures
            coordination, and every opportunity to perform helps them find
            confidence in themselves. We take particular joy in watching
            hesitant little feet grow certain of their steps, and in seeing our
            students take their learning beyond the classroom and onto the
            stage. Even the space we call home reflects what we hold dear. Built
            with a love for traditional architecture and its quiet elegance,
            Rtambhara offers spacious, beautiful surroundings where students can
            learn, practise, and simply enjoy being part of the arts. As a
            BSS-certified institution, we remain committed to nurturing learning
            with care, discipline, and artistic integrity.
          </StaggerItem>
          <StaggerItem as="p" y={28}>
            Ten years have passed since Rtambhara first opened its doors. In
            that time, we have watched children grow, friendships form, artists
            find their voices, and countless stories unfold through dance. And
            perhaps that is what we cherish most. That a tradition entrusted to
            us continues to find a place in so many lives. At Rtambhara, we hope
            that long after the music ends, something of the dance remains
            within you..
          </StaggerItem>
        </StaggerGroup>
      </div>

      <Image
        src="/assets/about/ghungroo.webp"
        alt=""
        width={1024}
        height={1024}
        className={styles.ghungroo}
      />
      <Image
        src="/assets/about/hands-intro.webp"
        alt=""
        width={734}
        height={1102}
        className={styles.hands}
      />
    </section>
  );
}

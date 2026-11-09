import Crop from "./about/Crop";
import Drift from "./motion/Drift";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import SectionLabel from "./SectionLabel";
import styles from "./ProgramsAgeing.module.scss";

const P = "/assets/programs";

const disciplines = [
  {
    title: "Thiruvathira",
    image: `${P}/arch-mohiniyattam.webp`,
    box: { height: "127.76%", left: "-4.14%", top: "-4.73%", width: "127.57%" },
    alt: "Two women in white and gold Kerala sarees practising Thiruvathira",
    copy: "With its gentle swaying movements, graceful expressions and lyrical rhythm, Thiruvathira offers a beautiful way to remain active while embracing Kerala's rich cultural heritage. Our sessions encourage coordination, body awareness and the pleasure of learning an art in the company of others.",
  },
  {
    title: "Yoga",
    image: `${P}/arch-yoga.webp`,
    box: { height: "125.63%", left: "-18.75%", top: "-6.56%", width: "118.75%" },
    alt: "A group of seniors smiling during a yoga session",
    copy: "A little time each day to care for the body that has carried us through so much. Through gentle postures, mindful breathing and relaxation, our yoga sessions support flexibility, balance, mobility and inner calm, helping participants approach the years ahead with greater comfort and confidence.",
  },
];

export default function ProgramsAgeing() {
  return (
    <section
      id="growing-joyfully"
      className={styles.section}
      aria-labelledby="ageing-title"
    >
      <div className={styles.canvas}>
        <div className={`${styles.deco} ${styles.sheetTop}`} aria-hidden="true">
          <Drift from={-30} to={30} className={styles.fill}>
            <Crop src={`${P}/sheet-9.webp`} sizes="800px" />
          </Drift>
        </div>

        <div className={`${styles.deco} ${styles.sheetBottom}`} aria-hidden="true">
          <Drift from={-30} to={30} className={styles.fill}>
            <Crop src={`${P}/sheet-9.webp`} sizes="800px" />
          </Drift>
        </div>

        <div className={`${styles.deco} ${styles.collage}`} aria-hidden="true">
          <Crop src={`${P}/collage-5.webp`} sizes="744px" />
        </div>

        <Reveal as="div" className={styles.dancerStage} x={60} y={0} blur={8} duration={1.3}>
          <div className={styles.dancerTile}>
            <Crop
              src={`${P}/bharatanatyam-dancer.webp`}
              alt="A Bharatanatyam dancer in a cream and gold costume, smiling gently"
              sizes="874px"
              cover
            />
          </div>
        </Reveal>

        <div className={`${styles.deco} ${styles.jewel}`} aria-hidden="true">
          <Drift from={-12} to={12} className={styles.fill}>
            <div className={styles.jewelTile}>
              <Crop
                src={`${P}/ageing-dancer-collage.webp`}
                sizes="800px"
                box={{ height: "660.65%", left: "-211.98%", top: "-560.65%", width: "786.48%" }}
              />
            </div>
          </Drift>
        </div>

        <div className={`${styles.deco} ${styles.ellipse}`} aria-hidden="true">
          <div className={styles.ellipseTile}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${P}/ellipse.svg`} alt="" />
          </div>
        </div>

        <SectionLabel className={styles.cue}>
          03 / GRACEFULLY GROWING, JOYFULLY LIVING
        </SectionLabel>

        <SplitText
          id="ageing-title"
          as="h2"
          className={styles.title}
          lines={[
            "Healthy ageing",
            { words: ["programme"], className: styles.accent },
          ]}
          delay={0.05}
          stagger={0.09}
        />

        <Reveal as="p" className={styles.subtitle} delay={0.15} y={20}>
          For ages 50 and above
        </Reveal>

        <Reveal as="p" className={styles.intro} delay={0.1} y={26}>
          There is a beautiful grace in growing older, in finding new joys,
          nurturing old passions, and giving ourselves the time and care we
          deserve. At Rtambhara, our healthy ageing programme brings together
          Thiruvathira and yoga, encouraging a life enriched by movement,
          companionship and well-being.
        </Reveal>

        <StaggerGroup className={styles.cards} stagger={0.18} amount={0.2}>
          {disciplines.map((discipline) => (
            <StaggerItem
              key={discipline.title}
              as="article"
              className={styles.card}
              y={44}
              blur={6}
              duration={1}
            >
              <div className={styles.archWrap}>
                <div className={styles.arch}>
                  <div className={styles.archImage}>
                    <Crop
                      src={discipline.image}
                      alt={discipline.alt}
                      sizes="448px"
                      box={discipline.box}
                    />
                  </div>
                  <span className={styles.archShade} aria-hidden="true" />
                </div>
              </div>
              <div className={styles.cardBody}>
                <h3>{discipline.title}</h3>
                <p>{discipline.copy}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

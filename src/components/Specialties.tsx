import Image from "next/image";
import PillButton from "./PillButton";
import SectionLabel from "./SectionLabel";
import Drift from "./motion/Drift";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import { programs } from "@/data/home";
import styles from "./Specialties.module.scss";

export default function Specialties() {
  return (
    <section
      id="programs"
      className={styles.offerings}
      aria-labelledby="offerings-title"
    >
      <Image
        src="/assets/home/offerings-background.png"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className={styles.background}
      />

      <div className={styles.inner}>
        <SectionLabel tone="maroon" lineWidth={28} className={styles.label}>
          03 / Our offerings
        </SectionLabel>

        <SplitText
          id="offerings-title"
          as="h2"
          className={styles.title}
          delay={0.08}
          stagger={0.05}
          lines={[
            { words: ["The", "many", "ways", "a", "body"], className: styles.titleDark },
            { words: ["remembers", "joy."], className: styles.titleMaroon },
          ]}
        />

        <Reveal className={styles.description} delay={0.18}>
          <p>
            There is a certain happiness in finding a movement that feels like
            your own. In the discipline of practice, the warmth of dancing
            together, and the quiet pleasure of discovering what your body can
            do. At rtambhara, we cherish each of these experiences.
          </p>
        </Reveal>

        <Reveal className={styles.exploreWrap} delay={0.24}>
          <PillButton href="/programs">Explore</PillButton>
        </Reveal>

        <div className={styles.cards}>
          {programs.map((program, index) => (
            <Reveal
              key={program.title}
              className={styles.card}
              delay={0.08 + index * 0.08}
            >
              <div className={styles.cardMedia}>
                <Image
                  src={program.image}
                  alt={program.alt}
                  fill
                  sizes="(max-width: 760px) 82vw, (max-width: 1280px) 40vw, 307px"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardPanel}>
                <p className={styles.cardTitle}>{program.title}</p>
                <p className={styles.cardCopy}>{program.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Drift className={styles.watermark} from={50} to={-50}>
          <Image
          src="/assets/home/watermark-rtambhara.svg"
          alt=""
          width={1165}
          height={261}
          className={styles.fill}
        />
        </Drift>
      </div>
    </section>
  );
}

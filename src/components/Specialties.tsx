import Image from "next/image";
import { programs } from "@/data/home";
import SectionMarker from "./SectionMarker";
import Parallax from "./motion/Parallax";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import SplitText from "./motion/SplitText";
import styles from "./Specialties.module.scss";

export default function Specialties() {
  return (
    <section id="programs" className={styles.specialties} aria-labelledby="programs-title">
      <Parallax className={styles.faint} strength={45}>
        <Image
          src="/assets/images/specialties-faint-background.webp"
          alt=""
          fill
          sizes="414px"
          className={styles.faintImage}
        />
      </Parallax>

      <div className={styles.header}>
        <SectionMarker tone="slate" lineWidth={24} centered>
          04 / Our Specialties
        </SectionMarker>
        <SplitText
          id="programs-title"
          as="h2"
          lines={["Find Your Rhythm"]}
          delay={0.1}
        />
        <Reveal className={styles.subtitle} delay={0.2} y={24}>
          <p>Ongoing Programs</p>
          <p>Dance/Movement Classes - Community as well as Professional Training</p>
        </Reveal>
      </div>

      <StaggerGroup className={styles.cards} stagger={0.14} amount={0.15}>
        {programs.map((program, index) => (
          <StaggerItem
            key={program.title}
            as="article"
            className={`${styles.card} ${index === 0 ? styles.featured : ""}`}
            y={48}
            scale={0.97}
          >
            <Image
              src={program.image}
              alt={program.alt}
              fill
              sizes={
                index === 0
                  ? "(max-width: 1000px) 100vw, 598px"
                  : "(max-width: 1000px) 100vw, 307px"
              }
              className={styles.cardImage}
              style={{ objectPosition: program.imagePosition }}
            />
            <div className={styles.cardShade} aria-hidden="true" />
            <div className={styles.cardContent}>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

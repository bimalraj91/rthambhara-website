import Image from "next/image";
import type { CSSProperties } from "react";
import { programs } from "@/data/home";
import SectionMarker from "./SectionMarker";
import styles from "./Specialties.module.scss";

export default function Specialties() {
  return (
    <section id="programs" className={styles.specialties} aria-labelledby="programs-title">
      <div className={styles.faint} aria-hidden="true">
        <Image
          src="/assets/images/specialties-faint-background.webp"
          alt=""
          fill
          sizes="414px"
          className={styles.faintImage}
        />
      </div>

      <div className={styles.header}>
        <SectionMarker tone="slate" lineWidth={24} centered>
          04 / Our Specialties
        </SectionMarker>
        <h2 id="programs-title" data-reveal>
          Find Your Rhythm
        </h2>
        <div className={styles.subtitle}>
          <p>Ongoing Programs</p>
          <p>Dance/Movement Classes - Community as well as Professional Training</p>
        </div>
      </div>

      <div className={styles.cards}>
        {programs.map((program, index) => (
          <article
            key={program.title}
            className={`${styles.card} ${index === 0 ? styles.featured : ""}`}
            data-reveal
            style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
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
          </article>
        ))}
      </div>
    </section>
  );
}

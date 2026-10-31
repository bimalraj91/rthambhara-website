import Image from "next/image";
import SectionMarker from "./SectionMarker";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <Image
        src="/assets/images/hero-rhythm-of-creation.webp"
        alt="A Bharatanatyam dancer in a red-toned fresco setting, framed by a peacock and temple arches"
        fill
        priority
        sizes="100vw"
        className={styles.background}
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.frame}>
        <SectionMarker
          tone="light"
          lineWidth={24}
          className={styles.marker}
        >
          Tripunithura · Established 2012
        </SectionMarker>

        <h1 id="hero-title" className={styles.title} data-reveal>
          <span>Celebrating Tradition</span>
          <span>Inspiring Generations.</span>
        </h1>

        <div className={styles.aside}>
          <p>Ritambhara</p>
          <p>Academy for Performing &amp; Visual Arts</p>
        </div>

        <div className={styles.controls}>
          <p className={styles.counter} aria-label="Slide 1 of 4">
            <strong>01</strong>
            <span className={styles.counterLine} aria-hidden="true" />
            <span>04</span>
          </p>

          <div className={styles.arrows} role="group" aria-label="Hero slides">
            <button type="button" disabled aria-label="Previous slide">
              <Image
                src="/assets/icons/slider-prev-light.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
            <button type="button" disabled aria-label="Next slide">
              <Image
                src="/assets/icons/slider-next-light.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
          </div>

          <p className={styles.srOnly}>
            Slide navigation is unavailable because only one hero slide was
            supplied in the design.
          </p>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import SectionMarker from "./SectionMarker";
import styles from "./Community.module.scss";

function GalleryTile({ index }: { index: number }) {
  return (
    <div className={styles.tile}>
      <Image
        src="/assets/images/abhinaya-study.webp"
        alt={`Bharatanatyam abhinaya study ${index + 1}`}
        fill
        sizes="(max-width: 760px) 45vw, 234px"
        className={styles.tileImage}
      />
    </div>
  );
}

export default function Community() {
  return (
    <section
      className={styles.community}
      aria-labelledby="community-title"
    >
      <div className={styles.intro}>
        <div className={styles.heading}>
          <SectionMarker tone="slate" lineWidth={24}>
            07 / Performances &amp; Community
          </SectionMarker>
          <h2 id="community-title" data-reveal>
            From practice
            <br />
            to shared experience.
          </h2>
        </div>

        <div className={styles.invitation}>
          <p>
            The stage extends the classroom. Performances, artistic
            collaborations and mentorship give students space to grow — and
            bring our community together.
          </p>
          <a href="#gallery" className={styles.viewMore}>
            View more
            <Image
              src="/assets/icons/arrow-right-circle.svg"
              alt=""
              width={14}
              height={14}
            />
          </a>
        </div>
      </div>

      <div className={styles.stage}>
        <div id="gallery" className={styles.collage} aria-label="Performance gallery">
          <div className={styles.column}>
            <GalleryTile index={0} />
            <GalleryTile index={1} />
            <GalleryTile index={2} />
          </div>

          <div className={`${styles.column} ${styles.offsetMiddle}`}>
            <GalleryTile index={3} />
            <GalleryTile index={4} />
            <GalleryTile index={5} />
          </div>

          <div className={`${styles.column} ${styles.offsetRight}`}>
            <GalleryTile index={6} />
            <GalleryTile index={7} />
          </div>
        </div>

        <div className={styles.hand} aria-hidden="true">
          <div className={styles.handInner}>
            <Image
              src="/assets/images/eternal-mudra-hand.webp"
              alt=""
              fill
              sizes="447px"
              className={styles.handImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

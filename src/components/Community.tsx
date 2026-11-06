import Image from "next/image";
import Link from "next/link";
import SectionMarker from "./SectionMarker";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import SplitText from "./motion/SplitText";
import styles from "./Community.module.scss";

function GalleryTile({ index }: { index: number }) {
  return (
    <StaggerItem
      as="div"
      className={styles.tile}
      y={28}
      scale={0.96}
      blur={6}
    >
      <Image
        src="/assets/images/abhinaya-study.webp"
        alt={`Bharatanatyam abhinaya study ${index + 1}`}
        fill
        sizes="(max-width: 760px) 45vw, 234px"
        className={styles.tileImage}
      />
    </StaggerItem>
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
          <SplitText
            id="community-title"
            as="h2"
            lines={["From practice", "to shared experience."]}
            delay={0.1}
          />
        </div>

        <Reveal className={styles.invitation} delay={0.2} y={30}>
          <p>
            The stage extends the classroom. Performances, artistic
            collaborations and mentorship give students space to grow — and
            bring our community together.
          </p>
          <Link href="/gallery" className={styles.viewMore}>
            View more
            <Image
              src="/assets/icons/arrow-right-circle.svg"
              alt=""
              width={14}
              height={14}
            />
          </Link>
        </Reveal>
      </div>

      <div className={styles.stage}>
        <div id="gallery" className={styles.collage} aria-label="Performance gallery">
          <StaggerGroup as="div" className={styles.column} stagger={0.07} amount={0.1}>
            <GalleryTile index={0} />
            <GalleryTile index={1} />
            <GalleryTile index={2} />
          </StaggerGroup>

          <StaggerGroup
            as="div"
            className={`${styles.column} ${styles.offsetMiddle}`}
            stagger={0.07}
            amount={0.1}
            delay={0.08}
          >
            <GalleryTile index={3} />
            <GalleryTile index={4} />
            <GalleryTile index={5} />
          </StaggerGroup>

          <StaggerGroup
            as="div"
            className={`${styles.column} ${styles.offsetRight}`}
            stagger={0.07}
            amount={0.1}
            delay={0.16}
          >
            <GalleryTile index={6} />
            <GalleryTile index={7} />
          </StaggerGroup>
        </div>

        <Reveal as="div" className={styles.hand} delay={0.1} y={60} blur={4}>
          <div className={styles.handInner}>
            <Image
              src="/assets/images/eternal-mudra-hand.webp"
              alt=""
              fill
              sizes="447px"
              className={styles.handImage}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

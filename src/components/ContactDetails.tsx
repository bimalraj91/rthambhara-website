import Crop from "./about/Crop";
import Reveal from "./motion/Reveal";
import ImageReveal from "./motion/ImageReveal";
import FontPreload from "./FontPreload";
import styles from "./ContactDetails.module.scss";

const DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=9.956475%2C76.338272";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.7291890600395!2d76.33827244594984!3d9.956474964818337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0873c12b0f0929%3A0xd460479ac9136784!2sRtambhara%20Academy!5e0!3m2!1sen!2sin!4v1793961740335!5m2!1sen!2sin";

/** The "Visit our studio" part of the contact page: where to find the studio,
 *  with a map and a picture of the building. The contact details and the
 *  invitation above it come from <ContactUs />. */
export default function ContactDetails() {
  return (
    <section className={styles.section} aria-labelledby="contact-visit-title">
      <FontPreload fonts={["cinzel"]} />
      <div className={styles.canvas}>
        <div className={`${styles.deco} ${styles.sheet}`} aria-hidden="true">
          <div className={styles.sheetTile}>
            <Crop
              src="/assets/about/figma/sheet10.webp"
              sizes="(max-width: 760px) 360px, 620px"
              box={{
                height: "314.1%",
                left: "-378.6%",
                top: "-24.53%",
                width: "478.6%",
              }}
            />
          </div>
        </div>

        <div className={`${styles.deco} ${styles.emblem}`} aria-hidden="true">
          <Crop
            src="/assets/gurus/logo.webp"
            sizes="505px"
            box={{ height: "127.73%", left: "0", top: "-0.02%", width: "100%" }}
          />
        </div>

        <div className={styles.visit}>
          <Reveal
            as="h2"
            id="contact-visit-title"
            className={styles.visitTitle}
            y={26}
          >
            Visit our studio
          </Reveal>
          <Reveal as="p" className={styles.visitText} y={20} delay={0.08}>
            Visit the art, meet our teachers, and be a part of our vibrant
            community at our Tripunithura studio.
          </Reveal>
          <a
            href={DIRECTIONS}
            className={styles.directions}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Get directions</span>
            <span className={styles.directionsArrow} aria-hidden="true" />
          </a>
        </div>

        <ImageReveal className={`${styles.frame} ${styles.map}`} from="left">
          <div className={styles.frameInner}>
            <iframe
              title="Map showing Rtambhara Academy in Tripunithura"
              src={MAP_EMBED}
              className={styles.mapEmbed}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </ImageReveal>

        <ImageReveal
          className={`${styles.frame} ${styles.photo}`}
          from="right"
          delay={0.1}
        >
          <div className={styles.frameInner}>
            <Crop
              src="/assets/contact/studio.webp"
              alt="The traditional tiled-roof studio building in Tripunithura"
              sizes="360px"
              box={{
                height: "100%",
                left: "-56.26%",
                top: "-0.1%",
                width: "156.28%",
              }}
            />
          </div>
        </ImageReveal>
      </div>
    </section>
  );
}

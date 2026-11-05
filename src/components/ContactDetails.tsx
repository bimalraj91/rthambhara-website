import Image from "next/image";
import Crop from "./about/Crop";
import ContactForm from "./ContactForm";
import Reveal from "./motion/Reveal";
import ImageReveal from "./motion/ImageReveal";
import SplitText from "./motion/SplitText";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import styles from "./ContactDetails.module.scss";

const socials = [
  {
    label: "Facebook",
    icon: "/assets/contact/social-facebook.svg",
    href: "https://www.facebook.com/",
  },
  {
    label: "Instagram",
    icon: "/assets/contact/social-instagram.svg",
    href: "https://www.instagram.com/",
  },
  {
    label: "YouTube",
    icon: "/assets/contact/social-youtube.svg",
    href: "https://www.youtube.com/",
  },
];

const DIRECTIONS =
  "https://www.google.com/maps/search/?api=1&query=Mahalakshmi%2C+Thevarakkavu+Road%2C+Tripunithura";

export default function ContactDetails() {
  return (
    <section className={styles.section} aria-labelledby="contact-page-title">
      <div className={styles.canvas}>
        <div className={`${styles.deco} ${styles.sheet}`} aria-hidden="true">
          <div className={styles.sheetTile}>
            <Crop
              src="/assets/about/figma/sheet10.webp"
              sizes="620px"
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

        <Reveal className={styles.nataraja} delay={0.05}>
          <Image
            src="/assets/contact/nataraja.webp"
            alt="A bronze Nataraja figure resting on a pair of ghungroo"
            width={379}
            height={505}
            sizes="(max-width: 900px) 60vw, 379px"
            className={styles.natarajaImage}
          />
        </Reveal>

        <div className={styles.panel}>
          <p className={styles.eyebrow}>08 / Let&apos;s begin a conversation</p>

          <SplitText
            id="contact-page-title"
            as="h2"
            className={styles.title}
            delay={0.1}
            stagger={0.06}
            lines={[
              { words: ["Your", "art", "is"] },
              { words: ["waiting", "for", "you."] },
            ]}
          />

          <ContactForm />
        </div>

        <Reveal className={styles.direct} delay={0.12}>
          <a href="tel:+919961260009" className={styles.phone}>
            +91 99612 60009
          </a>
          <a href="mailto:mail@rtambhara.com" className={styles.email}>
            mail@rtambhara.com
          </a>
        </Reveal>

        <Reveal className={styles.address} delay={0.16}>
          <p className={styles.addressLabel}>Find us in Tripunithura</p>
          <p>
            TRRA 66, Mahalakshmi, Thevarakkavu Road,
            <br />
            Tripunithura, Kerala
          </p>
          <p>
            Regular Bharatanatyam classes for young students:
            <br />
            Ladies Club Hall, Tripunithura.
          </p>
        </Reveal>

        <div className={styles.follow}>
          <Reveal as="h3" className={styles.followTitle} y={20}>
            Follow our journey
          </Reveal>
          <StaggerGroup as="ul" className={styles.socials} stagger={0.1}>
            {socials.map((social) => (
              <StaggerItem key={social.label} as="li" y={16} blur={4}>
                <a
                  href={social.href}
                  className={styles.social}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={48}
                    height={48}
                    unoptimized
                  />
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <div className={styles.visit}>
          <Reveal as="h3" className={styles.visitTitle} y={26}>
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
            <Crop
              src="/assets/contact/map.webp"
              alt="Map showing the studio location in Tripunithura"
              sizes="360px"
              box={{
                height: "118.69%",
                left: "-51.49%",
                top: "-14.09%",
                width: "155.5%",
              }}
            />
          </div>
        </ImageReveal>
        <span className={styles.pin} aria-hidden="true">
          <Image
            src="/assets/contact/pin.svg"
            alt=""
            width={28}
            height={34}
            unoptimized
          />
        </span>

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

        <Reveal as="p" className={styles.note} y={22} delay={0.1}>
          For trial classes, admissions or a little guidance, leave us a note.
          We&apos;d love to hear from you.
        </Reveal>
      </div>
    </section>
  );
}

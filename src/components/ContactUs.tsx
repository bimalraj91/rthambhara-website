import Image from "next/image";
import { contact, socialLinks } from "@/lib/site";
import FontPreload from "./FontPreload";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import styles from "./ContactUs.module.scss";

const socials = [
  {
    label: "Facebook",
    icon: "/assets/contact/social-facebook.svg",
    href: socialLinks.facebook,
  },
  {
    label: "Instagram",
    icon: "/assets/contact/social-instagram.svg",
    href: socialLinks.instagram,
  },
  {
    label: "YouTube",
    icon: "/assets/contact/social-youtube.svg",
    href: socialLinks.youtube,
  },
];

const { streetAddress, addressLocality, addressRegion } = contact.address;

/** The "Contact us" section, from the Figma frame `contact-section`: an ivory
 *  stage with temple bells, mandalas and a drape of red silk, the Nataraja at
 *  the top right, the contact details on the left and the invitation on the
 *  right. It is shared by the home page and the contact page.
 *
 *  On wide screens the text keeps the design's own measurements (scaled down
 *  a little on laptops) and the picture grows with the page. Below 1280px it
 *  stacks: the picture becomes a banner and the details follow beneath it. */
export default function ContactUs() {
  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-us-title"
    >
      <FontPreload fonts={["cinzel", "playfair"]} />

      <div className={styles.frame}>
        {/* The picture and the Nataraja are placed in percentages of the same
            width, so the Nataraja always stays on the stone pillar. */}
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.bg}>
            <Image
              src="/assets/contact/contact-us-bg.webp"
              alt=""
              fill
              sizes="100vw"
              className={styles.cover}
            />
          </div>

          <Reveal className={styles.nataraja} delay={0.05}>
            <Image
              src="/assets/contact/nataraja.webp"
              alt=""
              fill
              sizes="(max-width: 1280px) 30vw, 21vw"
              className={styles.cover}
            />
          </Reveal>
        </div>

        <div className={styles.canvas}>
          <p className={styles.eyebrow}>08 / Let&rsquo;s begin a conversation</p>

          <SplitText
            id="contact-us-title"
            as="h2"
            className={styles.title}
            lineClassName={styles.titleLine}
            delay={0.1}
            stagger={0.06}
            lines={[
              { words: ["Your", "art", "is"] },
              { words: ["waiting", "for", "you."] },
            ]}
          />

          <Reveal as="p" className={styles.note} y={22} delay={0.1}>
            For trial classes, admissions or a little guidance, leave us a note.
            We&rsquo;d love to hear from you.
          </Reveal>

          <Reveal className={styles.direct} delay={0.12}>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className={styles.phone}
            >
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className={styles.email}>
              {contact.email}
            </a>
          </Reveal>

          <Reveal className={styles.address} delay={0.16}>
            <p className={styles.addressLabel}>Find us in Tripunithura</p>
            {/* Each line is its own block on wide screens, as in the design,
                and runs on as normal text on narrow ones. */}
            <p className={styles.addressLines}>
              <span className={styles.line}>{streetAddress},</span>{" "}
              <span className={styles.line}>
                {addressLocality}, {addressRegion}
              </span>
            </p>
            <p className={styles.classes}>
              <span className={styles.line}>
                Regular Bharatanatyam classes for young students:
              </span>{" "}
              <span className={styles.line}>Ladies Club Hall, Tripunithura.</span>
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
        </div>
      </div>
    </section>
  );
}

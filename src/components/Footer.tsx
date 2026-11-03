"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Reveal from "./motion/Reveal";
import styles from "./Footer.module.scss";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Academy", href: "/about-us" },
  { label: "Training Programs", href: "/#programs" },
  { label: "News & Events", href: "/#news" },
  { label: "Photo Gallery", href: "/#gallery" },
];

const disciplines = [
  { label: "Bharatanatyam Masterclasses", href: "/#programs" },
  { label: "Contemporary Kalaripayattu", href: "/#programs" },
  { label: "Yoga Sadhana", href: "/#programs" },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "/#contact" },
  { label: "Terms of Heritage", href: "/#contact" },
  { label: "Join Community", href: "/#contact" },
];

const socials = [
  { label: "Facebook", icon: "/assets/icons/social-facebook.svg" },
  { label: "Instagram", icon: "/assets/icons/social-instagram.svg" },
  { label: "YouTube", icon: "/assets/icons/social-youtube.svg" },
];

export default function Footer() {
  // The About page uses a darker footer without the gold ornament strip.
  const isAbout = usePathname().startsWith("/about-us");

  return (
    <footer className={`${styles.footer} ${isAbout ? styles.about : ""}`}>
      <div className={styles.frame}>
        {!isAbout && (
          <div className={styles.ornaments} aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <Image
                key={n}
                src={`/assets/home/footer-ornament-${n}.png`}
                alt=""
                width={502}
                height={253}
                className={styles.ornament}
                style={{ width: "auto" }}
              />
            ))}
          </div>
        )}

        <div className={styles.motif} aria-hidden="true">
          <Image
            src="/assets/home/footer-lineart.png"
            alt=""
            fill
            sizes="552px"
            className={styles.motifImage}
          />
        </div>

        <div className={styles.inner}>
          <Reveal as="div" className={styles.columnsBox} delay={0.05} y={36}>
            <div className={styles.columns}>
              <div className={styles.brandCol}>
                <div className={styles.brand}>
                  <span className={styles.emblem}>
                    <Image
                      src="/assets/home/emblem.png"
                      alt=""
                      width={50}
                      height={50}
                      className={styles.emblemImage}
                    />
                  </span>
                  <span className={styles.wordmark}>
                    <span className={styles.name}>rtambhara</span>
                    <span className={styles.tagline}>Academy of Arts</span>
                  </span>
                </div>
                <p className={styles.brandDesc}>
                  Preserving classical Indian dance, ancient martial arts of
                  Kalaripayattu, and contemporary visual arts since 2012.
                </p>
                <div className={styles.socials} aria-hidden="true">
                  {socials.map((social) => (
                    <Image
                      key={social.label}
                      src={social.icon}
                      alt=""
                      width={33}
                      height={33}
                      unoptimized
                      className={styles.socialIcon}
                    />
                  ))}
                </div>
              </div>

              <nav className={styles.linkCol} aria-label="Footer quick links">
                <h3 className={styles.heading}>Quick Links</h3>
                <ul className={styles.linkList}>
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav className={styles.linkCol} aria-label="Footer disciplines">
                <h3 className={styles.heading}>Disciplines</h3>
                <ul className={styles.linkList}>
                  {disciplines.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className={styles.locationCol}>
                <h3 className={styles.heading}>Studio Location</h3>
                <p className={styles.address}>
                  TRRA 66, Mahalakshmi, Thevarakkavu Road, Tripunithura
                </p>
                <div className={styles.contacts}>
                  <a href="mailto:mail@rtambhara.com">Email: mail@rtambhara.com</a>
                  <a href="tel:+919961260009">Phone: +91 99612 60009</a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal as="div" className={styles.bottom} delay={0.14} y={20}>
            <p className={styles.copyright}>
              © 2026 rtambhara Academy for Performing & Visual Arts. All
              rights reserved.
            </p>
            <div className={styles.bottomLinks}>
              {bottomLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}

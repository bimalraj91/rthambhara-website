"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/data/home";
import { contact, socialIcons } from "@/lib/site";
import styles from "./Header.module.scss";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const activeHref = pathname.startsWith("/about-us")
    ? "/about-us"
    : pathname.startsWith("/programs")
      ? "/programs"
      : pathname.startsWith("/gurus")
        ? "/gurus"
        : pathname.startsWith("/contact-us")
          ? "/contact-us"
          : pathname.startsWith("/news-events")
            ? "/news-events"
            : pathname.startsWith("/blogs")
              ? "/blogs"
              : pathname.startsWith("/gallery")
                ? "/gallery"
                : pathname === "/"
                  ? "/"
                  : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }

    if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label="rtambhara Performing & Visual Arts, home">
            <Image
              src="/assets/home/rtambhara-logo.svg"
              alt=""
              width={205}
              height={70}
              priority
              unoptimized
              className={`${styles.logo} ${styles.logoLight}`}
            />
            <Image
              src="/assets/home/rtambhara-black.svg"
              alt=""
              width={203}
              height={70}
              unoptimized
              aria-hidden="true"
              className={`${styles.logo} ${styles.logoDark}`}
            />
          </Link>

          <nav className={styles.nav} aria-label="Primary navigation">
            {navLinks.map((link) => {
              const isActive = link.href === activeHref;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={isActive ? styles.active : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        className={styles.dialog}
        onClose={() => setOpen(false)}
        aria-label="Mobile navigation"
      >
        <div className={styles.dialogTop}>
          <span className={styles.dialogBrand}>Rtambhara</span>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <span />
            <span />
          </button>
        </div>

        <nav className={styles.mobileNav} aria-label="Mobile primary navigation">
          {navLinks.map((link, index) => {
            const isActive = link.href === activeHref;

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={isActive ? styles.mobileActive : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={styles.mobileIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.dialogFoot}>
          <section className={styles.footItem} aria-label="Studio address">
            <h2 className={styles.footLabel}>Visit us</h2>
            <p className={styles.footAddress}>
              {contact.address.streetAddress}, {contact.address.addressLocality}
            </p>
          </section>

          <section className={styles.footItem} aria-label="Contact details">
            <h2 className={styles.footLabel}>Get in touch</h2>
            <a href="tel:+919961260009">+91 99612 60009</a>
            <a href="mailto:mail@rtambhara.com">mail@rtambhara.com</a>
          </section>

          <section
            className={`${styles.footItem} ${styles.footRow}`}
            aria-label="Registration"
          >
            <h2 className={styles.footLabel}>Reg No</h2>
            <p className={styles.footAddress}>{contact.regNo}</p>
          </section>

          <section
            className={`${styles.footItem} ${styles.footRow}`}
            aria-label="Social media"
          >
            <h2 className={styles.footLabel}>Follow us</h2>
            <ul className={styles.dialogSocials}>
              {socialIcons.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className={styles.dialogSocial}
                    style={{ ["--icon" as string]: `url(${social.icon})` }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Rtambhara on ${social.label}`}
                  >
                    <i aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </dialog>
    </>
  );
}

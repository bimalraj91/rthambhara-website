"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/data/home";
import styles from "./Header.module.scss";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const activeHref = pathname.startsWith("/about-us")
    ? "/about-us"
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
          <Link href="/" className={styles.brand} aria-label="Rtambhara Academy home">
            <span className={styles.emblem} aria-hidden="true">
              <Image
                src="/assets/brand/rtambhara-emblem.png"
                alt=""
                width={44}
                height={44}
                priority
                sizes="44px"
                className={styles.emblemImage}
              />
              <span className={styles.emblemMark}>R</span>
            </span>
            <span className={styles.wordmark}>
              <span className={styles.name}>Rtambhara</span>
              <span className={styles.tagline}>Performing &amp; Visual Arts</span>
            </span>
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
          <a href="tel:+919961260009">+91 99612 60009</a>
          <a href="mailto:mail@rtambhara.com">mail@rtambhara.com</a>
          <p>Sree Poornathrayeesa Temple Road, Tripunithura</p>
        </div>
      </dialog>
    </>
  );
}

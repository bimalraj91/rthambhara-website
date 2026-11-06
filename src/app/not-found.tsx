import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.scss";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className={styles.page}>
      <p className={styles.code}>404</p>
      <h1>This page has danced away.</h1>
      <p className={styles.copy}>
        The link may be old or mistyped. Try one of these instead.
      </p>
      <ul className={styles.links}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/programs">Programs</Link>
        </li>
        <li>
          <Link href="/news-events">News &amp; Events</Link>
        </li>
        <li>
          <Link href="/blogs">Blogs</Link>
        </li>
        <li>
          <Link href="/contact-us">Contact us</Link>
        </li>
      </ul>
    </main>
  );
}

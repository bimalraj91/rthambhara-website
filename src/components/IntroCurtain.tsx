"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import RtambharaWord from "./RtambharaWord";
import styles from "./IntroCurtain.module.scss";

// Plays once per visit, on the home page only. Mounted in the root layout so
// it sits above the fixed header (the page template creates its own stacking
// context).
let played = false;

// A stage curtain: the brand appears under a spotlight on the closed drapes,
// then the two halves part to reveal the page. Pure CSS, no client JS.
export default function IntroCurtain() {
  const onHome = usePathname() === "/";
  const [done, setDone] = useState(false);

  if (!onHome || done || played) return null;

  return (
    <div
      className={styles.curtain}
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.animationName.includes("stageClear")) {
          played = true;
          setDone(true);
        }
      }}
    >
      <div className={`${styles.panel} ${styles.left}`}>
        <span className={styles.trim} />
      </div>
      <div className={`${styles.panel} ${styles.right}`}>
        <span className={styles.trim} />
      </div>

      <div className={styles.valance}>
        <span className={styles.fringe} />
      </div>
      <div className={styles.spotlight} />

      <div className={styles.brand}>
        <span className={styles.ring}>
          <Image
            src="/assets/home/emblem.png"
            alt=""
            width={72}
            height={72}
            priority
            className={styles.emblem}
          />
        </span>
        <span className={styles.name}>
          <RtambharaWord />
        </span>
        <span className={styles.rule} />
        <span className={styles.tagline}>Performing &amp; Visual Arts</span>
      </div>
    </div>
  );
}

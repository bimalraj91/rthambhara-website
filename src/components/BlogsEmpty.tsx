"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { useInView } from "framer-motion";
import PillButton from "./PillButton";
import SectionLabel from "./SectionLabel";
import Reveal from "./motion/Reveal";
import SplitText from "./motion/SplitText";
import styles from "./BlogsEmpty.module.scss";

// Petals that drift up from the water. `x` is the horizontal start (% of the
// illustration), `sway` how far it wanders sideways, the rest set the timing.
const drifting = [
  { x: "14%", sway: "-26px", delay: "0s", dur: "9s", size: "11px" },
  { x: "26%", sway: "22px", delay: "2.2s", dur: "11s", size: "8px" },
  { x: "38%", sway: "-14px", delay: "5.1s", dur: "10s", size: "13px" },
  { x: "52%", sway: "30px", delay: "1.1s", dur: "12s", size: "9px" },
  { x: "64%", sway: "-24px", delay: "6.4s", dur: "9.5s", size: "12px" },
  { x: "76%", sway: "18px", delay: "3.3s", dur: "11.5s", size: "8px" },
  { x: "86%", sway: "-30px", delay: "7.7s", dur: "10.5s", size: "10px" },
];

// The lotus is drawn petal by petal, from the centre outwards. `d` is each
// petal's delay in seconds.
const petals = [
  { id: "centre", d: 0.1, path: "M160 36 C186 78 186 132 160 170 C134 132 134 78 160 36 Z" },
  { id: "innerRight", d: 0.45, path: "M160 170 C196 156 232 118 238 70 C202 84 168 122 160 170 Z" },
  { id: "innerLeft", d: 0.45, path: "M160 170 C124 156 88 118 82 70 C118 84 152 122 160 170 Z" },
  { id: "outerRight", d: 0.8, path: "M160 170 C206 170 260 148 288 104 C246 102 188 126 160 170 Z" },
  { id: "outerLeft", d: 0.8, path: "M160 170 C114 170 60 148 32 104 C74 102 132 126 160 170 Z" },
];

/** What the Blogs page shows while there are no published posts: a lotus that
 *  draws itself and opens, ripples spreading beneath it, petals drifting up,
 *  and a short, warm note. The motion starts when it scrolls into view. */
export default function BlogsEmpty() {
  const ref = useRef<HTMLDivElement>(null);
  const live = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={styles.section} aria-labelledby="blogs-empty-title">
      <div className={`${styles.wash} ${styles.washLeft}`} aria-hidden="true">
        <Image
          src="/assets/news/sheet.webp"
          alt=""
          fill
          sizes="(max-width: 760px) 360px, 800px"
        />
      </div>
      <div className={`${styles.wash} ${styles.washRight}`} aria-hidden="true">
        <Image
          src="/assets/news/sheet.webp"
          alt=""
          fill
          sizes="(max-width: 760px) 360px, 800px"
        />
      </div>
      <div className={styles.emblem} aria-hidden="true">
        <Image
          src="/assets/gurus/logo.webp"
          alt=""
          width={325}
          height={291}
          sizes="505px"
        />
      </div>

      <div
        ref={ref}
        className={`${styles.shell} ${live ? styles.live : ""}`.trim()}
      >
        <div className={styles.art} aria-hidden="true">
          <span className={styles.glow} />

          <svg
            className={styles.lotus}
            viewBox="0 0 320 230"
            focusable="false"
          >
            <defs>
              <linearGradient id="blogs-empty-petal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#c99a3b" stopOpacity="0.34" />
                <stop offset="1" stopColor="#681722" stopOpacity="0.14" />
              </linearGradient>
            </defs>

            {/* Ripples on the water, behind the lotus. */}
            <g className={styles.water}>
              <ellipse className={styles.ripple} style={{ "--r": "0s" } as CSSProperties} cx="160" cy="184" rx="150" ry="14" />
              <ellipse className={styles.ripple} style={{ "--r": "1.6s" } as CSSProperties} cx="160" cy="184" rx="150" ry="14" />
              <ellipse className={styles.ripple} style={{ "--r": "3.2s" } as CSSProperties} cx="160" cy="184" rx="150" ry="14" />
              <path className={styles.waterline} d="M70 184 C110 192 210 192 250 184" pathLength={1} />
            </g>

            <g className={styles.breathe}>
              {petals.map((petal) => (
                <path
                  key={petal.id}
                  className={styles.petal}
                  style={{ "--d": `${petal.d}s` } as CSSProperties}
                  d={petal.path}
                  pathLength={1}
                />
              ))}
              {/* The veins appear once the petals are open. */}
              <path className={styles.vein} d="M160 62 C160 100 160 136 160 164" pathLength={1} />
              <path className={styles.vein} d="M168 168 C190 146 214 116 224 88" pathLength={1} />
              <path className={styles.vein} d="M152 168 C130 146 106 116 96 88" pathLength={1} />
            </g>
          </svg>

          <span className={styles.petalsAir}>
            {drifting.map((p) => (
              <i
                key={p.x}
                style={
                  {
                    "--x": p.x,
                    "--sway": p.sway,
                    "--delay": p.delay,
                    "--dur": p.dur,
                    "--size": p.size,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        </div>

        <div className={styles.copy}>
          <SectionLabel tone="maroon" lineWidth={24}>
            The Academy Journal
          </SectionLabel>

          <SplitText
            id="blogs-empty-title"
            as="h2"
            className={styles.title}
            delay={0.05}
            stagger={0.06}
            lines={["Our stories are", "still taking shape."]}
          />

          <span className={styles.ornament} aria-hidden="true" />

          <Reveal as="p" className={styles.lead} y={20} delay={0.12}>
            The Rtambhara journal, with reflections on dance, music, yoga and
            life at the gurukulam, is being written one thoughtful page at a
            time. The first entries will appear here soon.
          </Reveal>

          <Reveal as="p" className={styles.note} y={16} delay={0.2}>
            Until then, the art speaks for itself.
          </Reveal>

          <Reveal className={styles.actions} y={16} delay={0.28}>
            <PillButton href="/programs">Explore programs</PillButton>
            <Link href="/news-events" className={styles.more}>
              See news &amp; events
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

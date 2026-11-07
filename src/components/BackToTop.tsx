"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import styles from "./BackToTop.module.scss";

// Show the button once the visitor is a little way down the page.
const SHOW_AFTER = 480;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function Arrow({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
    </svg>
  );
}

/** A floating "back to top" button for every page except the home page: it
 *  springs in once you scroll, shows how far down the page you are as a gold
 *  ring, swaps its arrow on hover, and glides you up with an eased scroll. */
export default function BackToTop() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const [visible, setVisible] = useState(false);
  const [launching, setLaunching] = useState(false);
  const frame = useRef(0);
  const stopRef = useRef<(() => void) | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > SHOW_AFTER));

  // Stop any glide in progress when the page changes or the component unmounts.
  useEffect(() => () => stopRef.current?.(), [pathname]);

  const goTop = useCallback(() => {
    const start = window.scrollY;
    if (start < 2) return;
    if (reduce) {
      window.scrollTo(0, 0);
      return;
    }

    const root = document.documentElement;
    const duration = Math.min(1700, Math.max(750, start * 0.4));
    const t0 = performance.now();
    root.style.scrollBehavior = "auto";
    setLaunching(true);

    // Any wheel, touch or key press hands control straight back to the visitor.
    const events = ["wheel", "touchstart", "keydown"] as const;
    const stop = () => {
      cancelAnimationFrame(frame.current);
      events.forEach((name) => window.removeEventListener(name, stop));
      root.style.scrollBehavior = "";
      stopRef.current = null;
      setLaunching(false);
    };
    stopRef.current?.();
    stopRef.current = stop;
    events.forEach((name) =>
      window.addEventListener(name, stop, { passive: true }),
    );

    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      window.scrollTo(0, start * (1 - easeInOutCubic(t)));
      if (t < 1) frame.current = requestAnimationFrame(step);
      else stop();
    };
    frame.current = requestAnimationFrame(step);
  }, [reduce]);

  // The home page has its own floating controls.
  if (pathname === "/") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          className={`${styles.button} ${launching ? styles.launching : ""}`}
          aria-label="Back to top"
          onClick={goTop}
          initial={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, y: 34, scale: 0.4, rotate: -120 }
          }
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, y: 26, scale: 0.5, rotate: 90 }
          }
          whileHover={reduce ? undefined : { y: -5 }}
          whileTap={reduce ? undefined : { scale: 0.9 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
        >
          <span className={styles.pulse} aria-hidden="true" />
          <svg className={styles.ring} viewBox="0 0 56 56" aria-hidden="true">
            <circle className={styles.track} cx="28" cy="28" r="25" />
            <motion.circle
              className={styles.bar}
              cx="28"
              cy="28"
              r="25"
              style={{ pathLength: progress }}
            />
          </svg>
          <span className={styles.disc}>
            <span className={styles.arrows}>
              <Arrow className={styles.arrowA} />
              <Arrow className={styles.arrowB} />
            </span>
          </span>
          <span className={styles.label} aria-hidden="true">
            Back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./SectionMarker.module.scss";

type SectionMarkerProps = {
  children: ReactNode;
  tone?: "gold" | "red" | "light" | "muted" | "slate";
  lineWidth?: number;
  centered?: boolean;
  className?: string;
};

export default function SectionMarker({
  children,
  tone = "gold",
  lineWidth = 74,
  centered = false,
  className = "",
}: SectionMarkerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className={`${styles.marker} ${styles[tone]} ${centered ? styles.centered : ""} ${className}`}
        style={{ "--marker-width": `${lineWidth}px` } as CSSProperties}
      >
        <span className={styles.line} aria-hidden="true" />
        <span className={styles.text}>{children}</span>
      </div>
    );
  }

  return (
    <motion.div
      className={`${styles.marker} ${styles[tone]} ${centered ? styles.centered : ""} ${className}`}
      style={{ "--marker-width": `${lineWidth}px` } as CSSProperties}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className={styles.line}
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ transformOrigin: centered ? "center" : "left" }}
      />
      <motion.span
        className={styles.text}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}

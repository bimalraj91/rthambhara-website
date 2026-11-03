"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./SectionLabel.module.scss";

type SectionLabelProps = {
  children: ReactNode;
  tone?: "maroon" | "red" | "white" | "gold" | "dark" | "muted";
  lineWidth?: number;
  compact?: boolean;
  strong?: boolean;
  className?: string;
};

export default function SectionLabel({
  children,
  tone = "maroon",
  lineWidth = 28,
  compact = false,
  strong = false,
  className = "",
}: SectionLabelProps) {
  const shouldReduceMotion = useReducedMotion();
  const classes = [
    styles.label,
    styles[tone],
    compact ? styles.compact : "",
    strong ? styles.strong : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = { "--label-line": `${lineWidth}px` } as CSSProperties;

  if (shouldReduceMotion) {
    return (
      <div className={classes} style={style}>
        <span className={styles.line} aria-hidden="true" />
        <span className={styles.text}>{children}</span>
      </div>
    );
  }

  return (
    <motion.div
      className={classes}
      style={style}
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className={styles.line}
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1,
        }}
        style={{ transformOrigin: "left" }}
      />
      <motion.span
        className={styles.text}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.18,
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}

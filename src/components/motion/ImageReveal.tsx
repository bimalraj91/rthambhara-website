"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HIDDEN = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  bottom: "inset(100% 0 0 0)",
} as const;

export default function ImageReveal({
  children,
  className,
  from = "left",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: keyof typeof HIDDEN;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { clipPath: HIDDEN[from], scale: 1.06 },
    visible: {
      clipPath: "inset(0 0 0 0)",
      scale: 1,
      transition: { duration: 1.3, ease: EASE, delay },
    },
  };

  // The observed wrapper is never clipped, so IntersectionObserver always sees it.
  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div style={{ position: "absolute", inset: 0 }} variants={variants}>
        {children}
      </motion.div>
    </motion.div>
  );
}

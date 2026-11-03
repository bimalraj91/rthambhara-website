"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function Drift({
  children,
  className,
  from = -40,
  to = 40,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <motion.div
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{ y: shouldReduceMotion ? 0 : y, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function Parallax({
  children,
  className,
  strength = 90,
  style,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -strength]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        y: shouldReduceMotion ? 0 : y,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

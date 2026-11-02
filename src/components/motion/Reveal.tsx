"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  figure: motion.figure,
  span: motion.span,
  p: motion.p,
  ul: motion.ul,
  li: motion.li,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

type TagName = keyof typeof TAGS;

type RevealProps = {
  children?: ReactNode;
  className?: string;
  id?: string;
  as?: TagName;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  blur?: number;
  once?: boolean;
  amount?: number;
  style?: CSSProperties;
};

export default function Reveal({
  children,
  className,
  id,
  as = "div",
  delay = 0,
  duration = 0.9,
  y = 36,
  x = 0,
  scale = 1,
  blur = 10,
  once = true,
  amount = 0.2,
  style,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = TAGS[as];

  const variants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y, x, scale, filter: `blur(${blur}px)` },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration, delay, ease: EASE },
        },
      };

  return (
    <MotionTag
      id={id}
      className={className}
      style={style}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

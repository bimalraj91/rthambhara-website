"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TAGS = {
  div: motion.div,
  ul: motion.ul,
  li: motion.li,
  section: motion.section,
  article: motion.article,
  a: motion.a,
  p: motion.p,
  figure: motion.figure,
} as const;

type TagName = keyof typeof TAGS;

export function StaggerGroup({
  children,
  className,
  as = "div",
  delay = 0,
  stagger = 0.1,
  once = true,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  as?: TagName;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = TAGS[as];

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: shouldReduceMotion ? 0 : stagger,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  y = 30,
  x = 0,
  scale = 1,
  blur = 8,
  duration = 0.8,
  href,
}: {
  children: ReactNode;
  className?: string;
  as?: TagName;
  y?: number;
  x?: number;
  scale?: number;
  blur?: number;
  duration?: number;
  href?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = TAGS[as] as ElementType;

  const variants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y, x, scale, filter: `blur(${blur}px)` },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration, ease: EASE },
        },
      };

  return (
    <MotionTag href={href} className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}

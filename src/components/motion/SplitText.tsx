"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { dottedText } from "../RtambharaWord";
import styles from "./SplitText.module.scss";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

type TagName = keyof typeof TAGS;

export type SplitWord = string | { text: string; className?: string };
export type SplitLine = string | { words: SplitWord[]; className?: string };

type SplitTextProps = {
  lines: SplitLine[];
  as?: TagName;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  mount?: boolean;
  id?: string;
};

function normalize(lines: SplitLine[]) {
  return lines.map((line) => {
    if (typeof line === "string") {
      return {
        className: undefined,
        words: line
          .split(/\s+/)
          .filter(Boolean)
          .map((text) => ({ text }) as { text: string; className?: string }),
      };
    }

    const words = line.words.flatMap((word) => {
      const text = typeof word === "string" ? word : word.text;
      const className = typeof word === "string" ? undefined : word.className;

      return text
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => ({ text: part, className }));
    });

    return { className: line.className, words };
  });
}

export default function SplitText({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0.1,
  stagger = 0.055,
  duration = 0.9,
  once = true,
  amount = 0.35,
  mount = false,
  id,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = TAGS[as];
  const normalized = normalize(lines);
  const label = normalized
    .flatMap((line) => line.words.map((word) => word.text))
    .join(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: shouldReduceMotion ? 0 : stagger,
      },
    },
  };

  const word: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { y: "115%", opacity: 0, rotate: 4 },
        visible: {
          y: "0%",
          opacity: 1,
          rotate: 0,
          transition: { duration, ease: EASE },
        },
      };

  // Headings that animate on load use plain CSS keyframes, so the text is in
  // the server HTML and paints without waiting for JavaScript.
  if (mount) {
    let wordNumber = 0;
    const Tag = as;

    return (
      <Tag
        id={id}
        className={className}
        aria-label={label}
        style={
          {
            "--delay": `${delay}s`,
            "--stagger": `${stagger}s`,
            "--dur": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {normalized.map((line, lineIndex) => (
          <span
            key={lineIndex}
            className={[styles.line, lineClassName, line.className]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          >
            {line.words.map((wordItem, wordIndex) => (
              <Fragment key={`${wordItem.text}-${wordIndex}`}>
                {wordIndex > 0 ? " " : null}
                <span className={styles.mask}>
                  <span
                    className={[styles.word, styles.wordCss, wordItem.className]
                      .filter(Boolean)
                      .join(" ")}
                    style={{ "--i": wordNumber++ } as React.CSSProperties}
                  >
                    {dottedText(wordItem.text)}
                  </span>
                </span>
              </Fragment>
            ))}
          </span>
        ))}
      </Tag>
    );
  }

  const trigger = mount
    ? { animate: "visible" as const }
    : {
        whileInView: "visible" as const,
        viewport: { once, amount },
      };

  return (
    <MotionTag
      id={id}
      className={className}
      aria-label={label}
      initial={shouldReduceMotion ? false : "hidden"}
      variants={container}
      {...trigger}
    >
      {normalized.map((line, lineIndex) => (
        <span
          key={lineIndex}
          className={[styles.line, lineClassName, line.className]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        >
          {line.words.map((wordItem, wordIndex) => (
            <Fragment key={`${wordItem.text}-${wordIndex}`}>
              {wordIndex > 0 ? " " : null}
              <span className={styles.mask}>
                <motion.span
                  className={[styles.word, wordItem.className]
                    .filter(Boolean)
                    .join(" ")}
                  variants={word}
                >
                  {dottedText(wordItem.text)}
                </motion.span>
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}

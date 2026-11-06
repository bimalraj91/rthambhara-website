import type { ReactNode } from "react";
import styles from "./NewsMarquee.module.scss";

type Props = {
  children: ReactNode;
  // Direction of travel on desktop.
  reverse?: boolean;
  // Seconds for one full loop.
  duration?: number;
  // Below the wide breakpoint the lane runs sideways instead of upwards.
  sidewaysOnTablet?: boolean;
  className?: string;
  label: string;
};

// A seamless, endless carousel: the cards are rendered twice and the lane
// slides by exactly one copy, so the loop never jumps. It pauses on hover and
// keyboard focus, and stands still for people who prefer reduced motion.
export default function NewsMarquee({
  children,
  reverse = false,
  duration = 48,
  sidewaysOnTablet = false,
  className = "",
  label,
}: Props) {
  const classes = [
    styles.viewport,
    reverse ? styles.reverse : "",
    sidewaysOnTablet ? styles.sideways : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      style={{ ["--duration" as string]: `${duration}s` }}
      role="region"
      aria-label={label}
      tabIndex={-1}
    >
      <div className={styles.lane}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}

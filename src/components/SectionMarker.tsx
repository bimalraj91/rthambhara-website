import type { CSSProperties, ReactNode } from "react";
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

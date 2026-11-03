import Image from "next/image";
import Link from "next/link";
import styles from "./PillButton.module.scss";

type PillButtonProps = {
  href: string;
  children: string;
  variant?: "maroon" | "glass";
  className?: string;
};

export default function PillButton({
  href,
  children,
  variant = "maroon",
  className = "",
}: PillButtonProps) {
  return (
    <Link
      href={href}
      className={`${styles.pill} ${styles[variant]} ${className}`.trim()}
    >
      <span>{children}</span>
      <span className={styles.circle} aria-hidden="true">
        <Image
          src="/assets/icons/slider-next-light.svg"
          alt=""
          width={16}
          height={16}
        />
      </span>
    </Link>
  );
}

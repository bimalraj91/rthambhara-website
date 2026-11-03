import Image from "next/image";
import styles from "./IntroCurtain.module.scss";

export default function IntroCurtain() {
  return (
    <div className={styles.curtain} aria-hidden="true">
      <div className={styles.brand}>
        <Image
          src="/assets/home/emblem.png"
          alt=""
          width={72}
          height={72}
          priority
          className={styles.emblem}
        />
        <span className={styles.name}>rtambhara</span>
        <span className={styles.rule} />
        <span className={styles.tagline}>Performing &amp; Visual Arts</span>
      </div>
    </div>
  );
}

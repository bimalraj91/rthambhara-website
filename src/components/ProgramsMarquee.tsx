import styles from "./ProgramsMarquee.module.scss";

const disciplines = [
  "Bharatanatyam",
  "Contemporary Dance",
  "Mohiniyattam",
  "Yoga",
  "Kalaripayattu-inspired movement",
];

// A slow ticker of disciplines; only shown where the desktop canvas is not.
export default function ProgramsMarquee({
  items = disciplines,
}: {
  items?: string[];
}) {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.group}>
            {items.map((name) => (
              <li key={name}>
                {name}
                <span>✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

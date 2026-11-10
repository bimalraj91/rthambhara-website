import styles from "./PageFallback.module.scss";

type Props = {
  // Reserve a dark band where the page's own hero will appear.
  hero?: boolean;
};

// Stands in for a streamed page until its content arrives. It holds a full
// screen of height, so the footer never flashes into the first view and its
// pictures are not fetched ahead of the page's own.
export default function PageFallback({ hero = false }: Props) {
  return (
    <div className={styles.fallback} aria-hidden="true">
      {hero && <div className={styles.hero} />}
    </div>
  );
}

import styles from "./template.module.scss";

// A soft fade-in for every page. It is pure CSS so the page paints straight
// from the server HTML; it does not wait for JavaScript to load.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className={styles.page}>{children}</div>;
}

import Link from "next/link";
import styles from "./Breadcrumbs.module.scss";

export type Crumb = {
  label: string;
  // Leave out for the page you are on.
  href?: string;
};

/** "Home › News & Events › This event": where the page sits, with a way back
 *  up. The last crumb is the current page and is not a link. `className`
 *  places it on the page. */
export default function Breadcrumbs({
  items,
  className = "",
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={`${styles.nav} ${className}`.trim()}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const current = index === items.length - 1;

          return (
            <li key={item.label} className={styles.item}>
              {current || !item.href ? (
                <span aria-current={current ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

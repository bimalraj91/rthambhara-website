"use client";

import { useEffect, useState } from "react";
import styles from "./template.module.scss";

// The first page a visitor opens paints straight away. Fading the whole page
// in from transparent hides the hero from the browser's first paint, which
// delays Largest Contentful Paint on phones. Later in-site navigations still
// get the soft fade.
let firstLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const [fade] = useState(() => !firstLoad);

  useEffect(() => {
    firstLoad = false;
  }, []);

  return (
    <div className={fade ? `${styles.page} ${styles.fade}` : styles.page}>
      {children}
    </div>
  );
}

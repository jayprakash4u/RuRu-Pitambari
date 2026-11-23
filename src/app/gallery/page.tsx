import type { Metadata } from "next";

import { GalleryGrid } from "@/features/gallery";

import styles from "./gallery-page.module.css";

export const metadata: Metadata = {
  title: "Gallery",
  description: "See Ruru Pitambari products, celebrations and community moments.",
};

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p>Products · Celebrations · Community</p>
          <h1>Gallery</h1>
        </div>
      </header>

      <section aria-label="Ruru Pitambari Facebook gallery" className={styles.section}>
        <GalleryGrid />
      </section>
    </div>
  );
}

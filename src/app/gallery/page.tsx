import type { Metadata } from "next";

import { GalleryGrid } from "@/features/gallery";

import styles from "./gallery-page.module.css";

export const metadata: Metadata = {
  title: "Gallery",
  description: "See Ruru Pitambari products, celebrations and community moments.",
};

export default function GalleryPage() {
  return (
    <main className={styles.page}>
      {/* Top Heritage Red Banner (Matching Product & Combo Offers Header Style) */}
      <section aria-labelledby="gallery-heading" className={styles.banner}>
        <div className={styles.bannerInner}>
          <h1 className={styles.bannerTitle} id="gallery-heading">
            Gallery
          </h1>
        </div>
      </section>

      <div className={styles.section}>
        <GalleryGrid />
      </div>
    </main>
  );
}

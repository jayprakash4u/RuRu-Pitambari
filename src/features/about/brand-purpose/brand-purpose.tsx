import Image from "next/image";

import brillianceImage from "@/assets/brand/story-brilliance.jpg";
import futureImage from "@/assets/brand/story-future.jpg";

import styles from "./brand-purpose.module.css";

export function BrandPurpose() {
  return (
    <section aria-label="Brand Mission and Vision" className={styles.section}>
      <div className={styles.container}>
        {/* Row 1: Mission (Image Left · Line + Badge + Text Right) */}
        <div className={styles.row}>
          <div className={styles.imageCard}>
            <Image
              alt="Ruru Pitambari - Bring Back the Brilliance"
              className={styles.image}
              placeholder="blur"
              priority
              sizes="(max-width: 52rem) 100vw, 42vw"
              src={brillianceImage}
            />
          </div>

          <div className={styles.contentCard}>
            <div className={styles.lineHeader}>
              <div className={styles.line} />
              <span className={styles.badge}>Our Mission</span>
            </div>
            <p className={styles.description}>
              To make dependable, effective, and gentle metal care accessible to every household —
              bringing back the timeless natural shine of brass, copper, and silver while preserving
              the sanctity and craftsmanship of the utensils families value and use every day.
            </p>
          </div>
        </div>

        {/* Row 2: Vision (Badge + Line + Text Left · Image Right) */}
        <div className={`${styles.row} ${styles.rowReverse}`}>
          <div className={styles.contentCard}>
            <div className={styles.lineHeader}>
              <span className={`${styles.badge} ${styles.badgeGold}`}>Our Vision</span>
              <div className={styles.line} />
            </div>
            <p className={styles.description}>
              To be Nepal’s most trusted household metal-care brand, recognized for genuine quality,
              thoughtful innovation, and reverence for tradition — keeping sacred heirlooms, puja
              vessels, and everyday utensils shining bright across generations.
            </p>
          </div>

          <div className={`${styles.imageCard} ${styles.orderFirstOnMobile}`}>
            <Image
              alt="Ruru Pitambari - A Future That Shines"
              className={styles.image}
              placeholder="blur"
              sizes="(max-width: 52rem) 100vw, 42vw"
              src={futureImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

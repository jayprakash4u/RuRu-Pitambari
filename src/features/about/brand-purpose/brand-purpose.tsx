import Image from "next/image";

import brillianceImage from "@/assets/brand/story-brilliance.jpg";
import futureImage from "@/assets/brand/story-future.jpg";

import styles from "./brand-purpose.module.css";

export function BrandPurpose() {
  return (
    <section aria-labelledby="brand-purpose-heading" className={styles.section}>
      <div className={styles.container}>
        {/* Section Intro */}
        <header className={styles.sectionHeader}>
          <span className={styles.eyebrow}>What Guides Us</span>
          <h2 className={styles.title} id="brand-purpose-heading">
            Care that keeps tradition shining.
          </h2>
          <p className={styles.subtitle}>
            We create dependable metal-care solutions for the sacred items and daily utensils
            families value, care for, and pass on across generations.
          </p>
        </header>

        {/* Row 1: Mission (Image Left, Content Right) */}
        <div className={styles.row}>
          <div className={styles.imageCard}>
            <Image
              alt="Ruru Pitambari brings back brilliance to brass pots and utensils"
              className={styles.image}
              placeholder="blur"
              priority
              sizes="(max-width: 52rem) 100vw, 48vw"
              src={brillianceImage}
            />
          </div>

          <div className={styles.contentCard}>
            <span className={styles.badge}>Our Mission</span>
            <h3 className={styles.cardHeading}>
              Bring Back the Brilliance: Effortless Everyday Metal Care
            </h3>
            <p className={styles.cardDescription}>
              Make effective, dependable metal care accessible to every household, bringing back the
              warm natural shine of brass, copper, and silver without aggressive chemicals or
              tedious scrubbing.
            </p>

            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <span aria-hidden="true" className={styles.featureIcon}>
                  ✓
                </span>
                <span>Restores traditional radiant shine without damaging fine engravings</span>
              </div>
              <div className={styles.featureItem}>
                <span aria-hidden="true" className={styles.featureIcon}>
                  ✓
                </span>
                <span>Gentle on metal and skin, crafted for routine household use</span>
              </div>
              <div className={styles.featureItem}>
                <span aria-hidden="true" className={styles.featureIcon}>
                  ✓
                </span>
                <span>Trusted protection that keeps utensils bright and tarnish-free longer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Vision (Content Left, Image Right - Alternating) */}
        <div className={`${styles.row} ${styles.rowReverse}`}>
          <div className={styles.contentCard}>
            <span className={`${styles.badge} ${styles.badgeGold}`}>Our Vision</span>
            <h3 className={styles.cardHeading}>
              A Future That Shines: Preserving Cherished Heritage
            </h3>
            <p className={styles.cardDescription}>
              Become Nepal’s most trusted household care brand, celebrated for quality, thoughtful
              innovation, and genuine reverence for the cultural traditions and family memories
              embedded in every metal piece.
            </p>

            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <span
                  aria-hidden="true"
                  className={`${styles.featureIcon} ${styles.featureIconGold}`}
                >
                  ✓
                </span>
                <span>Honoring centuries of Newari and Nepali metal craftsmanship</span>
              </div>
              <div className={styles.featureItem}>
                <span
                  aria-hidden="true"
                  className={`${styles.featureIcon} ${styles.featureIconGold}`}
                >
                  ✓
                </span>
                <span>Inspiring mindful, prideful everyday care for household treasures</span>
              </div>
              <div className={styles.featureItem}>
                <span
                  aria-hidden="true"
                  className={`${styles.featureIcon} ${styles.featureIconGold}`}
                >
                  ✓
                </span>
                <span>Proudly manufactured in Lalitpur, supporting local communities</span>
              </div>
            </div>
          </div>

          <div className={`${styles.imageCard} ${styles.orderFirstOnMobile}`}>
            <Image
              alt="A future that shines with cherished brass and metal care across generations"
              className={styles.image}
              placeholder="blur"
              sizes="(max-width: 52rem) 100vw, 48vw"
              src={futureImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

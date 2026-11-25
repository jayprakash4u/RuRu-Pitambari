import type { Metadata } from "next";
import Image from "next/image";

import heroStoryImage from "@/assets/gallery/dealer-meet-01.jpg";
import { BrandPurpose } from "@/features/about/brand-purpose/brand-purpose";

import styles from "./about-page.module.css";

export const metadata: Metadata = {
  title: "Our Story | Ruru Pitambari",
  description:
    "Meet Ruru Pitambari, a trusted Nepali home-care brand established in 2009 in Lalitpur, Nepal.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* Top Heritage Red Banner */}
      <section aria-labelledby="about-banner-heading" className={styles.banner}>
        <div className={styles.bannerInner}>
          <h1 className={styles.bannerTitle} id="about-banner-heading">
            Our Story
          </h1>
        </div>
      </section>

      {/* Built On Trust - Introduction Section */}
      <section aria-labelledby="about-heading" className={styles.introduction}>
        <div className={styles.imageWrap}>
          <Image
            alt="Ruru Pitambari team and community partners at Dealer Meet"
            className={styles.image}
            placeholder="blur"
            priority
            sizes="(max-width: 48rem) 100vw, 46vw"
            src={heroStoryImage}
          />
          <div className={styles.imageBadge}>
            <span className={styles.imageBadgeDot} />
            <span>Serving Nepal Since 2009</span>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.tagWrap}>
            <span className={styles.tag}>P Three Products · Lalitpur</span>
          </div>

          <h2 className={styles.heading} id="about-heading">
            Built on Trust, Crafted for Nepali Homes
          </h2>

          <p className={styles.lead}>
            Rooted in tradition and refined for modern living, Ruru Pitambari makes everyday home
            and metal care effortless, dependable, and gentle.
          </p>

          <div className={styles.copy}>
            <p>
              Founded in 2009 in Lalitpur, Nepal, our journey began with a simple belief: the
              utensils and sacred vessels that families cherish deserve care that restores their
              timeless brilliance without harshness or compromise.
            </p>
            <p>
              Through long-standing partnerships with local retailers, trusted dealers, and
              thousands of households across the nation, Ruru Pitambari has grown from a humble
              local workshop into a household staple known for genuine quality and authentic Nepali
              care.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>2009</span>
              <span className={styles.statLabel}>Established</span>
              <span className={styles.statSub}>Lalitpur, Nepal</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>15+</span>
              <span className={styles.statLabel}>Years of Trust</span>
              <span className={styles.statSub}>Across Communities</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>100%</span>
              <span className={styles.statLabel}>Authentic Care</span>
              <span className={styles.statSub}>Made in Nepal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Purpose & Vision Section */}
      <BrandPurpose />
    </main>
  );
}

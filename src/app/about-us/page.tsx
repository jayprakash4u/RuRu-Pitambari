import type { Metadata } from "next";
import Image from "next/image";

import heroStoryImage from "@/assets/gallery/dealer-meet-01.jpg";
import { BrandPurpose } from "@/features/about/brand-purpose/brand-purpose";

import styles from "./about-page.module.css";

export const metadata: Metadata = {
  title: "Our Story | Ruru Pitambari",
  description:
    "Meet Ruru Pitambari, a trusted Nepali home-care brand formulated and produced by P Three Products in Lalitpur, Nepal since 2009.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* Top Heritage Red Banner (Matching Product and Gallery Style) */}
      <section aria-labelledby="about-banner-heading" className={styles.banner}>
        <div className={styles.bannerInner}>
          <h1 className={styles.bannerTitle} id="about-banner-heading">
            Our Story
          </h1>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section aria-labelledby="about-heading" className={styles.narrativeSection}>
        <div className={styles.container}>
          {/* Photo & Documentary Caption */}
          <figure className={styles.photoFigure}>
            <div className={styles.imageFrame}>
              <Image
                alt="P Three Products founder presenting a commemorative gift to a retail dealer in Lalitpur"
                className={styles.photo}
                placeholder="blur"
                priority
                sizes="(max-width: 56rem) 100vw, 44vw"
                src={heroStoryImage}
              />
            </div>
            <figcaption className={styles.photoCaption}>
              Meeting our retail partners in Lalitpur — built on 15 years of personal visits, honest
              dealings, and shared community trust.
            </figcaption>
          </figure>

          {/* Story Text */}
          <div className={styles.storyContent}>
            <span className={styles.eyebrow}>P Three Products · Lalitpur, Nepal</span>

            <h2 className={styles.storyTitle} id="about-heading">
              Keeping Nepali Homes and Sacred Vessels Shining Bright
            </h2>

            <div className={styles.storyBody}>
              <p>
                In every Nepali home, copper (तामा) and brass (पीत्तल) utensils are more than simple
                cookware. They hold the holy water for morning prayers, the oil in evening diyos,
                and the feast dishes shared during Dashain, Tihar, and family gatherings. Yet for
                generations, keeping them bright meant messy ash pastes or harsh acids that burned
                fingers and slowly eroded fine metal craft.
              </p>
              <p>
                In 2009 (2066 B.S.), we started P Three Products in Lalitpur with a clear goal: to
                craft a dedicated cleaning formulation specifically tuned to Nepal&apos;s water and
                traditional metals. It had to restore an authentic golden shine in minutes, without
                the chemical burns or unpleasant fumes of industrial cleaners.
              </p>
              <p>
                We grew through simple word of mouth — shop by shop, neighbourhood kirana by bartan
                pasal. Retailers recommended Ruru Pitambari because it delivered honest results, and
                homemakers returned because their puja thalis and daily utensils stayed bright
                longer.
              </p>
              <p>
                Today, our range has expanded to include pooja oils, pure camphor, and household
                care, but our commitment remains unchanged: honest quality, manufactured right here
                in Nepal, made to serve the families who welcome us into their homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Purpose & Vision Section */}
      <BrandPurpose />
    </main>
  );
}

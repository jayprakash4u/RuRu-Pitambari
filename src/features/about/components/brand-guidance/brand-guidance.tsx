import Image from "next/image";

import plateImage from "@/assets/brand/story-brass-plate.jpg";

import styles from "./brand-guidance.module.css";

const guidanceItems = [
  {
    number: "01",
    title: "MISSION",
    description:
      "Make effective, dependable metal care accessible to every household, bringing back the natural shine of brass, copper and silver.",
  },
  {
    number: "02",
    title: "VISION",
    description:
      "Become Nepal’s most trusted metal-care brand, known for quality, thoughtful innovation and care for the things families value.",
  },
  {
    number: "03",
    title: "GOALS",
    description:
      "Deliver consistent quality, develop practical products for everyday use, and grow responsibly while supporting Nepal’s communities.",
  },
];

export function BrandGuidance() {
  return (
    <section aria-labelledby="guidance-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.cardContainer}>
          {/* Left Column: Visual & Core Philosophy */}
          <div className={styles.leftCol}>
            {/* Tagline & Emblem */}
            <div className={styles.taglineRow}>
              <div className={styles.labelGroup}>
                <span className={styles.label}>WHAT GUIDES US</span>
                <span aria-hidden="true" className={styles.redRule} />
              </div>

              {/* Heritage Floral Emblem */}
              <div aria-hidden="true" className={styles.emblemWrap}>
                <svg
                  className={styles.emblemSvg}
                  fill="none"
                  height="34"
                  viewBox="0 0 34 34"
                  width="34"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Leaves */}
                  <path d="M12 25 C7 25 5 29 8 31 C12 31 14 27 14 25 Z" fill="#2d6a4f" />
                  <path d="M22 25 C27 25 29 29 26 31 C22 31 20 27 20 25 Z" fill="#2d6a4f" />
                  {/* 5 Petals */}
                  <circle cx="17" cy="9" fill="#8c1d24" r="5.5" />
                  <circle cx="9.5" cy="14.5" fill="#8c1d24" r="5.5" />
                  <circle cx="24.5" cy="14.5" fill="#8c1d24" r="5.5" />
                  <circle cx="12" cy="22" fill="#8c1d24" r="5.5" />
                  <circle cx="22" cy="22" fill="#8c1d24" r="5.5" />
                  {/* Center Pistil */}
                  <circle cx="17" cy="16.5" fill="#f5be18" r="3" />
                  <circle cx="17" cy="16.5" fill="#ffffff" r="1.2" />
                </svg>
              </div>
            </div>

            {/* Headline */}
            <h2 className={styles.heading} id="guidance-heading">
              Care that keeps tradition shining.
            </h2>

            {/* Subtitle */}
            <p className={styles.subtext}>
              We make dependable metal care for the utensils families use, value and pass on.
            </p>

            {/* Polished Plate Image Stage */}
            <div className={styles.imageStage}>
              <Image
                alt="Traditional brass thali being polished to restore its natural gold luster"
                className={styles.plateImage}
                placeholder="blur"
                sizes="(max-width: 48rem) 100vw, 38vw"
                src={plateImage}
              />
            </div>
          </div>

          {/* Right Column: Mission, Vision, Goals */}
          <div className={styles.rightCol}>
            <div className={styles.pillarList}>
              {guidanceItems.map((item) => (
                <article className={styles.pillarItem} key={item.number}>
                  {/* Big Serif Number */}
                  <span className={styles.number}>{item.number}</span>

                  <span aria-hidden="true" className={styles.verticalDivider} />

                  {/* Pillar Content */}
                  <div className={styles.pillarBody}>
                    <div className={styles.titleRow}>
                      <h3 className={styles.pillarTitle}>{item.title}</h3>
                      <span aria-hidden="true" className={styles.titleDot} />
                      <span aria-hidden="true" className={styles.titleLine} />
                    </div>
                    <p className={styles.pillarDescription}>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom Metallic Metals Swatches */}
            <div className={styles.metalsFooter}>
              <span className={styles.metalsLabel}>BRASS / COPPER / SILVER</span>
              <div aria-label="Traditional metals supported" className={styles.swatches}>
                <span className={styles.swatchBrass} title="Brass" />
                <span className={styles.swatchCopper} title="Copper" />
                <span className={styles.swatchSilver} title="Silver" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

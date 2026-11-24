import Image from "next/image";

import brassImage from "@/assets/home/brass-before-after.png";

import styles from "./brand-guidance.module.css";

const pillars = [
  {
    badge: "01",
    description:
      "Make effective, dependable metal care accessible to every household, bringing back the natural shine of brass, copper and silver.",
    icon: (
      <svg
        aria-hidden="true"
        className={styles.pillarIcon}
        fill="none"
        height="22"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        width="22"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
    subtitle: "Heritage & Accessibility",
    title: "Our Mission",
  },
  {
    badge: "02",
    description:
      "Become Nepal’s most trusted metal-care brand, known for quality, thoughtful innovation and care for the things families value.",
    featured: true,
    icon: (
      <svg
        aria-hidden="true"
        className={styles.pillarIcon}
        fill="none"
        height="22"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        width="22"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="12" x2="12" y1="2" y2="4" />
        <line x1="12" x2="12" y1="20" y2="22" />
        <line x1="2" x2="4" y1="12" y2="12" />
        <line x1="20" x2="22" y1="12" y2="12" />
      </svg>
    ),
    subtitle: "Trust & Leadership",
    title: "Our Vision",
  },
  {
    badge: "03",
    description:
      "Deliver consistent quality, develop practical products for everyday use, and grow responsibly while supporting Nepal’s communities.",
    icon: (
      <svg
        aria-hidden="true"
        className={styles.pillarIcon}
        fill="none"
        height="22"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        width="22"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    subtitle: "Quality & Community",
    title: "Our Goals",
  },
];

const metals = [
  {
    desc: "Puja thalis, diyas & temple bells",
    gradient: "linear-gradient(135deg, #f5d77f 0%, #d4af37 50%, #997a15 100%)",
    name: "Brass",
    nepali: "पित्तल",
  },
  {
    desc: "Sacred kalash, tamreswar & vessels",
    gradient: "linear-gradient(135deg, #e5936e 0%, #c87a55 50%, #8c421f 100%)",
    name: "Copper",
    nepali: "तामा",
  },
  {
    desc: "Heirloom lamps, idols & coins",
    gradient: "linear-gradient(135deg, #ffffff 0%, #d1d5db 50%, #9ca3af 100%)",
    name: "Silver",
    nepali: "चाँदी",
  },
];

export function BrandGuidance() {
  return (
    <section aria-labelledby="guidance-heading" className={styles.section}>
      <div className={styles.inner}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span className={styles.eyebrowText}>WHAT GUIDES US</span>
            <span className={styles.eyebrowLine} />
          </div>

          <h2 className={styles.heading} id="guidance-heading">
            Care that keeps tradition shining.
          </h2>

          <p className={styles.lead}>
            We make dependable metal care for the utensils families use, value and pass on through
            generations.
          </p>
        </div>

        {/* 3 Pillars: Mission, Vision, Goals */}
        <div className={styles.pillarsGrid}>
          {pillars.map((pillar) => (
            <article
              className={`${styles.pillarCard} ${pillar.featured ? styles.pillarCardFeatured : ""}`}
              key={pillar.badge}
            >
              <div className={styles.cardTop}>
                <span className={styles.pillarBadge}>{pillar.badge}</span>
                <div className={styles.iconContainer}>{pillar.icon}</div>
              </div>

              <div className={styles.cardHeader}>
                <span className={styles.pillarSubtitle}>{pillar.subtitle}</span>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              </div>

              <div className={styles.cardDivider} />

              <p className={styles.pillarText}>{pillar.description}</p>
            </article>
          ))}
        </div>

        {/* Heritage Metals Showcase Banner */}
        <div className={styles.metalsShowcase}>
          {/* Left: Transformation Visual */}
          <div className={styles.showcaseVisual}>
            <div className={styles.imageOverlayBadge}>
              <span>✨ Visible Transformation</span>
            </div>
            <Image
              alt="Traditional brass plate restored from tarnish to bright gold luster"
              className={styles.showcaseImage}
              placeholder="blur"
              sizes="(max-width: 50rem) 100vw, 45vw"
              src={brassImage}
            />
          </div>

          {/* Right: Metallic Heritage Care */}
          <div className={styles.showcaseContent}>
            <div className={styles.showcaseTag}>
              <span>AUTHENTIC FORMULATION</span>
            </div>

            <h3 className={styles.showcaseTitle}>Formulated for Nepal’s Sacred Metals</h3>

            <p className={styles.showcaseDesc}>
              Whether restoring antique Newar copper craft, everyday puja metalware, or cherished
              silver heirlooms, our heritage formula dissolves deep tarnish instantly without
              scratching precious surfaces.
            </p>

            <div className={styles.metalsList}>
              {metals.map((metal) => (
                <div className={styles.metalItem} key={metal.name}>
                  <div
                    aria-hidden="true"
                    className={styles.metalChip}
                    style={{ background: metal.gradient }}
                  />
                  <div className={styles.metalInfo}>
                    <div className={styles.metalNameRow}>
                      <strong>{metal.name}</strong>
                      <span className={styles.metalNepali}>({metal.nepali})</span>
                    </div>
                    <span className={styles.metalDetail}>{metal.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

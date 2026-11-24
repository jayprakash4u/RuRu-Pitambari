import type { Metadata } from "next";

import { ComboCatalogue } from "@/features/combos";

import styles from "./combo-offers.module.css";

export const metadata: Metadata = {
  title: "Combo Offers | Ruru Pitambari",
  description:
    "Explore curated household care combo offers and bundles from Ruru Pitambari Nepal. Special savings on pooja care, kitchen degreasing, and floor cleaning.",
};

export default function ComboOffersPage() {
  return (
    <main className={styles.page}>
      {/* Top Heritage Red Banner (Matching the reference website with subtle pattern) */}
      <section aria-labelledby="combo-heading" className={styles.banner}>
        <div className={styles.bannerInner}>
          <h1 className={styles.bannerTitle} id="combo-heading">
            Combo Offers
          </h1>
        </div>
      </section>

      {/* Main Content Area (Matching our Product Page Pattern) */}
      <div className={styles.inner}>
        <ComboCatalogue />
      </div>
    </main>
  );
}

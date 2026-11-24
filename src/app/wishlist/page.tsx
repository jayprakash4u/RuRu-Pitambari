import type { Metadata } from "next";

import { WishlistView } from "@/features/wishlist";

import styles from "./wishlist-page.module.css";

export const metadata: Metadata = {
  title: "My Wishlist | Ruru Pitambari",
  description:
    "View and manage your favorite Ruru Pitambari cleaning and pooja care products saved to your wishlist.",
};

export default function WishlistPage() {
  return (
    <main className={styles.page}>
      {/* Top Heritage Red Banner (Matching Product Page & Other Pages) */}
      <section aria-labelledby="wishlist-heading" className={styles.banner}>
        <div className={styles.bannerInner}>
          <h1 className={styles.bannerTitle} id="wishlist-heading">
            My Wishlist
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <div className={styles.inner}>
        <WishlistView />
      </div>
    </main>
  );
}

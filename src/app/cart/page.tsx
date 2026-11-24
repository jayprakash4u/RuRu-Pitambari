import type { Metadata } from "next";

import { CartView } from "@/features/cart";

import styles from "./cart-page.module.css";

export const metadata: Metadata = {
  title: "Shopping Cart | Ruru Pitambari",
  description: "Review and manage products saved in your Ruru Pitambari cart.",
};

export default function CartPage() {
  return (
    <main className={styles.page}>
      {/* Top Heritage Red Banner (Matching Product Page & Other Pages) */}
      <section aria-labelledby="cart-heading" className={styles.banner}>
        <div className={styles.bannerInner}>
          <h1 className={styles.bannerTitle} id="cart-heading">
            Shopping Cart
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <div className={styles.inner}>
        <CartView />
      </div>
    </main>
  );
}

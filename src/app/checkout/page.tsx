import type { Metadata } from "next";

import { CheckoutView } from "@/features/cart/checkout-view";

import styles from "./checkout-page.module.css";

export const metadata: Metadata = {
  title: "Checkout & Delivery Details | Ruru Pitambari",
  description: "Provide delivery address and complete your Ruru Pitambari order.",
};

export default function CheckoutPage() {
  return (
    <main className={styles.page}>
      <section aria-labelledby="checkout-heading" className={styles.banner}>
        <div className={styles.bannerInner}>
          <h1 className={styles.bannerTitle} id="checkout-heading">
            Checkout & Delivery
          </h1>
          <p className={styles.bannerSubtitle}>
            Enter delivery address and billing details for your parcel
          </p>
        </div>
      </section>

      <div className={styles.inner}>
        <CheckoutView />
      </div>
    </main>
  );
}

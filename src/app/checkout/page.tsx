import type { Metadata } from "next";

import { CheckoutView } from "@/features/cart/checkout-view";

import styles from "./checkout-page.module.css";

export const metadata: Metadata = {
  title: "Order",
  description: "Complete your Ruru Pitambari order.",
};

export default function CheckoutPage() {
  return (
    <div className={styles.page}>
      <header>
        <p>Secure ordering</p>
        <h1>Complete your order</h1>
      </header>
      <CheckoutView />
    </div>
  );
}

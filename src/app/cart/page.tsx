import type { Metadata } from "next";

import { CartView } from "@/features/cart";

import styles from "./cart-page.module.css";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review products saved in your Ruru Pitambari cart.",
};

export default function CartPage() {
  return (
    <div className={styles.page}>
      <header>
        <p>Your selection</p>
        <h1>Shopping cart</h1>
      </header>
      <CartView />
    </div>
  );
}

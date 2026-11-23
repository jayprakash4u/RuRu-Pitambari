"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { Button, Field, Input, Textarea } from "@/components/ui";
import { products } from "@/features/products/data/products";

import { useCart } from "./cart-context";
import styles from "./checkout.module.css";

const nprFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  style: "currency",
});

export function CheckoutView() {
  const { clearCart, items } = useCart();
  const [ordered, setOrdered] = useState(false);
  const detailedItems = items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    const variant = product?.variants[item.variantIndex];
    return product && variant ? [{ ...item, product, variant }] : [];
  });
  const total = detailedItems.reduce((sum, item) => sum + item.quantity * item.variant.priceNpr, 0);

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearCart();
    setOrdered(true);
  }

  if (ordered) {
    return (
      <div className={styles.confirmation}>
        <p>Order received</p>
        <h2>Thank you for choosing Ruru Pitambari.</h2>
        <span>Our team will contact you to confirm delivery and payment.</span>
        <Link href="/products">Continue shopping</Link>
      </div>
    );
  }

  if (!detailedItems.length) {
    return (
      <div className={styles.confirmation}>
        <h2>Your cart is empty.</h2>
        <Link href="/products">Explore products</Link>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <form className={styles.form} onSubmit={submitOrder}>
        <div className={styles.twoColumns}>
          <Field label="Full name" labelFor="order-name">
            <Input autoComplete="name" id="order-name" name="name" required />
          </Field>
          <Field label="Phone number" labelFor="order-phone">
            <Input autoComplete="tel" id="order-phone" name="phone" required type="tel" />
          </Field>
        </div>
        <Field label="Delivery address" labelFor="order-address">
          <Textarea autoComplete="street-address" id="order-address" name="address" required />
        </Field>
        <Field label="Order note (optional)" labelFor="order-note">
          <Textarea id="order-note" name="note" />
        </Field>
        <Button size="lg" type="submit" variant="brand">
          Place order
        </Button>
      </form>

      <aside className={styles.summary}>
        <h2>Your order</h2>
        <ul>
          {detailedItems.map(({ product, quantity, variant, variantIndex }) => (
            <li key={`${product.id}-${variantIndex}`}>
              <span>
                {product.name} · {variant.label} × {quantity}
              </span>
              <strong>{nprFormatter.format(variant.priceNpr * quantity)}</strong>
            </li>
          ))}
        </ul>
        <div>
          <span>Total</span>
          <strong>{nprFormatter.format(total)}</strong>
        </div>
        <p>Cash on delivery · Delivery charge confirmed by our team</p>
      </aside>
    </div>
  );
}

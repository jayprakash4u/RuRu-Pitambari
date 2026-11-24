"use client";

import Image from "next/image";
import Link from "next/link";

import { EmptyState } from "@/components/ui";
import { comboAsProducts } from "@/features/combos/data/combos";
import { products } from "@/features/products/data/products";

import { useCart } from "./cart-context";
import styles from "./cart.module.css";

const allCatalogProducts = [...products, ...comboAsProducts];

const nprFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  style: "currency",
});

export function CartView() {
  const { items, removeItem, updateQuantity } = useCart();
  const detailedItems = items.flatMap((item) => {
    const product = allCatalogProducts.find((candidate) => candidate.id === item.productId);
    const variant = product?.variants[item.variantIndex];
    return product && variant ? [{ ...item, product, variant }] : [];
  });
  const subtotal = detailedItems.reduce(
    (total, item) => total + item.variant.priceNpr * item.quantity,
    0,
  );

  if (!detailedItems.length) {
    return (
      <div className={styles.emptyWrap}>
        <EmptyState
          action={<Link href="/products">Explore products</Link>}
          description="Add products you love and they will stay here for your next visit."
          title="Your cart is empty"
        />
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <div className={styles.items}>
        {detailedItems.map(({ product, quantity, variant, variantIndex }) => (
          <article className={styles.item} key={`${product.id}-${variantIndex}`}>
            <div className={styles.imageWrap}>
              <Image
                alt={`${product.name} product packaging`}
                className={styles.image}
                placeholder="blur"
                sizes="8rem"
                src={product.image}
              />
            </div>
            <div className={styles.details}>
              <p>{product.category}</p>
              <h2>{product.name}</h2>
              <span>{variant.label}</span>
              <button
                className={styles.remove}
                onClick={() => removeItem(product.id, variantIndex)}
                type="button"
              >
                Remove
              </button>
            </div>
            <div className={styles.quantity}>
              <span>Quantity</span>
              <div>
                <button
                  aria-label={`Decrease ${product.name} quantity`}
                  disabled={quantity === 1}
                  onClick={() => updateQuantity(product.id, variantIndex, quantity - 1)}
                  type="button"
                >
                  −
                </button>
                <strong aria-live="polite">{quantity}</strong>
                <button
                  aria-label={`Increase ${product.name} quantity`}
                  onClick={() => updateQuantity(product.id, variantIndex, quantity + 1)}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
            <strong className={styles.linePrice}>
              {nprFormatter.format(variant.priceNpr * quantity)}
            </strong>
          </article>
        ))}
      </div>

      <aside className={styles.summary}>
        <h2>Order summary</h2>
        <div>
          <span>Subtotal</span>
          <strong>{nprFormatter.format(subtotal)}</strong>
        </div>
        <p>Delivery charges are confirmed during ordering.</p>
        <Link className={styles.checkout} href="/checkout">
          Proceed to order
        </Link>
        <Link className={styles.continue} href="/products">
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}

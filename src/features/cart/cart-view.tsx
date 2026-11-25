"use client";

import Image from "next/image";
import Link from "next/link";

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

  const totalItemsCount = detailedItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!detailedItems.length) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIconWrap}>
          <svg
            aria-hidden="true"
            className={styles.emptyIcon}
            fill="none"
            height="48"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="48"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </div>
        <h2 className={styles.emptyTitle}>Your cart is empty</h2>
        <p className={styles.emptyText}>
          Discover authentic metal care, puja essentials, and household cleaning products made for
          Nepali homes.
        </p>
        <Link className={styles.exploreBtn} href="/products">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cartRoot}>
      <div className={styles.layout}>
        {/* Left Column: Cart Items Table */}
        <section aria-label="Shopping cart items" className={styles.itemsSection}>
          {/* Desktop Table Header */}
          <div aria-hidden="true" className={styles.tableHeader}>
            <span className={styles.colProduct}>Product</span>
            <span className={styles.colPrice}>Price</span>
            <span className={styles.colQuantity}>Quantity</span>
            <span className={styles.colTotal}>Total</span>
          </div>

          {/* Item Rows */}
          <div className={styles.itemsList}>
            {detailedItems.map(({ product, quantity, variant, variantIndex }) => (
              <article className={styles.itemRow} key={`${product.id}-${variantIndex}`}>
                {/* Product Image & Info */}
                <div className={styles.productCell}>
                  <div className={styles.imageWrap}>
                    <Image
                      alt={`${product.name} packaging`}
                      className={styles.productImage}
                      placeholder="blur"
                      sizes="5rem"
                      src={product.image}
                    />
                  </div>

                  <div className={styles.productInfo}>
                    <span className={styles.categoryBadge}>{product.category}</span>
                    <h2 className={styles.productName}>
                      <Link href={`/products?q=${encodeURIComponent(product.name)}`}>
                        {product.name}
                      </Link>
                    </h2>
                    <span className={styles.variantLabel}>{variant.label}</span>

                    {/* Mobile Unit Price */}
                    <span className={styles.mobileUnitPrice}>
                      {nprFormatter.format(variant.priceNpr)} each
                    </span>

                    {/* Mobile Remove Button */}
                    <button
                      aria-label={`Remove ${product.name} from cart`}
                      className={styles.mobileRemoveBtn}
                      onClick={() => removeItem(product.id, variantIndex)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Unit Price (Desktop) */}
                <div className={styles.priceCell}>
                  <span className={styles.unitPrice}>{nprFormatter.format(variant.priceNpr)}</span>
                </div>

                {/* Quantity Stepper */}
                <div className={styles.quantityCell}>
                  <div className={styles.qtyBox}>
                    <button
                      aria-label={`Decrease ${product.name} quantity`}
                      className={styles.qtyBtn}
                      disabled={quantity === 1}
                      onClick={() => updateQuantity(product.id, variantIndex, quantity - 1)}
                      type="button"
                    >
                      −
                    </button>
                    <span aria-live="polite" className={styles.qtyCount}>
                      {quantity}
                    </span>
                    <button
                      aria-label={`Increase ${product.name} quantity`}
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(product.id, variantIndex, quantity + 1)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Line Total & Desktop Remove Button */}
                <div className={styles.totalCell}>
                  <strong className={styles.linePrice}>
                    {nprFormatter.format(variant.priceNpr * quantity)}
                  </strong>
                  <button
                    aria-label={`Remove ${product.name} from cart`}
                    className={styles.removeIconBtn}
                    onClick={() => removeItem(product.id, variantIndex)}
                    title="Remove item"
                    type="button"
                  >
                    <svg
                      aria-hidden="true"
                      fill="none"
                      height="16"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="16"
                    >
                      <line x1="18" x2="6" y1="6" y2="18" />
                      <line x1="6" x2="18" y1="6" y2="18" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Under-table Footer Actions */}
          <div className={styles.tableFooter}>
            <Link className={styles.continueShoppingLink} href="/products">
              ← Continue Shopping
            </Link>
          </div>
        </section>

        {/* Right Column: Order Summary */}
        <aside aria-labelledby="summary-heading" className={styles.summaryCard}>
          <h2 className={styles.summaryTitle} id="summary-heading">
            Order Summary
          </h2>

          <div className={styles.summaryRow}>
            <span>
              Subtotal ({totalItemsCount} {totalItemsCount === 1 ? "item" : "items"})
            </span>
            <span className={styles.summaryValue}>{nprFormatter.format(subtotal)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Delivery</span>
            <span className={styles.deliveryNote}>Calculated at checkout</span>
          </div>

          <div className={styles.summaryDivider} />

          <div className={styles.totalRow}>
            <span>Estimated Total</span>
            <strong className={styles.totalPrice}>{nprFormatter.format(subtotal)}</strong>
          </div>
          <span className={styles.taxNote}>Inclusive of all applicable taxes</span>

          <Link className={styles.checkoutBtn} href="/checkout">
            Proceed to Checkout →
          </Link>

          <div className={styles.securityNote}>
            <svg
              aria-hidden="true"
              fill="none"
              height="14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="14"
            >
              <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Secure Checkout · Cash on Delivery Available</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

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
            height="56"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="56"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </div>
        <h2 className={styles.emptyTitle}>Your cart is empty</h2>
        <p className={styles.emptyText}>
          Looks like you haven&apos;t added any items to your shopping cart yet. Browse our
          bestsellers, metal care, and puja essentials!
        </p>
        <Link className={styles.exploreBtn} href="/products">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cartRoot}>
      {/* Top summary bar */}
      <div className={styles.toolbar}>
        <div className={styles.countText}>
          You have <strong>{totalItemsCount}</strong> {totalItemsCount === 1 ? "item" : "items"} in
          your cart
        </div>
        <Link className={styles.continueLink} href="/products">
          ← Continue shopping
        </Link>
      </div>

      <div className={styles.layout}>
        {/* Left Column: Items Table / List */}
        <div className={styles.itemsList}>
          {detailedItems.map(({ product, quantity, variant, variantIndex }) => (
            <article className={styles.item} key={`${product.id}-${variantIndex}`}>
              <div className={styles.imageWrap}>
                <Image
                  alt={`${product.name} product packaging`}
                  className={styles.image}
                  placeholder="blur"
                  sizes="6rem"
                  src={product.image}
                />
              </div>

              <div className={styles.details}>
                <span className={styles.categoryBadge}>{product.category}</span>
                <h2 className={styles.productName}>
                  <Link href={`/products?q=${encodeURIComponent(product.name)}`}>
                    {product.name}
                  </Link>
                </h2>
                <span className={styles.variantLabel}>{variant.label}</span>
                <div className={styles.mobilePrice}>{nprFormatter.format(variant.priceNpr)}</div>
              </div>

              {/* Quantity Selector */}
              <div className={styles.quantityCol}>
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
                  <strong aria-live="polite" className={styles.qtyCount}>
                    {quantity}
                  </strong>
                  <button
                    aria-label={`Increase ${product.name} quantity`}
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(product.id, variantIndex, quantity + 1)}
                    type="button"
                  >
                    +
                  </button>
                </div>

                <button
                  aria-label={`Remove ${product.name} from cart`}
                  className={styles.removeBtn}
                  onClick={() => removeItem(product.id, variantIndex)}
                  type="button"
                >
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
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  <span>Remove</span>
                </button>
              </div>

              {/* Line Price */}
              <div className={styles.priceCol}>
                <strong className={styles.linePrice}>
                  {nprFormatter.format(variant.priceNpr * quantity)}
                </strong>
                <span className={styles.taxNotice}>Inclusive of all taxes</span>
              </div>
            </article>
          ))}
        </div>

        {/* Right Column: Order Summary */}
        <aside className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>

          <div className={styles.summaryRow}>
            <span>Subtotal ({totalItemsCount} items)</span>
            <strong className={styles.subtotalValue}>{nprFormatter.format(subtotal)}</strong>
          </div>

          <div className={styles.summaryRow}>
            <span>Delivery</span>
            <span className={styles.deliveryNote}>Calculated at checkout</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.totalRow}>
            <span>Estimated Total</span>
            <strong className={styles.totalValue}>{nprFormatter.format(subtotal)}</strong>
          </div>

          <p className={styles.deliveryNotice}>
            🚚 Fast delivery across Kathmandu Valley and nationwide Nepal.
          </p>

          <Link className={styles.checkoutBtn} href="/checkout">
            Proceed to Checkout →
          </Link>

          <Link className={styles.continueBtn} href="/products">
            Continue Shopping
          </Link>

          {/* Trust Guarantees */}
          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <span>✓</span> 100% Genuine Ruru Pitambari
            </div>
            <div className={styles.trustItem}>
              <span>✓</span> Cash on Delivery Available
            </div>
            <div className={styles.trustItem}>
              <span>✓</span> Direct Manufacturer Quality
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

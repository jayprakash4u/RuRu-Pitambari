"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/features/cart";
import { comboAsProducts } from "@/features/combos/data/combos";
import { products } from "@/features/products/data/products";

import { useWishlist } from "./wishlist-context";
import styles from "./wishlist.module.css";

const allCatalogProducts = [...products, ...comboAsProducts];

const nprFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  style: "currency",
});

export function WishlistView() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const wishlistedProducts = items
    .map((id) => allCatalogProducts.find((p) => p.id === id))
    .filter((p): p is (typeof allCatalogProducts)[number] => p !== undefined);

  const handleAddToCart = (productId: string, productName: string) => {
    addItem(productId, 0);
    setAddedNotice(productName);
    setTimeout(() => {
      setAddedNotice((current) => (current === productName ? null : current));
    }, 2400);
  };

  if (!wishlistedProducts.length) {
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
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
        <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
        <p className={styles.emptyText}>
          Explore authentic Nepali copper, brass, and household care essentials and click the heart
          icon to save your favorites here.
        </p>
        <Link className={styles.exploreBtn} href="/products">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Toast Notice */}
      {addedNotice && (
        <div aria-live="polite" className={styles.toast}>
          <svg
            aria-hidden="true"
            fill="none"
            height="18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            width="18"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>
            Added <strong>{addedNotice}</strong> to cart!
          </span>
          <Link className={styles.toastLink} href="/cart">
            View Cart →
          </Link>
        </div>
      )}

      {/* Header Bar */}
      <div className={styles.toolbar}>
        <div className={styles.countText}>
          You have <strong>{wishlistedProducts.length}</strong>{" "}
          {wishlistedProducts.length === 1 ? "item" : "items"} saved
        </div>
        <div className={styles.actions}>
          <Link className={styles.continueLink} href="/products">
            ← Continue shopping
          </Link>
          <button className={styles.clearBtn} onClick={clearWishlist} type="button">
            Clear all
          </button>
        </div>
      </div>

      {/* Grid of Wishlisted Products */}
      <div className={styles.grid}>
        {wishlistedProducts.map((product) => {
          const firstVariant = product.variants[0];
          const price = firstVariant ? firstVariant.priceNpr : 0;
          const weightLabel = firstVariant?.label ?? "";

          return (
            <article className={styles.card} key={product.id}>
              {/* Product Image Stage */}
              <div className={styles.imageWrap}>
                <Image
                  alt={`${product.name} packaging`}
                  className={styles.image}
                  placeholder="blur"
                  sizes="(max-width: 40rem) 100vw, (max-width: 68rem) 50vw, 25vw"
                  src={product.image}
                />
                {/* Remove button (top right) */}
                <button
                  aria-label={`Remove ${product.name} from wishlist`}
                  className={styles.removeCircleBtn}
                  onClick={() => removeItem(product.id)}
                  title="Remove from wishlist"
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

              {/* Card Body */}
              <div className={styles.cardBody}>
                <div className={styles.categoryLine}>
                  <span className={styles.categoryBadge}>{product.category}</span>
                  <span className={styles.stockBadge}>In Stock</span>
                </div>

                <h2 className={styles.productTitle}>
                  <Link href={`/products?q=${encodeURIComponent(product.name)}`}>
                    {product.name}
                  </Link>
                </h2>

                {weightLabel ? <span className={styles.variantLabel}>{weightLabel}</span> : null}

                <div className={styles.priceRow}>
                  <strong className={styles.price}>{nprFormatter.format(price)}</strong>
                  <span className={styles.taxNotice}>Inclusive of all taxes</span>
                </div>

                <div className={styles.cardFooter}>
                  <button
                    className={styles.addToCartBtn}
                    onClick={() => handleAddToCart(product.id, product.name)}
                    type="button"
                  >
                    <svg
                      aria-hidden="true"
                      className={styles.btnIcon}
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" x2="21" y1="6" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

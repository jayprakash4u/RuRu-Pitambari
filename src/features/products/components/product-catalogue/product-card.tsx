"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/features/cart";
import { useWishlist } from "@/features/wishlist";

import type { Product } from "../../data/products";
import styles from "./product-catalogue.module.css";

type ProductCardProps = {
  product: Product;
};

const nprFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  style: "currency",
});

export function ProductCard({ product }: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist: toggleWishlistContext } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const selectedVariant = product.variants[selectedVariantIndex];

  const discountPercent = selectedVariant.mrpNpr
    ? Math.round(
        ((selectedVariant.mrpNpr - selectedVariant.priceNpr) / selectedVariant.mrpNpr) * 100,
      )
    : null;

  function addToCart() {
    addItem(product.id, selectedVariantIndex);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  function toggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlistContext(product.id);
  }

  return (
    <article className={styles.card}>
      {/* Product Image Stage with Badges & Rating Pill */}
      <div className={styles.imageWrap}>
        {product.isBestseller ? <span className={styles.bestsellerBadge}>Bestseller</span> : null}

        {/* Wishlist Heart Icon */}
        <button
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={styles.wishlistBtn}
          data-active={isWishlisted ? "true" : undefined}
          onClick={toggleWishlist}
          type="button"
        >
          <svg
            aria-hidden="true"
            className={styles.heartIcon}
            fill={isWishlisted ? "#8c1d24" : "none"}
            stroke={isWishlisted ? "#8c1d24" : "currentColor"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        <Link aria-label={`View ${product.name}`} className={styles.imageLink} href={product.href}>
          <Image
            alt={`${product.name} packaging`}
            className={styles.productImage}
            placeholder="blur"
            sizes="(max-width: 40rem) 46vw, (max-width: 68rem) 44vw, 22vw"
            src={product.image}
          />
        </Link>

        {/* Rating Pill Overlay (Flipkart / Amazon standard) */}
        {product.rating ? (
          <div aria-label={`Rated ${product.rating} stars`} className={styles.ratingPill}>
            <span>{product.rating}</span>
            <span aria-hidden="true" className={styles.ratingStar}>
              ★
            </span>
            {product.reviewCount ? (
              <span className={styles.reviewCount}>
                (
                {product.reviewCount > 999
                  ? `${(product.reviewCount / 1000).toFixed(1)}k`
                  : product.reviewCount}
                )
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Card Content - Minimalist & Spacious */}
      <div className={styles.cardBody}>
        <h2>
          <Link href={product.href}>{product.name}</Link>
        </h2>
        <p className={styles.shortName}>{product.shortName}</p>

        {/* Variants / Pack sizes */}
        <div
          aria-label={`Choose ${product.name} pack size`}
          className={styles.variants}
          role="group"
        >
          {product.variants.map((variant, index) => (
            <button
              aria-pressed={selectedVariantIndex === index}
              className={styles.variant}
              key={variant.label}
              onClick={() => setSelectedVariantIndex(index)}
              type="button"
            >
              {variant.label}
            </button>
          ))}
        </div>

        {/* Pricing (Flipkart Style: [Price] [MRP] [XX% off]) */}
        <div className={styles.pricing}>
          <strong aria-live="polite" className={styles.offerPrice}>
            {nprFormatter.format(selectedVariant.priceNpr)}
          </strong>
          {selectedVariant.mrpNpr ? (
            <span className={styles.strikePrice}>
              {nprFormatter.format(selectedVariant.mrpNpr)}
            </span>
          ) : null}
          {discountPercent ? (
            <span className={styles.discountText}>{discountPercent}% off</span>
          ) : null}
        </div>

        {/* Action CTA Button with Shopping Cart Icon */}
        <button
          aria-label={`Add ${product.name} (${selectedVariant.label}) to cart`}
          className={styles.actionBtn}
          data-added={added ? "true" : undefined}
          onClick={addToCart}
          type="button"
        >
          {added ? (
            <>
              <svg
                aria-hidden="true"
                className={styles.btnIcon}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Added to Cart</span>
            </>
          ) : (
            <>
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
            </>
          )}
        </button>
      </div>
    </article>
  );
}

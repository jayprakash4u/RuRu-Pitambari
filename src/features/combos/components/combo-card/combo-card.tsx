"use client";

import Image from "next/image";
import { useState } from "react";

import { useCart } from "@/features/cart";
import { useWishlist } from "@/features/wishlist";

import type { Combo } from "../../data/combos";
import styles from "../combo-catalogue/combo-catalogue.module.css";

const nprFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  style: "currency",
});

interface ComboCardProps {
  combo: Combo;
}

export function ComboCard({ combo }: ComboCardProps) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist: toggleWishlistContext } = useWishlist();
  const isWishlisted = isInWishlist(combo.id);

  function addToCart() {
    addItem(combo.id, 0);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  function toggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlistContext(combo.id);
  }

  return (
    <article className={styles.card}>
      {/* Product Image Stage with Red Circular Discount Sticker */}
      <div className={styles.imageWrap}>
        <span aria-label={`${combo.discountPercent}% off`} className={styles.discountBadge}>
          -{combo.discountPercent}%
        </span>

        {/* Hover Action Buttons (Wishlist Heart & Quick View) */}
        <div className={styles.imageActionButtons}>
          <button
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={styles.circleActionBtn}
            data-active={isWishlisted ? "true" : undefined}
            onClick={toggleWishlist}
            type="button"
          >
            <svg
              aria-hidden="true"
              className={styles.actionIcon}
              fill={isWishlisted ? "#d71920" : "none"}
              stroke={isWishlisted ? "#d71920" : "currentColor"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
        </div>

        <Image
          alt={`${combo.name} packshot`}
          className={styles.productImage}
          placeholder="blur"
          sizes="(max-width: 40rem) 46vw, (max-width: 68rem) 44vw, 22vw"
          src={combo.image}
        />
      </div>

      {/* Card Content - Clean & Minimal matching Pitambari India website */}
      <div className={styles.cardBody}>
        {/* Star Rating Line */}
        <div aria-label="Rating 5 out of 5" className={styles.ratingRow}>
          <span className={styles.ratingStars}>★ ★ ★ ★ ★</span>
          <span className={styles.ratingCount}>(0)</span>
        </div>

        {/* Product Title */}
        <h2>{combo.name}</h2>

        {/* Pricing Line (Strike MRP + Bold Red Price + Inclusive of all taxes) */}
        <div className={styles.pricing}>
          <span className={styles.strikePrice}>{nprFormatter.format(combo.regularPriceNpr)}</span>
          <strong aria-live="polite" className={styles.offerPrice}>
            {nprFormatter.format(combo.comboPriceNpr)}
          </strong>
          <span className={styles.taxNotice}>Inclusive of all taxes</span>
        </div>

        {/* Clean Outline Pill Action Button */}
        <button
          aria-label={`Add ${combo.name} to cart`}
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
              <span>ADDED TO CART</span>
            </>
          ) : (
            <span>ADD TO CART</span>
          )}
        </button>
      </div>
    </article>
  );
}

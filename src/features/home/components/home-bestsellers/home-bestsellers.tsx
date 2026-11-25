"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/features/cart";
import { products, type Product } from "@/features/products/data/products";

import styles from "./home-bestsellers.module.css";

const nprFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  style: "currency",
});

function BestsellerCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const variant = product.variants[0];

  function addToCart() {
    addItem(product.id, 0);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <article className={styles.card}>
      <Link aria-label={`View ${product.name}`} className={styles.imageWrap} href={product.href}>
        <span className={styles.badge}>Bestseller</span>
        <Image
          alt={`${product.name} product packaging`}
          className={product.imageFit === "contain" ? styles.containImage : styles.productImage}
          placeholder="blur"
          sizes="(max-width: 40rem) 44vw, (max-width: 64rem) 42vw, 22vw"
          src={product.image}
        />
      </Link>

      <div className={styles.details}>
        <p>{product.category}</p>
        <h3>
          <Link href={product.href}>{product.name}</Link>
        </h3>
        <div className={styles.purchaseRow}>
          <div>
            <span>{variant.label}</span>
            <strong>{nprFormatter.format(variant.priceNpr)}</strong>
          </div>
        </div>

        <button
          aria-label={`Add ${product.name} to cart`}
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

export function HomeBestsellers() {
  return (
    <section aria-labelledby="bestsellers-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 id="bestsellers-heading">Bestsellers</h2>
        </div>

        <div className={styles.grid}>
          {products.slice(0, 4).map((product) => (
            <BestsellerCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

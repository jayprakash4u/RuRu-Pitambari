import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/features/cart";

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
  const router = useRouter();
  const selectedVariant = product.variants[selectedVariantIndex];

  function addToCart() {
    addItem(product.id, selectedVariantIndex);
    setAdded(true);
  }

  function buyNow() {
    addItem(product.id, selectedVariantIndex);
    router.push("/checkout");
  }

  return (
    <article className={styles.card}>
      <Link aria-label={`View ${product.name}`} className={styles.imageLink} href={product.href}>
        <Image
          alt={`${product.name} product packaging`}
          className={product.imageFit === "contain" ? styles.containImage : styles.coverImage}
          placeholder="blur"
          sizes="(max-width: 40rem) 40vw, 21vw"
          src={product.image}
        />
      </Link>
      <div className={styles.cardBody}>
        <p className={styles.category}>{product.category}</p>
        <h2>
          <Link href={product.href}>{product.name}</Link>
        </h2>
        <p className={styles.shortName}>{product.shortName}</p>
        <p className={styles.description}>{product.description}</p>

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

        <div className={styles.purchaseRow}>
          <p aria-live="polite" className={styles.price}>
            {nprFormatter.format(selectedVariant.priceNpr)}
          </p>
          <div className={styles.cardActions}>
            <button className={styles.addAction} onClick={addToCart} type="button">
              {added ? "Added" : "Add to cart"}
            </button>
            <button className={styles.action} onClick={buyNow} type="button">
              Buy now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";

import { products } from "@/features/products/data/products";

import styles from "./home-bestsellers.module.css";

const nprFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  style: "currency",
});

export function HomeBestsellers() {
  return (
    <section aria-labelledby="bestsellers-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 id="bestsellers-heading">Bestsellers</h2>
        </div>

        <div className={styles.grid}>
          {products.slice(0, 4).map((product) => {
            const variant = product.variants[0];

            return (
              <article className={styles.card} key={product.id}>
                <Link
                  aria-label={`View ${product.name}`}
                  className={styles.imageWrap}
                  href={product.href}
                >
                  <span className={styles.badge}>Bestseller</span>
                  <Image
                    alt={`${product.name} product packaging`}
                    className={
                      product.imageFit === "contain" ? styles.containImage : styles.productImage
                    }
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
                    <Link className={styles.action} href={product.href}>
                      Buy now
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

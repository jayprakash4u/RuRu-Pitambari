"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { productCategories, products, type ProductCategory } from "../../data/products";
import { ProductCard } from "./product-card";
import styles from "./product-catalogue.module.css";

type ProductCatalogueProps = {
  initialCategory?: ProductCategory;
  initialQuery?: string;
};

export function ProductCatalogue({
  initialCategory = "All",
  initialQuery = "",
}: ProductCatalogueProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = initialQuery.trim().toLocaleLowerCase();

    return products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.shortName} ${product.description} ${product.category}`
          .toLocaleLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, initialQuery]);

  return (
    <>
      <div className={styles.toolbar}>
        <div aria-label="Filter products by category" className={styles.filters} role="group">
          {productCategories.map((category) => (
            <button
              aria-pressed={activeCategory === category}
              className={styles.filter}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {initialQuery ? (
        <div className={styles.searchSummary}>
          <p>
            Search results for <strong>“{initialQuery}”</strong>
          </p>
          <Link href="/products">Clear search</Link>
        </div>
      ) : null}

      {visibleProducts.length ? (
        <div className={styles.grid}>
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <h2>No products found</h2>
          <p>Try another search or explore all product categories.</p>
          <Link href="/products">View all products</Link>
        </div>
      )}
    </>
  );
}

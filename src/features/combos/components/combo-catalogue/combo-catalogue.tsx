"use client";

import { useMemo, useState } from "react";

import { combos } from "../../data/combos";
import { ComboCard } from "../combo-card/combo-card";
import styles from "./combo-catalogue.module.css";

type SortOption = "featured" | "price-asc" | "price-desc" | "discount-desc";

export function ComboCatalogue() {
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const visibleCombos = useMemo(() => {
    const list = [...combos];

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.comboPriceNpr - b.comboPriceNpr);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.comboPriceNpr - a.comboPriceNpr);
    } else if (sortBy === "discount-desc") {
      list.sort((a, b) => b.discountPercent - a.discountPercent);
    }

    return list;
  }, [sortBy]);

  return (
    <div className={styles.catalogueWrapper}>
      <div className={styles.toolbar}>
        <span className={styles.resultCount}>
          Showing <strong>{visibleCombos.length}</strong> value packs
        </span>
        <select
          aria-label="Sort combo offers"
          className={styles.sortSelect}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          value={sortBy}
        >
          <option value="featured">Sort by: Featured</option>
          <option value="discount-desc">Highest Discount</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {visibleCombos.length ? (
        <div className={styles.grid}>
          {visibleCombos.map((combo) => (
            <ComboCard combo={combo} key={combo.id} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No combo offers available.</p>
        </div>
      )}
    </div>
  );
}

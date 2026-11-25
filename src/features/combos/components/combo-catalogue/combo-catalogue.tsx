"use client";

import { useMemo, useState } from "react";

import { combos } from "../../data/combos";
import { ComboCard } from "../combo-card/combo-card";
import styles from "./combo-catalogue.module.css";

type SortOption = "featured" | "price-asc" | "price-desc" | "discount-desc";

export function ComboCatalogue() {
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [page, setPage] = useState(1);
  const pageSize = 4;

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

  const pageCount = Math.max(1, Math.ceil(visibleCombos.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, visibleCombos.length);
  const paginatedCombos = useMemo(
    () => visibleCombos.slice(startIndex, endIndex),
    [endIndex, startIndex, visibleCombos],
  );

  return (
    <div className={styles.catalogueWrapper}>
      <div className={styles.toolbar}>
        <span className={styles.resultCount}>
          Showing <strong>{visibleCombos.length}</strong> value packs
        </span>
        <select
          aria-label="Sort combo offers"
          className={styles.sortSelect}
          onChange={(e) => {
            setSortBy(e.target.value as SortOption);
            setPage(1);
          }}
          value={sortBy}
        >
          <option value="featured">Sort by: Featured</option>
          <option value="discount-desc">Highest Discount</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {visibleCombos.length ? (
        <>
          <div className={styles.grid}>
            {paginatedCombos.map((combo) => (
              <ComboCard combo={combo} key={combo.id} />
            ))}
          </div>

          {pageCount > 1 ? (
            <div className={styles.tableFooter}>
              <p>
                Showing <strong>{startIndex + 1}</strong> to <strong>{endIndex}</strong> of{" "}
                <strong>{visibleCombos.length}</strong> value packs
              </p>

              <nav aria-label="Combo offers pagination" className={styles.pagination}>
                <button
                  disabled={page === 1}
                  onClick={() => {
                    setPage((c) => c - 1);
                    if (typeof window !== "undefined") {
                      window.scrollTo({ behavior: "smooth", top: 220 });
                    }
                  }}
                  type="button"
                >
                  Previous
                </button>

                <div>
                  {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                      aria-current={pageNumber === page ? "page" : undefined}
                      aria-label={`Page ${pageNumber}`}
                      key={pageNumber}
                      onClick={() => {
                        setPage(pageNumber);
                        if (typeof window !== "undefined") {
                          window.scrollTo({ behavior: "smooth", top: 220 });
                        }
                      }}
                      type="button"
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>

                <button
                  disabled={page === pageCount}
                  onClick={() => {
                    setPage((c) => c + 1);
                    if (typeof window !== "undefined") {
                      window.scrollTo({ behavior: "smooth", top: 220 });
                    }
                  }}
                  type="button"
                >
                  Next
                </button>
              </nav>
            </div>
          ) : null}
        </>
      ) : (
        <div className={styles.empty}>
          <p>No combo offers available.</p>
        </div>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import floorCareThumb from "@/assets/categories/floor-care.png";
import householdCareThumb from "@/assets/categories/household-care.png";
import kitchenCareThumb from "@/assets/categories/kitchen-care.png";
import metalCareThumb from "@/assets/categories/metal-care.png";
import poojaCareThumb from "@/assets/categories/pooja-care.png";
import product01Image from "@/assets/products/product-01.png";

import { productCategories, products, type ProductCategory } from "../../data/products";
import { ProductCard } from "./product-card";
import styles from "./product-catalogue.module.css";

type SortOption = "featured" | "price-asc" | "price-desc" | "discount-desc" | "rating-desc";
type PriceFilter = "all" | "under-150" | "150-300" | "above-300";

type ProductCatalogueProps = {
  initialCategory?: ProductCategory;
  initialQuery?: string;
};

const categoryVisuals = [
  { id: "All" as const, label: "All Items", image: product01Image },
  { id: "Metal care" as const, label: "Metal Care", image: metalCareThumb },
  { id: "Pooja care" as const, label: "Pooja Care", image: poojaCareThumb },
  { id: "Kitchen care" as const, label: "Kitchen Care", image: kitchenCareThumb },
  { id: "Floor care" as const, label: "Floor Care", image: floorCareThumb },
  { id: "Household care" as const, label: "Household Care", image: householdCareThumb },
];

export function ProductCatalogue({
  initialCategory = "All",
  initialQuery = "",
}: ProductCatalogueProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    for (const cat of productCategories) {
      if (cat !== "All") {
        counts[cat] = products.filter((p) => p.category === cat).length;
      }
    }
    return counts;
  }, []);

  const hasActiveFilters =
    activeCategory !== "All" || minDiscount > 0 || priceFilter !== "all" || minRating > 0;

  function resetAllFilters() {
    setActiveCategory("All");
    setMinDiscount(0);
    setPriceFilter("all");
    setMinRating(0);
    setSortBy("featured");
    setPage(1);
  }

  const visibleProducts = useMemo(() => {
    const normalizedQuery = initialQuery.trim().toLocaleLowerCase();

    const filtered = products.filter((product) => {
      // Category match
      if (activeCategory !== "All" && product.category !== activeCategory) {
        return false;
      }

      // Query match
      if (normalizedQuery) {
        const queryText =
          `${product.name} ${product.shortName} ${product.description} ${product.category}`.toLocaleLowerCase();
        if (!queryText.includes(normalizedQuery)) {
          return false;
        }
      }

      // Primary variant for price / discount calculations
      const primaryVariant = product.variants[0];
      const primaryPrice = primaryVariant.priceNpr;
      const discount = primaryVariant.mrpNpr
        ? Math.round(((primaryVariant.mrpNpr - primaryPrice) / primaryVariant.mrpNpr) * 100)
        : 0;

      // Min discount
      if (minDiscount > 0 && discount < minDiscount) {
        return false;
      }

      // Price range
      if (priceFilter === "under-150" && primaryPrice >= 150) {
        return false;
      }
      if (priceFilter === "150-300" && (primaryPrice < 150 || primaryPrice > 300)) {
        return false;
      }
      if (priceFilter === "above-300" && primaryPrice <= 300) {
        return false;
      }

      // Rating
      if (minRating > 0 && (product.rating ?? 0) < minRating) {
        return false;
      }

      return true;
    });

    // Sorting
    const sorted = [...filtered];
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => a.variants[0].priceNpr - b.variants[0].priceNpr);
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => b.variants[0].priceNpr - a.variants[0].priceNpr);
    } else if (sortBy === "discount-desc") {
      sorted.sort((a, b) => {
        const discA = a.variants[0].mrpNpr
          ? (a.variants[0].mrpNpr - a.variants[0].priceNpr) / a.variants[0].mrpNpr
          : 0;
        const discB = b.variants[0].mrpNpr
          ? (b.variants[0].mrpNpr - b.variants[0].priceNpr) / b.variants[0].mrpNpr
          : 0;
        return discB - discA;
      });
    } else if (sortBy === "rating-desc") {
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return sorted;
  }, [activeCategory, initialQuery, minDiscount, priceFilter, minRating, sortBy]);

  const pageCount = Math.max(1, Math.ceil(visibleProducts.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, visibleProducts.length);
  const paginatedProducts = useMemo(
    () => visibleProducts.slice(startIndex, endIndex),
    [endIndex, startIndex, visibleProducts],
  );

  return (
    <div className={styles.catalogueWrapper}>
      {/* Top Visual Category Navigation (Amazon Style) */}
      <nav aria-label="Visual category navigation" className={styles.visualCategoriesBar}>
        <div className={styles.visualCategoriesTrack}>
          {categoryVisuals.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                aria-pressed={isSelected}
                className={styles.visualCategoryItem}
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setPage(1);
                }}
                type="button"
              >
                <div
                  className={styles.visualThumbCircle}
                  data-active={isSelected ? "true" : undefined}
                >
                  <Image
                    alt={cat.label}
                    className={styles.visualThumbImg}
                    placeholder="blur"
                    sizes="68px"
                    src={cat.image}
                  />
                </div>
                <span className={styles.visualLabel}>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main 2-Column Catalog Container */}
      <div className={styles.catalogueLayout}>
        {/* Left Filter Sidebar (AJIO / Tira / Pitambari India pattern) */}
        <aside
          aria-label="Filter products"
          className={styles.sidebar}
          data-open={mobileFiltersOpen ? "true" : undefined}
        >
          <div className={styles.sidebarSticky}>
            <div className={styles.sidebarHeader}>
              <div className={styles.sidebarTitleRow}>
                <svg
                  aria-hidden="true"
                  className={styles.filterIcon}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <h3>Refine By</h3>
              </div>
              {hasActiveFilters ? (
                <button className={styles.clearAllBtn} onClick={resetAllFilters} type="button">
                  Clear All
                </button>
              ) : null}
              {/* Mobile Close Button */}
              <button
                aria-label="Close filters"
                className={styles.mobileCloseBtn}
                onClick={() => setMobileFiltersOpen(false)}
                type="button"
              >
                ✕
              </button>
            </div>

            {/* Filter Group: Category */}
            <div className={styles.filterGroup}>
              <h4 className={styles.groupHeading}>Category</h4>
              <ul className={styles.filterList}>
                {productCategories.map((category) => {
                  const isSelected = activeCategory === category;
                  const count = categoryCounts[category] ?? 0;
                  return (
                    <li key={category}>
                      <button
                        aria-pressed={isSelected}
                        className={styles.categoryFilterBtn}
                        onClick={() => {
                          setActiveCategory(category);
                          setMobileFiltersOpen(false);
                        }}
                        type="button"
                      >
                        <span
                          className={styles.checkboxMock}
                          data-checked={isSelected ? "true" : undefined}
                        />
                        <span className={styles.filterText}>
                          {category === "All" ? "All Categories" : category}
                        </span>
                        <span className={styles.countBadge}>{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Filter Group: Discount Range */}
            <div className={styles.filterGroup}>
              <h4 className={styles.groupHeading}>Discount</h4>
              <div className={styles.radioList}>
                {[
                  { value: 0, label: "All Discounts" },
                  { value: 10, label: "10% or more" },
                  { value: 15, label: "15% or more" },
                  { value: 20, label: "20% or more" },
                ].map((opt) => (
                  <button
                    aria-pressed={minDiscount === opt.value}
                    className={styles.filterPillBtn}
                    key={opt.value}
                    onClick={() => {
                      setMinDiscount(opt.value);
                      setMobileFiltersOpen(false);
                    }}
                    type="button"
                  >
                    <span
                      className={styles.radioMock}
                      data-checked={minDiscount === opt.value ? "true" : undefined}
                    />
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Price Range */}
            <div className={styles.filterGroup}>
              <h4 className={styles.groupHeading}>Price Range</h4>
              <div className={styles.radioList}>
                {[
                  { value: "all" as const, label: "All Prices" },
                  { value: "under-150" as const, label: "Under Rs. 150" },
                  { value: "150-300" as const, label: "Rs. 150 – Rs. 300" },
                  { value: "above-300" as const, label: "Above Rs. 300" },
                ].map((opt) => (
                  <button
                    aria-pressed={priceFilter === opt.value}
                    className={styles.filterPillBtn}
                    key={opt.value}
                    onClick={() => {
                      setPriceFilter(opt.value);
                      setMobileFiltersOpen(false);
                    }}
                    type="button"
                  >
                    <span
                      className={styles.radioMock}
                      data-checked={priceFilter === opt.value ? "true" : undefined}
                    />
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Customer Rating */}
            <div className={styles.filterGroup}>
              <h4 className={styles.groupHeading}>Customer Rating</h4>
              <div className={styles.radioList}>
                {[
                  { value: 0, label: "All Ratings" },
                  { value: 4.8, label: "4.8★ & above" },
                  { value: 4.5, label: "4.5★ & above" },
                ].map((opt) => (
                  <button
                    aria-pressed={minRating === opt.value}
                    className={styles.filterPillBtn}
                    key={opt.value}
                    onClick={() => {
                      setMinRating(opt.value);
                      setMobileFiltersOpen(false);
                    }}
                    type="button"
                  >
                    <span
                      className={styles.radioMock}
                      data-checked={minRating === opt.value ? "true" : undefined}
                    />
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Product Area */}
        <main className={styles.mainContent}>
          {/* Top Control Bar: Results count & Sort by */}
          <div className={styles.mainControlBar}>
            <div className={styles.resultsCountWrap}>
              <span className={styles.resultsCount}>
                Showing <strong>{visibleProducts.length}</strong> products
              </span>
              {hasActiveFilters ? (
                <span className={styles.filteredNotice}>• Filters applied</span>
              ) : null}
            </div>

            <div className={styles.controlBarActions}>
              {/* Mobile Filter Toggle Button */}
              <button
                className={styles.mobileFilterToggle}
                onClick={() => setMobileFiltersOpen(true)}
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className={styles.filterIcon}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <span>Filter</span>
                {hasActiveFilters ? <span className={styles.activeDot} /> : null}
              </button>

              {/* Sort By Dropdown */}
              <div className={styles.sortWrap}>
                <label className={styles.sortLabel} htmlFor="product-sort-select">
                  Sort by:
                </label>
                <select
                  className={styles.sortSelect}
                  id="product-sort-select"
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  value={sortBy}
                >
                  <option value="featured">Popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="discount-desc">Highest Discount</option>
                  <option value="rating-desc">Customer Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search notice if query is present */}
          {initialQuery ? (
            <div className={styles.searchSummary}>
              <p>
                Search results for <strong>“{initialQuery}”</strong>
              </p>
              <Link href="/products">Clear search</Link>
            </div>
          ) : null}

          {/* Product Grid */}
          {visibleProducts.length ? (
            <>
              <div className={styles.grid}>
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {pageCount > 1 ? (
                <div className={styles.tableFooter}>
                  <p>
                    Showing <strong>{startIndex + 1}</strong> to <strong>{endIndex}</strong> of{" "}
                    <strong>{visibleProducts.length}</strong> products
                  </p>

                  <nav aria-label="Product pagination" className={styles.pagination}>
                    <button
                      disabled={page === 1}
                      onClick={() => {
                        setPage((c) => c - 1);
                        if (typeof window !== "undefined") {
                          window.scrollTo({ behavior: "smooth", top: 280 });
                        }
                      }}
                      type="button"
                    >
                      Previous
                    </button>

                    <div>
                      {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                        (pageNumber) => (
                          <button
                            aria-current={pageNumber === page ? "page" : undefined}
                            aria-label={`Page ${pageNumber}`}
                            key={pageNumber}
                            onClick={() => {
                              setPage(pageNumber);
                              if (typeof window !== "undefined") {
                                window.scrollTo({ behavior: "smooth", top: 280 });
                              }
                            }}
                            type="button"
                          >
                            {pageNumber}
                          </button>
                        ),
                      )}
                    </div>

                    <button
                      disabled={page === pageCount}
                      onClick={() => {
                        setPage((c) => c + 1);
                        if (typeof window !== "undefined") {
                          window.scrollTo({ behavior: "smooth", top: 280 });
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
              <h2>No products found</h2>
              <p>No products match your selected filters. Try broadening your criteria.</p>
              <button className={styles.emptyResetBtn} onClick={resetAllFilters} type="button">
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

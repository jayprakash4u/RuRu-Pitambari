"use client";

import { useState } from "react";

import {
  AdminBadge,
  AdminShell,
  ProductModal,
  useAdmin,
  type AdminProduct,
} from "@/features/admin";

import styles from "../admin-table.module.css";

const nprFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  style: "currency",
});

export default function AdminProductsPage() {
  const { products, updateProductStock, updateProduct, addProduct, toggleProductActive } =
    useAdmin();

  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const categories = ["All", "Metal care", "Pooja care", "Kitchen care", "Floor care"];

  const filteredProducts = products.filter((prod) => {
    const matchesCat = categoryFilter === "All" ? true : prod.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      prod.name.toLowerCase().includes(q) ||
      prod.shortName.toLowerCase().includes(q) ||
      prod.variants.some((v) => v.sku.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  function handleSaveProduct(data: Partial<AdminProduct>) {
    if (selectedProduct) {
      updateProduct(selectedProduct.id, data);
    } else {
      addProduct({
        name: data.name ?? "New Product",
        shortName: data.shortName ?? "",
        category: data.category ?? "Metal care",
        description: data.description ?? "",
        imageUrl: data.imageUrl,
        variants: data.variants ?? [],
        active: true,
        featured: false,
      });
    }
  }

  return (
    <AdminShell
      subtitle="Manage product catalog, packaging variants, unit prices and live inventory levels."
      title="Products & Inventory"
    >
      <div className={styles.pageContainer}>
        {/* Filter and Add Button Bar */}
        <div className={styles.filterBar}>
          <div className={styles.searchBox}>
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" x2="16.65" y1="21" y2="16.65" />
            </svg>
            <input
              aria-label="Search products"
              className={styles.searchInput}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title or SKU..."
              type="search"
              value={searchQuery}
            />
          </div>

          <div className={styles.tabsGroup}>
            {categories.map((cat) => {
              const count =
                cat === "All" ? products.length : products.filter((p) => p.category === cat).length;
              return (
                <button
                  className={`${styles.tabBtn} ${categoryFilter === cat ? styles.tabBtnActive : ""}`}
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  type="button"
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          <button
            className={styles.primaryActionBtn}
            onClick={() => {
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
            type="button"
          >
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
            >
              <line x1="12" x2="12" y1="5" y2="19" />
              <line x1="5" x2="19" y1="12" y2="12" />
            </svg>
            <span>Add Product</span>
          </button>
        </div>

        {/* Products Table */}
        <div className={styles.tablePanel}>
          <div className={styles.tableWrapper}>
            {filteredProducts.length === 0 ? (
              <div className={styles.emptyState}>No products match your criteria.</div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Product Details</th>
                    <th className={styles.th}>Category</th>
                    <th className={styles.th}>Packaging Variants & Stock</th>
                    <th className={styles.th}>Visibility</th>
                    <th className={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const hasLowStock = product.variants.some(
                      (v) => v.stock <= v.lowStockThreshold,
                    );

                    return (
                      <tr className={styles.tr} key={product.id}>
                        <td className={styles.td} style={{ maxWidth: "300px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            {product.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                alt={product.name}
                                src={product.imageUrl}
                                style={{
                                  width: "2.75rem",
                                  height: "2.75rem",
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                  border: "1px solid #ede8df",
                                  flexShrink: 0,
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "2.75rem",
                                  height: "2.75rem",
                                  borderRadius: "6px",
                                  border: "1px solid #ede8df",
                                  backgroundColor: "#fbf9f4",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "0.75rem",
                                  color: "#8c1d24",
                                  fontWeight: 700,
                                  flexShrink: 0,
                                }}
                              >
                                RP
                              </div>
                            )}
                            <div>
                              <div>
                                <strong>{product.name}</strong>
                                {hasLowStock ? (
                                  <span style={{ marginLeft: "0.5rem" }}>
                                    <AdminBadge size="sm" variant="warning">
                                      Low Stock
                                    </AdminBadge>
                                  </span>
                                ) : null}
                              </div>
                              <div style={{ fontSize: "0.75rem", color: "var(--neutral-500)" }}>
                                {product.shortName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className={styles.td}>
                          <AdminBadge size="sm" variant="gold">
                            {product.category}
                          </AdminBadge>
                        </td>
                        <td className={styles.td}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {product.variants.map((v) => {
                              const isLow = v.stock <= v.lowStockThreshold;
                              return (
                                <div
                                  key={v.id}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  <span style={{ fontWeight: 600, minWidth: "55px" }}>
                                    {v.label}
                                  </span>
                                  <span style={{ color: "var(--neutral-600)", minWidth: "60px" }}>
                                    {nprFormatter.format(v.priceNpr)}
                                  </span>
                                  <span
                                    style={{
                                      color: isLow ? "#a33333" : "var(--neutral-800)",
                                      fontWeight: isLow ? 700 : 500,
                                      minWidth: "70px",
                                    }}
                                  >
                                    {v.stock} units {isLow ? "⚠️" : ""}
                                  </span>
                                  <div style={{ display: "flex", gap: "0.25rem" }}>
                                    <button
                                      aria-label={`Decrease ${product.name} ${v.label} stock by 5`}
                                      className={styles.actionBtn}
                                      onClick={() =>
                                        updateProductStock(product.id, v.id, v.stock - 5)
                                      }
                                      style={{ padding: "0.15rem 0.4rem" }}
                                      type="button"
                                    >
                                      -5
                                    </button>
                                    <button
                                      aria-label={`Increase ${product.name} ${v.label} stock by 10`}
                                      className={styles.actionBtn}
                                      onClick={() =>
                                        updateProductStock(product.id, v.id, v.stock + 10)
                                      }
                                      style={{ padding: "0.15rem 0.4rem" }}
                                      type="button"
                                    >
                                      +10
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </td>
                        <td className={styles.td}>
                          <button
                            className={styles.actionBtn}
                            onClick={() => toggleProductActive(product.id)}
                            style={{
                              backgroundColor: product.active ? "#f0f7f3" : "#fdf2f2",
                              color: product.active ? "#2b614d" : "#a33333",
                              borderColor: product.active ? "#c5e3d4" : "#f8c8c8",
                            }}
                            type="button"
                          >
                            {product.active ? "● Active in store" : "○ Hidden"}
                          </button>
                        </td>
                        <td className={styles.td}>
                          <button
                            className={styles.actionBtn}
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsModalOpen(true);
                            }}
                            type="button"
                          >
                            Edit Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {isModalOpen ? (
        <ProductModal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          onSave={handleSaveProduct}
          product={selectedProduct}
        />
      ) : null}
    </AdminShell>
  );
}

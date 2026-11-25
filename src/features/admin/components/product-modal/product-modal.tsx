"use client";

import { useState, type FormEvent } from "react";
import type { AdminProduct } from "../../types";
import styles from "./product-modal.module.css";

type ProductModalProps = {
  product?: AdminProduct | null;
  onClose: () => void;
  onSave: (productData: Partial<AdminProduct>) => void;
};

export function ProductModal({ product, onClose, onSave }: ProductModalProps) {
  const isEditing = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [shortName, setShortName] = useState(product?.shortName ?? "");
  const [category, setCategory] = useState<
    "Metal care" | "Pooja care" | "Kitchen care" | "Floor care"
  >(product?.category ?? "Metal care");
  const [description, setDescription] = useState(product?.description ?? "");
  const [variants, setVariants] = useState(
    product?.variants ?? [
      {
        id: "var-1",
        label: "100 g",
        priceNpr: 80,
        stock: 50,
        sku: "RP-NEW-100G",
        lowStockThreshold: 20,
      },
    ],
  );

  function handleVariantChange(index: number, field: string, value: string | number) {
    setVariants((prev) => prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)));
  }

  function handleAddVariant() {
    setVariants((prev) => [
      ...prev,
      {
        id: `var-${Date.now()}`,
        label: "New Variant",
        priceNpr: 100,
        stock: 25,
        sku: `SKU-${Date.now().toString().slice(-4)}`,
        lowStockThreshold: 10,
      },
    ]);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSave({
      name,
      shortName,
      category,
      description,
      variants,
    });
    onClose();
  }

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>
            {isEditing ? `Edit Product: ${product?.name}` : "Add New Product"}
          </h2>
          <button
            aria-label="Close modal"
            className={styles.closeBtn}
            onClick={onClose}
            type="button"
          >
            <svg
              fill="none"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="20"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="prod-name">
                Product Name
              </label>
              <input
                className={styles.input}
                id="prod-name"
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                value={name}
              />
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="prod-short">
                  Tagline / Subtitle
                </label>
                <input
                  className={styles.input}
                  id="prod-short"
                  onChange={(e) => setShortName(e.target.value)}
                  required
                  type="text"
                  value={shortName}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="prod-cat">
                  Category
                </label>
                <select
                  className={styles.select}
                  id="prod-cat"
                  onChange={(e) =>
                    setCategory(
                      e.target.value as "Metal care" | "Pooja care" | "Kitchen care" | "Floor care",
                    )
                  }
                  value={category}
                >
                  <option value="Metal care">Metal care</option>
                  <option value="Pooja care">Pooja care</option>
                  <option value="Kitchen care">Kitchen care</option>
                  <option value="Floor care">Floor care</option>
                </select>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="prod-desc">
                Description
              </label>
              <textarea
                className={styles.textarea}
                id="prod-desc"
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={2}
                value={description}
              />
            </div>

            <div className={styles.fieldGroup}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label className={styles.label}>Product Variants & Stock</label>
                <button
                  className={styles.cancelBtn}
                  onClick={handleAddVariant}
                  style={{ padding: "0.2rem 0.5rem", fontSize: "0.75rem" }}
                  type="button"
                >
                  + Add Variant
                </button>
              </div>

              {variants.map((v, idx) => (
                <div className={styles.variantBox} key={v.id}>
                  <div className={styles.variantHeader}>
                    <span>Variant #{idx + 1}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--neutral-400)" }}>
                      SKU: {v.sku}
                    </span>
                  </div>
                  <div className={styles.gridTwo}>
                    <div>
                      <span style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>
                        Size / Label
                      </span>
                      <input
                        className={styles.input}
                        onChange={(e) => handleVariantChange(idx, "label", e.target.value)}
                        type="text"
                        value={v.label}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>
                        Price (रु NPR)
                      </span>
                      <input
                        className={styles.input}
                        onChange={(e) =>
                          handleVariantChange(idx, "priceNpr", Number(e.target.value) || 0)
                        }
                        type="number"
                        value={v.priceNpr}
                      />
                    </div>
                  </div>
                  <div className={styles.gridTwo}>
                    <div>
                      <span style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>
                        Units in Stock
                      </span>
                      <input
                        className={styles.input}
                        onChange={(e) =>
                          handleVariantChange(idx, "stock", Number(e.target.value) || 0)
                        }
                        type="number"
                        value={v.stock}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>
                        Low Stock Alert
                      </span>
                      <input
                        className={styles.input}
                        onChange={(e) =>
                          handleVariantChange(idx, "lowStockThreshold", Number(e.target.value) || 0)
                        }
                        type="number"
                        value={v.lowStockThreshold}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button className={styles.cancelBtn} onClick={onClose} type="button">
              Cancel
            </button>
            <button className={styles.saveBtn} type="submit">
              {isEditing ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";

import { AdminShell, useAdmin } from "@/features/admin";
import styles from "../admin-table.module.css";

export default function AdminSettingsPage() {
  const { settings, updateSettings, resetToDefaults } = useAdmin();

  const [saved, setSaved] = useState(false);
  const [formState, setFormState] = useState(settings);

  function handleChange(field: string, value: string | number | boolean) {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    updateSettings(formState);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <AdminShell
      subtitle="Store contact information, shipping rules, tax identifiers and operational controls."
      title="Store Settings & Configuration"
    >
      <div className={styles.pageContainer} style={{ maxWidth: "760px" }}>
        {saved ? (
          <div
            style={{
              padding: "0.75rem 1rem",
              backgroundColor: "#f0f7f3",
              border: "1px solid #c5e3d4",
              borderRadius: "var(--radius-xs)",
              color: "#2b614d",
              fontSize: "0.8125rem",
              fontWeight: 600,
            }}
          >
            ✓ Settings saved successfully to active store state.
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Section 1: Business Profile */}
          <div className={styles.tablePanel} style={{ padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 1rem" }}>
              Business Profile
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label
                  htmlFor="store-name-input"
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--neutral-600)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Brand / Store Name
                </label>
                <input
                  id="store-name-input"
                  onChange={(e) => handleChange("storeName", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid var(--neutral-300)",
                    borderRadius: "var(--radius-xs)",
                    fontSize: "0.8125rem",
                  }}
                  type="text"
                  value={formState.storeName}
                />
              </div>

              <div>
                <label
                  htmlFor="pan-vat-input"
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--neutral-600)",
                    marginBottom: "0.25rem",
                  }}
                >
                  PAN / VAT Number
                </label>
                <input
                  id="pan-vat-input"
                  onChange={(e) => handleChange("panVatNumber", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid var(--neutral-300)",
                    borderRadius: "var(--radius-xs)",
                    fontSize: "0.8125rem",
                  }}
                  type="text"
                  value={formState.panVatNumber}
                />
              </div>

              <div>
                <label
                  htmlFor="support-phone-input"
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--neutral-600)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Customer Care Phone
                </label>
                <input
                  id="support-phone-input"
                  onChange={(e) => handleChange("supportPhone", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid var(--neutral-300)",
                    borderRadius: "var(--radius-xs)",
                    fontSize: "0.8125rem",
                  }}
                  type="text"
                  value={formState.supportPhone}
                />
              </div>

              <div>
                <label
                  htmlFor="support-email-input"
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--neutral-600)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Official Support Email
                </label>
                <input
                  id="support-email-input"
                  onChange={(e) => handleChange("supportEmail", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid var(--neutral-300)",
                    borderRadius: "var(--radius-xs)",
                    fontSize: "0.8125rem",
                  }}
                  type="email"
                  value={formState.supportEmail}
                />
              </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <label
                htmlFor="warehouse-addr-input"
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--neutral-600)",
                  marginBottom: "0.25rem",
                }}
              >
                Dispatch Hub & Central Warehouse Address
              </label>
              <input
                id="warehouse-addr-input"
                onChange={(e) => handleChange("warehouseAddress", e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid var(--neutral-300)",
                  borderRadius: "var(--radius-xs)",
                  fontSize: "0.8125rem",
                }}
                type="text"
                value={formState.warehouseAddress}
              />
            </div>
          </div>

          {/* Section 2: Shipping & Delivery Rates */}
          <div className={styles.tablePanel} style={{ padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 1rem" }}>
              Delivery Rates (NPR)
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              <div>
                <label
                  htmlFor="inside-valley-input"
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--neutral-600)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Inside Valley (रु)
                </label>
                <input
                  id="inside-valley-input"
                  onChange={(e) =>
                    handleChange("insideValleyDeliveryNpr", Number(e.target.value) || 0)
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid var(--neutral-300)",
                    borderRadius: "var(--radius-xs)",
                    fontSize: "0.8125rem",
                  }}
                  type="number"
                  value={formState.insideValleyDeliveryNpr}
                />
              </div>

              <div>
                <label
                  htmlFor="outside-valley-input"
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--neutral-600)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Outside Valley (रु)
                </label>
                <input
                  id="outside-valley-input"
                  onChange={(e) =>
                    handleChange("outsideValleyDeliveryNpr", Number(e.target.value) || 0)
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid var(--neutral-300)",
                    borderRadius: "var(--radius-xs)",
                    fontSize: "0.8125rem",
                  }}
                  type="number"
                  value={formState.outsideValleyDeliveryNpr}
                />
              </div>

              <div>
                <label
                  htmlFor="free-delivery-input"
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--neutral-600)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Free Shipping Over (रु)
                </label>
                <input
                  id="free-delivery-input"
                  onChange={(e) =>
                    handleChange("freeDeliveryThresholdNpr", Number(e.target.value) || 0)
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid var(--neutral-300)",
                    borderRadius: "var(--radius-xs)",
                    fontSize: "0.8125rem",
                  }}
                  type="number"
                  value={formState.freeDeliveryThresholdNpr}
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              className={styles.actionBtn}
              onClick={() => {
                if (window.confirm("Reset all admin state to default sample data?")) {
                  resetToDefaults();
                }
              }}
              style={{ color: "#a33333" }}
              type="button"
            >
              Reset to Default Data
            </button>

            <button className={styles.primaryActionBtn} type="submit">
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

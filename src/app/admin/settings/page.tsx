"use client";

import { useState, type FormEvent } from "react";

import { AdminShell, useAdmin } from "@/features/admin";
import styles from "./settings-page.module.css";

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
      <div className={styles.container}>
        {saved ? (
          <div className={styles.successToast}>
            <span>✓</span>
            <span>Settings saved successfully to active store state.</span>
          </div>
        ) : null}

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Section 1: Business Profile */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Business Profile</h2>
              <p className={styles.cardSubtitle}>
                Official brand identifiers used on customer receipts and dealer communications.
              </p>
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="store-name-input">
                  Brand / Store Name
                </label>
                <input
                  className={styles.input}
                  id="store-name-input"
                  onChange={(e) => handleChange("storeName", e.target.value)}
                  type="text"
                  value={formState.storeName}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="pan-vat-input">
                  PAN / VAT Number
                </label>
                <input
                  className={styles.input}
                  id="pan-vat-input"
                  onChange={(e) => handleChange("panVatNumber", e.target.value)}
                  type="text"
                  value={formState.panVatNumber}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="support-phone-input">
                  Customer Care Phone
                </label>
                <input
                  className={styles.input}
                  id="support-phone-input"
                  onChange={(e) => handleChange("supportPhone", e.target.value)}
                  type="text"
                  value={formState.supportPhone}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="support-email-input">
                  Official Support Email
                </label>
                <input
                  className={styles.input}
                  id="support-email-input"
                  onChange={(e) => handleChange("supportEmail", e.target.value)}
                  type="email"
                  value={formState.supportEmail}
                />
              </div>
            </div>

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label className={styles.label} htmlFor="warehouse-addr-input">
                Dispatch Hub &amp; Central Warehouse Address
              </label>
              <input
                className={styles.input}
                id="warehouse-addr-input"
                onChange={(e) => handleChange("warehouseAddress", e.target.value)}
                type="text"
                value={formState.warehouseAddress}
              />
            </div>
          </section>

          {/* Section 2: Shipping & Delivery Rates */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Delivery Rates (NPR)</h2>
              <p className={styles.cardSubtitle}>
                Standard delivery charges applied during checkout across Nepal.
              </p>
            </div>

            <div className={styles.gridThree}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="inside-valley-input">
                  Inside Valley (रु)
                </label>
                <input
                  className={styles.input}
                  id="inside-valley-input"
                  onChange={(e) =>
                    handleChange("insideValleyDeliveryNpr", Number(e.target.value) || 0)
                  }
                  type="number"
                  value={formState.insideValleyDeliveryNpr}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="outside-valley-input">
                  Outside Valley (रु)
                </label>
                <input
                  className={styles.input}
                  id="outside-valley-input"
                  onChange={(e) =>
                    handleChange("outsideValleyDeliveryNpr", Number(e.target.value) || 0)
                  }
                  type="number"
                  value={formState.outsideValleyDeliveryNpr}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="free-delivery-input">
                  Free Shipping Over (रु)
                </label>
                <input
                  className={styles.input}
                  id="free-delivery-input"
                  onChange={(e) =>
                    handleChange("freeDeliveryThresholdNpr", Number(e.target.value) || 0)
                  }
                  type="number"
                  value={formState.freeDeliveryThresholdNpr}
                />
              </div>
            </div>
          </section>

          {/* Action Row */}
          <div className={styles.actionsBar}>
            <button
              className={styles.resetBtn}
              onClick={() => {
                if (window.confirm("Reset all admin state to default sample data?")) {
                  resetToDefaults();
                }
              }}
              type="button"
            >
              Reset to Default Data
            </button>

            <button className={styles.saveBtn} type="submit">
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

"use client";

import { useState } from "react";

import { AdminShell, useAdmin } from "@/features/admin";

import styles from "../content-page.module.css";

export default function AdminCombosPageContent() {
  const { siteContent, updateSiteContent } = useAdmin();
  const [savedToast, setSavedToast] = useState(false);
  const [combosDraft, setCombosDraft] = useState(siteContent.combos);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateSiteContent("combos", combosDraft);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
    }, 3500);
  }

  function handleReset() {
    setCombosDraft(siteContent.combos);
  }

  return (
    <AdminShell
      subtitle="Manage promotional discount announcements, page title, and top banner notices on combo packs."
      title="Combo Offers Page"
    >
      <div className={styles.pageContainer}>
        {savedToast ? (
          <div className={styles.toast}>
            <span>✓ Combo offers promotional notices updated successfully!</span>
            <button
              aria-label="Close notification"
              onClick={() => setSavedToast(false)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#2b614d" }}
              type="button"
            >
              ✕
            </button>
          </div>
        ) : null}

        <form className={styles.editorForm} onSubmit={handleSave}>
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>Combo Offers Page Configuration</h2>
                <p className={styles.cardSubtitle}>
                  Promotional banners and top notice on the combo packs catalogue page.
                </p>
              </div>
              <span className={styles.sectionBadge}>Combos Page</span>
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="combo-title">
                  Page Title
                </label>
                <input
                  className={styles.input}
                  id="combo-title"
                  onChange={(e) => setCombosDraft({ ...combosDraft, pageTitle: e.target.value })}
                  value={combosDraft.pageTitle}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="combo-sub">
                  Page Subtitle
                </label>
                <input
                  className={styles.input}
                  id="combo-sub"
                  onChange={(e) => setCombosDraft({ ...combosDraft, pageSubtitle: e.target.value })}
                  value={combosDraft.pageSubtitle}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="combo-banner">
                Top Promotional Banner Notice
              </label>
              <input
                className={styles.input}
                id="combo-banner"
                onChange={(e) => setCombosDraft({ ...combosDraft, bannerNotice: e.target.value })}
                value={combosDraft.bannerNotice}
              />
            </div>
          </div>

          <div className={styles.bottomActionBar}>
            <button className={styles.resetBtn} onClick={handleReset} type="button">
              Reset Changes
            </button>
            <button className={styles.saveBtn} type="submit">
              Save Combo Page Changes
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

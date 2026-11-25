"use client";

import { AdminShell, useAdmin } from "@/features/admin";

import styles from "../content-page.module.css";

export default function AdminGalleryPageContent() {
  const { siteContent } = useAdmin();

  return (
    <AdminShell
      subtitle="View and manage documentary photos, batch blending inspections, and annual dealer meets."
      title="Gallery & Media"
    >
      <div className={styles.pageContainer}>
        <div className={styles.sectionCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Gallery Page Headlines & Items</h2>
              <p className={styles.cardSubtitle}>
                Manage documentary photos, factory images, and event highlights.
              </p>
            </div>
            <span className={styles.sectionBadge}>Photo Gallery</span>
          </div>

          <div className={styles.gridTwo}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="gal-title">
                Gallery Page Title
              </label>
              <input
                className={styles.input}
                id="gal-title"
                readOnly
                value={siteContent.gallery.pageTitle}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="gal-sub">
                Gallery Subtitle
              </label>
              <input
                className={styles.input}
                id="gal-sub"
                readOnly
                value={siteContent.gallery.pageSubtitle}
              />
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <span className={styles.label} style={{ marginBottom: "0.5rem" }}>
              Active Media Items ({siteContent.gallery.items.length} items)
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {siteContent.gallery.items.map((item) => (
                <div className={styles.imagePreviewRow} key={item.id}>
                  <div className={styles.imageHint}>
                    <strong>{item.title}</strong>
                    <div style={{ color: "#8c1d24", fontSize: "0.6875rem" }}>
                      Category: {item.category}
                    </div>
                    <div>{item.caption}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

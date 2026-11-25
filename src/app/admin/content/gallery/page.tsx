"use client";

import { useState } from "react";

import { AdminShell, MediaUploader, useAdmin, type GalleryContentItem } from "@/features/admin";

import styles from "../content-page.module.css";

export default function AdminGalleryPageContent() {
  const { siteContent, updateSiteContent } = useAdmin();
  const [savedToast, setSavedToast] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<
    "Events" | "Products" | "Factory & Workshop" | "Dealers"
  >("Events");
  const [newImage, setNewImage] = useState("");
  const [newCaption, setNewCaption] = useState("");

  function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newImage) return;

    const newItem: GalleryContentItem = {
      id: `gal-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      imageUrl: newImage,
      caption: newCaption.trim(),
    };

    updateSiteContent("gallery", {
      ...siteContent.gallery,
      items: [newItem, ...siteContent.gallery.items],
    });

    setNewTitle("");
    setNewImage("");
    setNewCaption("");
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3500);
  }

  function handleRemoveItem(id: string) {
    updateSiteContent("gallery", {
      ...siteContent.gallery,
      items: siteContent.gallery.items.filter((item) => item.id !== id),
    });
  }

  return (
    <AdminShell
      subtitle="Upload documentary photos, factory pictures, and dealer meet highlights directly from your device."
      title="Gallery & Media"
    >
      <div className={styles.pageContainer}>
        {savedToast ? (
          <div className={styles.toast}>
            <span>✓ Photo added to the live gallery successfully!</span>
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

        {/* Add New Gallery Item Card */}
        <form className={styles.editorForm} onSubmit={handleAddItem}>
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>Upload New Photo to Gallery</h2>
                <p className={styles.cardSubtitle}>
                  Select picture from your computer or phone device, choose a category, and publish.
                </p>
              </div>
              <span className={styles.sectionBadge}>Add Photo</span>
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="gal-new-title">
                  Photo Title / Event Name
                </label>
                <input
                  className={styles.input}
                  id="gal-new-title"
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Pokhara Retailer Workshop"
                  required
                  value={newTitle}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="gal-new-category">
                  Gallery Category
                </label>
                <select
                  className={styles.input}
                  id="gal-new-category"
                  onChange={(e) =>
                    setNewCategory(
                      e.target.value as "Events" | "Products" | "Factory & Workshop" | "Dealers",
                    )
                  }
                  value={newCategory}
                >
                  <option value="Events">Events</option>
                  <option value="Products">Products</option>
                  <option value="Factory & Workshop">Factory & Workshop</option>
                  <option value="Dealers">Dealers</option>
                </select>
              </div>
            </div>

            <MediaUploader
              accept="image"
              helperText="Upload JPG, PNG, or WebP photo from device"
              label="Choose Picture from Device"
              onChange={(imgData) => setNewImage(imgData)}
              value={newImage}
            />

            <div className={styles.field}>
              <label className={styles.label} htmlFor="gal-new-caption">
                Caption / Story Description
              </label>
              <textarea
                className={styles.textarea}
                id="gal-new-caption"
                onChange={(e) => setNewCaption(e.target.value)}
                placeholder="Brief description of the photo or documentary context..."
                value={newCaption}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className={styles.saveBtn} disabled={!newImage || !newTitle} type="submit">
                Upload & Add Photo to Gallery
              </button>
            </div>
          </div>
        </form>

        {/* Existing Gallery Media List */}
        <div className={styles.sectionCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Published Gallery Photos</h2>
              <p className={styles.cardSubtitle}>
                {siteContent.gallery.items.length} media items currently active on the website
                gallery.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {siteContent.gallery.items.map((item) => (
              <div className={styles.imagePreviewRow} key={item.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={item.title} className={styles.previewThumb} src={item.imageUrl} />
                <div className={styles.imageHint} style={{ flex: 1 }}>
                  <strong>{item.title}</strong>
                  <div style={{ color: "#8c1d24", fontSize: "0.75rem", fontWeight: 600 }}>
                    Category: {item.category}
                  </div>
                  <div>{item.caption}</div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  style={{
                    color: "#a33333",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.8125rem",
                    padding: "0.35rem 0.65rem",
                  }}
                  type="button"
                >
                  Delete photo
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

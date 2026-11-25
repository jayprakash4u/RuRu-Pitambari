"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AdminShell, MediaUploader, useAdmin, type GalleryPhoto } from "@/features/admin";

import styles from "./gallery-admin.module.css";

export default function AdminGalleryPageContent() {
  const { siteContent, updateSiteContent } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<GalleryPhoto | null>(null);

  // New photo form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<GalleryPhoto["category"]>("Events");
  const [newImage, setNewImage] = useState("");
  const [newCaption, setNewCaption] = useState("");

  const photos = siteContent.gallery.photos;

  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      const matchesCategory = categoryFilter === "All" ? true : p.category === categoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.caption && p.caption.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [photos, categoryFilter, searchQuery]);

  function handleUploadPhoto(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newImage) return;

    const newPhoto: GalleryPhoto = {
      id: `pho-${Date.now()}`,
      title: newTitle.trim(),
      imageUrl: newImage,
      category: newCategory,
      caption: newCaption.trim() || undefined,
      uploadedAt: new Date().toISOString(),
    };

    updateSiteContent("gallery", {
      ...siteContent.gallery,
      photos: [newPhoto, ...photos],
    });

    setNewTitle("");
    setNewImage("");
    setNewCaption("");
    setIsUploadModalOpen(false);
  }

  function handleDeletePhoto(id: string) {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;
    const updated = photos.filter((p) => p.id !== id);
    updateSiteContent("gallery", {
      ...siteContent.gallery,
      photos: updated,
    });
    if (previewPhoto?.id === id) setPreviewPhoto(null);
  }

  function formatDate(iso: string) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  }

  return (
    <AdminShell
      subtitle="Upload and manage all brand, factory, and community photos shown on the website."
      title="Gallery Photos"
    >
      <div className={styles.pageContainer}>
        {/* Top Action Buttons */}
        <div className={styles.topActionsRow}>
          <Link className={styles.viewGalleryBtn} href="/gallery" target="_blank">
            <span>View live gallery</span>
            <svg
              fill="none"
              height="14"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="14"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" x2="21" y1="14" y2="3" />
            </svg>
          </Link>

          <button
            className={styles.primaryActionBtn}
            onClick={() => setIsUploadModalOpen(true)}
            type="button"
          >
            + Upload new photo
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className={styles.filterRow}>
          <div className={styles.searchBox}>
            <input
              className={styles.searchInput}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photos by title, category, or caption..."
              type="search"
              value={searchQuery}
            />
          </div>

          <select
            className={styles.categorySelect}
            onChange={(e) => setCategoryFilter(e.target.value)}
            value={categoryFilter}
          >
            <option value="All">All Categories</option>
            <option value="Events">Events</option>
            <option value="Factory & Workshop">Factory & Workshop</option>
            <option value="Products & Demos">Products & Demos</option>
            <option value="Festivals & Heritage">Festivals & Heritage</option>
          </select>
        </div>

        {/* Results Count */}
        <div className={styles.resultsCount}>
          Showing 1-{filteredPhotos.length} of {filteredPhotos.length} photos
        </div>

        {/* Clean Photos List (Row-by-Row, Not Cards) */}
        <div className={styles.photoListCard}>
          {filteredPhotos.length === 0 ? (
            <div className={styles.emptyState}>No photos match the selected search or filter.</div>
          ) : (
            filteredPhotos.map((photo) => (
              <div className={styles.photoRow} key={photo.id}>
                <div className={styles.photoLeft}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={photo.title}
                    className={styles.photoThumb}
                    onClick={() => setPreviewPhoto(photo)}
                    src={photo.imageUrl}
                  />

                  <div className={styles.photoInfo}>
                    <div className={styles.photoTitle}>{photo.title}</div>
                    <div className={styles.photoSubRow}>
                      <span className={styles.categoryBadge}>{photo.category}</span>
                      <span className={styles.photoCaption}>
                        {photo.caption || "No caption provided"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.photoRight}>
                  <span className={styles.dateTimestamp}>{formatDate(photo.uploadedAt)}</span>

                  <button
                    className={styles.actionPreview}
                    onClick={() => setPreviewPhoto(photo)}
                    type="button"
                  >
                    Preview
                  </button>

                  <button
                    className={styles.actionDelete}
                    onClick={() => handleDeletePhoto(photo.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* MODAL: + Upload New Photo */}
        {isUploadModalOpen ? (
          <div className={styles.modalBackdrop} onClick={() => setIsUploadModalOpen(false)}>
            <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Upload Photo to Gallery</h2>
                <button
                  aria-label="Close dialog"
                  className={styles.closeBtn}
                  onClick={() => setIsUploadModalOpen(false)}
                  type="button"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUploadPhoto}>
                <div className={styles.modalBody}>
                  <MediaUploader
                    accept="image"
                    helperText="Upload JPG, PNG, or WebP picture from your device"
                    label="Choose Photo from Device"
                    onChange={(img) => setNewImage(img)}
                    value={newImage}
                  />

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="photo-title-input">
                      Photo Title
                    </label>
                    <input
                      className={styles.searchInput}
                      id="photo-title-input"
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Annual Dealer Partnership Meet"
                      required
                      value={newTitle}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="photo-cat-select">
                      Category Tag
                    </label>
                    <select
                      className={styles.searchInput}
                      id="photo-cat-select"
                      onChange={(e) => setNewCategory(e.target.value as GalleryPhoto["category"])}
                      value={newCategory}
                    >
                      <option value="Events">Events</option>
                      <option value="Factory & Workshop">Factory & Workshop</option>
                      <option value="Products & Demos">Products & Demos</option>
                      <option value="Festivals & Heritage">Festivals & Heritage</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="photo-caption-input">
                      Caption / Context (Optional)
                    </label>
                    <textarea
                      className={styles.searchInput}
                      id="photo-caption-input"
                      onChange={(e) => setNewCaption(e.target.value)}
                      placeholder="Add brief details about the event, location, or products shown..."
                      rows={3}
                      value={newCaption}
                    />
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <button
                    className={styles.secondaryBtn}
                    onClick={() => setIsUploadModalOpen(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.primaryActionBtn}
                    disabled={!newTitle.trim() || !newImage}
                    type="submit"
                  >
                    Upload & Publish Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        {/* MODAL: Large Preview */}
        {previewPhoto ? (
          <div className={styles.modalBackdrop} onClick={() => setPreviewPhoto(null)}>
            <div
              className={styles.modalWindow}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "640px" }}
            >
              <div className={styles.modalHeader}>
                <div>
                  <h2 className={styles.modalTitle}>{previewPhoto.title}</h2>
                  <span
                    className={styles.categoryBadge}
                    style={{ marginTop: "0.25rem", display: "inline-block" }}
                  >
                    {previewPhoto.category}
                  </span>
                </div>
                <button
                  aria-label="Close dialog"
                  className={styles.closeBtn}
                  onClick={() => setPreviewPhoto(null)}
                  type="button"
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalBody}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={previewPhoto.title}
                  className={styles.previewImageLarge}
                  src={previewPhoto.imageUrl}
                />
                <p style={{ margin: 0, fontSize: "0.875rem", color: "#3b3934" }}>
                  {previewPhoto.caption || "No caption provided"}
                </p>
                <div style={{ fontSize: "0.75rem", color: "#706c63" }}>
                  Uploaded on {formatDate(previewPhoto.uploadedAt)}
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  className={styles.actionDelete}
                  onClick={() => handleDeletePhoto(previewPhoto.id)}
                  style={{ marginRight: "auto" }}
                  type="button"
                >
                  Delete this photo
                </button>
                <button
                  className={styles.secondaryBtn}
                  onClick={() => setPreviewPhoto(null)}
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </AdminShell>
  );
}

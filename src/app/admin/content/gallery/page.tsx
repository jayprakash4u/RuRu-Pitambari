"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AdminShell, MediaUploader, useAdmin, type GalleryPhoto } from "@/features/admin";

import styles from "./gallery-admin.module.css";

export default function AdminGalleryPageContent() {
  const { siteContent, updateSiteContent } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState<{ photo: GalleryPhoto; index: number } | null>(
    null,
  );

  // New photo form state (simple image upload from device, numbered sequentially)
  const [newImage, setNewImage] = useState("");

  const photos = siteContent.gallery.photos;

  const filteredPhotos = useMemo(() => {
    return photos
      .map((photo, index) => ({ photo, originalIndex: index }))
      .filter(({ originalIndex }) => {
        const q = searchQuery.toLowerCase().trim();
        const numberLabel = `photo #${originalIndex + 1}`;
        const shortNumber = `#${originalIndex + 1}`;
        const matchesSearch =
          !q || numberLabel.includes(q) || shortNumber === q || String(originalIndex + 1) === q;

        return matchesSearch;
      });
  }, [photos, searchQuery]);

  function handleUploadPhoto(e: React.FormEvent) {
    e.preventDefault();
    if (!newImage) return;

    const newPhoto: GalleryPhoto = {
      id: `pho-${Date.now()}`,
      imageUrl: newImage,
      uploadedAt: new Date().toISOString(),
    };

    updateSiteContent("gallery", {
      ...siteContent.gallery,
      photos: [newPhoto, ...photos],
    });

    setNewImage("");
    setIsUploadModalOpen(false);
  }

  function handleDeletePhoto(id: string) {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;
    const updated = photos.filter((p) => p.id !== id);
    updateSiteContent("gallery", {
      ...siteContent.gallery,
      photos: updated,
    });
    if (previewData?.photo.id === id) setPreviewData(null);
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
      actions={
        <>
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
            + Add photo
          </button>
        </>
      }
      subtitle="Upload and manage website gallery photos. Indexed number-wise for admin reference."
      title="Gallery Photos"
    >
      <div className={styles.pageContainer}>
        {/* Filter and Search Bar */}
        <div className={styles.filterRow}>
          <div className={styles.searchBox}>
            <input
              className={styles.searchInput}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photo by number (e.g. 1, #2)..."
              type="search"
              value={searchQuery}
            />
          </div>

          <div className={styles.resultsCount}>
            Showing 1-{filteredPhotos.length} of {filteredPhotos.length} photos
          </div>
        </div>

        {/* Numbered Photo List (Row-by-Row) */}
        <div className={styles.photoListCard}>
          {filteredPhotos.length === 0 ? (
            <div className={styles.emptyState}>No photos found.</div>
          ) : (
            filteredPhotos.map(({ photo, originalIndex }) => (
              <div className={styles.photoRow} key={photo.id}>
                <div className={styles.photoLeft}>
                  {/* Number identifier for admin view only */}
                  <span className={styles.photoIndex}>#{originalIndex + 1}</span>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={`Photo #${originalIndex + 1}`}
                    className={styles.photoThumb}
                    onClick={() => setPreviewData({ photo, index: originalIndex })}
                    src={photo.imageUrl}
                  />

                  <div className={styles.photoInfo}>
                    <div className={styles.photoTitle}>Photo #{originalIndex + 1}</div>
                    <div className={styles.photoUploadDate}>
                      Uploaded on {formatDate(photo.uploadedAt)}
                    </div>
                  </div>
                </div>

                <div className={styles.photoRight}>
                  <button
                    className={styles.actionPreview}
                    onClick={() => setPreviewData({ photo, index: originalIndex })}
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
                <h2 className={styles.modalTitle}>Upload Photo from Device</h2>
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
                    helperText="Upload JPG, PNG, or WebP picture from computer or phone"
                    label="Select Picture from Device"
                    onChange={(img) => setNewImage(img)}
                    value={newImage}
                  />
                </div>

                <div className={styles.modalFooter}>
                  <button
                    className={styles.secondaryBtn}
                    onClick={() => setIsUploadModalOpen(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button className={styles.primaryActionBtn} disabled={!newImage} type="submit">
                    Upload Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        {/* MODAL: Large Preview */}
        {previewData ? (
          <div className={styles.modalBackdrop} onClick={() => setPreviewData(null)}>
            <div
              className={styles.modalWindow}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "640px" }}
            >
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Photo #{previewData.index + 1}</h2>
                <button
                  aria-label="Close dialog"
                  className={styles.closeBtn}
                  onClick={() => setPreviewData(null)}
                  type="button"
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalBody}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`Photo #${previewData.index + 1}`}
                  className={styles.previewImageLarge}
                  src={previewData.photo.imageUrl}
                />
                <div className={styles.photoUploadDate}>
                  Uploaded on {formatDate(previewData.photo.uploadedAt)}
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  className={styles.actionDelete}
                  onClick={() => handleDeletePhoto(previewData.photo.id)}
                  style={{ marginRight: "auto" }}
                  type="button"
                >
                  Delete this photo
                </button>
                <button
                  className={styles.secondaryBtn}
                  onClick={() => setPreviewData(null)}
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

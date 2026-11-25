"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AdminShell, MediaUploader, useAdmin, type GalleryAlbum } from "@/features/admin";

import styles from "./gallery-admin.module.css";

export default function AdminGalleryPageContent() {
  const { siteContent, updateSiteContent } = useAdmin();
  const [activeSubTab, setActiveSubTab] = useState<"Albums" | "All Photos">("Albums");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isNewAlbumModalOpen, setIsNewAlbumModalOpen] = useState(false);
  const [isAddImagesModalOpen, setIsAddImagesModalOpen] = useState(false);
  const [openedAlbum, setOpenedAlbum] = useState<GalleryAlbum | null>(null);

  // Form states for modals
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumCover, setNewAlbumCover] = useState("");

  const [targetAlbumId, setTargetAlbumId] = useState<string>(
    siteContent.gallery.albums[0]?.id || "",
  );
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageCaption, setImageCaption] = useState("");

  const albums = siteContent.gallery.albums;

  const filteredAlbums = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return albums;
    return albums.filter((a) => a.title.toLowerCase().includes(q));
  }, [albums, searchQuery]);

  // All photos flat list
  const allPhotos = useMemo(() => {
    return albums.flatMap((album) =>
      album.images.map((img) => ({
        ...img,
        albumTitle: album.title,
        albumId: album.id,
      })),
    );
  }, [albums]);

  function handleCreateAlbum(e: React.FormEvent) {
    e.preventDefault();
    if (!newAlbumTitle.trim() || !newAlbumCover) return;

    const newAlbum: GalleryAlbum = {
      id: `alb-${Date.now()}`,
      title: newAlbumTitle.trim(),
      coverImage: newAlbumCover,
      images: [
        {
          id: `img-${Date.now()}`,
          url: newAlbumCover,
          caption: "Cover photo",
        },
      ],
    };

    updateSiteContent("gallery", {
      ...siteContent.gallery,
      albums: [newAlbum, ...albums],
    });

    setNewAlbumTitle("");
    setNewAlbumCover("");
    setIsNewAlbumModalOpen(false);
  }

  function handleAddImageToAlbum(e: React.FormEvent) {
    e.preventDefault();
    if (!targetAlbumId || !uploadedImage) return;

    const updatedAlbums = albums.map((alb) => {
      if (alb.id !== targetAlbumId) return alb;
      return {
        ...alb,
        images: [
          ...alb.images,
          {
            id: `img-${Date.now()}`,
            url: uploadedImage,
            caption: imageCaption.trim() || undefined,
          },
        ],
      };
    });

    updateSiteContent("gallery", {
      ...siteContent.gallery,
      albums: updatedAlbums,
    });

    setUploadedImage("");
    setImageCaption("");
    setIsAddImagesModalOpen(false);
  }

  function handleDeleteAlbum(id: string) {
    if (!confirm("Are you sure you want to delete this album?")) return;
    const updatedAlbums = albums.filter((a) => a.id !== id);
    updateSiteContent("gallery", {
      ...siteContent.gallery,
      albums: updatedAlbums,
    });
    if (openedAlbum?.id === id) setOpenedAlbum(null);
  }

  function handleDeletePhotoFromAlbum(albumId: string, photoId: string) {
    const updatedAlbums = albums.map((alb) => {
      if (alb.id !== albumId) return alb;
      return {
        ...alb,
        images: alb.images.filter((img) => img.id !== photoId),
      };
    });

    updateSiteContent("gallery", {
      ...siteContent.gallery,
      albums: updatedAlbums,
    });

    if (openedAlbum && openedAlbum.id === albumId) {
      setOpenedAlbum({
        ...openedAlbum,
        images: openedAlbum.images.filter((img) => img.id !== photoId),
      });
    }
  }

  return (
    <AdminShell
      subtitle="Manage albums, upload photos from device, and organise media."
      title="Gallery"
    >
      <div className={styles.pageContainer}>
        {/* Top Action Buttons (Matching Reference) */}
        <div className={styles.topActionsRow}>
          <Link className={styles.viewGalleryBtn} href="/gallery" target="_blank">
            <span>View gallery</span>
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
            className={styles.secondaryActionBtn}
            onClick={() => setIsNewAlbumModalOpen(true)}
            type="button"
          >
            + New album
          </button>

          <button
            className={styles.primaryActionBtn}
            onClick={() => {
              setTargetAlbumId(albums[0]?.id || "");
              setIsAddImagesModalOpen(true);
            }}
            type="button"
          >
            + Add images
          </button>
        </div>

        {/* Sub Navigation Tabs */}
        <div className={styles.tabNavRow}>
          <button
            className={`${styles.tabTextBtn} ${activeSubTab === "Albums" ? styles.tabTextBtnActive : ""}`}
            onClick={() => setActiveSubTab("Albums")}
            type="button"
          >
            Albums
          </button>
          <button
            className={`${styles.tabTextBtn} ${activeSubTab === "All Photos" ? styles.tabTextBtnActive : ""}`}
            onClick={() => setActiveSubTab("All Photos")}
            type="button"
          >
            All Photos ({allPhotos.length})
          </button>
        </div>

        {/* ALBUMS VIEW */}
        {activeSubTab === "Albums" ? (
          <>
            {/* Search Albums Input */}
            <div className={styles.searchBox}>
              <input
                className={styles.searchInput}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search albums..."
                type="search"
                value={searchQuery}
              />
            </div>

            {/* List of Albums (Pixel-aligned with Reference UI) */}
            <div className={styles.albumListCard}>
              {filteredAlbums.length === 0 ? (
                <div className={styles.emptyState}>No albums found matching your search.</div>
              ) : (
                filteredAlbums.map((album) => (
                  <div className={styles.albumRow} key={album.id}>
                    <div className={styles.albumLeft}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt={album.title} className={styles.albumThumb} src={album.coverImage} />
                      <div className={styles.albumInfo}>
                        <div className={styles.albumTitle}>{album.title}</div>
                        <div className={styles.albumCount}>
                          {album.images.length} image{album.images.length === 1 ? "" : "s"}
                        </div>
                      </div>
                    </div>

                    <div className={styles.albumActions}>
                      <button
                        className={styles.actionOpen}
                        onClick={() => setOpenedAlbum(album)}
                        type="button"
                      >
                        Open
                      </button>
                      <button
                        className={styles.actionAddImages}
                        onClick={() => {
                          setTargetAlbumId(album.id);
                          setIsAddImagesModalOpen(true);
                        }}
                        type="button"
                      >
                        Add images
                      </button>
                      <button
                        className={styles.actionDelete}
                        onClick={() => handleDeleteAlbum(album.id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          /* ALL PHOTOS VIEW */
          <div className={styles.photosGrid}>
            {allPhotos.map((photo) => (
              <div className={styles.photoCard} key={photo.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={photo.caption || "Gallery Photo"}
                  className={styles.gridImg}
                  src={photo.url}
                />
                <div className={styles.photoMeta}>
                  <strong style={{ color: "#171612" }}>{photo.albumTitle}</strong>
                  <span style={{ color: "#706c63" }}>{photo.caption || "No caption"}</span>
                  <button
                    onClick={() => handleDeletePhotoFromAlbum(photo.albumId, photo.id)}
                    style={{
                      color: "#a33333",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      padding: "0.25rem 0",
                      textAlign: "left",
                      marginTop: "0.25rem",
                    }}
                    type="button"
                  >
                    Delete image
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL: + New Album */}
        {isNewAlbumModalOpen ? (
          <div className={styles.modalBackdrop} onClick={() => setIsNewAlbumModalOpen(false)}>
            <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Create New Album</h2>
                <button
                  aria-label="Close dialog"
                  className={styles.closeBtn}
                  onClick={() => setIsNewAlbumModalOpen(false)}
                  type="button"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateAlbum}>
                <div className={styles.modalBody}>
                  <div>
                    <label
                      htmlFor="album-title-input"
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#3b3934",
                        marginBottom: "0.35rem",
                      }}
                    >
                      Album Title
                    </label>
                    <input
                      className={styles.searchInput}
                      id="album-title-input"
                      onChange={(e) => setNewAlbumTitle(e.target.value)}
                      placeholder="e.g. Retailer Partnership Meet 2026"
                      required
                      value={newAlbumTitle}
                    />
                  </div>

                  <MediaUploader
                    accept="image"
                    helperText="Upload album cover photo from computer or phone"
                    label="Album Cover Photo (Upload from device)"
                    onChange={(cover) => setNewAlbumCover(cover)}
                    value={newAlbumCover}
                  />
                </div>

                <div className={styles.modalFooter}>
                  <button
                    className={styles.secondaryActionBtn}
                    onClick={() => setIsNewAlbumModalOpen(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.primaryActionBtn}
                    disabled={!newAlbumTitle.trim() || !newAlbumCover}
                    type="submit"
                  >
                    Create Album
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        {/* MODAL: + Add Images */}
        {isAddImagesModalOpen ? (
          <div className={styles.modalBackdrop} onClick={() => setIsAddImagesModalOpen(false)}>
            <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Add Images to Album</h2>
                <button
                  aria-label="Close dialog"
                  className={styles.closeBtn}
                  onClick={() => setIsAddImagesModalOpen(false)}
                  type="button"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddImageToAlbum}>
                <div className={styles.modalBody}>
                  <div>
                    <label
                      htmlFor="target-album-select"
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#3b3934",
                        marginBottom: "0.35rem",
                      }}
                    >
                      Select Destination Album
                    </label>
                    <select
                      className={styles.searchInput}
                      id="target-album-select"
                      onChange={(e) => setTargetAlbumId(e.target.value)}
                      value={targetAlbumId}
                    >
                      {albums.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.title} ({a.images.length} images)
                        </option>
                      ))}
                    </select>
                  </div>

                  <MediaUploader
                    accept="image"
                    helperText="Upload image file directly from device"
                    label="Choose Image from Device"
                    onChange={(img) => setUploadedImage(img)}
                    value={uploadedImage}
                  />

                  <div>
                    <label
                      htmlFor="img-caption-input"
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#3b3934",
                        marginBottom: "0.35rem",
                      }}
                    >
                      Image Caption (Optional)
                    </label>
                    <input
                      className={styles.searchInput}
                      id="img-caption-input"
                      onChange={(e) => setImageCaption(e.target.value)}
                      placeholder="e.g. Traditional copper gagri after single application"
                      value={imageCaption}
                    />
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <button
                    className={styles.secondaryActionBtn}
                    onClick={() => setIsAddImagesModalOpen(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.primaryActionBtn}
                    disabled={!uploadedImage}
                    type="submit"
                  >
                    Add to Album
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        {/* MODAL: Open Album Viewer */}
        {openedAlbum ? (
          <div className={styles.modalBackdrop} onClick={() => setOpenedAlbum(null)}>
            <div
              className={styles.modalWindow}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "700px" }}
            >
              <div className={styles.modalHeader}>
                <div>
                  <h2 className={styles.modalTitle}>{openedAlbum.title}</h2>
                  <span style={{ fontSize: "0.75rem", color: "#706c63" }}>
                    {openedAlbum.images.length} photos in this album
                  </span>
                </div>
                <button
                  aria-label="Close dialog"
                  className={styles.closeBtn}
                  onClick={() => setOpenedAlbum(null)}
                  type="button"
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalBody}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    className={styles.primaryActionBtn}
                    onClick={() => {
                      setTargetAlbumId(openedAlbum.id);
                      setIsAddImagesModalOpen(true);
                    }}
                    type="button"
                  >
                    + Add images to this album
                  </button>
                </div>

                <div className={styles.photosGrid}>
                  {openedAlbum.images.map((img) => (
                    <div className={styles.photoCard} key={img.id}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={img.caption || "Album photo"}
                        className={styles.gridImg}
                        src={img.url}
                      />
                      <div className={styles.photoMeta}>
                        <span>{img.caption || "No caption"}</span>
                        <button
                          onClick={() => handleDeletePhotoFromAlbum(openedAlbum.id, img.id)}
                          style={{
                            color: "#a33333",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                            padding: "0.25rem 0",
                            textAlign: "left",
                          }}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  className={styles.secondaryActionBtn}
                  onClick={() => setOpenedAlbum(null)}
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

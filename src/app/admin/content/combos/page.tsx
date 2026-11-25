"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AdminShell, MediaUploader, useAdmin, type AdminComboOffer } from "@/features/admin";

import styles from "./combos-admin.module.css";

const CATEGORIES: AdminComboOffer["category"][] = [
  "Metal care",
  "Pooja care",
  "Kitchen care",
  "Floor care",
];

export default function AdminCombosPageContent() {
  const { siteContent, updateSiteContent } = useAdmin();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form toggle state (button above opens/toggles form above table)
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // New combo offer form state
  const [name, setName] = useState("");
  const [packSubtitle, setPackSubtitle] = useState("");
  const [category, setCategory] = useState<AdminComboOffer["category"]>("Metal care");
  const [regularPrice, setRegularPrice] = useState<number | "">("");
  const [comboPrice, setComboPrice] = useState<number | "">("");
  const [itemCount, setItemCount] = useState<number>(2);
  const [image, setImage] = useState("");
  const [isBestseller, setIsBestseller] = useState(false);

  // Page banner / header settings draft
  const [pageTitle, setPageTitle] = useState(siteContent.combos.pageTitle);
  const [pageSubtitle, setPageSubtitle] = useState(siteContent.combos.pageSubtitle);
  const [bannerNotice, setBannerNotice] = useState(siteContent.combos.bannerNotice);

  const offers = siteContent.combos.offers;

  // Computed savings preview for form
  const computedSavings = useMemo(() => {
    const reg = Number(regularPrice) || 0;
    const com = Number(comboPrice) || 0;
    if (reg > 0 && com > 0 && reg > com) {
      const savings = reg - com;
      const discount = Math.round((savings / reg) * 100);
      return { savings, discount };
    }
    return { savings: 0, discount: 0 };
  }, [regularPrice, comboPrice]);

  // Filtered offers for history table
  const filteredOffers = useMemo(() => {
    return offers
      .map((offer, index) => ({ offer, originalIndex: index }))
      .filter(({ offer, originalIndex }) => {
        const matchesCat = selectedCategory === "All" || offer.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          offer.name.toLowerCase().includes(q) ||
          offer.packSubtitle.toLowerCase().includes(q) ||
          offer.category.toLowerCase().includes(q) ||
          `#${originalIndex + 1}` === q ||
          String(originalIndex + 1) === q;

        return matchesCat && matchesSearch;
      });
  }, [offers, selectedCategory, searchQuery]);

  function handleCreateOffer(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !regularPrice || !comboPrice) {
      alert("Please fill in the offer name, regular price, and combo price.");
      return;
    }

    const reg = Number(regularPrice);
    const com = Number(comboPrice);
    const savings = Math.max(0, reg - com);
    const discount = reg > 0 ? Math.round((savings / reg) * 100) : 0;

    const newOffer: AdminComboOffer = {
      id: `combo-${Date.now()}`,
      name: name.trim(),
      packSubtitle: packSubtitle.trim() || `${itemCount} Pack Value Offer`,
      category,
      regularPriceNpr: reg,
      comboPriceNpr: com,
      savingsNpr: savings,
      discountPercent: discount,
      itemCount: Number(itemCount) || 1,
      imageUrl: image || undefined,
      isBestseller,
      active: true,
      createdAt: new Date().toISOString(),
    };

    updateSiteContent("combos", {
      ...siteContent.combos,
      offers: [newOffer, ...offers],
    });

    // Reset form
    setName("");
    setPackSubtitle("");
    setCategory("Metal care");
    setRegularPrice("");
    setComboPrice("");
    setItemCount(2);
    setImage("");
    setIsBestseller(false);
    setIsFormOpen(false);

    setToastMessage("✓ New combo offer created and published successfully!");
    setTimeout(() => setToastMessage(null), 3500);
  }

  function handleToggleActive(id: string) {
    const updated = offers.map((o) => (o.id === id ? { ...o, active: !o.active } : o));
    updateSiteContent("combos", {
      ...siteContent.combos,
      offers: updated,
    });
  }

  function handleDeleteOffer(id: string) {
    if (!confirm("Are you sure you want to delete this combo offer?")) return;
    const updated = offers.filter((o) => o.id !== id);
    updateSiteContent("combos", {
      ...siteContent.combos,
      offers: updated,
    });
    setToastMessage("Combo offer deleted from history.");
    setTimeout(() => setToastMessage(null), 3000);
  }

  function handleSavePageSettings(e: React.FormEvent) {
    e.preventDefault();
    updateSiteContent("combos", {
      ...siteContent.combos,
      pageTitle,
      pageSubtitle,
      bannerNotice,
    });
    setToastMessage("✓ Combo page title and promotional banner updated!");
    setTimeout(() => setToastMessage(null), 3500);
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
      subtitle="Create promotional combo offers and view all existing offers in history table format."
      title="Combo Offers"
    >
      <div className={styles.pageContainer}>
        {/* Toast Alert */}
        {toastMessage ? (
          <div className={styles.toast}>
            <span>{toastMessage}</span>
            <button
              aria-label="Dismiss message"
              onClick={() => setToastMessage(null)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}
              type="button"
            >
              ✕
            </button>
          </div>
        ) : null}

        {/* TOP SECTION: Action button "Add Combo Offer" ABOVE */}
        <div className={styles.topActionsRow}>
          <div className={styles.headingArea}>
            <h2 className={styles.headingTitle}>Promotional Deals & Bundles</h2>
            <p className={styles.headingSubtitle}>
              Manage discounted bundled savings and seasonal value packs.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              className={styles.secondaryBtn}
              href="/combo-offers"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              View live offers ↗
            </Link>

            {/* BUTTON "ADD COMBO OFFER" ABOVE */}
            <button
              className={styles.addOfferBtn}
              onClick={() => setIsFormOpen(!isFormOpen)}
              type="button"
            >
              {isFormOpen ? "✕ Close Form" : "+ Add Combo Offer"}
            </button>
          </div>
        </div>

        {/* EXPANDABLE "ADD COMBO OFFER" FORM CARD ABOVE TABLE */}
        {isFormOpen ? (
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>New Combo Offer Details</h3>
              <button
                aria-label="Close form"
                className={styles.closeFormBtn}
                onClick={() => setIsFormOpen(false)}
                type="button"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOffer}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="combo-name-input">
                    Combo Offer Name *
                  </label>
                  <input
                    className={styles.input}
                    id="combo-name-input"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ruru Pitambari Shine Paste – Buy 2 Get 1 Free"
                    required
                    value={name}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="combo-subtitle-input">
                    Pack Subtitle / Value Tagline
                  </label>
                  <input
                    className={styles.input}
                    id="combo-subtitle-input"
                    onChange={(e) => setPackSubtitle(e.target.value)}
                    placeholder="e.g. Metal cleaning paste 150g (Buy 2 Get 1 Free value pack)"
                    value={packSubtitle}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="combo-category-select">
                    Category Tag
                  </label>
                  <select
                    className={styles.select}
                    id="combo-category-select"
                    onChange={(e) => setCategory(e.target.value as AdminComboOffer["category"])}
                    value={category}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="combo-items-count">
                    Items Count in Pack
                  </label>
                  <input
                    className={styles.input}
                    id="combo-items-count"
                    min={1}
                    onChange={(e) => setItemCount(Math.max(1, Number(e.target.value)))}
                    type="number"
                    value={itemCount}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="combo-reg-price">
                    Regular Price (NPR) *
                  </label>
                  <input
                    className={styles.input}
                    id="combo-reg-price"
                    min={1}
                    onChange={(e) => setRegularPrice(e.target.value ? Number(e.target.value) : "")}
                    placeholder="e.g. 450"
                    required
                    type="number"
                    value={regularPrice}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="combo-offer-price">
                    Combo Offer Price (NPR) *
                  </label>
                  <input
                    className={styles.input}
                    id="combo-offer-price"
                    min={1}
                    onChange={(e) => setComboPrice(e.target.value ? Number(e.target.value) : "")}
                    placeholder="e.g. 300"
                    required
                    type="number"
                    value={comboPrice}
                  />
                </div>
              </div>

              {/* Automatic Discount & Savings Preview */}
              {computedSavings.savings > 0 ? (
                <div className={styles.calculatedSavings} style={{ marginTop: "1rem" }}>
                  <span>🏷️ Customer Savings:</span>
                  <strong>NPR {computedSavings.savings}</strong>
                  <span>({computedSavings.discount}% OFF Regular Price)</span>
                </div>
              ) : null}

              {/* Direct Media Upload for Combo Product Image */}
              <div style={{ marginTop: "1.25rem" }}>
                <MediaUploader
                  accept="image"
                  helperText="Upload combo bundle photo directly from your computer or phone"
                  label="Combo Image (Optional)"
                  onChange={(img) => setImage(img)}
                  value={image}
                />
              </div>

              {/* Bestseller Flag */}
              <div
                style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  checked={isBestseller}
                  id="bestseller-checkbox"
                  onChange={(e) => setIsBestseller(e.target.checked)}
                  type="checkbox"
                />
                <label
                  htmlFor="bestseller-checkbox"
                  style={{
                    fontSize: "0.8125rem",
                    color: "#1c1214",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Mark as &quot;Bestseller Combo&quot; badge on website
                </label>
              </div>

              <div className={styles.formActions}>
                <button
                  className={styles.secondaryBtn}
                  onClick={() => setIsFormOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button className={styles.submitBtn} type="submit">
                  Publish Combo Offer
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {/* BELOW: ALL OFFERS LIKE HISTORY IN TABLE LIST FORM */}
        <div className={styles.historySection}>
          <div className={styles.tablePanel}>
            {/* Filter and Search Bar */}
            <div className={styles.filterBar}>
              <div className={styles.searchBox}>
                <input
                  className={styles.input}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search offer by name, category, or #..."
                  type="search"
                  value={searchQuery}
                />
              </div>

              {/* Category Filter Tabs */}
              <div className={styles.categoryTabs}>
                <button
                  className={`${styles.tabBtn} ${selectedCategory === "All" ? styles.tabBtnActive : ""}`}
                  onClick={() => setSelectedCategory("All")}
                  type="button"
                >
                  All ({offers.length})
                </button>
                {CATEGORIES.map((cat) => {
                  const count = offers.filter((o) => o.category === cat).length;
                  return (
                    <button
                      className={`${styles.tabBtn} ${selectedCategory === cat ? styles.tabBtnActive : ""}`}
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      type="button"
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Table List */}
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>#</th>
                    <th className={styles.th}>Combo Offer</th>
                    <th className={styles.th}>Category</th>
                    <th className={styles.th}>Regular Price</th>
                    <th className={styles.th}>Offer Price</th>
                    <th className={styles.th}>Savings</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Date Added</th>
                    <th className={styles.th} style={{ textAlign: "right" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOffers.length === 0 ? (
                    <tr>
                      <td className={styles.emptyState} colSpan={9}>
                        No combo offers found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredOffers.map(({ offer, originalIndex }) => (
                      <tr className={styles.tr} key={offer.id}>
                        {/* Number Index for history */}
                        <td className={styles.td}>
                          <span className={styles.offerIndex}>#{originalIndex + 1}</span>
                        </td>

                        {/* Offer Name & Image */}
                        <td className={styles.td}>
                          <div className={styles.offerInfo}>
                            {offer.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                alt={offer.name}
                                className={styles.offerThumb}
                                src={offer.imageUrl}
                              />
                            ) : (
                              <div className={styles.offerThumbPlaceholder}>{offer.itemCount}x</div>
                            )}
                            <div>
                              <div className={styles.offerTitle}>{offer.name}</div>
                              <div className={styles.offerSubtitle}>{offer.packSubtitle}</div>
                              {offer.isBestseller ? (
                                <span className={styles.bestsellerBadge}>★ Bestseller</span>
                              ) : null}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className={styles.td}>
                          <span className={styles.categoryBadge}>{offer.category}</span>
                        </td>

                        {/* Regular Price */}
                        <td className={styles.td}>
                          <span className={styles.regularPrice}>
                            NPR {offer.regularPriceNpr.toLocaleString()}
                          </span>
                        </td>

                        {/* Combo Offer Price */}
                        <td className={styles.td}>
                          <span className={styles.offerPrice}>
                            NPR {offer.comboPriceNpr.toLocaleString()}
                          </span>
                        </td>

                        {/* Savings & Discount */}
                        <td className={styles.td}>
                          <span className={styles.savingsTag}>
                            Save NPR {offer.savingsNpr} ({offer.discountPercent}% OFF)
                          </span>
                        </td>

                        {/* Status */}
                        <td className={styles.td}>
                          {offer.active ? (
                            <span className={styles.statusActive}>Active</span>
                          ) : (
                            <span className={styles.statusInactive}>Inactive</span>
                          )}
                        </td>

                        {/* Date Added */}
                        <td className={styles.td} style={{ fontSize: "0.75rem", color: "#706c63" }}>
                          {formatDate(offer.createdAt)}
                        </td>

                        {/* Actions */}
                        <td className={styles.td} style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                            <button
                              className={styles.actionBtn}
                              onClick={() => handleToggleActive(offer.id)}
                              title={offer.active ? "Pause offer" : "Activate offer"}
                              type="button"
                            >
                              {offer.active ? "Deactivate" : "Activate"}
                            </button>
                            <button
                              className={styles.actionDelete}
                              onClick={() => handleDeleteOffer(offer.id)}
                              type="button"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* BOTTOM: Page Banner & Notice Configuration */}
        <div className={styles.pageSettingsCard}>
          <h3 className={styles.settingsTitle}>Website Page Text & Top Promotional Banner</h3>
          <p className={styles.settingsSubtitle}>
            Configure the title, subtitle, and top announcement shown to customers on the
            /combo-offers page.
          </p>

          <form onSubmit={handleSavePageSettings}>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="page-title-input">
                  Page Title
                </label>
                <input
                  className={styles.input}
                  id="page-title-input"
                  onChange={(e) => setPageTitle(e.target.value)}
                  value={pageTitle}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="page-sub-input">
                  Page Subtitle
                </label>
                <input
                  className={styles.input}
                  id="page-sub-input"
                  onChange={(e) => setPageSubtitle(e.target.value)}
                  value={pageSubtitle}
                />
              </div>
            </div>

            <div className={styles.field} style={{ marginTop: "1rem" }}>
              <label className={styles.label} htmlFor="banner-notice-input">
                Top Promotional Banner Notice
              </label>
              <input
                className={styles.input}
                id="banner-notice-input"
                onChange={(e) => setBannerNotice(e.target.value)}
                value={bannerNotice}
              />
            </div>

            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
              <button className={styles.submitBtn} type="submit">
                Save Page & Banner Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}

"use client";

import { useState } from "react";

import {
  AdminBadge,
  AdminShell,
  DealerModal,
  useAdmin,
  type AdminDealer,
  type DealerStatus,
} from "@/features/admin";

import styles from "../admin-table.module.css";

export default function AdminDealersPage() {
  const { dealers, updateDealerStatus } = useAdmin();
  const [selectedDealer, setSelectedDealer] = useState<AdminDealer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | DealerStatus>("All");

  const filterTabs: Array<"All" | DealerStatus> = [
    "All",
    "Pending Review",
    "Under Review",
    "Approved",
    "Contacted",
    "Rejected",
  ];

  const filteredDealers = dealers.filter((d) => {
    const matchesStatus = statusFilter === "All" ? true : d.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      d.businessName.toLowerCase().includes(q) ||
      d.contactPerson.toLowerCase().includes(q) ||
      d.district.toLowerCase().includes(q) ||
      d.city.toLowerCase().includes(q) ||
      d.panVat.includes(q);

    return matchesStatus && matchesSearch;
  });

  function getBadgeVariant(st: DealerStatus) {
    switch (st) {
      case "Pending Review":
        return "pending";
      case "Under Review":
        return "processing";
      case "Approved":
        return "delivered";
      case "Contacted":
        return "info";
      case "Rejected":
        return "cancelled";
      default:
        return "neutral";
    }
  }

  return (
    <AdminShell
      subtitle="Review wholesale partner applications, verify PAN/VAT credentials, and manage regional distributors across Nepal."
      title="Wholesale Dealer Network"
    >
      <div className={styles.pageContainer}>
        {/* Filter and Search Bar */}
        <div className={styles.filterBar}>
          <div className={styles.searchBox}>
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" x2="16.65" y1="21" y2="16.65" />
            </svg>
            <input
              aria-label="Search dealers"
              className={styles.searchInput}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by business name, district, or PAN/VAT..."
              type="search"
              value={searchQuery}
            />
          </div>

          <div className={styles.tabsGroup}>
            {filterTabs.map((tab) => (
              <button
                className={`${styles.tabBtn} ${statusFilter === tab ? styles.tabBtnActive : ""}`}
                key={tab}
                onClick={() => setStatusFilter(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dealers Table Panel */}
        <div className={styles.tablePanel}>
          <div className={styles.tableWrapper}>
            {filteredDealers.length === 0 ? (
              <div className={styles.emptyState}>
                No wholesale dealers match your current criteria.
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Business Name & PAN</th>
                    <th className={styles.th}>Contact Person</th>
                    <th className={styles.th}>District & Town</th>
                    <th className={styles.th}>Business Type</th>
                    <th className={styles.th}>Monthly Est.</th>
                    <th className={styles.th}>Tier</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDealers.map((dealer) => (
                    <tr className={styles.tr} key={dealer.id}>
                      <td className={styles.td}>
                        <strong>{dealer.businessName}</strong>
                        <div style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>
                          PAN: {dealer.panVat}
                        </div>
                      </td>
                      <td className={styles.td}>
                        <div>{dealer.contactPerson}</div>
                        <a
                          href={`tel:${dealer.phone}`}
                          style={{
                            fontSize: "0.6875rem",
                            color: "var(--brand-gold-600)",
                            textDecoration: "none",
                          }}
                        >
                          {dealer.phone}
                        </a>
                      </td>
                      <td className={styles.td}>
                        <div>{dealer.city}</div>
                        <span style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>
                          {dealer.district}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <span style={{ fontSize: "0.75rem" }}>{dealer.businessType}</span>
                      </td>
                      <td className={styles.td}>
                        <strong>{dealer.estimatedMonthlyVolume}</strong>
                      </td>
                      <td className={styles.td}>
                        <AdminBadge
                          size="sm"
                          variant={dealer.dealerTier === "Gold" ? "gold" : "neutral"}
                        >
                          {dealer.dealerTier}
                        </AdminBadge>
                      </td>
                      <td className={styles.td}>
                        <AdminBadge size="sm" variant={getBadgeVariant(dealer.status)}>
                          {dealer.status}
                        </AdminBadge>
                      </td>
                      <td className={styles.td}>
                        <button
                          className={styles.actionBtn}
                          onClick={() => setSelectedDealer(dealer)}
                          type="button"
                        >
                          Verify & Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {selectedDealer ? (
        <DealerModal
          dealer={selectedDealer}
          onClose={() => setSelectedDealer(null)}
          onSave={(status, tier, notes) => {
            updateDealerStatus(selectedDealer.id, status, tier, notes);
          }}
        />
      ) : null}
    </AdminShell>
  );
}

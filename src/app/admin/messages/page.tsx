"use client";

import { useMemo, useState } from "react";

import { AdminShell, useAdmin, type InquiryStatus } from "@/features/admin";

import styles from "./messages.module.css";

export default function AdminMessagesPage() {
  const { inquiries, updateInquiryStatus } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"All" | InquiryStatus>("All");
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [responseNote, setResponseNote] = useState("");

  // Metrics
  const totalSubmissions = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "New").length;
  const wholesaleCount = inquiries.filter(
    (i) =>
      i.subject.toLowerCase().includes("wholesale") || i.subject.toLowerCase().includes("dealer"),
  ).length;
  const productOrSupportCount = inquiries.filter(
    (i) =>
      !i.subject.toLowerCase().includes("wholesale") && !i.subject.toLowerCase().includes("dealer"),
  ).length;

  // Filtered submissions
  const filtered = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus = statusFilter === "All" ? true : inq.status === statusFilter;
      const matchesType = typeFilter === "All" ? true : inq.subject === typeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.phone.includes(q) ||
        inq.subject.toLowerCase().includes(q) ||
        inq.message.toLowerCase().includes(q);

      return matchesStatus && matchesType && matchesSearch;
    });
  }, [inquiries, searchQuery, typeFilter, statusFilter]);

  const selectedInquiry = inquiries.find((i) => i.id === selectedInquiryId);

  function getBadgeClass(status: InquiryStatus) {
    if (status === "New") return `${styles.statusBadge} ${styles.badgeNew}`;
    if (status === "In Progress") return `${styles.statusBadge} ${styles.badgeInProgress}`;
    return `${styles.statusBadge} ${styles.badgeResolved}`;
  }

  function formatDate(iso: string) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  }

  function handleSaveResolution(status: InquiryStatus) {
    if (!selectedInquiryId) return;
    updateInquiryStatus(selectedInquiryId, status, responseNote);
    setSelectedInquiryId(null);
    setResponseNote("");
  }

  return (
    <AdminShell
      subtitle="Review customer enquiries and Contact Us messages. Times shown in Nepal time."
      title="Enquiries & Messages"
    >
      <div className={styles.pageContainer}>
        {/* 4 Stat Cards Row */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{totalSubmissions}</div>
            <div className={styles.statLabel}>Total submissions</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{newCount}</div>
            <div className={styles.statLabel}>New</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{wholesaleCount}</div>
            <div className={styles.statLabel}>Wholesale enquiries</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{productOrSupportCount}</div>
            <div className={styles.statLabel}>Contact messages</div>
          </div>
        </div>

        {/* Search & Filter Row */}
        <div className={styles.filterRow}>
          <div className={styles.searchGroup}>
            <label className={styles.filterLabel} htmlFor="msg-search">
              Search
            </label>
            <input
              className={styles.searchInput}
              id="msg-search"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Name, email, phone, reference or message"
              type="search"
              value={searchQuery}
            />
          </div>

          <div className={styles.dropdownsGroup}>
            <div className={styles.selectGroup}>
              <label className={styles.filterLabel} htmlFor="msg-type-select">
                Submission type
              </label>
              <select
                className={styles.selectInput}
                id="msg-type-select"
                onChange={(e) => setTypeFilter(e.target.value)}
                value={typeFilter}
              >
                <option value="All">All submissions</option>
                <option value="Wholesale / Dealership">Wholesale / Dealership</option>
                <option value="Product enquiry">Product enquiry</option>
                <option value="Order assistance">Order assistance</option>
              </select>
            </div>

            <div className={styles.selectGroup}>
              <label className={styles.filterLabel} htmlFor="msg-status-select">
                Status
              </label>
              <select
                className={styles.selectInput}
                id="msg-status-select"
                onChange={(e) => setStatusFilter(e.target.value as "All" | InquiryStatus)}
                value={statusFilter}
              >
                <option value="All">All statuses</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Counter Display */}
        <div className={styles.resultsCount}>
          Showing 1-{filtered.length} of {filtered.length} submissions
        </div>

        {/* List of Submission Cards */}
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>No submissions match the selected filters.</div>
        ) : (
          <div className={styles.cardsList}>
            {filtered.map((item) => (
              <div className={styles.submissionCard} key={item.id}>
                <div className={styles.cardLeft}>
                  <div className={styles.senderName}>{item.name}</div>
                  <div className={styles.submissionSubtext}>
                    {item.subject} · {item.phone || item.email}
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <span className={getBadgeClass(item.status)}>{item.status}</span>

                  <span className={styles.dateTimestamp}>{formatDate(item.createdAt)}</span>

                  <button
                    className={styles.viewDetailsBtn}
                    onClick={() => {
                      setSelectedInquiryId(item.id);
                      setResponseNote(item.responseNote ?? "");
                    }}
                    type="button"
                  >
                    View details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Details Modal */}
        {selectedInquiry ? (
          <div className={styles.modalOverlay} onClick={() => setSelectedInquiryId(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Submission Details</h2>
                <button
                  aria-label="Close dialog"
                  className={styles.closeModalBtn}
                  onClick={() => setSelectedInquiryId(null)}
                  type="button"
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Sender Name</span>
                    <span className={styles.detailValue}>{selectedInquiry.name}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Date & Time</span>
                    <span className={styles.detailValue}>
                      {formatDate(selectedInquiry.createdAt)}
                    </span>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Phone Number</span>
                    <span className={styles.detailValue}>
                      <a
                        href={`tel:${selectedInquiry.phone}`}
                        style={{ color: "#8c1d24", textDecoration: "none" }}
                      >
                        {selectedInquiry.phone}
                      </a>
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Email Address</span>
                    <span className={styles.detailValue}>
                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        style={{ color: "#8c1d24", textDecoration: "none" }}
                      >
                        {selectedInquiry.email}
                      </a>
                    </span>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Subject / Category</span>
                  <span className={styles.detailValue} style={{ fontWeight: 600 }}>
                    {selectedInquiry.subject}
                  </span>
                </div>

                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Message Content</span>
                  <div className={styles.messageBox}>{selectedInquiry.message}</div>
                </div>

                <div className={styles.responseArea}>
                  <label className={styles.detailLabel} htmlFor="response-note">
                    Staff Follow-up Note
                  </label>
                  <textarea
                    className={styles.responseInput}
                    id="response-note"
                    onChange={(e) => setResponseNote(e.target.value)}
                    placeholder="Enter any follow-up actions, call notes, or resolution remarks..."
                    value={responseNote}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  className={styles.secondaryBtn}
                  onClick={() => setSelectedInquiryId(null)}
                  type="button"
                >
                  Close
                </button>
                {selectedInquiry.status !== "In Progress" &&
                selectedInquiry.status !== "Resolved" ? (
                  <button
                    className={styles.secondaryBtn}
                    onClick={() => handleSaveResolution("In Progress")}
                    type="button"
                  >
                    Mark In Progress
                  </button>
                ) : null}
                {selectedInquiry.status !== "Resolved" ? (
                  <button
                    className={styles.primaryBtn}
                    onClick={() => handleSaveResolution("Resolved")}
                    type="button"
                  >
                    Mark as Resolved
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </AdminShell>
  );
}

"use client";

import { useState } from "react";

import { AdminBadge, AdminShell, useAdmin, type InquiryStatus } from "@/features/admin";

import styles from "../admin-table.module.css";

export default function AdminMessagesPage() {
  const { inquiries, updateInquiryStatus } = useAdmin();
  const [statusFilter, setStatusFilter] = useState<"All" | InquiryStatus>("All");
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [responseNote, setResponseNote] = useState("");

  const filterTabs: Array<"All" | InquiryStatus> = ["All", "New", "In Progress", "Resolved"];

  const filtered = inquiries.filter((inq) =>
    statusFilter === "All" ? true : inq.status === statusFilter,
  );

  function getBadgeVariant(st: InquiryStatus) {
    switch (st) {
      case "New":
        return "pending";
      case "In Progress":
        return "processing";
      case "Resolved":
        return "delivered";
      default:
        return "neutral";
    }
  }

  function handleSaveNote(id: string) {
    updateInquiryStatus(id, "Resolved", responseNote);
    setSelectedInquiryId(null);
    setResponseNote("");
  }

  return (
    <AdminShell
      subtitle="Customer support requests, wholesale enquiries, and general questions from the contact page."
      title="Customer Inquiries"
    >
      <div className={styles.pageContainer}>
        {/* Filter Bar */}
        <div className={styles.filterBar}>
          <div className={styles.tabsGroup}>
            {filterTabs.map((tab) => {
              const count =
                tab === "All" ? inquiries.length : inquiries.filter((i) => i.status === tab).length;
              return (
                <button
                  className={`${styles.tabBtn} ${statusFilter === tab ? styles.tabBtnActive : ""}`}
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  type="button"
                >
                  {tab} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Inquiries Table */}
        <div className={styles.tablePanel}>
          <div className={styles.tableWrapper}>
            {filtered.length === 0 ? (
              <div className={styles.emptyState}>No inquiries found in this view.</div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Date & Sender</th>
                    <th className={styles.th}>Contact</th>
                    <th className={styles.th}>Subject</th>
                    <th className={styles.th}>Message</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inq) => (
                    <tr className={styles.tr} key={inq.id}>
                      <td className={styles.td}>
                        <strong>{inq.name}</strong>
                        <div style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className={styles.td}>
                        <div>{inq.phone}</div>
                        <span style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>
                          {inq.email}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <AdminBadge size="sm" variant="gold">
                          {inq.subject}
                        </AdminBadge>
                      </td>
                      <td className={styles.td} style={{ maxWidth: "340px" }}>
                        <p
                          style={{ margin: 0, fontSize: "0.8125rem", color: "var(--neutral-800)" }}
                        >
                          {inq.message}
                        </p>
                        {inq.responseNote ? (
                          <div
                            style={{
                              marginTop: "0.375rem",
                              fontSize: "0.6875rem",
                              color: "#2b614d",
                              backgroundColor: "#f0f7f3",
                              padding: "0.25rem 0.5rem",
                              borderRadius: "var(--radius-xs)",
                            }}
                          >
                            Staff note: {inq.responseNote}
                          </div>
                        ) : null}
                      </td>
                      <td className={styles.td}>
                        <AdminBadge size="sm" variant={getBadgeVariant(inq.status)}>
                          {inq.status}
                        </AdminBadge>
                      </td>
                      <td className={styles.td}>
                        {inq.status !== "Resolved" ? (
                          <button
                            className={styles.actionBtn}
                            onClick={() => {
                              setSelectedInquiryId(inq.id);
                              setResponseNote(inq.responseNote ?? "");
                            }}
                            type="button"
                          >
                            Mark Resolved
                          </button>
                        ) : (
                          <span style={{ fontSize: "0.75rem", color: "#2b614d" }}>✓ Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {selectedInquiryId ? (
        <div
          role="dialog"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(23, 22, 18, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "1.5rem",
              borderRadius: "var(--radius-sm)",
              maxWidth: "460px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>
              Resolve Customer Inquiry
            </h3>
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--neutral-600)" }}>
              Add a staff note recording the action taken (e.g. called customer, sent invoice):
            </p>
            <textarea
              onChange={(e) => setResponseNote(e.target.value)}
              placeholder="e.g. Contacted customer and confirmed wholesale price quotation."
              rows={3}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "var(--radius-xs)",
                border: "1px solid var(--neutral-300)",
                fontSize: "0.8125rem",
              }}
              value={responseNote}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button
                className={styles.actionBtn}
                onClick={() => setSelectedInquiryId(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className={styles.primaryActionBtn}
                onClick={() => handleSaveNote(selectedInquiryId)}
                type="button"
              >
                Save & Mark Resolved
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AdminShell>
  );
}

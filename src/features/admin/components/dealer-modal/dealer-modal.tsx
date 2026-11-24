"use client";

import { useState } from "react";
import { AdminBadge } from "../admin-badge";
import type { AdminDealer, DealerStatus, DealerTier } from "../../types";
import styles from "./dealer-modal.module.css";

type DealerModalProps = {
  dealer: AdminDealer;
  onClose: () => void;
  onSave: (status: DealerStatus, tier: DealerTier, notes: string) => void;
};

export function DealerModal({ dealer, onClose, onSave }: DealerModalProps) {
  const [status, setStatus] = useState<DealerStatus>(dealer.status);
  const [tier, setTier] = useState<DealerTier>(dealer.dealerTier);
  const [notes, setNotes] = useState(dealer.notes ?? "");

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

  function handleSave() {
    onSave(status, tier, notes);
    onClose();
  }

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.titleArea}>
            <h2 className={styles.title}>{dealer.businessName}</h2>
            <AdminBadge variant={getBadgeVariant(dealer.status)}>{dealer.status}</AdminBadge>
          </div>
          <button
            aria-label="Close modal"
            className={styles.closeBtn}
            onClick={onClose}
            type="button"
          >
            <svg
              fill="none"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="20"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.gridTwo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Contact Person</span>
              <span className={styles.infoValue}>{dealer.contactPerson}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Phone Number</span>
              <a className={styles.infoValue} href={`tel:${dealer.phone}`}>
                {dealer.phone}
              </a>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>{dealer.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>PAN / VAT Number</span>
              <span className={styles.infoValue}>{dealer.panVat}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>District & City</span>
              <span className={styles.infoValue}>
                {dealer.city}, {dealer.district}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Business Type</span>
              <span className={styles.infoValue}>{dealer.businessType}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Est. Monthly Volume</span>
              <span className={styles.infoValue}>{dealer.estimatedMonthlyVolume}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Applied Date</span>
              <span className={styles.infoValue}>
                {new Date(dealer.appliedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className={styles.gridTwo}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="dealer-status-select">
                Application Status
              </label>
              <select
                className={styles.select}
                id="dealer-status-select"
                onChange={(e) => setStatus(e.target.value as DealerStatus)}
                value={status}
              >
                <option value="Pending Review">Pending Review</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Contacted">Contacted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="dealer-tier-select">
                Assigned Dealer Tier
              </label>
              <select
                className={styles.select}
                id="dealer-tier-select"
                onChange={(e) => setTier(e.target.value as DealerTier)}
                value={tier}
              >
                <option value="Standard">Standard Retail Partner</option>
                <option value="Silver">Silver Dealer (5% Rebate)</option>
                <option value="Gold">Gold Regional Distributor (12% Rebate)</option>
              </select>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="dealer-notes">
              Internal Verification & Supply Notes
            </label>
            <textarea
              className={styles.textarea}
              id="dealer-notes"
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Verified VAT registration. Sent wholesale catalog via WhatsApp."
              value={notes}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={onClose} type="button">
            Cancel
          </button>
          <button className={styles.saveBtn} onClick={handleSave} type="button">
            Update Dealer Record
          </button>
        </div>
      </div>
    </div>
  );
}

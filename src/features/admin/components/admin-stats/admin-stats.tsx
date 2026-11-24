"use client";

import { useAdmin } from "../../context/admin-store";
import styles from "./admin-stats.module.css";

const nprFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  style: "currency",
});

export function AdminStatsGrid() {
  const { orders, dealers, products, inquiries } = useAdmin();

  // Metrics calculation
  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.totalNpr, 0);

  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const activeDealers = dealers.filter((d) => d.status === "Approved").length;
  const pendingDealers = dealers.filter((d) => d.status === "Pending Review").length;
  const newInquiries = inquiries.filter((i) => i.status === "New").length;

  const lowStockVariants = products.flatMap((p) =>
    p.variants.filter((v) => v.stock <= v.lowStockThreshold),
  );

  return (
    <div className={styles.statsGrid}>
      {/* Metric 1: Revenue */}
      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <span className={styles.statLabel}>Total Sales Revenue</span>
          <div className={`${styles.iconWrapper} ${styles.goldIcon}`}>
            <svg
              fill="none"
              height="18"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="18"
            >
              <line x1="12" x2="12" y1="1" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        </div>
        <div className={styles.statValue}>{nprFormatter.format(totalRevenue)}</div>
        <div className={styles.statFooter}>
          <span className={styles.pillPositive}>↑ Active</span>
          <span>from {orders.length} registered orders</span>
        </div>
      </div>

      {/* Metric 2: Pending Orders */}
      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <span className={styles.statLabel}>Pending Dispatch</span>
          <div className={`${styles.iconWrapper} ${styles.amberIcon}`}>
            <svg
              fill="none"
              height="18"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="18"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
        </div>
        <div className={styles.statValue}>{pendingOrders}</div>
        <div className={styles.statFooter}>
          <span className={pendingOrders > 0 ? styles.pillAlert : styles.pillPositive}>
            {pendingOrders > 0 ? "Requires action" : "All cleared"}
          </span>
          <span>across Kathmandu & valley</span>
        </div>
      </div>

      {/* Metric 3: Dealer Network */}
      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <span className={styles.statLabel}>Wholesale Network</span>
          <div className={`${styles.iconWrapper} ${styles.blueIcon}`}>
            <svg
              fill="none"
              height="18"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="18"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        </div>
        <div className={styles.statValue}>{activeDealers}</div>
        <div className={styles.statFooter}>
          <span className={pendingDealers > 0 ? styles.pillPositive : styles.pillNeutral}>
            +{pendingDealers} applications
          </span>
          <span>in verification queue</span>
        </div>
      </div>

      {/* Metric 4: Inventory Alert */}
      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <span className={styles.statLabel}>Inventory Health</span>
          <div className={`${styles.iconWrapper} ${styles.greenIcon}`}>
            <svg
              fill="none"
              height="18"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="18"
            >
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>
        </div>
        <div className={styles.statValue}>
          {lowStockVariants.length > 0 ? `${lowStockVariants.length} Low` : "Healthy"}
        </div>
        <div className={styles.statFooter}>
          <span className={newInquiries > 0 ? styles.pillPositive : styles.pillNeutral}>
            {newInquiries} customer messages
          </span>
          <span>awaiting response</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

import {
  AdminBadge,
  AdminShell,
  AdminStatsGrid,
  DealerModal,
  OrderModal,
  useAdmin,
  type AdminDealer,
  type AdminOrder,
} from "@/features/admin";

import styles from "./admin-page.module.css";

const nprFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  style: "currency",
});

export default function AdminDashboardPage() {
  const { orders, dealers, updateOrderStatus, updateDealerStatus } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [selectedDealer, setSelectedDealer] = useState<AdminDealer | null>(null);

  const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Processing");
  const pendingDealers = dealers.filter(
    (d) => d.status === "Pending Review" || d.status === "Under Review",
  );

  return (
    <AdminShell
      subtitle="Live Store Operations · Central Hub Lalitpur"
      title="Operations Dashboard"
    >
      {/* KPI Stats Grid */}
      <AdminStatsGrid />

      {/* Main Two-Column Layout */}
      <div className={styles.dashboardGrid}>
        {/* Left Primary Column: Action Needed */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Section 1: Orders Requiring Action */}
          <section aria-labelledby="pending-orders-title" className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitleArea}>
                <h2 className={styles.panelTitle} id="pending-orders-title">
                  Orders Requiring Dispatch
                </h2>
                <AdminBadge size="sm" variant={pendingOrders.length > 0 ? "warning" : "success"}>
                  {pendingOrders.length} active
                </AdminBadge>
              </div>
              <Link className={styles.viewAllLink} href="/admin/orders">
                View all orders →
              </Link>
            </div>

            <div className={styles.tableWrapper}>
              {pendingOrders.length === 0 ? (
                <div className={styles.emptyState}>All pending orders have been dispatched!</div>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.th}>Order #</th>
                      <th className={styles.th}>Customer</th>
                      <th className={styles.th}>Location</th>
                      <th className={styles.th}>Total</th>
                      <th className={styles.th}>Status</th>
                      <th className={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingOrders.map((order) => (
                      <tr className={styles.tr} key={order.id}>
                        <td className={styles.td}>
                          <strong>{order.orderNumber}</strong>
                        </td>
                        <td className={styles.td}>
                          <div>{order.customerName}</div>
                          <span style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>
                            {order.customerPhone}
                          </span>
                        </td>
                        <td className={styles.td}>
                          {order.city}, {order.district}
                        </td>
                        <td className={styles.td}>
                          <strong>{nprFormatter.format(order.totalNpr)}</strong>
                        </td>
                        <td className={styles.td}>
                          <AdminBadge
                            size="sm"
                            variant={order.status === "Pending" ? "pending" : "processing"}
                          >
                            {order.status}
                          </AdminBadge>
                        </td>
                        <td className={styles.td}>
                          <button
                            className={styles.actionBtn}
                            onClick={() => setSelectedOrder(order)}
                            type="button"
                          >
                            Review & Dispatch
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          {/* Section 2: Dealer Verification Applications */}
          <section aria-labelledby="dealer-queue-title" className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitleArea}>
                <h2 className={styles.panelTitle} id="dealer-queue-title">
                  Wholesale Dealer Applications
                </h2>
                <AdminBadge size="sm" variant="gold">
                  {pendingDealers.length} pending
                </AdminBadge>
              </div>
              <Link className={styles.viewAllLink} href="/admin/dealers">
                Manage wholesale network →
              </Link>
            </div>

            <div className={styles.tableWrapper}>
              {pendingDealers.length === 0 ? (
                <div className={styles.emptyState}>No pending wholesale applications.</div>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.th}>Business Name</th>
                      <th className={styles.th}>Contact Person</th>
                      <th className={styles.th}>Location</th>
                      <th className={styles.th}>Monthly Est.</th>
                      <th className={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingDealers.map((dealer) => (
                      <tr className={styles.tr} key={dealer.id}>
                        <td className={styles.td}>
                          <strong>{dealer.businessName}</strong>
                          <div style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>
                            PAN/VAT: {dealer.panVat}
                          </div>
                        </td>
                        <td className={styles.td}>
                          <div>{dealer.contactPerson}</div>
                          <span style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>
                            {dealer.phone}
                          </span>
                        </td>
                        <td className={styles.td}>
                          {dealer.city}, {dealer.district}
                        </td>
                        <td className={styles.td}>{dealer.estimatedMonthlyVolume}</td>
                        <td className={styles.td}>
                          <button
                            className={styles.actionBtn}
                            onClick={() => setSelectedDealer(dealer)}
                            type="button"
                          >
                            Verify & Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>

        {/* Right Secondary Column: Insights & Quick Shortcuts */}
        <div className={styles.secondaryColumn}>
          {/* Category Distribution */}
          <section aria-labelledby="category-share-title" className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle} id="category-share-title">
                Product Category Demand
              </h2>
              <span style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>Nepal FMCG</span>
            </div>
            <div className={styles.categoryList}>
              <div className={styles.categoryItem}>
                <div className={styles.categoryHeader}>
                  <span>Metal Care (Pitambari & Ratna)</span>
                  <strong>62%</strong>
                </div>
                <div className={styles.progressBarTrack}>
                  <div
                    className={`${styles.progressBarFill} ${styles.goldFill}`}
                    style={{ width: "62%" }}
                  />
                </div>
              </div>

              <div className={styles.categoryItem}>
                <div className={styles.categoryHeader}>
                  <span>Kitchen Care (Ruru Ease spray)</span>
                  <strong>24%</strong>
                </div>
                <div className={styles.progressBarTrack}>
                  <div
                    className={`${styles.progressBarFill} ${styles.sageFill}`}
                    style={{ width: "24%" }}
                  />
                </div>
              </div>

              <div className={styles.categoryItem}>
                <div className={styles.categoryHeader}>
                  <span>Floor Care (White Phenyle)</span>
                  <strong>14%</strong>
                </div>
                <div className={styles.progressBarTrack}>
                  <div
                    className={`${styles.progressBarFill} ${styles.charcoalFill}`}
                    style={{ width: "14%" }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Quick Operational Shortcuts */}
          <section aria-labelledby="quick-actions-title" className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle} id="quick-actions-title">
                Operational Shortcuts
              </h2>
            </div>
            <div className={styles.quickActionsGrid}>
              <Link className={styles.quickActionCard} href="/admin/products">
                <div className={styles.quickActionIcon}>
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <line x1="12" x2="12" y1="5" y2="19" />
                    <line x1="5" x2="19" y1="12" y2="12" />
                  </svg>
                </div>
                <span className={styles.quickActionTitle}>Inventory Stock</span>
                <span className={styles.quickActionDesc}>Update stock & prices</span>
              </Link>

              <Link className={styles.quickActionCard} href="/admin/orders">
                <div className={styles.quickActionIcon}>
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect height="8" rx="1" width="12" x="6" y="14" />
                  </svg>
                </div>
                <span className={styles.quickActionTitle}>Print Slips</span>
                <span className={styles.quickActionDesc}>Order packaging labels</span>
              </Link>

              <Link className={styles.quickActionCard} href="/admin/dealers">
                <div className={styles.quickActionIcon}>
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                </div>
                <span className={styles.quickActionTitle}>Dealers</span>
                <span className={styles.quickActionDesc}>Assign wholesale tiers</span>
              </Link>

              <Link className={styles.quickActionCard} href="/admin/messages">
                <div className={styles.quickActionIcon}>
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className={styles.quickActionTitle}>Inquiries</span>
                <span className={styles.quickActionDesc}>Customer queries</span>
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* Interactive Order Details Modal */}
      {selectedOrder ? (
        <OrderModal
          onClose={() => setSelectedOrder(null)}
          onStatusChange={(status) => {
            updateOrderStatus(selectedOrder.id, status);
            setSelectedOrder({ ...selectedOrder, status });
          }}
          order={selectedOrder}
        />
      ) : null}

      {/* Interactive Dealer Review Modal */}
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

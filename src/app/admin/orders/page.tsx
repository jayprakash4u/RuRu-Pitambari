"use client";

import { useState } from "react";

import {
  AdminBadge,
  AdminShell,
  OrderModal,
  useAdmin,
  type AdminOrder,
  type OrderStatus,
} from "@/features/admin";

import styles from "../admin-table.module.css";

const nprFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  style: "currency",
});

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | OrderStatus>("All");

  const filterTabs: Array<"All" | OrderStatus> = [
    "All",
    "Pending",
    "Processing",
    "Dispatched",
    "Delivered",
    "Cancelled",
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "All" ? true : order.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      order.orderNumber.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.customerPhone.includes(query) ||
      order.district.toLowerCase().includes(query) ||
      order.city.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  function getBadgeVariant(status: OrderStatus) {
    switch (status) {
      case "Pending":
        return "pending";
      case "Processing":
        return "processing";
      case "Dispatched":
        return "dispatched";
      case "Delivered":
        return "delivered";
      case "Cancelled":
        return "cancelled";
      default:
        return "neutral";
    }
  }

  return (
    <AdminShell
      subtitle="Track customer deliveries, update fulfillment stages, and print invoices."
      title="Orders Management"
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
              aria-label="Search orders"
              className={styles.searchInput}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order #, customer, phone, or city..."
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

        {/* Orders Table Panel */}
        <div className={styles.tablePanel}>
          <div className={styles.tableWrapper}>
            {filteredOrders.length === 0 ? (
              <div className={styles.emptyState}>No orders match your current filters.</div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Order #</th>
                    <th className={styles.th}>Date</th>
                    <th className={styles.th}>Customer</th>
                    <th className={styles.th}>Destination</th>
                    <th className={styles.th}>Items</th>
                    <th className={styles.th}>Total (NPR)</th>
                    <th className={styles.th}>Payment</th>
                    <th className={styles.th}>Fulfillment</th>
                    <th className={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr className={styles.tr} key={order.id}>
                      <td className={styles.td}>
                        <strong>{order.orderNumber}</strong>
                      </td>
                      <td className={styles.td}>
                        <span style={{ fontSize: "0.75rem", color: "var(--neutral-600)" }}>
                          {new Date(order.createdAt).toLocaleDateString("en-NP", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <div>{order.customerName}</div>
                        <span style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>
                          {order.customerPhone}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <div>{order.city}</div>
                        <span style={{ fontSize: "0.6875rem", color: "var(--neutral-500)" }}>
                          {order.district}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <span style={{ fontSize: "0.75rem" }}>
                          {order.items
                            .map((i) => `${i.productName} (${i.variantLabel} ×${i.quantity})`)
                            .join(", ")}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <strong>{nprFormatter.format(order.totalNpr)}</strong>
                      </td>
                      <td className={styles.td}>
                        <AdminBadge
                          size="sm"
                          variant={order.paymentStatus === "Paid" ? "success" : "pending"}
                        >
                          {order.paymentMethod}
                        </AdminBadge>
                      </td>
                      <td className={styles.td}>
                        <AdminBadge size="sm" variant={getBadgeVariant(order.status)}>
                          {order.status}
                        </AdminBadge>
                      </td>
                      <td className={styles.td}>
                        <button
                          className={styles.actionBtn}
                          onClick={() => setSelectedOrder(order)}
                          type="button"
                        >
                          View & Process
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
    </AdminShell>
  );
}

"use client";

import { AdminBadge } from "../admin-badge";
import type { AdminOrder, OrderStatus } from "../../types";
import styles from "./order-modal.module.css";

const nprFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  style: "currency",
});

type OrderModalProps = {
  order: AdminOrder;
  onClose: () => void;
  onStatusChange: (status: OrderStatus) => void;
};

export function OrderModal({ order, onClose, onStatusChange }: OrderModalProps) {
  const statuses: OrderStatus[] = ["Pending", "Processing", "Dispatched", "Delivered", "Cancelled"];

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

  function handlePrintInvoice() {
    window.print();
  }

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.titleArea}>
            <h2 className={styles.title}>Order #{order.orderNumber}</h2>
            <AdminBadge variant={getBadgeVariant(order.status)}>{order.status}</AdminBadge>
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
          {/* Customer & Delivery Information */}
          <div className={styles.section}>
            <span className={styles.sectionHeading}>Customer & Delivery</span>
            <div className={styles.gridTwo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Customer</span>
                <span className={styles.infoValue}>{order.customerName}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Phone</span>
                <a className={styles.infoValue} href={`tel:${order.customerPhone}`}>
                  {order.customerPhone}
                </a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Location</span>
                <span className={styles.infoValue}>
                  {order.city}, {order.district}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Address</span>
                <span className={styles.infoValue}>{order.deliveryAddress}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Payment Mode</span>
                <span className={styles.infoValue}>{order.paymentMethod}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Payment Status</span>
                <span className={styles.infoValue}>
                  <AdminBadge
                    size="sm"
                    variant={order.paymentStatus === "Paid" ? "success" : "pending"}
                  >
                    {order.paymentStatus}
                  </AdminBadge>
                </span>
              </div>
            </div>
            {order.notes ? (
              <div className={styles.infoItem} style={{ marginTop: "0.25rem" }}>
                <span className={styles.infoLabel}>Delivery Notes</span>
                <span className={styles.infoValue}>“{order.notes}”</span>
              </div>
            ) : null}
          </div>

          {/* Ordered Products */}
          <div className={styles.section}>
            <span className={styles.sectionHeading}>Order Items</span>
            <div className={styles.itemsList}>
              {order.items.map((item, idx) => (
                <div className={styles.itemRow} key={`${item.productId}-${idx}`}>
                  <div>
                    <div className={styles.itemName}>{item.productName}</div>
                    <div className={styles.itemSub}>
                      {item.variantLabel} × {item.quantity} units (@{" "}
                      {nprFormatter.format(item.unitPriceNpr)})
                    </div>
                  </div>
                  <div className={styles.itemPrice}>{nprFormatter.format(item.subtotalNpr)}</div>
                </div>
              ))}
            </div>

            <div className={styles.summaryArea}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{nprFormatter.format(order.subtotalNpr)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery Charge</span>
                <span>
                  {order.deliveryChargeNpr > 0
                    ? nprFormatter.format(order.deliveryChargeNpr)
                    : "Free"}
                </span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total Amount</span>
                <span>{nprFormatter.format(order.totalNpr)}</span>
              </div>
            </div>
          </div>

          {/* Quick Status Stepper */}
          <div className={styles.section}>
            <span className={styles.sectionHeading}>Update Fulfillment Status</span>
            <div className={styles.statusChangeGroup}>
              {statuses.map((st) => (
                <button
                  className={`${styles.statusBtn} ${
                    order.status === st ? styles.statusBtnActive : ""
                  }`}
                  key={st}
                  onClick={() => onStatusChange(st)}
                  type="button"
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.printBtn} onClick={handlePrintInvoice} type="button">
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
            <span>Print Invoice Slip</span>
          </button>
          <button className={styles.doneBtn} onClick={onClose} type="button">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

import styles from "./admin-badge.module.css";

type AdminBadgeVariant =
  | "pending"
  | "processing"
  | "dispatched"
  | "delivered"
  | "cancelled"
  | "success"
  | "warning"
  | "neutral"
  | "info"
  | "gold";

type AdminBadgeProps = {
  children: ReactNode;
  variant?: AdminBadgeVariant;
  size?: "sm" | "md";
};

export function AdminBadge({ children, variant = "neutral", size = "md" }: AdminBadgeProps) {
  const variantClass = styles[variant] ?? styles.neutral;
  const sizeClass = size === "sm" ? styles.sm : styles.md;

  return (
    <span className={`${styles.badge} ${variantClass} ${sizeClass}`}>
      <span aria-hidden="true" className={styles.dot} />
      {children}
    </span>
  );
}

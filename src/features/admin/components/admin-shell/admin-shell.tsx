"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import logoSource from "@/assets/brand/logo-transparent.png";

import { useAdmin } from "../../context/admin-store";
import styles from "./admin-shell.module.css";

type AdminShellProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

export function AdminShell({
  children,
  title = "Overview",
  subtitle = "Ruru Pitambari Operations & Store Management",
}: AdminShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { orders, dealers, inquiries, products } = useAdmin();

  const pendingOrdersCount = orders.filter((o) => o.status === "Pending").length;
  const pendingDealersCount = dealers.filter((d) => d.status === "Pending Review").length;
  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;
  const lowStockCount = products.reduce((acc, p) => {
    const lowCount = p.variants.filter((v) => v.stock <= v.lowStockThreshold).length;
    return acc + (lowCount > 0 ? 1 : 0);
  }, 0);

  const navItems = [
    {
      href: "/admin",
      label: "Overview",
      count: undefined,
      isAlert: false,
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect height="7" rx="1" width="7" x="3" y="3" />
          <rect height="7" rx="1" width="7" x="14" y="3" />
          <rect height="7" rx="1" width="7" x="14" y="14" />
          <rect height="7" rx="1" width="7" x="3" y="14" />
        </svg>
      ),
    },
    {
      href: "/admin/orders",
      label: "Orders",
      count: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
      isAlert: pendingOrdersCount > 0,
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      href: "/admin/products",
      label: "Products & Stock",
      count: lowStockCount > 0 ? `${lowStockCount} low` : undefined,
      isAlert: lowStockCount > 0,
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="m7.5 4.27 9 5.15" />
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      ),
    },
    {
      href: "/admin/dealers",
      label: "Wholesale Dealers",
      count: pendingDealersCount > 0 ? pendingDealersCount : undefined,
      isAlert: pendingDealersCount > 0,
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      href: "/admin/messages",
      label: "Customer Inquiries",
      count: newInquiriesCount > 0 ? newInquiriesCount : undefined,
      isAlert: newInquiriesCount > 0,
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      href: "/admin/settings",
      label: "Settings",
      count: undefined,
      isAlert: false,
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.layout}>
      {/* Mobile Backdrop */}
      <div
        className={`${styles.backdrop} ${sidebarOpen ? styles.backdropVisible : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.brandHeader}>
          <Link className={styles.brandTitleGroup} href="/admin">
            <div className={styles.logoWrap}>
              <Image
                alt="Ruru Pitambari"
                className={styles.brandLogo}
                height={36}
                priority
                src={logoSource}
                width={36}
              />
            </div>
            <div>
              <div className={styles.brandName}>Ruru Pitambari</div>
              <div className={styles.brandBadge}>Admin Portal</div>
            </div>
          </Link>
          <button
            aria-label="Close navigation"
            className={styles.closeButton}
            onClick={() => setSidebarOpen(false)}
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

        <nav aria-label="Admin navigation" className={styles.nav}>
          <div className={styles.navSectionLabel}>Core Management</div>
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);

            return (
              <Link
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                href={item.href}
                key={item.href}
                onClick={() => setSidebarOpen(false)}
              >
                <div className={styles.navItemContent}>
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.count ? (
                  <span
                    className={`${styles.navCount} ${item.isAlert ? styles.navCountAlert : ""}`}
                  >
                    {item.count}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link className={styles.storeLink} href="/" target="_blank">
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" x2="21" y1="14" y2="3" />
            </svg>
            <span>View Customer Store</span>
          </Link>

          <div className={styles.adminProfile}>
            <div className={styles.avatar}>OP</div>
            <div className={styles.profileDetails}>
              <span className={styles.profileName}>Operations Admin</span>
              <span className={styles.profileRole}>Lalitpur HQ · Nepal</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className={styles.mainWrapper}>
        <header className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <button
              aria-label="Open sidebar"
              className={styles.menuButton}
              onClick={() => setSidebarOpen(true)}
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
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            </button>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>{title}</h1>
              <p className={styles.pageSubtitle}>{subtitle}</p>
            </div>
          </div>

          <div className={styles.topBarRight}>
            <div className={styles.systemBadge}>
              <span className={styles.systemIndicator} />
              <span>Catalog Live</span>
            </div>
          </div>
        </header>

        <main className={styles.contentCanvas}>{children}</main>
      </div>
    </div>
  );
}

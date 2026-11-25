"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import logoSource from "@/assets/brand/logo-transparent.png";
import styles from "./admin-shell.module.css";

type AdminShellProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function AdminShell({
  children,
  title = "Overview",
  subtitle = "Review store orders, inventory, and dealer messages. Times shown in Nepal time.",
  actions,
}: AdminShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Exact Order Requested: Dashboard -> Enquiries & Messages -> Orders Management -> Wholesale Dealers -> Products & Stock
  const overviewNav = [
    {
      href: "/admin",
      label: "Dashboard",
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
      href: "/admin/messages",
      label: "Enquiries & Messages",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      href: "/admin/orders",
      label: "Orders Management",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      href: "/admin/dealers",
      label: "Wholesale Dealers",
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
      href: "/admin/products",
      label: "Products & Stock",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="m7.5 4.27 9 5.15" />
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      ),
    },
  ];

  // Website Pages directly in the sidebar as requested
  const pagesNav = [
    {
      href: "/admin/content/home",
      label: "Home Page",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      href: "/admin/content/story",
      label: "Our Story",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
        </svg>
      ),
    },
    {
      href: "/admin/content/gallery",
      label: "Gallery & Media",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
    {
      href: "/admin/content/combos",
      label: "Combo Offers",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" x2="7.01" y1="7" y2="7" />
        </svg>
      ),
    },
    {
      href: "/admin/content/contact",
      label: "Contact & Factory",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
  ];

  const configNav = [
    {
      href: "/admin/settings",
      label: "Store Settings",
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

      {/* Clean & Professional Brand Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        {/* Brand Header */}
        <div className={styles.brandHeader}>
          <Link className={styles.brandTitleGroup} href="/admin">
            <div className={styles.logoWrap}>
              <Image
                alt="Ruru Pitambari Logo"
                className={styles.brandLogo}
                height={32}
                priority
                src={logoSource}
                width={32}
              />
            </div>
            <div className={styles.brandInfo}>
              <div className={styles.brandName}>Ruru Pitambari</div>
              <div className={styles.brandConsoleLabel}>Admin Console</div>
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

        {/* Navigation Sections */}
        <nav aria-label="Admin navigation" className={styles.nav}>
          {/* Section 1: Store Overview (Dashboard -> Enquiries & Messages -> Orders Management -> Dealers -> Products) */}
          <div className={styles.navSectionLabel}>Store Overview</div>
          {overviewNav.map((item) => {
            const isActive =
              item.href === "/admin" ? pathname === "/admin" : pathname === item.href;

            return (
              <Link
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                href={item.href}
                key={item.href}
                onClick={() => setSidebarOpen(false)}
              >
                <div className={styles.navItemContent}>
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </div>
              </Link>
            );
          })}

          {/* Section 2: Website Pages (All pages directly in sidebar) */}
          <div className={styles.navSectionLabel} style={{ marginTop: "1.25rem" }}>
            Website Pages
          </div>
          {pagesNav.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                href={item.href}
                key={item.href}
                onClick={() => setSidebarOpen(false)}
              >
                <div className={styles.navItemContent}>
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </div>
              </Link>
            );
          })}

          {/* Section 3: Settings & Configuration */}
          <div className={styles.navSectionLabel} style={{ marginTop: "1.25rem" }}>
            Configuration
          </div>
          {configNav.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                href={item.href}
                key={item.href}
                onClick={() => setSidebarOpen(false)}
              >
                <div className={styles.navItemContent}>
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className={styles.sidebarFooter}>
          <div className={styles.signedInLabel}>Signed in as Site Admin</div>
          <Link className={styles.signOutBtn} href="/">
            <svg
              fill="none"
              height="15"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="15"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            <span>Exit to Store</span>
          </Link>
          <div className={styles.copyrightText}>Ruru Pitambari · Website Administration</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainWrapper}>
        {/* Crisp White Top Bar */}
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
            <div className={styles.workspaceHeader}>
              <span className={styles.workspaceTag}>STORE WORKSPACE</span>
              <div className={styles.workspaceTitle}>Website Administration</div>
            </div>
          </div>

          <div className={styles.topBarRight}>
            <Link className={styles.viewSiteBtn} href="/" target="_blank">
              <svg
                fill="none"
                height="15"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="15"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" x2="21" y1="14" y2="3" />
              </svg>
              <span>View site</span>
            </Link>

            <div className={styles.userProfilePill}>
              <div className={styles.userAvatar}>S</div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>Site Admin</span>
                <span className={styles.userRole}>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Canvas */}
        <main className={styles.contentCanvas}>
          {/* Page Title & Refresh Area */}
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>{title}</h1>
              <p className={styles.pageSubtitle}>{subtitle}</p>
            </div>
            <div className={styles.headerActions}>
              {actions}
              <button
                className={styles.refreshBtn}
                onClick={() => window.location.reload()}
                type="button"
              >
                <svg
                  fill="none"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="14"
                >
                  <path d="M23 4v6h-6" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}

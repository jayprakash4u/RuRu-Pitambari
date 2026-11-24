"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCart } from "@/features/cart";

import styles from "./mobile-bottom-nav.module.css";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <nav aria-label="Mobile Bottom Navigation" className={styles.bottomNav}>
      {/* 1. Home */}
      <Link
        aria-current={pathname === "/" ? "page" : undefined}
        className={styles.navItem}
        href="/"
      >
        <span className={styles.iconWrap}>
          <svg
            aria-hidden="true"
            fill="none"
            height="21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="21"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </span>
        <span className={styles.label}>Home</span>
      </Link>

      {/* 2. Product */}
      <Link
        aria-current={
          pathname === "/products" || pathname?.startsWith("/products/") ? "page" : undefined
        }
        className={styles.navItem}
        href="/products"
      >
        <span className={styles.iconWrap}>
          <svg
            aria-hidden="true"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
          >
            <rect height="7" rx="1.5" width="7" x="3" y="3" />
            <rect height="7" rx="1.5" width="7" x="14" y="3" />
            <rect height="7" rx="1.5" width="7" x="3" y="14" />
            <rect height="7" rx="1.5" width="7" x="14" y="14" />
          </svg>
        </span>
        <span className={styles.label}>Product</span>
      </Link>

      {/* 3. Account */}
      <Link
        aria-current={pathname === "/sign-in" || pathname === "/account" ? "page" : undefined}
        className={styles.navItem}
        href="/sign-in"
      >
        <span className={styles.iconWrap}>
          <svg
            aria-hidden="true"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        <span className={styles.label}>Account</span>
      </Link>

      {/* 4. Wishlist */}
      <Link
        aria-current={pathname === "/wishlist" ? "page" : undefined}
        className={styles.navItem}
        href="/cart"
      >
        <span className={styles.iconWrap}>
          <svg
            aria-hidden="true"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span className={styles.badge}>0</span>
        </span>
        <span className={styles.label}>Wishlist</span>
      </Link>

      {/* 5. Cart */}
      <Link
        aria-current={pathname === "/cart" ? "page" : undefined}
        className={styles.navItem}
        href="/cart"
      >
        <span className={styles.iconWrap}>
          <svg
            aria-hidden="true"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className={styles.badge}>{itemCount}</span>
        </span>
        <span className={styles.label}>Cart</span>
      </Link>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { Drawer } from "@/components/ui";
import { useCart } from "@/features/cart";

import styles from "./site-header.module.css";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about-us", label: "About us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topBarMeta}>
            <a href="tel:+9779851037659">Customer care: +977 985-1037659</a>
            <span aria-hidden="true" />
            <a href="mailto:info@rurupitambari.com">info@rurupitambari.com</a>
          </div>
          <p className={styles.topBarMessage}>Made in Nepal · Trusted metal care since 2009</p>
          <div aria-label="Social media" className={styles.socials}>
            <a
              aria-label="Facebook"
              href="https://www.facebook.com/rurupitambari/"
              rel="noreferrer"
              target="_blank"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path
                  className={styles.socialFill}
                  d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z"
                />
              </svg>
            </a>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/"
              rel="noreferrer"
              target="_blank"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <rect height="16" rx="4" width="16" x="4" y="4" />
                <circle cx="12" cy="12" r="3.5" />
                <circle className={styles.socialDot} cx="17.5" cy="6.5" r="1" />
              </svg>
            </a>
            <a aria-label="TikTok" href="https://www.tiktok.com/" rel="noreferrer" target="_blank">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M14 4v10.25A3.75 3.75 0 1 1 10.25 10H11v3.2a1.5 1.5 0 1 0 1 1.42V4h2Zm0 0c.4 2.3 1.7 3.7 4 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.brandZone}>
          <BrandLockup />
        </div>

        <nav aria-label="Primary navigation" className={styles.desktopNav}>
          {navigation.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              className={styles.navLink}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form action="/products" className={styles.search} role="search">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="6" />
            <path d="m16 16 4 4" />
          </svg>
          <input aria-label="Search products" name="q" type="search" />
        </form>

        <div className={styles.utilities}>
          <Link aria-label="Sign in" className={styles.utilityAction} href="/sign-in">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6" />
            </svg>
            <span>Sign in</span>
          </Link>
          <Link aria-label="Cart" className={styles.utilityAction} href="/cart">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M4 5h2l1.5 9h9.8l1.7-6H7" />
              <circle cx="9" cy="18.5" r="1" />
              <circle cx="17" cy="18.5" r="1" />
            </svg>
            <span>Cart{itemCount ? ` (${itemCount})` : ""}</span>
          </Link>
          <button
            aria-expanded={menuOpen}
            aria-label="Open navigation menu"
            className={styles.menuButton}
            onClick={() => setMenuOpen(true)}
            type="button"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <Drawer onClose={() => setMenuOpen(false)} open={menuOpen} title="Menu">
        <nav aria-label="Mobile navigation" className={styles.mobileNav}>
          {navigation.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              className={styles.mobileLink}
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileFooter}>
          <p>Traditional care, thoughtfully made in Nepal.</p>
          <Link className={styles.mobileAction} href="/products" onClick={() => setMenuOpen(false)}>
            Explore products
          </Link>
        </div>
      </Drawer>
    </header>
  );
}

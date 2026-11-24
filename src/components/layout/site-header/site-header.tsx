"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { Drawer } from "@/components/ui";

import styles from "./site-header.module.css";

interface NavItem {
  readonly href: string;
  readonly label: string;
  readonly hasDropdown?: boolean;
}

const navigation: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/products", hasDropdown: true, label: "Products" },
  { href: "/combo-offers", label: "Combo Offer" },
  { href: "/about-us", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Mobile Top Bar: Full-Width Heritage Red Strip (#8c1d24) */}
      <div className={styles.mobileTopBar}>
        <div className={styles.mobileTopBarInner}>
          {/* Left: Contact Details */}
          <div className={styles.mobileTopBarLeft}>
            <a className={styles.mobileTopBarLink} href="tel:+9779851037659">
              <svg
                aria-hidden="true"
                fill="none"
                height="11"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="11"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+977 985-1037659</span>
            </a>
            <span aria-hidden="true" className={styles.mobileTopBarDivider}>
              |
            </span>
            <Link className={styles.mobileTopBarLink} href="/contact">
              <svg
                aria-hidden="true"
                fill="none"
                height="11"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="11"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Lalitpur</span>
            </Link>
          </div>

          {/* Right: Social Media Icons (Facebook & WhatsApp) */}
          <div aria-label="Social media" className={styles.mobileSocialGroup}>
            {/* Facebook */}
            <a
              aria-label="Facebook"
              className={styles.mobileSocialIcon}
              href="https://www.facebook.com/rurupitambari/"
              rel="noreferrer"
              target="_blank"
            >
              <svg
                aria-hidden="true"
                fill="currentColor"
                height="13"
                viewBox="0 0 24 24"
                width="13"
              >
                <path
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.028C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"
                  fillRule="evenodd"
                />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              aria-label="WhatsApp"
              className={styles.mobileSocialIcon}
              href="https://wa.me/9779851037659"
              rel="noreferrer"
              target="_blank"
            >
              <svg
                aria-hidden="true"
                fill="currentColor"
                height="13"
                viewBox="0 0 24 24"
                width="13"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.86-.38-4.12-1.1l-.3-.17-3.12.82.83-3.04-.19-.31a8.21 8.21 0 0 1-1.25-4.44c0-4.54 3.7-8.24 8.24-8.24m4.57 11.66c-.25.7-1.24 1.29-1.74 1.35-.47.06-1.08.09-3.12-.76-2.6-1.08-4.27-3.72-4.4-3.89-.13-.17-1.06-1.41-1.06-2.69 0-1.28.67-1.91.91-2.17.24-.26.52-.32.7-.32.18 0 .35 0 .5.01.17.01.38-.07.6.46.23.53.77 1.88.84 2.02.07.13.11.29.02.47-.09.18-.13.29-.27.45-.13.16-.28.36-.4.48-.13.13-.27.28-.12.55.15.27.7 1.16 1.51 1.88 1.04.93 1.91 1.22 2.18 1.36.27.13.43.11.58-.07.16-.18.67-.78.85-1.05.18-.27.36-.22.61-.13.25.09 1.58.74 1.85.88.27.13.45.2.52.31.07.11.07.65-.18 1.35" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Header Row (Visible ONLY on mobile <= 48rem) */}
      <div className={styles.mobileHeaderRow}>
        {/* Left: Brand Logo */}
        <div className={styles.mobileBrandLeft}>
          <BrandLockup layout="horizontal" />
        </div>

        {/* Right: Search + Hamburger Menu */}
        <div className={styles.mobileActionsGroup}>
          <button
            aria-expanded={searchOpen}
            aria-label="Toggle search"
            className={styles.mobileSearchBtn}
            onClick={() => setSearchOpen((prev) => !prev)}
            type="button"
          >
            <svg
              aria-hidden="true"
              fill="none"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="20"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" x2="16.65" y1="21" y2="16.65" />
            </svg>
          </button>

          <button
            aria-expanded={menuOpen}
            aria-label="Open navigation menu"
            className={styles.mobileHamburgerBtn}
            onClick={() => setMenuOpen(true)}
            type="button"
          >
            <span className={styles.hamburgerBar} />
            <span className={styles.hamburgerBar} />
            <span className={styles.hamburgerBar} />
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {searchOpen ? (
        <div className={styles.mobileSearchDropdown}>
          <form action="/products" className={styles.mobileSearchForm} role="search">
            <svg
              aria-hidden="true"
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
              aria-label="Search care products"
              autoFocus
              className={styles.mobileSearchInput}
              name="q"
              placeholder="Search products, care tips..."
              type="search"
            />
            <button
              aria-label="Close search"
              className={styles.closeSearchBtn}
              onClick={() => setSearchOpen(false)}
              type="button"
            >
              ✕
            </button>
          </form>
        </div>
      ) : null}

      {/* Desktop Header Row (Hidden on mobile <= 48rem) */}
      <div className={styles.desktopHeaderRow}>
        <div className={styles.topAreaWrapper}>
          <div className={styles.topAreaInner}>
            {/* Fully Left Side Top: Stacked Logo (Seal on top, Name below) */}
            <div className={styles.brandZone}>
              <BrandLockup layout="stacked" />
            </div>

            {/* Right Header Content Area */}
            <div className={styles.headerContentZone}>
              {/* Tier 1: Contained Top Bar (3px subtle radius, Heritage Red #8C1D24) */}
              <div className={styles.topBarPill}>
                {/* Left: Contact Info & Address */}
                <div className={styles.topBarLeft}>
                  <Link className={styles.topBarLink} href="/contact">
                    <svg
                      aria-hidden="true"
                      fill="none"
                      height="13"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="13"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Lalitpur, Nepal</span>
                  </Link>
                  <span aria-hidden="true" className={styles.topBarDivider}>
                    |
                  </span>
                  <a className={styles.topBarLink} href="tel:+9779851037659">
                    <svg
                      aria-hidden="true"
                      fill="none"
                      height="13"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="13"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>Call +977 985-1037659</span>
                  </a>
                  <span aria-hidden="true" className={styles.topBarDivider}>
                    |
                  </span>
                  <a className={styles.topBarLink} href="mailto:info@rurupitambari.com">
                    <svg
                      aria-hidden="true"
                      fill="none"
                      height="13"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="13"
                    >
                      <rect height="16" rx="2" width="20" x="2" y="4" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>info@rurupitambari.com</span>
                  </a>
                </div>

                {/* Right: Social Media Icons + Sign In + Cart */}
                <div className={styles.topBarRight}>
                  <div aria-label="Social media" className={styles.socialGroup}>
                    {/* Facebook */}
                    <a
                      aria-label="Facebook"
                      className={styles.socialIcon}
                      href="https://www.facebook.com/rurupitambari/"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <svg
                        aria-hidden="true"
                        fill="currentColor"
                        height="15"
                        viewBox="0 0 24 24"
                        width="15"
                      >
                        <path
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.028C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"
                          fillRule="evenodd"
                        />
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      aria-label="Instagram"
                      className={styles.socialIcon}
                      href="https://www.instagram.com/"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <svg
                        aria-hidden="true"
                        fill="none"
                        height="15"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="15"
                      >
                        <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </a>

                    {/* X (formerly Twitter) */}
                    <a
                      aria-label="X (Twitter)"
                      className={styles.socialIcon}
                      href="https://twitter.com/"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <svg
                        aria-hidden="true"
                        fill="currentColor"
                        height="14"
                        viewBox="0 0 24 24"
                        width="14"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>

                    {/* WhatsApp */}
                    <a
                      aria-label="WhatsApp"
                      className={styles.socialIcon}
                      href="https://wa.me/9779851037659"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <svg
                        aria-hidden="true"
                        fill="currentColor"
                        height="15"
                        viewBox="0 0 24 24"
                        width="15"
                      >
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.86-.38-4.12-1.1l-.3-.17-3.12.82.83-3.04-.19-.31a8.21 8.21 0 0 1-1.25-4.44c0-4.54 3.7-8.24 8.24-8.24m4.57 11.66c-.25.7-1.24 1.29-1.74 1.35-.47.06-1.08.09-3.12-.76-2.6-1.08-4.27-3.72-4.4-3.89-.13-.17-1.06-1.41-1.06-2.69 0-1.28.67-1.91.91-2.17.24-.26.52-.32.7-.32.18 0 .35 0 .5.01.17.01.38-.07.6.46.23.53.77 1.88.84 2.02.07.13.11.29.02.47-.09.18-.13.29-.27.45-.13.16-.28.36-.4.48-.13.13-.27.28-.12.55.15.27.7 1.16 1.51 1.88 1.04.93 1.91 1.22 2.18 1.36.27.13.43.11.58-.07.16-.18.67-.78.85-1.05.18-.27.36-.22.61-.13.25.09 1.58.74 1.85.88.27.13.45.2.52.31.07.11.07.65-.18 1.35" />
                      </svg>
                    </a>
                  </div>

                  <span aria-hidden="true" className={styles.topBarDivider}>
                    |
                  </span>

                  {/* Sign in (Top Bar) */}
                  <Link aria-label="Sign in" className={styles.topBarLink} href="/sign-in">
                    <svg
                      aria-hidden="true"
                      fill="none"
                      height="13"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="13"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Sign in</span>
                  </Link>

                  <span aria-hidden="true" className={styles.topBarDivider}>
                    |
                  </span>

                  {/* Wishlist (Top Bar) */}
                  <Link aria-label="Wishlist" className={styles.topBarLink} href="/wishlist">
                    <svg
                      aria-hidden="true"
                      fill="none"
                      height="13"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="13"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    <span>Wishlist</span>
                  </Link>

                  <span aria-hidden="true" className={styles.topBarDivider}>
                    |
                  </span>

                  {/* Cart (Simple, Clean Cart in Top Bar) */}
                  <Link aria-label="Shopping Cart" className={styles.topBarLink} href="/cart">
                    <svg
                      aria-hidden="true"
                      fill="none"
                      height="13"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="13"
                    >
                      <circle cx="8" cy="21" r="1" />
                      <circle cx="19" cy="21" r="1" />
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                    <span>Cart</span>
                  </Link>
                </div>
              </div>

              {/* Tier 2: Menus (Moved to Above) + Small Search on Right + Utilities */}
              <div className={styles.actionRow}>
                {/* Desktop Navigation Menus (Moved to Above) */}
                <nav aria-label="Primary navigation" className={styles.desktopNav}>
                  {/* Browse All Categories Button on Left Side (Matching Uploaded Image) */}
                  <div
                    className={styles.categoryDropdownWrapper}
                    onMouseEnter={() => setCategoriesOpen(true)}
                    onMouseLeave={() => setCategoriesOpen(false)}
                  >
                    <button
                      aria-expanded={categoriesOpen}
                      aria-haspopup="true"
                      className={styles.browseCategoriesBtn}
                      onClick={() => setCategoriesOpen((prev) => !prev)}
                      type="button"
                    >
                      <svg
                        aria-hidden="true"
                        fill="currentColor"
                        height="14"
                        viewBox="0 0 24 24"
                        width="14"
                      >
                        <rect height="7" rx="1.5" width="7" x="3" y="3" />
                        <rect height="7" rx="1.5" width="7" x="14" y="3" />
                        <rect height="7" rx="1.5" width="7" x="3" y="14" />
                        <rect height="7" rx="1.5" width="7" x="14" y="14" />
                      </svg>
                      <span>Browse All Categories</span>
                    </button>

                    {/* Dropdown Menu */}
                    {categoriesOpen ? (
                      <div className={styles.categoryMenu}>
                        <Link
                          className={styles.categoryMenuItem}
                          href="/products"
                          onClick={() => setCategoriesOpen(false)}
                        >
                          Homecare
                        </Link>
                        <span aria-hidden="true" className={styles.categoryMenuDivider} />
                        <Link
                          className={styles.categoryMenuItem}
                          href="/products?category=metal-care"
                          onClick={() => setCategoriesOpen(false)}
                        >
                          Pooja
                        </Link>
                        <span aria-hidden="true" className={styles.categoryMenuDivider} />
                        <Link
                          className={styles.categoryMenuItem}
                          href="/products?category=metal-care"
                          onClick={() => setCategoriesOpen(false)}
                        >
                          Metal Care
                        </Link>
                        <span aria-hidden="true" className={styles.categoryMenuDivider} />
                        <Link
                          className={styles.categoryMenuItem}
                          href="/products?category=kitchen-care"
                          onClick={() => setCategoriesOpen(false)}
                        >
                          Kitchen Care
                        </Link>
                        <span aria-hidden="true" className={styles.categoryMenuDivider} />
                        <Link
                          className={styles.categoryMenuItem}
                          href="/products?category=floor-care"
                          onClick={() => setCategoriesOpen(false)}
                        >
                          Floor Care
                        </Link>
                      </div>
                    ) : null}
                  </div>

                  {navigation.map((item) => (
                    <Link
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={styles.navLink}
                      href={item.href}
                      key={item.href}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown ? (
                        <svg
                          aria-hidden="true"
                          className={styles.chevronIcon}
                          fill="none"
                          height="10"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                          width="10"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      ) : null}
                    </Link>
                  ))}
                </nav>

                {/* Right Side: Small Search Box + Seller Button + Utilities */}
                <div className={styles.rightActionsGroup}>
                  {/* Small Search Box on Right Side (Matching Reference) */}
                  <form action="/products" className={styles.smallSearchBar} role="search">
                    <input
                      aria-label="Search products, care tips"
                      autoComplete="off"
                      className={styles.smallSearchInput}
                      name="q"
                      placeholder="Search products..."
                      spellCheck="false"
                      type="search"
                    />
                    <button
                      aria-label="Submit search"
                      className={styles.smallSearchBtn}
                      type="submit"
                    >
                      <svg
                        aria-hidden="true"
                        fill="none"
                        height="13"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        width="13"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" x2="16.65" y1="21" y2="16.65" />
                      </svg>
                    </button>
                  </form>

                  {/* Seller Button (Segmented Style Matching Reference Image) */}
                  <Link className={styles.sellerBtn} href="/#seller">
                    <span className={styles.sellerIconBox}>
                      <svg
                        aria-hidden="true"
                        fill="none"
                        height="12"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.8"
                        viewBox="0 0 24 24"
                        width="12"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className={styles.sellerLabel}>Seller</span>
                  </Link>

                  {/* Right Utilities (Mobile Search Toggle & Menu Button) */}
                  <div className={styles.utilities}>
                    {/* Mobile Search Toggle */}
                    <button
                      aria-expanded={searchOpen}
                      aria-label="Toggle search"
                      className={styles.iconBtn}
                      onClick={() => setSearchOpen((prev) => !prev)}
                      type="button"
                    >
                      <svg
                        aria-hidden="true"
                        fill="none"
                        height="18"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="18"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" x2="16.65" y1="21" y2="16.65" />
                      </svg>
                    </button>

                    {/* Mobile Cart Button */}
                    <Link aria-label="Shopping Cart" className={styles.mobileCartBtn} href="/cart">
                      <svg
                        aria-hidden="true"
                        fill="none"
                        height="18"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="18"
                      >
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                      </svg>
                    </Link>

                    {/* Mobile Hamburger Button */}
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
              </div>

              {/* Mobile Search Dropdown */}
              {searchOpen ? (
                <div className={styles.mobileSearchDropdown}>
                  <form action="/products" className={styles.mobileSearchForm} role="search">
                    <svg
                      aria-hidden="true"
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
                      aria-label="Search care products"
                      autoFocus
                      className={styles.mobileSearchInput}
                      name="q"
                      placeholder="Search products, care tips..."
                      type="search"
                    />
                    <button
                      aria-label="Close search"
                      className={styles.closeSearchBtn}
                      onClick={() => setSearchOpen(false)}
                      type="button"
                    >
                      ✕
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
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
          <p>Traditional metal care, thoughtfully crafted in Nepal since 2009.</p>
          <Link className={styles.mobileAction} href="/products" onClick={() => setMenuOpen(false)}>
            Explore Products
          </Link>
        </div>
      </Drawer>
    </header>
  );
}

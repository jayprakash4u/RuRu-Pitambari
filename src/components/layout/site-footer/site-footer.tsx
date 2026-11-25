import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";

import styles from "./site-footer.module.css";

const currentYear = new Date().getFullYear();

const trustPillars = [
  {
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "100% Nepali Brand",
    description: "Formulated & crafted in Lalitpur, Nepal since 2009",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6.4-4.8-6.4 4.8 2.4-7.2-6-4.8h7.6z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Authentic Utensil Shine",
    description: "Gentle & proven care for brass, copper & sacred vessels",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <rect
          height="13"
          rx="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="16"
          x="1"
          y="3"
        />
        <path d="M16 8h4l3 3v5h-7V8z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Nationwide Availability",
    description: "Supplied across retail, grocery & puja stores across Nepal",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Direct Support & Enquiries",
    description: "+977 985-1037659 · info@rurupitambari.com",
  },
] as const;

const shopLinks = [
  { href: "/products", label: "All Products" },
  { href: "/products?category=metal-care", label: "Metal Care" },
  { href: "/products?category=pooja-care", label: "Pooja Care" },
  { href: "/products?category=kitchen-care", label: "Kitchen Care" },
  { href: "/products?category=floor-care", label: "Floor Care" },
  { href: "/combos", label: "Value Packs & Combos" },
] as const;

const companyLinks = [
  { href: "/about-us", label: "Our Story" },
  { href: "/gallery", label: "Dealer Jatra Gallery" },
  { href: "/dealers", label: "Become a Dealer" },
  { href: "/where-to-buy", label: "Where to Buy" },
  { href: "/contact", label: "Contact Us" },
] as const;

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      {/* Top Trust & Value Pillars */}
      <section aria-label="Brand Guarantees" className={styles.trustSection}>
        <div className={styles.trustGrid}>
          {trustPillars.map((item) => (
            <div className={styles.trustItem} key={item.title}>
              <div aria-hidden="true" className={styles.trustIconWrap}>
                {item.icon}
              </div>
              <div className={styles.trustContent}>
                <h3 className={styles.trustTitle}>{item.title}</h3>
                <p className={styles.trustDesc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Footer Content */}
      <div className={styles.main}>
        {/* Brand & Contact Column */}
        <div className={styles.brandColumn}>
          <BrandLockup size="md" />
          <p className={styles.brandDesc}>
            Trusted care for the things that make a home feel like home. Specialized metal, pooja,
            and household cleaning formulations crafted in Nepal since 2009.
          </p>

          <address className={styles.contactBlock}>
            <a className={styles.contactLink} href="tel:+9779851037659">
              <svg
                aria-hidden="true"
                className={styles.contactIcon}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>+977 985-1037659</span>
            </a>
            <a className={styles.contactLink} href="mailto:info@rurupitambari.com">
              <svg
                aria-hidden="true"
                className={styles.contactIcon}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>info@rurupitambari.com</span>
            </a>
            <div className={styles.contactLink}>
              <svg
                aria-hidden="true"
                className={styles.contactIcon}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Lalitpur, Bagmati, Nepal</span>
            </div>
          </address>
        </div>

        {/* Navigation Link Groups */}
        <nav aria-label="Footer navigation" className={styles.linkGrid}>
          {/* Shop Column */}
          <div className={styles.linkGroup}>
            <h3 className={styles.groupHeading}>Products &amp; Care</h3>
            <ul className={styles.linkList}>
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link className={styles.navLink} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className={styles.linkGroup}>
            <h3 className={styles.groupHeading}>Company &amp; Story</h3>
            <ul className={styles.linkList}>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link className={styles.navLink} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Connect & Trust Seal Column */}
        <div className={styles.connectColumn}>
          <h3 className={styles.groupHeading}>Stay Connected</h3>
          <p className={styles.connectDesc}>
            Product care tips, festival cleaning guides, and company announcements.
          </p>

          <div aria-label="Social media" className={styles.socials}>
            <a
              aria-label="Facebook"
              className={styles.socialLink}
              href="https://www.facebook.com/rurupitambari/"
              rel="noreferrer"
              target="_blank"
            >
              <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z" />
              </svg>
            </a>
            <a
              aria-label="Instagram"
              className={styles.socialLink}
              href="https://www.instagram.com/"
              rel="noreferrer"
              target="_blank"
            >
              <svg
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                viewBox="0 0 24 24"
              >
                <rect height="16" rx="4" width="16" x="4" y="4" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
            </a>
            <a
              aria-label="TikTok"
              className={styles.socialLink}
              href="https://www.tiktok.com/"
              rel="noreferrer"
              target="_blank"
            >
              <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.4a6.33 6.33 0 0 0-.84-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.48c1.77-1.78 2.22-4.43 2.05-6.84a8.3 8.3 0 0 0 4.17 1.15v-3.47c-.15 0-.3 0-.45-.03a4.87 4.87 0 0 1-3.5-4.28h.01l-.01.01v-.01z" />
              </svg>
            </a>
            <a
              aria-label="WhatsApp"
              className={styles.socialLink}
              href="https://wa.me/9779851037659"
              rel="noreferrer"
              target="_blank"
            >
              <svg
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>

          {/* Guarantee Badge */}
          <div className={styles.guaranteeBox}>
            <div className={styles.guaranteeIcon}>
              <svg
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className={styles.guaranteeTitle}>Quality Guaranteed</p>
              <p className={styles.guaranteeDesc}>Formulated by P Three Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <div className={styles.bottomLegal}>
            <span>&copy; {currentYear} P Three Products. All rights reserved.</span>
            <span className={styles.bulletSeparator}>&bull;</span>
            <span>Ruru Pitambari (Est. 2009)</span>
          </div>

          <div className={styles.bottomLinks}>
            <Link className={styles.legalLink} href="/privacy">
              Privacy Policy
            </Link>
            <span className={styles.bulletSeparator}>&bull;</span>
            <Link className={styles.legalLink} href="/terms">
              Terms of Service
            </Link>
            <span className={styles.bulletSeparator}>&bull;</span>
            <Link className={styles.legalLink} href="/dealers">
              Dealer Enquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

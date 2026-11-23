import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";

import styles from "./site-footer.module.css";

const footerLinks = [
  {
    heading: "Shop",
    links: [
      { href: "/products", label: "All products" },
      { href: "/products?category=metal-care", label: "Metal care" },
      { href: "/products?category=kitchen-care", label: "Kitchen care" },
      { href: "/products?category=floor-care", label: "Floor care" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about-us", label: "About us" },
      { href: "/gallery", label: "Gallery" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Help",
    links: [
      { href: "/where-to-buy", label: "Where to buy" },
      { href: "/dealers", label: "Become a dealer" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.brandColumn}>
          <BrandLockup />
          <p>Trusted care for the things that make a home feel like home.</p>
          <address>
            <a href="tel:+9779851037659">+977 985-1037659</a>
            <a href="mailto:info@rurupitambari.com">info@rurupitambari.com</a>
            <span>Lalitpur, Nepal</span>
          </address>
        </div>

        <nav aria-label="Footer navigation" className={styles.linkGrid}>
          {footerLinks.map((group) => (
            <div className={styles.linkGroup} key={group.heading}>
              <h3>{group.heading}</h3>
              {group.links.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className={styles.connect}>
          <h3>Follow</h3>
          <p>Product care, useful tips and updates.</p>
          <div aria-label="Social media" className={styles.socials}>
            <a
              aria-label="Facebook"
              href="https://www.facebook.com/rurupitambari/"
              rel="noreferrer"
              target="_blank"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z" />
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
                <circle cx="17.5" cy="6.5" r="1" />
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

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} P Three Products</span>
        <span>Ruru Pitambari · Established 2009</span>
        <span>Made in Nepal</span>
      </div>
    </footer>
  );
}

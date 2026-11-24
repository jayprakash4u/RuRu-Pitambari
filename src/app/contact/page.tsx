import type { Metadata } from "next";

import { ContactForm } from "@/features/contact";

import styles from "./contact-page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ruru Pitambari for product, retail and customer-care enquiries.",
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      {/* Top Heritage Red Banner (Matching Product, Combo & Gallery Style) */}
      <section aria-labelledby="contact-page-heading" className={styles.banner}>
        <div className={styles.bannerInner}>
          <h1 className={styles.bannerTitle} id="contact-page-heading">
            Contact Us
          </h1>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.details}>
            <div className={styles.detailsHeading}>
              <h2 id="contact-heading">Talk to our team</h2>
              <p>For products, orders, retail partnerships or general support.</p>
            </div>

            <div className={styles.contactList}>
              <article>
                <span className={styles.icon}>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M7.5 4.5 10 8l-2 2c1.3 2.7 3.3 4.7 6 6l2-2 3.5 2.5c.1 2-1 3-3 3C10 19.5 4.5 14 4.5 7.5c0-2 1-3.1 3-3Z" />
                  </svg>
                </span>
                <div>
                  <h3>Call</h3>
                  <a href="tel:+9779851037659">+977 985-1037659</a>
                  <p>Sunday–Friday, 9:00 AM–5:00 PM</p>
                </div>
              </article>

              <article>
                <span className={styles.icon}>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <rect height="14" rx="2" width="18" x="3" y="5" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                <div>
                  <h3>Email</h3>
                  <a href="mailto:info@rurupitambari.com">info@rurupitambari.com</a>
                  <p>We usually respond within one business day.</p>
                </div>
              </article>

              <article>
                <span className={styles.icon}>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" />
                    <circle cx="12" cy="10" r="2.25" />
                  </svg>
                </span>
                <div>
                  <h3>Visit</h3>
                  <p>Lalitpur, Nepal</p>
                </div>
              </article>
            </div>
          </div>

          <div className={styles.formPanel}>
            <h2>Send an enquiry</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

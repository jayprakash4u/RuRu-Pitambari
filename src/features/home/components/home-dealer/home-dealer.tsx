"use client";

import Image from "next/image";
import type { FormEvent } from "react";

import dealerImage from "@/assets/home/dealer-enquiry.png";

import styles from "./home-dealer.module.css";

const enquiryEmail = "info@rurupitambari.com";

function getField(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export function HomeDealer() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const businessName = getField(formData, "businessName");
    const subject = `Seller enquiry from ${businessName}`;
    const body = [
      `Business name: ${businessName}`,
      `Contact person: ${getField(formData, "contactName")}`,
      `Phone: ${getField(formData, "phone")}`,
      `Location: ${getField(formData, "location")}`,
      "",
      "Message:",
      getField(formData, "message") || "I would like to learn more about becoming a seller.",
    ].join("\n");

    window.location.href = `mailto:${enquiryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section aria-labelledby="seller-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.visual}>
          <Image
            alt="Two illustrated Nepali sellers welcoming customers in a home-care shop"
            className={styles.image}
            placeholder="blur"
            sizes="(max-width: 48rem) 100vw, 42vw"
            src={dealerImage}
          />
          <div className={styles.imageCaption}>
            <span>Partner with us</span>
            <strong>Grow your shop with a trusted Nepali brand.</strong>
          </div>
        </div>

        <div className={styles.content}>
          <h2 id="seller-heading">Become a seller</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <label>
                <span>Shop or business name</span>
                <input autoComplete="organization" name="businessName" required type="text" />
              </label>

              <label>
                <span>Contact person</span>
                <input autoComplete="name" name="contactName" required type="text" />
              </label>

              <label>
                <span>Phone number</span>
                <input autoComplete="tel" inputMode="tel" name="phone" required type="tel" />
              </label>

              <label>
                <span>City or district</span>
                <input autoComplete="address-level2" name="location" required type="text" />
              </label>
            </div>

            <label className={styles.messageField}>
              <span>
                Message <small>(optional)</small>
              </span>
              <textarea name="message" rows={3} />
            </label>

            <div className={styles.actions}>
              <button type="submit">Send seller enquiry</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

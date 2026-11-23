"use client";

import type { FormEvent } from "react";

import { Button, Field, Input, Select, Textarea } from "@/components/ui";

import styles from "./contact-form.module.css";

const enquiryEmail = "info@rurupitambari.com";

function readField(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = readField(formData, "name");
    const enquiryType = readField(formData, "enquiryType");
    const subject = `${enquiryType} enquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Phone: ${readField(formData, "phone")}`,
      `Email: ${readField(formData, "email")}`,
      `Enquiry: ${enquiryType}`,
      "",
      readField(formData, "message"),
    ].join("\n");

    window.location.href = `mailto:${enquiryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        <Field label="Your name" labelFor="contact-name">
          <Input autoComplete="name" id="contact-name" name="name" required />
        </Field>

        <Field label="Phone number" labelFor="contact-phone">
          <Input
            autoComplete="tel"
            id="contact-phone"
            inputMode="tel"
            name="phone"
            required
            type="tel"
          />
        </Field>
      </div>

      <Field label="Email address" labelFor="contact-email">
        <Input autoComplete="email" id="contact-email" name="email" required type="email" />
      </Field>

      <Field label="How can we help?" labelFor="contact-type">
        <Select defaultValue="General" id="contact-type" name="enquiryType">
          <option value="General">General enquiry</option>
          <option value="Product">Product enquiry</option>
          <option value="Retailer">Retailer enquiry</option>
          <option value="Support">Product support</option>
        </Select>
      </Field>

      <Field label="Message" labelFor="contact-message">
        <Textarea id="contact-message" name="message" required rows={5} />
      </Field>

      <Button className={styles.submit} size="lg" type="submit" variant="brand">
        Send enquiry
      </Button>
    </form>
  );
}

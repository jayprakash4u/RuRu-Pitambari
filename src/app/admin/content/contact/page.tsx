"use client";

import { useState } from "react";

import { AdminShell, useAdmin } from "@/features/admin";

import styles from "../content-page.module.css";

export default function AdminContactPageContent() {
  const { siteContent, updateSiteContent } = useAdmin();
  const [savedToast, setSavedToast] = useState(false);
  const [contactDraft, setContactDraft] = useState(siteContent.contact);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateSiteContent("contact", contactDraft);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
    }, 3500);
  }

  function handleReset() {
    setContactDraft(siteContent.contact);
  }

  return (
    <AdminShell
      subtitle="Manage corporate office address, factory address, hotline phone numbers, and official business hours."
      title="Contact & Factory Information"
    >
      <div className={styles.pageContainer}>
        {savedToast ? (
          <div className={styles.toast}>
            <span>✓ Contact and factory details updated successfully!</span>
            <button
              aria-label="Close notification"
              onClick={() => setSavedToast(false)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#2b614d" }}
              type="button"
            >
              ✕
            </button>
          </div>
        ) : null}

        <form className={styles.editorForm} onSubmit={handleSave}>
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>Contact Details & Showroom Locations</h2>
                <p className={styles.cardSubtitle}>
                  Information displayed on the Contact page, footer, and dealer communication
                  channels.
                </p>
              </div>
              <span className={styles.sectionBadge}>Contact Information</span>
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="cnt-hotline">
                  Primary Phone Hotline
                </label>
                <input
                  className={styles.input}
                  id="cnt-hotline"
                  onChange={(e) =>
                    setContactDraft({ ...contactDraft, phoneHotline: e.target.value })
                  }
                  value={contactDraft.phoneHotline}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="cnt-dealer">
                  Wholesale & Dealership Direct Line
                </label>
                <input
                  className={styles.input}
                  id="cnt-dealer"
                  onChange={(e) =>
                    setContactDraft({ ...contactDraft, dealershipPhone: e.target.value })
                  }
                  value={contactDraft.dealershipPhone}
                />
              </div>
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="cnt-email">
                  Support & Official Inquiry Email
                </label>
                <input
                  className={styles.input}
                  id="cnt-email"
                  onChange={(e) => setContactDraft({ ...contactDraft, email: e.target.value })}
                  value={contactDraft.email}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="cnt-hours">
                  Official Business Hours
                </label>
                <input
                  className={styles.input}
                  id="cnt-hours"
                  onChange={(e) =>
                    setContactDraft({ ...contactDraft, businessHours: e.target.value })
                  }
                  value={contactDraft.businessHours}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="cnt-factory">
                Manufacturing Facility Address
              </label>
              <input
                className={styles.input}
                id="cnt-factory"
                onChange={(e) =>
                  setContactDraft({ ...contactDraft, factoryAddress: e.target.value })
                }
                value={contactDraft.factoryAddress}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="cnt-office">
                Registered Corporate Office
              </label>
              <input
                className={styles.input}
                id="cnt-office"
                onChange={(e) =>
                  setContactDraft({ ...contactDraft, registeredOffice: e.target.value })
                }
                value={contactDraft.registeredOffice}
              />
            </div>
          </div>

          <div className={styles.bottomActionBar}>
            <button className={styles.resetBtn} onClick={handleReset} type="button">
              Reset Changes
            </button>
            <button className={styles.saveBtn} type="submit">
              Save Contact Details
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

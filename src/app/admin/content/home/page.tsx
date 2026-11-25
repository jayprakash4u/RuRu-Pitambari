"use client";

import { useState } from "react";

import { AdminShell, useAdmin } from "@/features/admin";

import styles from "../content-page.module.css";

export default function AdminHomePageContent() {
  const { siteContent, updateSiteContent } = useAdmin();
  const [savedToast, setSavedToast] = useState(false);
  const [homeDraft, setHomeDraft] = useState(siteContent.home);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateSiteContent("home", homeDraft);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
    }, 3500);
  }

  function handleReset() {
    setHomeDraft(siteContent.home);
  }

  return (
    <AdminShell
      subtitle="Manage Hero video banner, Deals of the Day, Before/After transformation comparison, and dealer callout."
      title="Home Page Sections"
    >
      <div className={styles.pageContainer}>
        {savedToast ? (
          <div className={styles.toast}>
            <span>✓ Home page sections and media updated successfully!</span>
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
          {/* Section: Hero Banner */}
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>Hero Video & Film Banner</h2>
                <p className={styles.cardSubtitle}>
                  Top full-width documentary film, fallback poster image, and brand tagline.
                </p>
              </div>
              <span className={styles.sectionBadge}>Top of Home</span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="hero-tagline">
                Hero Tagline & Headline
              </label>
              <input
                className={styles.input}
                id="hero-tagline"
                onChange={(e) => setHomeDraft({ ...homeDraft, heroTagline: e.target.value })}
                value={homeDraft.heroTagline}
              />
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="hero-video">
                  Desktop Video Source (MP4)
                </label>
                <input
                  className={styles.input}
                  id="hero-video"
                  onChange={(e) => setHomeDraft({ ...homeDraft, heroVideoUrl: e.target.value })}
                  value={homeDraft.heroVideoUrl}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="hero-poster">
                  Fallback Poster Image URL
                </label>
                <input
                  className={styles.input}
                  id="hero-poster"
                  onChange={(e) => setHomeDraft({ ...homeDraft, heroPosterUrl: e.target.value })}
                  value={homeDraft.heroPosterUrl}
                />
              </div>
            </div>
          </div>

          {/* Section: Deals of the Day */}
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>Deals of the Day Carousel</h2>
                <p className={styles.cardSubtitle}>
                  Configure heading and promotional subtitles above discounted bundle combos.
                </p>
              </div>
              <span className={styles.sectionBadge}>Section 2</span>
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="deals-heading">
                  Section Heading
                </label>
                <input
                  className={styles.input}
                  id="deals-heading"
                  onChange={(e) => setHomeDraft({ ...homeDraft, dealsHeading: e.target.value })}
                  value={homeDraft.dealsHeading}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="deals-subtitle">
                  Subtitle & Promotional Note
                </label>
                <input
                  className={styles.input}
                  id="deals-subtitle"
                  onChange={(e) => setHomeDraft({ ...homeDraft, dealsSubtitle: e.target.value })}
                  value={homeDraft.dealsSubtitle}
                />
              </div>
            </div>
          </div>

          {/* Section: Transformation */}
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>Instant Transformation (Before & After)</h2>
                <p className={styles.cardSubtitle}>
                  Showcase visual before/after restoration on traditional brass and copper vessels.
                </p>
              </div>
              <span className={styles.sectionBadge}>Section 3</span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="trans-heading">
                Heading
              </label>
              <input
                className={styles.input}
                id="trans-heading"
                onChange={(e) =>
                  setHomeDraft({ ...homeDraft, transformationHeading: e.target.value })
                }
                value={homeDraft.transformationHeading}
              />
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="trans-before">
                  Before Image URL (Tarnished Metal)
                </label>
                <input
                  className={styles.input}
                  id="trans-before"
                  onChange={(e) =>
                    setHomeDraft({ ...homeDraft, transformationBeforeImage: e.target.value })
                  }
                  value={homeDraft.transformationBeforeImage}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="trans-after">
                  After Image URL (Restored Shine)
                </label>
                <input
                  className={styles.input}
                  id="trans-after"
                  onChange={(e) =>
                    setHomeDraft({ ...homeDraft, transformationAfterImage: e.target.value })
                  }
                  value={homeDraft.transformationAfterImage}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="trans-desc">
                Transformation Narrative Description
              </label>
              <textarea
                className={styles.textarea}
                id="trans-desc"
                onChange={(e) =>
                  setHomeDraft({ ...homeDraft, transformationDescription: e.target.value })
                }
                value={homeDraft.transformationDescription}
              />
            </div>
          </div>

          {/* Section: Wholesale Dealer Callout */}
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>Wholesale & Dealer Network Callout</h2>
                <p className={styles.cardSubtitle}>
                  Promote retail and distributor partnerships at the bottom of the home page.
                </p>
              </div>
              <span className={styles.sectionBadge}>Section 4</span>
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="dealer-heading">
                  Dealer Section Heading
                </label>
                <input
                  className={styles.input}
                  id="dealer-heading"
                  onChange={(e) => setHomeDraft({ ...homeDraft, dealerHeading: e.target.value })}
                  value={homeDraft.dealerHeading}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="dealer-cta">
                  CTA Button Text
                </label>
                <input
                  className={styles.input}
                  id="dealer-cta"
                  onChange={(e) => setHomeDraft({ ...homeDraft, dealerCtaText: e.target.value })}
                  value={homeDraft.dealerCtaText}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="dealer-sub">
                Subtitle & Network Size Info
              </label>
              <input
                className={styles.input}
                id="dealer-sub"
                onChange={(e) => setHomeDraft({ ...homeDraft, dealerSubtitle: e.target.value })}
                value={homeDraft.dealerSubtitle}
              />
            </div>
          </div>

          {/* Bottom Actions Bar */}
          <div className={styles.bottomActionBar}>
            <button className={styles.resetBtn} onClick={handleReset} type="button">
              Reset Changes
            </button>
            <button className={styles.saveBtn} type="submit">
              Save Home Page Changes
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

"use client";

import { useState } from "react";

import { AdminShell, useAdmin } from "@/features/admin";

import styles from "../content-page.module.css";

export default function AdminStoryPageContent() {
  const { siteContent, updateSiteContent } = useAdmin();
  const [savedToast, setSavedToast] = useState(false);
  const [storyDraft, setStoryDraft] = useState(siteContent.story);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateSiteContent("story", storyDraft);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
    }, 3500);
  }

  function handleReset() {
    setStoryDraft(siteContent.story);
  }

  return (
    <AdminShell
      subtitle="Edit documentary story paragraphs, founder partner photo, mission & vision statements, and family commitment quote."
      title="Our Story / About Us"
    >
      <div className={styles.pageContainer}>
        {savedToast ? (
          <div className={styles.toast}>
            <span>✓ Our Story content and milestones updated successfully!</span>
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
          {/* Header & Main Story Narrative */}
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>Main Narrative & Documentary Partner Photo</h2>
                <p className={styles.cardSubtitle}>
                  Documentary story of P Three Products and Ruru Pitambari from Lalitpur since 2009.
                </p>
              </div>
              <span className={styles.sectionBadge}>Top Narrative</span>
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="story-banner-title">
                  Banner Page Title
                </label>
                <input
                  className={styles.input}
                  id="story-banner-title"
                  onChange={(e) => setStoryDraft({ ...storyDraft, bannerTitle: e.target.value })}
                  value={storyDraft.bannerTitle}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="story-eyebrow">
                  Eyebrow Tag
                </label>
                <input
                  className={styles.input}
                  id="story-eyebrow"
                  onChange={(e) => setStoryDraft({ ...storyDraft, storyEyebrow: e.target.value })}
                  value={storyDraft.storyEyebrow}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="story-heading">
                Main Story Heading
              </label>
              <input
                className={styles.input}
                id="story-heading"
                onChange={(e) => setStoryDraft({ ...storyDraft, storyHeading: e.target.value })}
                value={storyDraft.storyHeading}
              />
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="story-photo">
                  Documentary Photo URL
                </label>
                <input
                  className={styles.input}
                  id="story-photo"
                  onChange={(e) => setStoryDraft({ ...storyDraft, storyPhotoUrl: e.target.value })}
                  value={storyDraft.storyPhotoUrl}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="story-caption">
                  Photo Caption
                </label>
                <input
                  className={styles.input}
                  id="story-caption"
                  onChange={(e) =>
                    setStoryDraft({ ...storyDraft, storyPhotoCaption: e.target.value })
                  }
                  value={storyDraft.storyPhotoCaption}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="story-p1">
                Story Paragraph 1 (Nepali Traditions & Sacred Vessels)
              </label>
              <textarea
                className={styles.textarea}
                id="story-p1"
                onChange={(e) => setStoryDraft({ ...storyDraft, storyParagraph1: e.target.value })}
                value={storyDraft.storyParagraph1}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="story-p2">
                Story Paragraph 2 (The Gentle Alternative to Harsh Acids)
              </label>
              <textarea
                className={styles.textarea}
                id="story-p2"
                onChange={(e) => setStoryDraft({ ...storyDraft, storyParagraph2: e.target.value })}
                value={storyDraft.storyParagraph2}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="story-p3">
                Story Paragraph 3 (Lalitpur Roots & Nationwide Community Trust)
              </label>
              <textarea
                className={styles.textarea}
                id="story-p3"
                onChange={(e) => setStoryDraft({ ...storyDraft, storyParagraph3: e.target.value })}
                value={storyDraft.storyParagraph3}
              />
            </div>
          </div>

          {/* Mission & Vision */}
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>Mission & Vision Statements</h2>
                <p className={styles.cardSubtitle}>
                  Brand mission and vision for Nepali homes and traditional crafts.
                </p>
              </div>
              <span className={styles.sectionBadge}>Brand Purpose</span>
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="mission-heading">
                  Mission Heading
                </label>
                <input
                  className={styles.input}
                  id="mission-heading"
                  onChange={(e) => setStoryDraft({ ...storyDraft, missionHeading: e.target.value })}
                  value={storyDraft.missionHeading}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="mission-img">
                  Mission Image URL
                </label>
                <input
                  className={styles.input}
                  id="mission-img"
                  onChange={(e) =>
                    setStoryDraft({ ...storyDraft, missionImageUrl: e.target.value })
                  }
                  value={storyDraft.missionImageUrl}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="mission-desc">
                Mission Description
              </label>
              <textarea
                className={styles.textarea}
                id="mission-desc"
                onChange={(e) =>
                  setStoryDraft({ ...storyDraft, missionDescription: e.target.value })
                }
                value={storyDraft.missionDescription}
              />
            </div>

            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="vision-heading">
                  Vision Heading
                </label>
                <input
                  className={styles.input}
                  id="vision-heading"
                  onChange={(e) => setStoryDraft({ ...storyDraft, visionHeading: e.target.value })}
                  value={storyDraft.visionHeading}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="vision-img">
                  Vision Image URL
                </label>
                <input
                  className={styles.input}
                  id="vision-img"
                  onChange={(e) => setStoryDraft({ ...storyDraft, visionImageUrl: e.target.value })}
                  value={storyDraft.visionImageUrl}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="vision-desc">
                Vision Description
              </label>
              <textarea
                className={styles.textarea}
                id="vision-desc"
                onChange={(e) =>
                  setStoryDraft({ ...storyDraft, visionDescription: e.target.value })
                }
                value={storyDraft.visionDescription}
              />
            </div>
          </div>

          {/* Milestones & Family Quote */}
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>Milestone Numbers & Founder Commitment Quote</h2>
                <p className={styles.cardSubtitle}>
                  Proof points and the emotional quote concluding the story.
                </p>
              </div>
              <span className={styles.sectionBadge}>Proof & Quote</span>
            </div>

            <div className={styles.gridThree}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="est-year">
                  Established Year
                </label>
                <input
                  className={styles.input}
                  id="est-year"
                  onChange={(e) =>
                    setStoryDraft({ ...storyDraft, establishedYear: e.target.value })
                  }
                  value={storyDraft.establishedYear}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="trust-years">
                  Years of Trust
                </label>
                <input
                  className={styles.input}
                  id="trust-years"
                  onChange={(e) => setStoryDraft({ ...storyDraft, yearsOfTrust: e.target.value })}
                  value={storyDraft.yearsOfTrust}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="auth-care">
                  Authentic Care %
                </label>
                <input
                  className={styles.input}
                  id="auth-care"
                  onChange={(e) => setStoryDraft({ ...storyDraft, authenticCare: e.target.value })}
                  value={storyDraft.authenticCare}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="quote-text">
                Family / Founder Commitment Quote
              </label>
              <textarea
                className={styles.textarea}
                id="quote-text"
                onChange={(e) => setStoryDraft({ ...storyDraft, quoteText: e.target.value })}
                value={storyDraft.quoteText}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="quote-author">
                Quote Attribution
              </label>
              <input
                className={styles.input}
                id="quote-author"
                onChange={(e) => setStoryDraft({ ...storyDraft, quoteAuthor: e.target.value })}
                value={storyDraft.quoteAuthor}
              />
            </div>
          </div>

          {/* Bottom Actions Bar */}
          <div className={styles.bottomActionBar}>
            <button className={styles.resetBtn} onClick={handleReset} type="button">
              Reset Changes
            </button>
            <button className={styles.saveBtn} type="submit">
              Save Story Page Changes
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

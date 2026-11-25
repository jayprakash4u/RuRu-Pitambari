"use client";

import { useState } from "react";

import { AdminShell, useAdmin } from "@/features/admin";

import styles from "./content-page.module.css";

type ContentTab = "home" | "story" | "gallery" | "combos" | "contact";

export default function AdminContentPage() {
  const { siteContent, updateSiteContent } = useAdmin();
  const [activeTab, setActiveTab] = useState<ContentTab>("home");
  const [savedToast, setSavedToast] = useState(false);

  // Local draft states
  const [homeDraft, setHomeDraft] = useState(siteContent.home);
  const [storyDraft, setStoryDraft] = useState(siteContent.story);
  const [combosDraft, setCombosDraft] = useState(siteContent.combos);
  const [contactDraft, setContactDraft] = useState(siteContent.contact);

  const tabs: Array<{ id: ContentTab; label: string }> = [
    { id: "home", label: "Home Page Sections" },
    { id: "story", label: "Our Story / About" },
    { id: "gallery", label: "Gallery & Media" },
    { id: "combos", label: "Combo Offers Page" },
    { id: "contact", label: "Contact & Showroom" },
  ];

  function handleSaveCurrentSection(e: React.FormEvent) {
    e.preventDefault();
    if (activeTab === "home") {
      updateSiteContent("home", homeDraft);
    } else if (activeTab === "story") {
      updateSiteContent("story", storyDraft);
    } else if (activeTab === "combos") {
      updateSiteContent("combos", combosDraft);
    } else if (activeTab === "contact") {
      updateSiteContent("contact", contactDraft);
    }

    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
    }, 3500);
  }

  function handleReset() {
    if (activeTab === "home") setHomeDraft(siteContent.home);
    if (activeTab === "story") setStoryDraft(siteContent.story);
    if (activeTab === "combos") setCombosDraft(siteContent.combos);
    if (activeTab === "contact") setContactDraft(siteContent.contact);
  }

  return (
    <AdminShell
      subtitle="Edit live titles, promotional text, banner images, and section narratives across all store pages."
      title="Pages & Section Content"
    >
      <div className={styles.pageContainer}>
        {/* Navigation Tabs */}
        <div className={styles.tabsNav}>
          {tabs.map((tab) => (
            <button
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ""}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Success Toast */}
        {savedToast ? (
          <div className={styles.toast}>
            <span>✓ Section details and media updated successfully! Changes saved.</span>
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

        {/* Content Form */}
        <form className={styles.editorForm} onSubmit={handleSaveCurrentSection}>
          {/* TAB 1: HOME PAGE SECTIONS */}
          {activeTab === "home" ? (
            <>
              {/* Section: Hero Banner */}
              <div className={styles.sectionCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>Hero Video & Film Banner</h2>
                    <p className={styles.cardSubtitle}>
                      Manage the top full-width film, desktop/mobile poster images, and brand
                      tagline.
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
                      onChange={(e) =>
                        setHomeDraft({ ...homeDraft, heroPosterUrl: e.target.value })
                      }
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
                      onChange={(e) =>
                        setHomeDraft({ ...homeDraft, dealsSubtitle: e.target.value })
                      }
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
                      Showcase visual before/after restoration on traditional brass and copper
                      vessels.
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
                      onChange={(e) =>
                        setHomeDraft({ ...homeDraft, dealerHeading: e.target.value })
                      }
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
                      onChange={(e) =>
                        setHomeDraft({ ...homeDraft, dealerCtaText: e.target.value })
                      }
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
            </>
          ) : null}

          {/* TAB 2: OUR STORY / ABOUT */}
          {activeTab === "story" ? (
            <>
              {/* Header & Main Story Narrative */}
              <div className={styles.sectionCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>Main Story & Documentary Narrative</h2>
                    <p className={styles.cardSubtitle}>
                      Authentic story of P Three Products and Ruru Pitambari from Lalitpur since
                      2009.
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
                      onChange={(e) =>
                        setStoryDraft({ ...storyDraft, bannerTitle: e.target.value })
                      }
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
                      onChange={(e) =>
                        setStoryDraft({ ...storyDraft, storyEyebrow: e.target.value })
                      }
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
                      onChange={(e) =>
                        setStoryDraft({ ...storyDraft, storyPhotoUrl: e.target.value })
                      }
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
                    onChange={(e) =>
                      setStoryDraft({ ...storyDraft, storyParagraph1: e.target.value })
                    }
                    value={storyDraft.storyParagraph1}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="story-p2">
                    Story Paragraph 2 (The Gentle Alternative to Harsh Industrial Acids)
                  </label>
                  <textarea
                    className={styles.textarea}
                    id="story-p2"
                    onChange={(e) =>
                      setStoryDraft({ ...storyDraft, storyParagraph2: e.target.value })
                    }
                    value={storyDraft.storyParagraph2}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="story-p3">
                    Story Paragraph 3 (Lalitpur Roots & Nationwide Growth)
                  </label>
                  <textarea
                    className={styles.textarea}
                    id="story-p3"
                    onChange={(e) =>
                      setStoryDraft({ ...storyDraft, storyParagraph3: e.target.value })
                    }
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
                      Core brand purpose and future vision for Nepali households.
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
                      onChange={(e) =>
                        setStoryDraft({ ...storyDraft, missionHeading: e.target.value })
                      }
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
                      onChange={(e) =>
                        setStoryDraft({ ...storyDraft, visionHeading: e.target.value })
                      }
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
                      onChange={(e) =>
                        setStoryDraft({ ...storyDraft, visionImageUrl: e.target.value })
                      }
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
                    <h2 className={styles.cardTitle}>
                      Milestone Numbers & Founder Commitment Quote
                    </h2>
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
                      onChange={(e) =>
                        setStoryDraft({ ...storyDraft, yearsOfTrust: e.target.value })
                      }
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
                      onChange={(e) =>
                        setStoryDraft({ ...storyDraft, authenticCare: e.target.value })
                      }
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
            </>
          ) : null}

          {/* TAB 3: GALLERY & MEDIA */}
          {activeTab === "gallery" ? (
            <div className={styles.sectionCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle}>Gallery Page Headlines & Items</h2>
                  <p className={styles.cardSubtitle}>
                    Manage documentary photos, factory images, and event highlights.
                  </p>
                </div>
                <span className={styles.sectionBadge}>Photo Gallery</span>
              </div>

              <div className={styles.gridTwo}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="gal-title">
                    Gallery Page Title
                  </label>
                  <input
                    className={styles.input}
                    id="gal-title"
                    value={siteContent.gallery.pageTitle}
                    readOnly
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="gal-sub">
                    Gallery Subtitle
                  </label>
                  <input
                    className={styles.input}
                    id="gal-sub"
                    value={siteContent.gallery.pageSubtitle}
                    readOnly
                  />
                </div>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <span className={styles.label} style={{ marginBottom: "0.5rem" }}>
                  Active Media Items ({siteContent.gallery.items.length} items)
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {siteContent.gallery.items.map((item) => (
                    <div className={styles.imagePreviewRow} key={item.id}>
                      <div className={styles.imageHint}>
                        <strong>{item.title}</strong>
                        <div style={{ color: "#8c1d24", fontSize: "0.6875rem" }}>
                          Category: {item.category}
                        </div>
                        <div>{item.caption}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {/* TAB 4: COMBOS PAGE */}
          {activeTab === "combos" ? (
            <div className={styles.sectionCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle}>Combo Offers Page Configuration</h2>
                  <p className={styles.cardSubtitle}>
                    Manage promotional banners and top notice on the combo offers page.
                  </p>
                </div>
                <span className={styles.sectionBadge}>Combos Page</span>
              </div>

              <div className={styles.gridTwo}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="combo-title">
                    Page Title
                  </label>
                  <input
                    className={styles.input}
                    id="combo-title"
                    onChange={(e) => setCombosDraft({ ...combosDraft, pageTitle: e.target.value })}
                    value={combosDraft.pageTitle}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="combo-sub">
                    Page Subtitle
                  </label>
                  <input
                    className={styles.input}
                    id="combo-sub"
                    onChange={(e) =>
                      setCombosDraft({ ...combosDraft, pageSubtitle: e.target.value })
                    }
                    value={combosDraft.pageSubtitle}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="combo-banner">
                  Top Promotional Banner Notice
                </label>
                <input
                  className={styles.input}
                  id="combo-banner"
                  onChange={(e) => setCombosDraft({ ...combosDraft, bannerNotice: e.target.value })}
                  value={combosDraft.bannerNotice}
                />
              </div>
            </div>
          ) : null}

          {/* TAB 5: CONTACT & SHOWROOM */}
          {activeTab === "contact" ? (
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
                    Wholesale & Dealership Line
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
                    Support & Inquiry Email
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
                    Business Hours
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
                  Manufacturing Factory Address
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
          ) : null}

          {/* Sticky Bottom Actions Bar */}
          <div className={styles.bottomActionBar}>
            <button className={styles.resetBtn} onClick={handleReset} type="button">
              Reset Changes
            </button>
            <button className={styles.saveBtn} type="submit">
              Save All Changes
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

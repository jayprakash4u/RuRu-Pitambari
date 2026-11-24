"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ComboCard, combos } from "@/features/combos";

import styles from "./home-deals-of-day.module.css";

export function HomeDealsOfDay() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Show all deals sorted by discount percentage
  const dealItems = useMemo(() => {
    return [...combos].sort((a, b) => b.discountPercent - a.discountPercent);
  }, []);

  // Scroll step function
  const scroll = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 300;
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (direction === "right") {
      if (track.scrollLeft >= maxScroll - 10) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    } else {
      if (track.scrollLeft <= 10) {
        track.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        track.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 300;
    track.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  // Auto-scroll loop every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      scroll("right");
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Sync active dot on scroll
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 300;
    const index = Math.round(track.scrollLeft / cardWidth);
    setActiveSlideIndex(Math.min(index, dealItems.length - 1));
  };

  return (
    <section aria-labelledby="deals-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headingRow}>
          <div className={styles.titleWrap}>
            <h2 id="deals-heading">Deals of the Day</h2>
          </div>

          {/* Carousel Arrows */}
          <div className={styles.navControls}>
            <button
              aria-label="Previous deal"
              className={styles.navBtn}
              onClick={() => scroll("left")}
              type="button"
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                width="16"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              aria-label="Next deal"
              className={styles.navBtn}
              onClick={() => scroll("right")}
              type="button"
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                width="16"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className={styles.carouselContainer}
          onBlurCapture={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchEnd={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
        >
          <div
            aria-label="Deals carousel"
            className={styles.track}
            onScroll={handleScroll}
            ref={trackRef}
            role="region"
          >
            {dealItems.map((combo) => (
              <div className={styles.cardItem} key={combo.id}>
                <ComboCard combo={combo} />
              </div>
            ))}
          </div>

          {/* Progress Indicator Dots */}
          <div aria-label="Deal carousel pagination" className={styles.dotsRow}>
            {dealItems.map((item, idx) => (
              <button
                aria-label={`Jump to deal ${idx + 1}`}
                className={styles.dot}
                data-active={activeSlideIndex === idx ? "true" : undefined}
                key={item.id}
                onClick={() => scrollToIndex(idx)}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

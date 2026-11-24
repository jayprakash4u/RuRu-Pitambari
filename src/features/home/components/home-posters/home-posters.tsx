"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import posterComboSavings from "@/assets/banners/poster-combo-savings.jpg";
import posterHeritageShine from "@/assets/banners/poster-heritage-shine.jpg";
import posterPineHygiene from "@/assets/banners/poster-pine-hygiene.jpg";
import posterPoojaEssentials from "@/assets/banners/poster-pooja-essentials.jpg";
import posterSafaiHeroes from "@/assets/banners/poster-safai-heroes.jpg";

import styles from "./home-posters.module.css";

const posters = [
  {
    id: "safai-heroes",
    image: posterSafaiHeroes,
    title: "Ghar Ke Heroes Aur Safai Ke Pros - Kitchen & Homecare",
    href: "/products?category=kitchen-care",
  },
  {
    id: "pooja-essentials",
    image: posterPoojaEssentials,
    title: "Pooja Essentials To Light Up Your Rituals",
    href: "/products?category=pooja-care",
  },
  {
    id: "heritage-shine",
    image: posterHeritageShine,
    title: "Original Shine For Sacred Metals",
    href: "/products?category=metal-care",
  },
  {
    id: "pine-hygiene",
    image: posterPineHygiene,
    title: "Natural Pine Hygiene - 99.9% Germ Protection",
    href: "/products?category=floor-care",
  },
  {
    id: "combo-savings",
    image: posterComboSavings,
    title: "Special Value Packs - Save Up To 33%",
    href: "/combo-offers",
  },
] as const;

export function HomePosters() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % posters.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);
  }, []);

  // Auto-play sliding every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section aria-label="Promotional Posters & Deals" className={styles.section}>
      <div className={styles.inner}>
        <div
          className={styles.carousel}
          onBlurCapture={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
        >
          {/* Viewport Frame */}
          <div className={styles.slideFrame}>
            {/* Sliding Track: moves left by 100% per slide */}
            <div
              className={styles.slideTrack}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {posters.map((poster, index) => {
                const isActive = index === currentIndex;
                return (
                  <Link
                    aria-label={poster.title}
                    className={styles.slide}
                    href={poster.href}
                    key={poster.id}
                    tabIndex={isActive ? 0 : -1}
                  >
                    <Image
                      alt={poster.title}
                      className={styles.posterImage}
                      fill
                      placeholder="blur"
                      priority={index <= 1}
                      sizes="(max-width: 48rem) 100vw, (max-width: 90rem) 92vw, 1440px"
                      src={poster.image}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Left Arrow Button (Always Visible & Accessible) */}
          <button
            aria-label="Previous poster"
            className={styles.prevBtn}
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            type="button"
          >
            <svg
              aria-hidden="true"
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              width="20"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right Arrow Button (Always Visible & Accessible) */}
          <button
            aria-label="Next poster"
            className={styles.nextBtn}
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            type="button"
          >
            <svg
              aria-hidden="true"
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              width="20"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Carousel Pagination Indicator Dots */}
          <div aria-label="Poster slides" className={styles.dots} role="tablist">
            {posters.map((poster, index) => (
              <button
                aria-label={`Show slide ${index + 1} of ${posters.length}`}
                aria-selected={index === currentIndex}
                className={styles.dot}
                data-active={index === currentIndex ? "true" : undefined}
                key={poster.id}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex(index);
                }}
                role="tab"
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

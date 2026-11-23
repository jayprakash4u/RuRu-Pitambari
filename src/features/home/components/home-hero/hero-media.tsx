"use client";

import { useEffect, useRef } from "react";

import styles from "./home-hero.module.css";

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!video) return;

    const syncPlayback = () => {
      if (motionQuery.matches) {
        video.pause();
      } else {
        void video.play().catch(() => undefined);
      }
    };

    syncPlayback();
    motionQuery.addEventListener("change", syncPlayback);

    return () => motionQuery.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <video
      aria-hidden="true"
      autoPlay
      className={styles.video}
      loop
      muted
      playsInline
      poster="/media/hero/ruru-hero-poster.webp"
      preload="metadata"
      ref={videoRef}
    >
      <source media="(max-width: 48rem)" src="/media/hero/ruru-hero-mobile.mp4" type="video/mp4" />
      <source src="/media/hero/ruru-hero-desktop.mp4" type="video/mp4" />
    </video>
  );
}

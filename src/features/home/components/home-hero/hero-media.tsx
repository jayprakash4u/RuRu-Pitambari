"use client";

import { useEffect, useRef } from "react";

import styles from "./home-hero.module.css";

const DESKTOP_VIDEO = "/media/hero/ruru-hero-desktop.mp4";
const MOBILE_VIDEO = "/media/hero/ruru-hero-mobile.mp4";
const DESKTOP_POSTER = "/media/hero/ruru-hero-poster.webp";
const MOBILE_POSTER = "/media/hero/ruru-hero-poster-mobile.webp";

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Guarantee mute properties on native DOM element to bypass autoplay restrictions
    video.muted = true;
    video.defaultMuted = true;

    const breakpointQuery = window.matchMedia("(max-width: 48rem)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const playVideo = () => {
      if (motionQuery.matches) {
        video.pause();
        return;
      }

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser autoplay policy or iOS Low Power Mode blocks initial play
          const resumeOnInteraction = () => {
            void video.play().catch(() => undefined);
            window.removeEventListener("pointerdown", resumeOnInteraction);
            window.removeEventListener("touchstart", resumeOnInteraction);
            window.removeEventListener("click", resumeOnInteraction);
            window.removeEventListener("scroll", resumeOnInteraction);
          };

          window.addEventListener("pointerdown", resumeOnInteraction, {
            once: true,
            passive: true,
          });
          window.addEventListener("touchstart", resumeOnInteraction, {
            once: true,
            passive: true,
          });
          window.addEventListener("click", resumeOnInteraction, {
            once: true,
            passive: true,
          });
          window.addEventListener("scroll", resumeOnInteraction, {
            once: true,
            passive: true,
          });
        });
      }
    };

    const syncSourceAndPlay = () => {
      const isMobile = breakpointQuery.matches;
      const expectedSource = isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO;
      const expectedPoster = isMobile ? MOBILE_POSTER : DESKTOP_POSTER;

      // Update poster if needed
      if (video.poster !== expectedPoster) {
        video.poster = expectedPoster;
      }

      // Check current source against expected
      const currentSrcPath = video.currentSrc
        ? new URL(video.currentSrc, window.location.href).pathname
        : "";

      if (currentSrcPath !== expectedSource) {
        video.src = expectedSource;
        video.load();
      }

      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener("canplay", playVideo, { once: true });
        video.addEventListener("loadeddata", playVideo, { once: true });
      }
    };

    // Initial sync
    syncSourceAndPlay();

    const handleBreakpointChange = () => {
      syncSourceAndPlay();
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        video.pause();
      } else {
        playVideo();
      }
    };

    breakpointQuery.addEventListener("change", handleBreakpointChange);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      breakpointQuery.removeEventListener("change", handleBreakpointChange);
      motionQuery.removeEventListener("change", handleMotionChange);
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("loadeddata", playVideo);
    };
  }, []);

  return (
    <video
      aria-hidden="true"
      autoPlay
      className={styles.video}
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      loop
      muted
      playsInline
      poster={DESKTOP_POSTER}
      preload="auto"
      ref={videoRef}
    >
      <source media="(max-width: 48rem)" src={MOBILE_VIDEO} type="video/mp4" />
      <source src={DESKTOP_VIDEO} type="video/mp4" />
    </video>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import brassImage from "@/assets/home/brass-before-after.png";
import floorImage from "@/assets/home/floor-before-after.png";
import householdImage from "@/assets/home/household-before-after.png";
import kitchenImage from "@/assets/home/kitchen-before-after.png";
import poojaImage from "@/assets/home/pooja-before-after.png";

import styles from "./home-transformation.module.css";

const transformations = [
  { image: brassImage, label: "Metal care" },
  { image: kitchenImage, label: "Kitchen care" },
  { image: floorImage, label: "Floor care" },
  { image: poojaImage, label: "Pooja care" },
  { image: householdImage, label: "Household care" },
] as const;

const pageStarts = [0, 2, 4] as const;

export function HomeTransformation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const visibleItems = [
    transformations[activeIndex],
    transformations[(activeIndex + 1) % transformations.length],
  ];

  useEffect(() => {
    if (isPaused) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current === 0 ? 2 : current === 2 ? 4 : 0));
    }, 5500);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  return (
    <section aria-labelledby="transformation-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 id="transformation-heading">See the clean. See the shine.</h2>
        </div>

        <div
          className={styles.carousel}
          onBlurCapture={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.slides}>
            {visibleItems.map((item) => (
              <article className={styles.slide} key={item.label}>
                <figure className={styles.comparison}>
                  <Image
                    alt={`${item.label} shown before cleaning on the left and after cleaning on the right`}
                    className={styles.image}
                    placeholder="blur"
                    sizes="(max-width: 48rem) 100vw, 36rem"
                    src={item.image}
                  />
                  <figcaption>
                    <span>Before</span>
                    <span>After</span>
                  </figcaption>
                </figure>
              </article>
            ))}
          </div>

          <div className={styles.carouselFooter}>
            <div aria-label="Choose a transformation" className={styles.dots} role="group">
              {pageStarts.map((startIndex, index) => (
                <button
                  aria-current={startIndex === activeIndex ? "true" : undefined}
                  aria-label={`Show comparison group ${index + 1}`}
                  key={startIndex}
                  onClick={() => setActiveIndex(startIndex)}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

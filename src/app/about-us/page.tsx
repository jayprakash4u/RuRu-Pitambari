import type { Metadata } from "next";
import Image from "next/image";

import communityImage from "@/assets/gallery/facebook-08.jpg";

import styles from "./about-page.module.css";

export const metadata: Metadata = {
  title: "About us",
  description: "Meet Ruru Pitambari, a trusted Nepali home-care brand established in 2009.",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section aria-labelledby="about-heading" className={styles.introduction}>
        <div className={styles.imageWrap}>
          <Image
            alt="Ruru Pitambari team member visiting a trusted local retail partner"
            className={styles.image}
            placeholder="blur"
            priority
            sizes="(max-width: 48rem) 100vw, 46vw"
            src={communityImage}
          />
        </div>

        <div className={styles.content}>
          <p>About Ruru Pitambari</p>
          <h1 id="about-heading">Built through trust.</h1>
          <span>Home-care products from P Three Products · Lalitpur, Nepal</span>

          <div className={styles.copy}>
            <p>
              Established in 2009, Ruru Pitambari began with a simple purpose: to make dependable
              metal care easier for Nepali households. Our products are shaped around familiar
              routines, practical needs and the things people value at home.
            </p>
            <p>
              We have grown through the support of customers, retailers and communities across
              Nepal. That relationship continues to guide us as we build a thoughtful range of
              everyday cleaning and care products.
            </p>
          </div>

          <dl className={styles.facts}>
            <div>
              <dt>Established</dt>
              <dd>2009</dd>
            </div>
            <div>
              <dt>Home</dt>
              <dd>Lalitpur, Nepal</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Everyday home care</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}

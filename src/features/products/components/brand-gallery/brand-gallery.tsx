import Image from "next/image";

import ruruEaseCampaign from "@/assets/campaigns/ruru-ease-facebook.jpg";
import ruruPitambariImage from "@/assets/products/product-01.png";
import ruruRatnaImage from "@/assets/products/product-03.jpg";
import whitePhenyleImage from "@/assets/products/product-04.jpg";

import styles from "./brand-gallery.module.css";

const galleryItems = [
  { alt: "Ruru Ease kitchen cleaner campaign", image: ruruEaseCampaign },
  { alt: "Ruru Pitambari original metal cleaning powder", image: ruruPitambariImage },
  { alt: "Ruru Ratna metal polishing powder", image: ruruRatnaImage },
  { alt: "White Phenyle floor cleaner", image: whitePhenyleImage },
] as const;

export function BrandGallery() {
  return (
    <section aria-labelledby="brand-gallery-heading" className={styles.section}>
      <div className={styles.headingRow}>
        <h2 id="brand-gallery-heading">Ruru in everyday life</h2>
        <a href="https://www.facebook.com/rurupitambari/" rel="noreferrer" target="_blank">
          Follow on Facebook
        </a>
      </div>

      <div className={styles.grid}>
        {galleryItems.map((item) => (
          <figure className={styles.item} key={item.alt}>
            <Image
              alt={item.alt}
              className={styles.image}
              placeholder="blur"
              sizes="(max-width: 40rem) 50vw, 25vw"
              src={item.image}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

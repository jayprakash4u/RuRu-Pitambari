import Image from "next/image";
import Link from "next/link";

import floorCareImage from "@/assets/categories/floor-care.png";
import householdCareImage from "@/assets/categories/household-care.png";
import kitchenCareImage from "@/assets/categories/kitchen-care.png";
import metalCareImage from "@/assets/categories/metal-care.png";
import poojaCareImage from "@/assets/categories/pooja-care.png";

import styles from "./home-categories.module.css";

const categories = [
  {
    description: "Restore the natural shine of copper, brass, silver and more.",
    href: "/products?category=metal-care",
    image: metalCareImage,
    label: "Metal care",
  },
  {
    description: "Cut through grease and keep everyday kitchen surfaces fresh.",
    href: "/products?category=kitchen-care",
    image: kitchenCareImage,
    label: "Kitchen care",
  },
  {
    description: "Dependable daily cleaning for bright, fresh floors.",
    href: "/products?category=floor-care",
    image: floorCareImage,
    label: "Floor care",
  },
  {
    description: "Thoughtful care for lamps, vessels and sacred metalware.",
    href: "/products?category=metal-care",
    image: poojaCareImage,
    label: "Pooja care",
  },
  {
    description: "Simple essentials for a cleaner and happier home.",
    href: "/products",
    image: householdCareImage,
    label: "Household care",
  },
] as const;

export function HomeCategories() {
  return (
    <section aria-labelledby="categories-heading" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.intro} id="categories-heading">
          Shop by category
        </h2>
        <div aria-label="Product categories" className={styles.categoryRail}>
          {categories.map((category) => (
            <Link className={styles.categoryButton} href={category.href} key={category.label}>
              <span aria-hidden="true" className={styles.icon}>
                <Image
                  alt=""
                  className={styles.categoryImage}
                  placeholder="blur"
                  sizes="(max-width: 48rem) 9rem, 16vw"
                  src={category.image}
                />
              </span>
              <span className={styles.cardCopy}>
                <strong>{category.label}</strong>
                <span>{category.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

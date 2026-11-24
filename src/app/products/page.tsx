import type { Metadata } from "next";

import { ProductCatalogue } from "@/features/products";

import styles from "./products-page.module.css";

export const metadata: Metadata = {
  title: "Products | Ruru Pitambari",
  description:
    "Explore Ruru Pitambari metal care, kitchen cleaning and household cleaning products made in Nepal.",
};

type ProductsPageProps = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

const categoryMap = {
  "floor-care": "Floor care",
  "household-care": "Household care",
  "kitchen-care": "Kitchen care",
  "metal-care": "Metal care",
  "pooja-care": "Pooja care",
} as const;

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category = "", q = "" } = await searchParams;
  const initialCategory = categoryMap[category as keyof typeof categoryMap] ?? "All";

  return (
    <main className={styles.page}>
      {/* Top Heritage Red Banner (Matching Combo Offers Header Style) */}
      <section aria-labelledby="products-heading" className={styles.banner}>
        <div className={styles.bannerInner}>
          <h1 className={styles.bannerTitle} id="products-heading">
            Our Products
          </h1>
        </div>
      </section>

      <div className={styles.inner}>
        <ProductCatalogue initialCategory={initialCategory} initialQuery={q} />
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { BrandGallery, ProductCatalogue } from "@/features/products";

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
  "kitchen-care": "Kitchen care",
  "metal-care": "Metal care",
} as const;

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category = "", q = "" } = await searchParams;
  const initialCategory = categoryMap[category as keyof typeof categoryMap] ?? "All";

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.intro}>
          <h1>Our products</h1>
        </header>

        <ProductCatalogue initialCategory={initialCategory} initialQuery={q} />
        <BrandGallery />
      </div>
    </main>
  );
}

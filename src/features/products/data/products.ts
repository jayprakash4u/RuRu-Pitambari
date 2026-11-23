import type { StaticImageData } from "next/image";

import ruruEaseImage from "@/assets/products/product-02.jpg";
import ruruRatnaImage from "@/assets/products/product-03.jpg";
import whitePhenyleImage from "@/assets/products/product-04.jpg";
import ruruPitambariImage from "@/assets/products/product-01.png";

export const productCategories = ["All", "Metal care", "Kitchen care", "Floor care"] as const;

export type ProductCategory = (typeof productCategories)[number];

export type Product = {
  category: Exclude<ProductCategory, "All">;
  description: string;
  href: string;
  id: string;
  image: StaticImageData;
  imageFit?: "contain" | "cover";
  name: string;
  shortName: string;
  variants: readonly ProductVariant[];
};

export type ProductVariant = {
  label: string;
  priceNpr: number;
};

export const products: readonly Product[] = [
  {
    id: "ruru-pitambari",
    name: "Ruru Pitambari",
    shortName: "Original metal cleaning powder",
    description:
      "A trusted traditional powder for restoring the natural shine of copper, brass, silver, iron and aluminium.",
    category: "Metal care",
    image: ruruPitambariImage,
    imageFit: "contain",
    href: "/products/ruru-pitambari",
    variants: [
      { label: "50 g", priceNpr: 45 },
      { label: "100 g", priceNpr: 80 },
      { label: "200 g", priceNpr: 150 },
    ],
  },
  {
    id: "ruru-ease",
    name: "Ruru Ease",
    shortName: "Kitchen cleaner",
    description:
      "An easy everyday spray for lifting kitchen grease and keeping frequently used surfaces fresh and clean.",
    category: "Kitchen care",
    image: ruruEaseImage,
    href: "/products/ruru-ease",
    variants: [
      { label: "500 ml", priceNpr: 180 },
      { label: "1 L", priceNpr: 320 },
    ],
  },
  {
    id: "ruru-ratna",
    name: "Ruru Ratna",
    shortName: "Metal polishing powder",
    description:
      "A practical polishing powder developed for copper, brass and traditional household metalware.",
    category: "Metal care",
    image: ruruRatnaImage,
    href: "/products/ruru-ratna",
    variants: [
      { label: "100 g", priceNpr: 90 },
      { label: "250 g", priceNpr: 200 },
    ],
  },
  {
    id: "white-phenyle",
    name: "White Phenyle",
    shortName: "Everyday floor cleaner",
    description:
      "A dependable cleaning solution for everyday floors and washable household surfaces.",
    category: "Floor care",
    image: whitePhenyleImage,
    href: "/products/white-phenyle",
    variants: [
      { label: "1 L", priceNpr: 160 },
      { label: "5 L", priceNpr: 650 },
    ],
  },
] as const;

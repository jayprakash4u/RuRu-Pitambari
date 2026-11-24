import type { StaticImageData } from "next/image";

import product01Image from "@/assets/products/product-01.png";
import product02Image from "@/assets/products/product-02.jpg";
import product03Image from "@/assets/products/product-03.jpg";
import product04Image from "@/assets/products/product-04.jpg";
import chimneyCleanerImage from "@/assets/products/ruru-chimney-cleaner.jpg";
import dishwashBarImage from "@/assets/products/ruru-dishwash-bar.jpg";
import dishwashGelImage from "@/assets/products/ruru-dishwash-gel.jpg";
import ruruEaseImage from "@/assets/products/ruru-ease.jpg";
import glassCleanerImage from "@/assets/products/ruru-glass-cleaner.jpg";
import pinePhenyleImage from "@/assets/products/ruru-pine-phenyle.jpg";
import pitambariPasteImage from "@/assets/products/ruru-pitambari-paste.jpg";
import ruruPitambariPng from "@/assets/products/ruru-pitambari.png";
import poojaCamphorImage from "@/assets/products/ruru-pooja-camphor.jpg";
import poojaDiyaOilImage from "@/assets/products/ruru-pooja-diya-oil.jpg";
import silverShineImage from "@/assets/products/ruru-silver-shine.jpg";
import tapCleanerImage from "@/assets/products/ruru-tap-cleaner.jpg";
import templeIncenseImage from "@/assets/products/ruru-temple-incense.jpg";
import tileCleanerImage from "@/assets/products/ruru-tile-cleaner.jpg";

export const productCategories = [
  "All",
  "Metal care",
  "Pooja care",
  "Kitchen care",
  "Floor care",
  "Household care",
] as const;

export type ProductCategory = (typeof productCategories)[number];

export type Product = {
  category: Exclude<ProductCategory, "All">;
  description: string;
  href: string;
  id: string;
  image: StaticImageData;
  imageFit?: "contain" | "cover";
  isBestseller?: boolean;
  name: string;
  rating?: number;
  reviewCount?: number;
  shortName: string;
  variants: readonly ProductVariant[];
};

export type ProductVariant = {
  label: string;
  mrpNpr?: number;
  priceNpr: number;
};

export const products: readonly Product[] = [
  // --- METAL CARE (5 Products) ---
  {
    id: "ruru-pitambari",
    name: "Ruru Pitambari Powder",
    shortName: "Original metal cleaning powder",
    description:
      "A trusted traditional powder for restoring the brilliant natural shine of copper, brass, silver, iron and aluminium utensils.",
    category: "Metal care",
    image: product01Image,
    imageFit: "contain",
    href: "/products/ruru-pitambari",
    isBestseller: true,
    rating: 4.9,
    reviewCount: 1480,
    variants: [
      { label: "50 g", priceNpr: 45, mrpNpr: 55 },
      { label: "100 g", priceNpr: 80, mrpNpr: 99 },
      { label: "200 g", priceNpr: 150, mrpNpr: 185 },
    ],
  },
  {
    id: "ruru-pitambari-paste",
    name: "Ruru Pitambari Shine Paste",
    shortName: "Instant brass & copper cleaning paste",
    description:
      "Convenient instant-action paste formula for effortless removal of tarnish, water spots, and oxide stains on brass and copper.",
    category: "Metal care",
    image: pitambariPasteImage,
    href: "/products/ruru-pitambari-paste",
    isBestseller: true,
    rating: 4.9,
    reviewCount: 920,
    variants: [
      { label: "150 g", priceNpr: 120, mrpNpr: 150 },
      { label: "300 g", priceNpr: 220, mrpNpr: 280 },
    ],
  },
  {
    id: "ruru-silver-shine",
    name: "Ruru Silver Shine Polish",
    shortName: "Liquid silver & bell polish",
    description:
      "Gentle non-abrasive liquid polish designed for silver ornaments, temple bells, puja thalis, and sacred idols.",
    category: "Metal care",
    image: silverShineImage,
    href: "/products/ruru-silver-shine",
    rating: 4.8,
    reviewCount: 540,
    variants: [
      { label: "100 ml", priceNpr: 140, mrpNpr: 175 },
      { label: "250 ml", priceNpr: 290, mrpNpr: 360 },
    ],
  },
  {
    id: "ruru-ratna",
    name: "Ruru Ratna Polishing Powder",
    shortName: "Heavy tarnish metal polish",
    description:
      "A heavy-duty traditional polishing powder developed for antique copper, bronze temple ware, and puja vessels.",
    category: "Metal care",
    image: product03Image,
    href: "/products/ruru-ratna",
    rating: 4.8,
    reviewCount: 620,
    variants: [
      { label: "100 g", priceNpr: 90, mrpNpr: 110 },
      { label: "250 g", priceNpr: 200, mrpNpr: 250 },
    ],
  },
  {
    id: "ruru-copper-cleaner",
    name: "Ruru Copper & Brass Shiner",
    shortName: "Deep oxide remover liquid",
    description:
      "Fast-acting cleaner that cuts through years of oxidized dark coating on copper kalash, lotas, and temple artifacts.",
    category: "Metal care",
    image: ruruPitambariPng,
    imageFit: "contain",
    href: "/products/ruru-copper-cleaner",
    rating: 4.7,
    reviewCount: 310,
    variants: [
      { label: "200 ml", priceNpr: 160, mrpNpr: 200 },
      { label: "500 ml", priceNpr: 340, mrpNpr: 420 },
    ],
  },

  // --- POOJA CARE (4 Products) ---
  {
    id: "ruru-pooja-diya-oil",
    name: "Ruru Pooja Diya Sesame Oil",
    shortName: "Pure auspicious lamp oil",
    description:
      "100% pure filtered sesame pooja oil formulated for long-lasting, steady, soot-free flame in temple and home diyas.",
    category: "Pooja care",
    image: poojaDiyaOilImage,
    href: "/products/ruru-pooja-diya-oil",
    isBestseller: true,
    rating: 4.9,
    reviewCount: 1120,
    variants: [
      { label: "500 ml", priceNpr: 190, mrpNpr: 235 },
      { label: "1 L", priceNpr: 350, mrpNpr: 440 },
    ],
  },
  {
    id: "ruru-pooja-camphor",
    name: "Ruru Bhimseni Pure Camphor",
    shortName: "100% organic pure kapoor",
    description:
      "Premium aromatic organic Bhimseni camphor chunks for daily aarti, creating an uplifting spiritual atmosphere without toxic black soot.",
    category: "Pooja care",
    image: poojaCamphorImage,
    href: "/products/ruru-pooja-camphor",
    isBestseller: true,
    rating: 4.9,
    reviewCount: 880,
    variants: [
      { label: "50 g", priceNpr: 130, mrpNpr: 165 },
      { label: "100 g", priceNpr: 240, mrpNpr: 300 },
    ],
  },
  {
    id: "ruru-temple-incense",
    name: "Ruru Devbhakti Temple Incense",
    shortName: "Handcrafted natural agarbatti",
    description:
      "Hand-rolled natural temple incense sticks crafted with sandalwood, kasturi, and Himalayan herbal essential oils.",
    category: "Pooja care",
    image: templeIncenseImage,
    href: "/products/ruru-temple-incense",
    rating: 4.8,
    reviewCount: 740,
    variants: [
      { label: "Pack of 2", priceNpr: 150, mrpNpr: 190 },
      { label: "Pack of 4", priceNpr: 280, mrpNpr: 360 },
    ],
  },
  {
    id: "ruru-pooja-ghee-wick",
    name: "Ruru Ghee Diya Steady Wicks",
    shortName: "Ready-to-light pure ghee wicks",
    description:
      "Convenient pre-soaked pure cow ghee cotton batti wicks for quick daily puja and festive celebrations.",
    category: "Pooja care",
    image: poojaDiyaOilImage,
    href: "/products/ruru-pooja-ghee-wick",
    rating: 4.8,
    reviewCount: 420,
    variants: [
      { label: "35 Wicks", priceNpr: 120, mrpNpr: 150 },
      { label: "100 Wicks", priceNpr: 290, mrpNpr: 360 },
    ],
  },

  // --- KITCHEN CARE (5 Products) ---
  {
    id: "ruru-ease",
    name: "Ruru Ease Kitchen Degreaser",
    shortName: "Multi-surface kitchen spray",
    description:
      "Heavy-duty spray formula for dissolving burnt oil, kitchen grease, and stovetop grime in seconds without harsh residue.",
    category: "Kitchen care",
    image: product02Image,
    href: "/products/ruru-ease",
    isBestseller: true,
    rating: 4.8,
    reviewCount: 860,
    variants: [
      { label: "500 ml", priceNpr: 180, mrpNpr: 220 },
      { label: "1 L", priceNpr: 320, mrpNpr: 395 },
    ],
  },
  {
    id: "ruru-dishwash-gel",
    name: "Ruru Active Lime Dishwash Gel",
    shortName: "Tough grease dishwashing liquid",
    description:
      "Concentrated lemon dishwash gel that cuts through stubborn oil, removes food odor, and leaves stainless steel cutlery sparkling.",
    category: "Kitchen care",
    image: dishwashGelImage,
    href: "/products/ruru-dishwash-gel",
    isBestseller: true,
    rating: 4.9,
    reviewCount: 1340,
    variants: [
      { label: "500 ml", priceNpr: 140, mrpNpr: 175 },
      { label: "750 ml", priceNpr: 199, mrpNpr: 250 },
      { label: "2 L", priceNpr: 480, mrpNpr: 600 },
    ],
  },
  {
    id: "ruru-dishwash-bar",
    name: "Ruru Lemon Dishwash Bar",
    shortName: "Anti-grease dishwashing soap",
    description:
      "Long-lasting green dishwash soap bar fortified with natural lemon extract and active grease-dissolving minerals.",
    category: "Kitchen care",
    image: dishwashBarImage,
    href: "/products/ruru-dishwash-bar",
    rating: 4.7,
    reviewCount: 520,
    variants: [
      { label: "250 g x 3", priceNpr: 95, mrpNpr: 120 },
      { label: "500 g x 2", priceNpr: 130, mrpNpr: 160 },
    ],
  },
  {
    id: "ruru-chimney-cleaner",
    name: "Ruru Kitchen Chimney Cleaner",
    shortName: "Exhaust hood & mesh degreaser",
    description:
      "Professional-grade foam spray engineered to penetrate and dissolve sticky grease layers on electric chimneys and exhaust fans.",
    category: "Kitchen care",
    image: chimneyCleanerImage,
    href: "/products/ruru-chimney-cleaner",
    rating: 4.8,
    reviewCount: 390,
    variants: [
      { label: "500 ml", priceNpr: 260, mrpNpr: 325 },
      { label: "1 L", priceNpr: 460, mrpNpr: 580 },
    ],
  },
  {
    id: "ruru-kitchen-spray-refill",
    name: "Ruru Ease Kitchen Refill Pack",
    shortName: "Economical refill bottle",
    description:
      "Cost-effective bulk refill for your Ruru Ease trigger spray bottle, keeping your counters and stoves grease-free.",
    category: "Kitchen care",
    image: ruruEaseImage,
    href: "/products/ruru-kitchen-spray-refill",
    rating: 4.7,
    reviewCount: 280,
    variants: [
      { label: "1 L", priceNpr: 290, mrpNpr: 360 },
      { label: "5 L", priceNpr: 1150, mrpNpr: 1450 },
    ],
  },

  // --- FLOOR CARE (4 Products) ---
  {
    id: "white-phenyle",
    name: "Ruru White Phenyle",
    shortName: "Everyday floor disinfectant",
    description:
      "A dependable milky white floor cleaning solution that kills germs, removes grime, and leaves a fresh hygienic fragrance.",
    category: "Floor care",
    image: product04Image,
    href: "/products/white-phenyle",
    rating: 4.7,
    reviewCount: 940,
    variants: [
      { label: "1 L", priceNpr: 160, mrpNpr: 195 },
      { label: "5 L", priceNpr: 650, mrpNpr: 799 },
    ],
  },
  {
    id: "ruru-pine-phenyle",
    name: "Ruru Pine Herbal Phenyle",
    shortName: "Concentrated pine floor cleaner",
    description:
      "Natural pine oil disinfectant floor cleaner providing 99.9% germ protection with an invigorating mountain pine fragrance.",
    category: "Floor care",
    image: pinePhenyleImage,
    href: "/products/ruru-pine-phenyle",
    isBestseller: true,
    rating: 4.9,
    reviewCount: 1050,
    variants: [
      { label: "1 L", priceNpr: 195, mrpNpr: 245 },
      { label: "5 L", priceNpr: 780, mrpNpr: 990 },
    ],
  },
  {
    id: "ruru-tile-cleaner",
    name: "Ruru Heavy Duty Tile Cleaner",
    shortName: "Ceramic tile & grout stain remover",
    description:
      "Powerful acid-based deep cleaner for removing tough yellow stains, hard water deposits, and black grout mildew on bathroom tiles.",
    category: "Floor care",
    image: tileCleanerImage,
    href: "/products/ruru-tile-cleaner",
    rating: 4.8,
    reviewCount: 680,
    variants: [
      { label: "1 L", priceNpr: 220, mrpNpr: 280 },
      { label: "5 L", priceNpr: 890, mrpNpr: 1120 },
    ],
  },
  {
    id: "ruru-marble-floor-cleaner",
    name: "Ruru Marble & Granite Polish",
    shortName: "pH neutral stone floor cleaner",
    description:
      "Specially formulated neutral cleaner that protects and enhances the natural mirror gloss of marble, kota, and granite flooring.",
    category: "Floor care",
    image: pinePhenyleImage,
    href: "/products/ruru-marble-floor-cleaner",
    rating: 4.7,
    reviewCount: 340,
    variants: [
      { label: "1 L", priceNpr: 260, mrpNpr: 320 },
      { label: "5 L", priceNpr: 1050, mrpNpr: 1300 },
    ],
  },

  // --- HOUSEHOLD CARE (3 Products) ---
  {
    id: "ruru-glass-cleaner",
    name: "Ruru Streak-Free Glass Cleaner",
    shortName: "Mirror & window spray",
    description:
      "Instant streak-free shine formula for glass windows, dining tables, car windshields, and bathroom vanity mirrors.",
    category: "Household care",
    image: glassCleanerImage,
    href: "/products/ruru-glass-cleaner",
    rating: 4.8,
    reviewCount: 810,
    variants: [
      { label: "500 ml", priceNpr: 165, mrpNpr: 210 },
      { label: "1 L", priceNpr: 295, mrpNpr: 370 },
    ],
  },
  {
    id: "ruru-tap-cleaner",
    name: "Ruru Tap & Fixture Descaler",
    shortName: "Chrome bathroom tap shiner",
    description:
      "Dissolves stubborn white limescale, soap scum, and hard water salt crust from chrome taps, showers, and steel sinks in minutes.",
    category: "Household care",
    image: tapCleanerImage,
    href: "/products/ruru-tap-cleaner",
    isBestseller: true,
    rating: 4.9,
    reviewCount: 970,
    variants: [
      { label: "500 ml", priceNpr: 210, mrpNpr: 265 },
      { label: "1 L", priceNpr: 370, mrpNpr: 470 },
    ],
  },
  {
    id: "ruru-multisurface-sanitizer",
    name: "Ruru Multi-Surface Disinfectant",
    shortName: "Daily all-purpose home spray",
    description:
      "Kills 99.9% viruses and bacteria on doorknobs, dining tables, appliance exteriors, and frequently touched household surfaces.",
    category: "Household care",
    image: ruruEaseImage,
    href: "/products/ruru-multisurface-sanitizer",
    rating: 4.7,
    reviewCount: 430,
    variants: [
      { label: "500 ml", priceNpr: 175, mrpNpr: 220 },
      { label: "1 L", priceNpr: 310, mrpNpr: 390 },
    ],
  },
] as const;

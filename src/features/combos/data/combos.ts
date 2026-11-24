import type { StaticImageData } from "next/image";

import comboDishwashTwin from "@/assets/combos/combo-dishwash-twin.jpg";
import comboDiyaOilTwin from "@/assets/combos/combo-diya-oil-twin.jpg";
import comboEaseTwin from "@/assets/combos/combo-ease-twin.jpg";
import comboGheeDiya from "@/assets/combos/combo-ghee-diya.jpg";
import comboPineTwin from "@/assets/combos/combo-pine-twin.jpg";
import comboPitambariB2g1 from "@/assets/combos/combo-pitambari-b2g1.jpg";
import comboSilverBrassDuo from "@/assets/combos/combo-silver-brass-duo.jpg";
import comboTempleIncenseTwin from "@/assets/combos/combo-temple-incense-twin.jpg";
import type { Product } from "@/features/products/data/products";

export const comboCategories = [
  "All",
  "Metal care",
  "Pooja care",
  "Kitchen care",
  "Floor care",
] as const;

export type ComboCategory = (typeof comboCategories)[number];

export type Combo = {
  category: Exclude<ComboCategory, "All">;
  comboPriceNpr: number;
  description: string;
  discountPercent: number;
  id: string;
  image: StaticImageData;
  isBestseller?: boolean;
  itemCount: number;
  name: string;
  packSubtitle: string;
  rating?: number;
  regularPriceNpr: number;
  reviewCount?: number;
  savingsNpr: number;
};

export const combos: readonly Combo[] = [
  {
    id: "combo-diya-oil-twin",
    name: "Ruru Deepshakti Pooja Diya Oil – 1L (Pack of 2)",
    packSubtitle: "Pure sesame diya lamp oil twin pack - Get 25% off",
    category: "Pooja care",
    description: "Pure sesame lamp oil pack of 2 for steady soot-free flame in temple diyas.",
    image: comboDiyaOilTwin,
    regularPriceNpr: 700,
    comboPriceNpr: 525,
    savingsNpr: 175,
    discountPercent: 25,
    itemCount: 2,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 0,
  },
  {
    id: "combo-temple-incense-twin",
    name: "Ruru Devbhakti Temple Agarbatti (Pack of 2)",
    packSubtitle: "Handcrafted natural agarbatti bundled with golden ribbon",
    category: "Pooja care",
    description: "Sacred temple dhoop incense twin pack with natural essential herbal oils.",
    image: comboTempleIncenseTwin,
    regularPriceNpr: 300,
    comboPriceNpr: 240,
    savingsNpr: 60,
    discountPercent: 20,
    itemCount: 2,
    rating: 4.8,
    reviewCount: 0,
  },
  {
    id: "combo-pitambari-b2g1",
    name: "Ruru Pitambari Shine Paste – Buy 2 Get 1 Free",
    packSubtitle: "Metal cleaning paste 150g (Buy 2 Get 1 Free value pack)",
    category: "Metal care",
    description: "Special seasonal festival offer: Buy 2 tubs and get 1 tub absolutely free.",
    image: comboPitambariB2g1,
    regularPriceNpr: 450,
    comboPriceNpr: 300,
    savingsNpr: 150,
    discountPercent: 33,
    itemCount: 3,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 0,
  },
  {
    id: "combo-ghee-diya",
    name: "Ruru Pitambari Ghee Diya – 35 Steady Wicks Tub",
    packSubtitle: "Ready-to-light pure cow ghee steady wicks for daily puja",
    category: "Pooja care",
    description: "Pre-soaked pure cow ghee steady wicks for effortless daily morning puja.",
    image: comboGheeDiya,
    regularPriceNpr: 150,
    comboPriceNpr: 120,
    savingsNpr: 30,
    discountPercent: 20,
    itemCount: 1,
    rating: 4.8,
    reviewCount: 0,
  },
  {
    id: "combo-ease-twin",
    name: "Ruru Ease Kitchen Degreaser Spray (Pack of 2)",
    packSubtitle: "Buy 1L x 2 Spray Bottles – Get 18% off",
    category: "Kitchen care",
    description: "Heavy-duty kitchen grease and stovetop grime cutter twin value pack.",
    image: comboEaseTwin,
    regularPriceNpr: 640,
    comboPriceNpr: 520,
    savingsNpr: 120,
    discountPercent: 18,
    itemCount: 2,
    rating: 4.8,
    reviewCount: 0,
  },
  {
    id: "combo-pine-twin",
    name: "Ruru Pine Herbal Floor Phenyle – 1L (Pack of 2)",
    packSubtitle: "Concentrated pine floor disinfectant twin pack - Get 20% off",
    category: "Floor care",
    description: "Natural mountain pine disinfectant floor cleaner with 99.9% germ protection.",
    image: comboPineTwin,
    regularPriceNpr: 390,
    comboPriceNpr: 310,
    savingsNpr: 80,
    discountPercent: 20,
    itemCount: 2,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 0,
  },
  {
    id: "combo-dishwash-twin",
    name: "Ruru Active Lime Dishwash Gel – 750ml (Pack of 2)",
    packSubtitle: "Tough on grease lemon dishwash liquid duo - Get 15% off",
    category: "Kitchen care",
    description: "Concentrated lemon dishwash gel twin bundle for sparkling grease-free utensils.",
    image: comboDishwashTwin,
    regularPriceNpr: 398,
    comboPriceNpr: 338,
    savingsNpr: 60,
    discountPercent: 15,
    itemCount: 2,
    rating: 4.8,
    reviewCount: 0,
  },
  {
    id: "combo-silver-brass-duo",
    name: "Ruru Silver Shine & Get Pitambari Paste Free",
    packSubtitle: "Silver Polish (100ml) + Free Metal Shine Paste (150g)",
    category: "Metal care",
    description: "Buy Ruru Silver Shine liquid polish and get Ruru Pitambari Paste free.",
    image: comboSilverBrassDuo,
    regularPriceNpr: 290,
    comboPriceNpr: 215,
    savingsNpr: 75,
    discountPercent: 25,
    itemCount: 2,
    rating: 4.8,
    reviewCount: 0,
  },
];

export const comboAsProducts: readonly Product[] = combos.map((combo) => ({
  id: combo.id,
  name: combo.name,
  shortName: combo.packSubtitle,
  description: combo.description,
  category: combo.category,
  image: combo.image,
  imageFit: "contain" as const,
  href: "/combo-offers",
  rating: combo.rating,
  reviewCount: combo.reviewCount,
  variants: [
    {
      label: "Combo Pack",
      priceNpr: combo.comboPriceNpr,
      mrpNpr: combo.regularPriceNpr,
    },
  ],
}));

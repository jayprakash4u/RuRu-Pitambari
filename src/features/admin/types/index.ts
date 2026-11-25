export type OrderStatus = "Pending" | "Processing" | "Dispatched" | "Delivered" | "Cancelled";

export type PaymentMethod = "Cash on delivery" | "eSewa" | "Khalti" | "Bank Transfer";
export type PaymentStatus = "Paid" | "Pending" | "Refunded";

export type OrderItem = {
  productId: string;
  productName: string;
  variantLabel: string;
  quantity: number;
  unitPriceNpr: number;
  subtotalNpr: number;
};

export type AdminOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  city: string;
  district: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  items: OrderItem[];
  subtotalNpr: number;
  deliveryChargeNpr: number;
  totalNpr: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductVariantItem = {
  id: string;
  label: string;
  priceNpr: number;
  stock: number;
  sku: string;
  lowStockThreshold: number;
};

export type AdminProduct = {
  id: string;
  name: string;
  shortName: string;
  category: "Metal care" | "Pooja care" | "Kitchen care" | "Floor care";
  description: string;
  imageUrl?: string;
  variants: ProductVariantItem[];
  active: boolean;
  featured: boolean;
  updatedAt: string;
};

export type DealerStatus =
  "Pending Review" | "Under Review" | "Approved" | "Contacted" | "Rejected";

export type DealerTier = "Standard" | "Silver" | "Gold";

export type AdminDealer = {
  id: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  email: string;
  panVat: string;
  district: string;
  city: string;
  businessType: "Retail Store" | "Puja Samagri Shop" | "Wholesaler / Distributor" | "Supermarket";
  estimatedMonthlyVolume: string;
  status: DealerStatus;
  dealerTier: DealerTier;
  notes?: string;
  appliedAt: string;
};

export type InquiryStatus = "New" | "In Progress" | "Resolved";

export type AdminInquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  responseNote?: string;
};

export type StoreSettings = {
  storeName: string;
  tagline: string;
  supportPhone: string;
  supportEmail: string;
  warehouseAddress: string;
  panVatNumber: string;
  insideValleyDeliveryNpr: number;
  outsideValleyDeliveryNpr: number;
  freeDeliveryThresholdNpr: number;
  acceptCod: boolean;
  acceptOnlinePayment: boolean;
  autoEmailConfirmation: boolean;
};

export type HomePageContent = {
  heroTagline: string;
  heroVideoUrl: string;
  heroPosterUrl: string;
  dealsHeading: string;
  dealsSubtitle: string;
  transformationHeading: string;
  transformationBeforeImage: string;
  transformationAfterImage: string;
  transformationDescription: string;
  dealerHeading: string;
  dealerSubtitle: string;
  dealerCtaText: string;
};

export type OurStoryContent = {
  bannerTitle: string;
  storyEyebrow: string;
  storyHeading: string;
  storyPhotoUrl: string;
  storyPhotoCaption: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyParagraph3: string;
  missionHeading: string;
  missionDescription: string;
  missionImageUrl: string;
  visionHeading: string;
  visionDescription: string;
  visionImageUrl: string;
  establishedYear: string;
  yearsOfTrust: string;
  authenticCare: string;
  quoteText: string;
  quoteAuthor: string;
};

export type GalleryPhoto = {
  id: string;
  imageUrl: string;
  category?: string;
  caption?: string;
  uploadedAt: string;
};

export type GalleryPageContent = {
  pageTitle: string;
  pageSubtitle: string;
  photos: GalleryPhoto[];
};

export type AdminComboOffer = {
  id: string;
  name: string;
  packSubtitle: string;
  category: "Metal care" | "Pooja care" | "Kitchen care" | "Floor care";
  regularPriceNpr: number;
  comboPriceNpr: number;
  savingsNpr: number;
  discountPercent: number;
  itemCount: number;
  imageUrl?: string;
  isBestseller?: boolean;
  active: boolean;
  createdAt: string;
};

export type CombosPageContent = {
  pageTitle: string;
  pageSubtitle: string;
  bannerNotice: string;
  offers: AdminComboOffer[];
};

export type ContactPageContent = {
  factoryAddress: string;
  registeredOffice: string;
  phoneHotline: string;
  dealershipPhone: string;
  email: string;
  businessHours: string;
};

export type SiteContent = {
  home: HomePageContent;
  story: OurStoryContent;
  gallery: GalleryPageContent;
  combos: CombosPageContent;
  contact: ContactPageContent;
};

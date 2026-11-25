"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

import {
  initialDealers,
  initialInquiries,
  initialOrders,
  initialProducts,
  initialSettings,
  initialSiteContent,
} from "../data/admin-mock-data";
import type {
  AdminDealer,
  AdminInquiry,
  AdminOrder,
  AdminProduct,
  DealerStatus,
  DealerTier,
  InquiryStatus,
  OrderStatus,
  PaymentStatus,
  SiteContent,
  StoreSettings,
} from "../types";

type AdminContextType = {
  orders: AdminOrder[];
  products: AdminProduct[];
  dealers: AdminDealer[];
  inquiries: AdminInquiry[];
  settings: StoreSettings;
  siteContent: SiteContent;
  updateOrderStatus: (orderId: string, status: OrderStatus, paymentStatus?: PaymentStatus) => void;
  updateProductStock: (productId: string, variantId: string, newStock: number) => void;
  updateProduct: (productId: string, updates: Partial<AdminProduct>) => void;
  addProduct: (product: Omit<AdminProduct, "id" | "updatedAt">) => void;
  toggleProductActive: (productId: string) => void;
  updateDealerStatus: (
    dealerId: string,
    status: DealerStatus,
    tier?: DealerTier,
    notes?: string,
  ) => void;
  updateInquiryStatus: (inquiryId: string, status: InquiryStatus, responseNote?: string) => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  updateSiteContent: <K extends keyof SiteContent>(
    section: K,
    updates: Partial<SiteContent[K]>,
  ) => void;
  resetToDefaults: () => void;
};

const AdminContext = createContext<AdminContextType | null>(null);

const STORAGE_KEYS = {
  orders: "ruru_admin_orders",
  products: "ruru_admin_products",
  dealers: "ruru_admin_dealers",
  inquiries: "ruru_admin_inquiries",
  settings: "ruru_admin_settings",
  content: "ruru_admin_site_content",
};

function getSavedItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<AdminOrder[]>(() =>
    getSavedItem(STORAGE_KEYS.orders, initialOrders),
  );
  const [products, setProducts] = useState<AdminProduct[]>(() =>
    getSavedItem(STORAGE_KEYS.products, initialProducts),
  );
  const [dealers, setDealers] = useState<AdminDealer[]>(() =>
    getSavedItem(STORAGE_KEYS.dealers, initialDealers),
  );
  const [inquiries, setInquiries] = useState<AdminInquiry[]>(() =>
    getSavedItem(STORAGE_KEYS.inquiries, initialInquiries),
  );
  const [settings, setSettings] = useState<StoreSettings>(() =>
    getSavedItem(STORAGE_KEYS.settings, initialSettings),
  );
  const [siteContent, setSiteContent] = useState<SiteContent>(() =>
    getSavedItem(STORAGE_KEYS.content, initialSiteContent),
  );

  const saveToStorage = useCallback((key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Ignore storage write quota errors
    }
  }, []);

  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus, paymentStatus?: PaymentStatus) => {
      setOrders((prev) => {
        const next = prev.map((ord) => {
          if (ord.id !== orderId) return ord;
          return {
            ...ord,
            status,
            paymentStatus: paymentStatus ?? ord.paymentStatus,
            updatedAt: new Date().toISOString(),
          };
        });
        saveToStorage(STORAGE_KEYS.orders, next);
        return next;
      });
    },
    [saveToStorage],
  );

  const updateProductStock = useCallback(
    (productId: string, variantId: string, newStock: number) => {
      setProducts((prev) => {
        const next = prev.map((prod) => {
          if (prod.id !== productId) return prod;
          return {
            ...prod,
            updatedAt: new Date().toISOString(),
            variants: prod.variants.map((v) =>
              v.id === variantId ? { ...v, stock: Math.max(0, newStock) } : v,
            ),
          };
        });
        saveToStorage(STORAGE_KEYS.products, next);
        return next;
      });
    },
    [saveToStorage],
  );

  const updateProduct = useCallback(
    (productId: string, updates: Partial<AdminProduct>) => {
      setProducts((prev) => {
        const next = prev.map((prod) =>
          prod.id === productId
            ? { ...prod, ...updates, updatedAt: new Date().toISOString() }
            : prod,
        );
        saveToStorage(STORAGE_KEYS.products, next);
        return next;
      });
    },
    [saveToStorage],
  );

  const addProduct = useCallback(
    (product: Omit<AdminProduct, "id" | "updatedAt">) => {
      const newProduct: AdminProduct = {
        ...product,
        id: `prod-${Date.now()}`,
        updatedAt: new Date().toISOString(),
      };
      setProducts((prev) => {
        const next = [newProduct, ...prev];
        saveToStorage(STORAGE_KEYS.products, next);
        return next;
      });
    },
    [saveToStorage],
  );

  const toggleProductActive = useCallback(
    (productId: string) => {
      setProducts((prev) => {
        const next = prev.map((prod) =>
          prod.id === productId
            ? { ...prod, active: !prod.active, updatedAt: new Date().toISOString() }
            : prod,
        );
        saveToStorage(STORAGE_KEYS.products, next);
        return next;
      });
    },
    [saveToStorage],
  );

  const updateDealerStatus = useCallback(
    (dealerId: string, status: DealerStatus, tier?: DealerTier, notes?: string) => {
      setDealers((prev) => {
        const next = prev.map((dealer) => {
          if (dealer.id !== dealerId) return dealer;
          return {
            ...dealer,
            status,
            dealerTier: tier ?? dealer.dealerTier,
            notes: notes !== undefined ? notes : dealer.notes,
          };
        });
        saveToStorage(STORAGE_KEYS.dealers, next);
        return next;
      });
    },
    [saveToStorage],
  );

  const updateInquiryStatus = useCallback(
    (inquiryId: string, status: InquiryStatus, responseNote?: string) => {
      setInquiries((prev) => {
        const next = prev.map((inq) => {
          if (inq.id !== inquiryId) return inq;
          return {
            ...inq,
            status,
            responseNote: responseNote !== undefined ? responseNote : inq.responseNote,
          };
        });
        saveToStorage(STORAGE_KEYS.inquiries, next);
        return next;
      });
    },
    [saveToStorage],
  );

  const updateSettings = useCallback(
    (newSettings: Partial<StoreSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...newSettings };
        saveToStorage(STORAGE_KEYS.settings, next);
        return next;
      });
    },
    [saveToStorage],
  );

  const updateSiteContent = useCallback(
    <K extends keyof SiteContent>(section: K, updates: Partial<SiteContent[K]>) => {
      setSiteContent((prev) => {
        const next = {
          ...prev,
          [section]: {
            ...prev[section],
            ...updates,
          },
        };
        saveToStorage(STORAGE_KEYS.content, next);
        return next;
      });
    },
    [saveToStorage],
  );

  const resetToDefaults = useCallback(() => {
    setOrders(initialOrders);
    setProducts(initialProducts);
    setDealers(initialDealers);
    setInquiries(initialInquiries);
    setSettings(initialSettings);
    setSiteContent(initialSiteContent);
    try {
      localStorage.removeItem(STORAGE_KEYS.orders);
      localStorage.removeItem(STORAGE_KEYS.products);
      localStorage.removeItem(STORAGE_KEYS.dealers);
      localStorage.removeItem(STORAGE_KEYS.inquiries);
      localStorage.removeItem(STORAGE_KEYS.settings);
      localStorage.removeItem(STORAGE_KEYS.content);
    } catch {
      // Ignore
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        orders,
        products,
        dealers,
        inquiries,
        settings,
        siteContent,
        updateOrderStatus,
        updateProductStock,
        updateProduct,
        addProduct,
        toggleProductActive,
        updateDealerStatus,
        updateInquiryStatus,
        updateSettings,
        updateSiteContent,
        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}

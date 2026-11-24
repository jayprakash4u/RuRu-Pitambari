"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const WISHLIST_STORAGE_KEY = "ruru-pitambari-wishlist";

// Default curated favorites for Nepali homes if empty
const INITIAL_WISHLIST_SEEDS = [
  "pitambari-shining-powder",
  "ruru-pooja-diya-oil",
  "combo-safai-heroes",
];

type WishlistContextValue = {
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
  items: readonly string[];
  removeItem: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let savedItems: string[] = [];

    try {
      const savedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        savedItems = JSON.parse(savedWishlist) as string[];
      } else {
        savedItems = INITIAL_WISHLIST_SEEDS;
      }
    } catch {
      savedItems = INITIAL_WISHLIST_SEEDS;
    }

    const hydrationFrame = window.requestAnimationFrame(() => {
      setItems(savedItems);
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(hydrationFrame);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    }
  }, [hydrated, items]);

  const toggleWishlist = useCallback((productId: string) => {
    setItems((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((id) => id !== productId));
  }, []);

  const clearWishlist = useCallback(() => setItems([]), []);

  const isInWishlist = useCallback((productId: string) => items.includes(productId), [items]);

  const value = useMemo(
    () => ({
      clearWishlist,
      isInWishlist,
      itemCount: items.length,
      items,
      removeItem,
      toggleWishlist,
    }),
    [clearWishlist, isInWishlist, items, removeItem, toggleWishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

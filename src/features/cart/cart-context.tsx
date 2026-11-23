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

const CART_STORAGE_KEY = "ruru-pitambari-cart";

export type CartItem = {
  productId: string;
  quantity: number;
  variantIndex: number;
};

type CartContextValue = {
  addItem: (productId: string, variantIndex: number) => void;
  clearCart: () => void;
  itemCount: number;
  items: readonly CartItem[];
  removeItem: (productId: string, variantIndex: number) => void;
  updateQuantity: (productId: string, variantIndex: number, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let savedItems: CartItem[] = [];

    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) savedItems = JSON.parse(savedCart) as CartItem[];
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }

    const hydrationFrame = window.requestAnimationFrame(() => {
      setItems(savedItems);
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(hydrationFrame);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const addItem = useCallback((productId: string, variantIndex: number) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (item) => item.productId === productId && item.variantIndex === variantIndex,
      );

      if (existingIndex === -1) {
        return [...current, { productId, quantity: 1, variantIndex }];
      }

      return current.map((item, index) =>
        index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, variantIndex: number, quantity: number) => {
      if (quantity < 1) return;
      setItems((current) =>
        current.map((item) =>
          item.productId === productId && item.variantIndex === variantIndex
            ? { ...item, quantity }
            : item,
        ),
      );
    },
    [],
  );

  const removeItem = useCallback((productId: string, variantIndex: number) => {
    setItems((current) =>
      current.filter((item) => item.productId !== productId || item.variantIndex !== variantIndex),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const value = useMemo(
    () => ({ addItem, clearCart, itemCount, items, removeItem, updateQuantity }),
    [addItem, clearCart, itemCount, items, removeItem, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

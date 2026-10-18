"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import {
  type AddOptions, type CartItem,
  addItem, cartCount, cartTotal, removeItem, setQuantity,
} from "@/lib/cart";

const STORAGE_KEY = "brewlite.cart.v1";

interface CartContextValue {
  items: CartItem[];
  /** false cho tới khi đã đọc xong localStorage (tránh nháy giỏ trống). */
  hydrated: boolean;
  count: number;
  total: number;
  add: (product: Product, opts?: AddOptions) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.lineId === "string" &&
    typeof v.productId === "string" &&
    typeof v.name === "string" &&
    typeof v.unitPrice === "number" &&
    typeof v.quantity === "number" &&
    v.quantity > 0
  );
}

function loadItems(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Bộ nhớ đầy hoặc bị chặn: giỏ vẫn hoạt động trong phiên hiện tại.
    }
  }, [items, hydrated]);

  const add = useCallback((product: Product, opts?: AddOptions) => {
    setItems((prev) => addItem(prev, product, opts));
  }, []);
  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setItems((prev) => setQuantity(prev, lineId, quantity));
  }, []);
  const remove = useCallback((lineId: string) => {
    setItems((prev) => removeItem(prev, lineId));
  }, []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items, hydrated,
      count: cartCount(items),
      total: cartTotal(items),
      add, updateQuantity, remove, clear,
    }),
    [items, hydrated, add, updateQuantity, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart phải được dùng bên trong <CartProvider>");
  return ctx;
}

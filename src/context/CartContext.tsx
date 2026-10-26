"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  size: string;
  sizeLabel: string;
  basePrice: number;
  addOns: { id: string; label: string; price: number }[];
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function itemTotal(item: CartItem) {
  const addOnsTotal = item.addOns.reduce((sum, a) => sum + a.price, 0);
  return (item.basePrice + addOnsTotal) * item.quantity;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (item: Omit<CartItem, "id">) => {
    const id = `${item.slug}-${item.size}-${Date.now()}`;
    setItems((prev) => [...prev, { ...item, id }]);
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)),
    );
  };

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + itemTotal(i), 0),
    [items],
  );

  const value: CartContextValue = {
    items,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

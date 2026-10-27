"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface WishlistContextValue {
  slugs: string[];
  toggle: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "elad-flowers-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSlugs(JSON.parse(stored));
    } catch {
      // ignore storage errors
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      // ignore storage errors
    }
  }, [slugs, hydrated]);

  const toggle = (slug: string) => {
    setSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  };

  const isWishlisted = (slug: string) => slugs.includes(slug);

  return (
    <WishlistContext.Provider value={{ slugs, toggle, isWishlisted, count: slugs.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

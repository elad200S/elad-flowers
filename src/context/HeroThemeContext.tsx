"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const heroBeats = 3;

// One accent per rotation beat (not tied to a single "theme" anymore —
// each hero panel now cycles its own color independently; this just
// drives the shared chrome: announcement bar, header underline, CTA).
export const heroAccents = ["#D4E2C8", "#C7D9E8", "#E7C9C3"];

const ROTATE_MS = 4500;

interface HeroThemeContextValue {
  index: number;
  setIndex: (i: number) => void;
  accent: string;
}

const HeroThemeContext = createContext<HeroThemeContextValue | null>(null);

export function HeroThemeProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroBeats);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [index]);

  return (
    <HeroThemeContext.Provider value={{ index, setIndex, accent: heroAccents[index] }}>
      {children}
    </HeroThemeContext.Provider>
  );
}

export function useHeroTheme() {
  const ctx = useContext(HeroThemeContext);
  if (!ctx) throw new Error("useHeroTheme must be used within HeroThemeProvider");
  return ctx;
}

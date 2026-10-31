"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const heroThemes = [
  {
    key: "pink",
    label: "ורוד",
    accent: "#E7C9C3",
    panels: {
      left: "/hero/rotator/pink-left.jpg",
      mid: "/hero/rotator/pink-mid.jpg",
      right: "/hero/rotator/pink-right.jpg",
    },
  },
  {
    key: "blue",
    label: "כחול",
    accent: "#C7D9E8",
    panels: {
      left: "/hero/rotator/blue-left.png",
      mid: "/hero/rotator/blue-mid.png",
      right: "/hero/rotator/blue-right.png",
    },
  },
  {
    key: "green",
    label: "ירוק",
    accent: "#D4E2C8",
    panels: {
      left: "/hero/rotator/green-left.png",
      mid: "/hero/rotator/green-mid.png",
      right: "/hero/rotator/green-right.png",
    },
  },
] as const;

const ROTATE_MS = 4500;

interface HeroThemeContextValue {
  index: number;
  setIndex: (i: number) => void;
  theme: (typeof heroThemes)[number];
}

const HeroThemeContext = createContext<HeroThemeContextValue | null>(null);

export function HeroThemeProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroThemes.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [index]);

  return (
    <HeroThemeContext.Provider value={{ index, setIndex, theme: heroThemes[index] }}>
      {children}
    </HeroThemeContext.Provider>
  );
}

export function useHeroTheme() {
  const ctx = useContext(HeroThemeContext);
  if (!ctx) throw new Error("useHeroTheme must be used within HeroThemeProvider");
  return ctx;
}

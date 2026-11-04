"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Accessibility, X } from "lucide-react";

const STORAGE_KEY = "prachei-dyitbarach-a11y";

interface A11yState {
  textSize: 0 | 1 | 2;
  highContrast: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  stopAnimations: boolean;
}

const DEFAULT_STATE: A11yState = {
  textSize: 0,
  highContrast: false,
  highlightLinks: false,
  readableFont: false,
  stopAnimations: false,
};

function applyState(state: A11yState) {
  const root = document.documentElement;
  root.classList.toggle("a11y-text-lg", state.textSize === 1);
  root.classList.toggle("a11y-text-xl", state.textSize === 2);
  root.classList.toggle("a11y-contrast", state.highContrast);
  root.classList.toggle("a11y-highlight-links", state.highlightLinks);
  root.classList.toggle("a11y-readable-font", state.readableFont);
  root.classList.toggle("a11y-stop-animations", state.stopAnimations);
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as A11yState;
        setState(parsed);
        applyState(parsed);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const update = (next: A11yState) => {
    setState(next);
    applyState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const cycleTextSize = () => update({ ...state, textSize: ((state.textSize + 1) % 3) as 0 | 1 | 2 });
  const reset = () => update(DEFAULT_STATE);

  const toggles: { key: keyof Omit<A11yState, "textSize">; label: string }[] = [
    { key: "highContrast", label: "ניגודיות גבוהה" },
    { key: "highlightLinks", label: "הדגשת קישורים" },
    { key: "readableFont", label: "פונט קריא" },
    { key: "stopAnimations", label: "עצירת אנימציות" },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="תפריט נגישות"
        className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white shadow-lg hover:scale-105 transition-transform"
      >
        <Accessibility size={22} strokeWidth={1.6} />
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-40 w-72 bg-white rounded-xl border border-black/10 shadow-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-serif text-ink">נגישות</p>
            <button onClick={() => setOpen(false)} aria-label="סגור" className="text-ink/50 hover:text-ink">
              <X size={18} />
            </button>
          </div>

          <button
            type="button"
            onClick={cycleTextSize}
            className="w-full flex items-center justify-between rounded-lg border border-black/10 px-3 py-2.5 mb-2 text-sm text-ink hover:border-accent transition-colors"
          >
            <span>הגדלת טקסט</span>
            <span className="text-ink/50">{["רגיל", "גדול", "גדול מאוד"][state.textSize]}</span>
          </button>

          {toggles.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => update({ ...state, [t.key]: !state[t.key] })}
              className={`w-full flex items-center justify-between rounded-lg border px-3 py-2.5 mb-2 text-sm transition-colors ${
                state[t.key] ? "border-accent bg-accent-soft text-ink" : "border-black/10 text-ink hover:border-accent"
              }`}
            >
              <span>{t.label}</span>
              <span className="text-ink/50">{state[t.key] ? "פעיל" : "כבוי"}</span>
            </button>
          ))}

          <button
            type="button"
            onClick={reset}
            className="w-full text-center rounded-lg bg-accent text-white py-2.5 text-sm mb-2 hover:brightness-110 transition-all"
          >
            איפוס הגדרות
          </button>

          <Link
            href="/accessibility"
            onClick={() => setOpen(false)}
            className="block text-center text-xs text-ink/50 hover:text-accent transition-colors underline"
          >
            הצהרת נגישות
          </Link>
        </div>
      )}
    </>
  );
}

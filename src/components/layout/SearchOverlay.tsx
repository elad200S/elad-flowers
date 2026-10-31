"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/lib/data";

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return products
      .filter((p) => p.title.includes(q) || p.description.includes(q))
      .slice(0, 8);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 inset-x-0 z-50 bg-paper"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mx-auto max-w-2xl px-6 py-8">
              <div className="flex items-center gap-3 border-b border-ink pb-3">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="חיפוש זרים ומתנות..."
                  className="flex-1 bg-transparent outline-none text-lg text-ink placeholder:text-ink/40"
                />
                <button onClick={onClose} aria-label="סגור חיפוש" className="text-ink/60 hover:text-ink">
                  <X size={20} strokeWidth={1.4} />
                </button>
              </div>

              {query.trim() && (
                <div className="mt-6">
                  {results.length === 0 ? (
                    <p className="text-sm text-ink/50">לא נמצאו תוצאות עבור &quot;{query}&quot;</p>
                  ) : (
                    <ul className="space-y-3">
                      {results.map((p) => (
                        <li key={p.slug}>
                          <Link href={`/products/${p.slug}`} onClick={onClose} className="flex items-center gap-4 group">
                            <div className="relative w-14 h-16 shrink-0 bg-neutral-100 overflow-hidden">
                              <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-ink group-hover:underline">{p.title}</p>
                              <p className="text-xs text-ink/50 mt-0.5">החל מ-{p.startingPrice} ₪</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-paper shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
              <h2 className="font-serif text-xl text-ink">הסל שלי</h2>
              <button onClick={closeCart} aria-label="סגור" className="p-1 text-ink hover:text-ink">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="text-ink/60 text-sm text-center mt-12">הסל שלך ריק כרגע.</p>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => {
                    const addOnsTotal = item.addOns.reduce((s, a) => s + a.price, 0);
                    const lineTotal = (item.basePrice + addOnsTotal) * item.quantity;
                    return (
                      <li key={item.id} className="flex gap-4">
                        <div className="relative w-20 h-24 shrink-0 rounded-md overflow-hidden bg-neutral-100">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-ink truncate">{item.title}</p>
                          <p className="text-xs text-ink/60 mt-0.5">גודל: {item.sizeLabel}</p>
                          {item.addOns.length > 0 && (
                            <p className="text-xs text-ink/60">
                              תוספות: {item.addOns.map((a) => a.label).join(", ")}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 border border-black/10 rounded-full px-2 py-0.5">
                              <button
                                aria-label="הפחת כמות"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 text-ink hover:text-ink"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-sm w-5 text-center">{item.quantity}</span>
                              <button
                                aria-label="הוסף כמות"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 text-ink hover:text-ink"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="text-sm font-medium text-ink">{lineTotal} ₪</span>
                          </div>
                        </div>
                        <button
                          aria-label="הסר פריט"
                          onClick={() => removeItem(item.id)}
                          className="text-ink/40 hover:text-ink self-start"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-black/10 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between text-ink">
                  <span className="font-medium">סכום ביניים</span>
                  <span className="font-medium">{subtotal} ₪</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center bg-ink text-white py-3.5 hover:bg-ink/85 transition-colors"
                >
                  לתשלום
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

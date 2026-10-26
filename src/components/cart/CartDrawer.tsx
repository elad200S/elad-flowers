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
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-cream shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
              <h2 className="font-serif text-xl text-bordeaux">הסל שלי</h2>
              <button onClick={closeCart} aria-label="סגור" className="p-1 text-charcoal hover:text-bordeaux">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="text-charcoal/60 text-sm text-center mt-12">הסל שלך ריק כרגע.</p>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => {
                    const addOnsTotal = item.addOns.reduce((s, a) => s + a.price, 0);
                    const lineTotal = (item.basePrice + addOnsTotal) * item.quantity;
                    return (
                      <li key={item.id} className="flex gap-4">
                        <div className="relative w-20 h-24 shrink-0 rounded-md overflow-hidden bg-powder/30">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal truncate">{item.title}</p>
                          <p className="text-xs text-charcoal/60 mt-0.5">גודל: {item.sizeLabel}</p>
                          {item.addOns.length > 0 && (
                            <p className="text-xs text-charcoal/60">
                              תוספות: {item.addOns.map((a) => a.label).join(", ")}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 border border-gold/30 rounded-full px-2 py-0.5">
                              <button
                                aria-label="הפחת כמות"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 text-charcoal hover:text-bordeaux"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-sm w-5 text-center">{item.quantity}</span>
                              <button
                                aria-label="הוסף כמות"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 text-charcoal hover:text-bordeaux"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="text-sm font-medium text-bordeaux">{lineTotal} ₪</span>
                          </div>
                        </div>
                        <button
                          aria-label="הסר פריט"
                          onClick={() => removeItem(item.id)}
                          className="text-charcoal/40 hover:text-bordeaux self-start"
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
              <div className="border-t border-gold/20 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between text-charcoal">
                  <span className="font-medium">סכום ביניים</span>
                  <span className="font-medium">{subtotal} ₪</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center bg-bordeaux text-white py-3.5 rounded-full hover:bg-bordeaux-dark transition-colors"
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

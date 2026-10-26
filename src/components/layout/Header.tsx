"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/category/bouquets", label: "זרים" },
  { href: "/category/weddings", label: "חתונות" },
  { href: "/category/corporate", label: "מתנות לעסקים" },
  { href: "/category/plants", label: "עציצים" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-cream/90 backdrop-blur-sm border-b border-gold/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-20 flex items-center justify-between">
        <button
          className="md:hidden p-2 text-charcoal"
          aria-label="תפריט"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-charcoal hover:text-bordeaux transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="font-serif text-2xl sm:text-3xl tracking-wide text-bordeaux absolute left-1/2 -translate-x-1/2"
        >
          אלעד פרחים
        </Link>

        <div className="flex items-center gap-3">
          <button aria-label="חיפוש" className="p-2 text-charcoal hover:text-bordeaux transition-colors">
            <Search size={20} />
          </button>
          <button
            aria-label="סל קניות"
            onClick={openCart}
            className="relative p-2 text-charcoal hover:text-bordeaux transition-colors"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-bordeaux text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-1 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-charcoal hover:text-bordeaux transition-colors border-b border-gold/10 text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

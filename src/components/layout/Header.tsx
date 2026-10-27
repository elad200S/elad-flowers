"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/category/bouquets", label: "קטלוג" },
  { href: "/category/new", label: "חדשים" },
  { href: "/category/accessories", label: "אקססוריז" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "קשר" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-paper border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-1 text-ink"
            aria-label="תפריט"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} strokeWidth={1.25} /> : <Menu size={20} strokeWidth={1.25} />}
          </button>
          <button aria-label="חיפוש" className="hidden sm:block text-ink/70 hover:text-ink transition-colors">
            <Search size={17} strokeWidth={1.25} />
          </button>
          <button
            aria-label="סל קניות"
            onClick={openCart}
            className="relative text-ink/70 hover:text-ink transition-colors"
          >
            <ShoppingBag size={17} strokeWidth={1.25} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-ink text-paper text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] tracked-xs uppercase text-ink/70 hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="font-serif text-lg tracking-wide text-ink md:hidden">
          אלעד פרחים
        </Link>
        <div className="hidden md:block w-5" />
      </div>

      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-1 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-ink/80 hover:text-ink transition-colors border-b border-black/5 text-xs tracked-xs uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

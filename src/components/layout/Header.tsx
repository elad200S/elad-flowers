"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { productTypes } from "@/lib/data";
import SearchOverlay from "./SearchOverlay";
import Logo from "./Logo";

const navLinks = [
  { href: "/shop", label: "כל המוצרים" },
  ...productTypes.map((t) => ({ href: `/shop?type=${t.slug}`, label: t.title })),
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-40 w-full bg-paper border-b-2 border-accent">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 shrink-0">
          <button
            className="md:hidden p-1 text-ink"
            aria-label="תפריט"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} strokeWidth={1.25} /> : <Menu size={20} strokeWidth={1.25} />}
          </button>
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-5 lg:gap-7 overflow-x-auto no-scrollbar mx-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 text-[13px] text-ink/75 hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            aria-label="חיפוש"
            onClick={() => setSearchOpen(true)}
            className="text-ink/70 hover:text-accent transition-colors"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
          <Link
            href="/wishlist"
            aria-label="רשימת משאלות"
            className="relative text-ink/70 hover:text-accent transition-colors"
          >
            <Heart size={18} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button
            aria-label="סל קניות"
            onClick={openCart}
            className="relative text-ink/70 hover:text-accent transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
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
              className="py-2.5 text-ink/80 hover:text-accent transition-colors border-b border-black/5 text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

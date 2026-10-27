"use client";

import Link from "next/link";
import { products } from "@/lib/data";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { slugs } = useWishlist();
  const wishlistedProducts = products.filter((p) => slugs.includes(p.slug));

  return (
    <section className="py-16 md:py-24">
      <h1 className="text-center font-serif text-3xl sm:text-4xl text-ink mb-16">רשימת המשאלות שלי</h1>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center px-4">
          <p className="text-ink/60 text-sm mb-6">עדיין לא הוספת זרים לרשימת המשאלות.</p>
          <Link
            href="/category/bouquets"
            className="inline-block bg-ink text-paper text-xs tracked-xs uppercase px-7 py-3.5 hover:bg-ink/85 transition-colors"
          >
            לקטלוג
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-px sm:px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px sm:gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }: { product: Product }) {
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.slug);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-xl border border-black/10 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.bestSeller && (
          <span className="absolute top-3 right-3 text-[10px] tracked-xs uppercase text-white bg-accent px-2.5 py-1 rounded-full">
            נמכר הכי הרבה
          </span>
        )}
        <button
          type="button"
          aria-label={wishlisted ? "הסר מרשימת המשאלות" : "הוסף לרשימת המשאלות"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(product.slug);
          }}
          className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-white shadow-sm transition-colors"
        >
          <Heart size={15} strokeWidth={1.75} className={wishlisted ? "fill-accent text-accent" : "text-ink/70"} />
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-sm text-ink line-clamp-1">{product.title}</h3>
        <p className="text-base font-semibold text-accent mt-1">החל מ-{product.startingPrice} ₪</p>
      </div>
    </Link>
  );
}

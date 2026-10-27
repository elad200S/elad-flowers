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
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {product.bestSeller && (
          <span className="absolute top-3 right-3 text-[10px] tracked-xs uppercase text-ink bg-paper/90 px-2.5 py-1">
            Best Seller
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
          className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center bg-paper/90 hover:bg-paper transition-colors"
        >
          <Heart size={15} strokeWidth={1.5} className={wishlisted ? "fill-ink text-ink" : "text-ink"} />
        </button>
      </div>
      <div className="pt-3 text-center">
        <h3 className="text-sm text-ink">{product.title}</h3>
        <p className="text-xs text-ink/50 mt-1">החל מ-{product.startingPrice} ₪</p>
      </div>
    </Link>
  );
}

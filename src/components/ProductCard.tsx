"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative w-full">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-powder/30">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 80vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.bestSeller && (
            <span className="absolute top-3 right-3 bg-bordeaux text-white text-[11px] px-3 py-1 rounded-full">
              Best Seller
            </span>
          )}
          <button
            aria-label="הוסף למועדפים"
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-bordeaux hover:bg-white transition-colors"
          >
            <Heart size={16} />
          </button>
        </div>
      </Link>

      <div className="pt-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg text-charcoal">{product.title}</h3>
        </Link>
        <p className="text-sm text-charcoal/60 mt-1 line-clamp-1">{product.description}</p>
        <p className="text-sm text-bordeaux mt-2">החל מ-{product.startingPrice} ₪</p>

        <div className="flex gap-2 mt-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center text-sm border border-bordeaux text-bordeaux py-2 rounded-full hover:bg-bordeaux hover:text-white transition-colors"
          >
            פרטים
          </Link>
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center text-sm bg-bordeaux text-white py-2 rounded-full hover:bg-bordeaux-dark transition-colors"
          >
            הזמנה
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function BestSellers() {
  const bestSellers = products.filter((p) => p.bestSeller);
  if (bestSellers.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-black/[0.02]">
      <div className="text-center mb-10 px-4">
        <h2 className="font-serif text-3xl sm:text-4xl text-ink">הנמכרים ביותר</h2>
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-8 max-w-2xl mx-auto">
          {bestSellers.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

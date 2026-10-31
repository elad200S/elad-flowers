"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function NewArrivalsGrid() {
  return (
    <section className="py-16 md:py-24">
      <h2 className="text-center font-serif text-[13vw] sm:text-[9vw] md:text-7xl text-ink leading-none mb-16 md:mb-20">
        חדשים
      </h2>

      <div className="mx-auto max-w-7xl px-px sm:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px sm:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

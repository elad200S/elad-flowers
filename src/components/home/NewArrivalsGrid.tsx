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
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function RecommendedCarousel() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">הזרים האהובים שלנו</h2>
          <div className="gold-line w-16 mx-auto mt-4" />
        </div>

        <div className="flex gap-5 overflow-x-auto no-scrollbar px-1 snap-x snap-mandatory">
          {products.map((product) => (
            <div
              key={product.slug}
              className="snap-start shrink-0 w-[70%] sm:w-[45%] md:w-[31%] lg:w-[23%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategorySquares() {
  return (
    <section className="py-10 md:py-14">
      <div className="text-center mb-8 px-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-ink">קנייה לפי סוג פרח</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={category.image}
              alt={category.title}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
            <div className="absolute inset-0 flex items-end justify-center pb-5">
              <h3 className="font-serif text-white text-lg sm:text-xl tracking-wide">{category.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

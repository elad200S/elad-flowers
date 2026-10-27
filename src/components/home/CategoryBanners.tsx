import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategoryBanners() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-10 px-4">
        <h2 className="font-serif text-3xl sm:text-4xl text-ink">קנייה לפי סוג פרח</h2>
        <div className="hidden w-16 mx-auto mt-4" />
      </div>

      <div className="flex flex-col">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group relative h-[250px] w-full overflow-hidden"
          >
            <Image
              src={category.image}
              alt={category.title}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative z-10 h-full flex items-center justify-center">
              <h3 className="font-serif text-white text-3xl sm:text-4xl tracking-wide">
                {category.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

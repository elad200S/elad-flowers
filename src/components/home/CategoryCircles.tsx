import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategoryCircles() {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex gap-6 sm:gap-10 overflow-x-auto no-scrollbar md:justify-center">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group shrink-0 flex flex-col items-center gap-3 w-20 sm:w-24"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-1 ring-black/10 group-hover:ring-ink transition-all">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="96px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="text-[11px] tracked-xs uppercase text-ink/70 group-hover:text-ink transition-colors">
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

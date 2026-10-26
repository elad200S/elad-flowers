import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";

export default function SpecialServices() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">שירותים מיוחדים</h2>
          <div className="gold-line w-16 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/category/${service.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 h-full flex items-end p-6">
                <h3 className="font-serif text-white text-2xl">{service.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

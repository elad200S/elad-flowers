import Link from "next/link";
import { products, categories, services } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

const titles: Record<string, string> = {
  bouquets: "כל הזרים",
  ...Object.fromEntries(categories.map((c) => [c.slug, c.title])),
  ...Object.fromEntries(services.map((s) => [s.slug, s.title])),
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = titles[slug] ?? "קולקציה";
  const filtered = slug === "bouquets" ? products : products.filter((p) => p.category === slug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">{title}</h1>
        <div className="gold-line w-16 mx-auto mt-4" />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-charcoal/70">הקולקציה הזו בדרך אלינו, אבל אפשר כבר להתאים זר אישית.</p>
          <a
            href="https://wa.me/972000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-bordeaux text-white px-8 py-3 rounded-full hover:bg-bordeaux-dark transition-colors"
          >
            דברו איתנו בוואטסאפ
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Link href="/" className="text-sm text-bordeaux hover:underline">
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: "bouquets" },
    ...categories.map((c) => ({ slug: c.slug })),
    ...services.map((s) => ({ slug: s.slug })),
  ];
}

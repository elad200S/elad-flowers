import Link from "next/link";
import { notFound } from "next/navigation";
import { events, products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { WHATSAPP_URL } from "@/lib/contact";

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const filtered = products.filter((p) => event.productSlugs.includes(p.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink">מתנות ל{event.title}</h1>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-ink/70">הקולקציה הזו בדרך אלינו, אבל אפשר כבר להתאים זר אישית.</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-ink text-white px-8 py-3 hover:bg-ink/85 transition-colors"
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
        <Link href="/" className="text-sm text-ink hover:underline">
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

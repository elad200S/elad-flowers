import Link from "next/link";
import { notFound } from "next/navigation";
import { products, productTypes } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { WHATSAPP_URL } from "@/lib/contact";

export default async function ProductTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const productType = productTypes.find((t) => t.slug === type);
  if (!productType) notFound();

  const filtered = products.filter((p) => p.productType === type);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink">{productType.title}</h1>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-ink/70">הקטגוריה הזו בדרך אלינו, אבל אפשר כבר להתאים זר אישית.</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 rounded-lg bg-accent text-white px-8 py-3 hover:brightness-110 transition-all"
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
        <Link href="/shop" className="text-sm text-accent hover:underline">
          לכל המוצרים (עם סינון מתקדם)
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return productTypes.map((t) => ({ type: t.slug }));
}

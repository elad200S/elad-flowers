import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import ProductClient from "@/components/product/ProductClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  return <ProductClient product={product} />;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

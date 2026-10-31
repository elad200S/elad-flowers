"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories, events, productTypes, products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

const priceBuckets = [
  { id: "all", label: "כל המחירים", test: () => true },
  { id: "under-100", label: "עד 100 ₪", test: (p: number) => p < 100 },
  { id: "100-250", label: "100–250 ₪", test: (p: number) => p >= 100 && p <= 250 },
  { id: "above-250", label: "מעל 250 ₪", test: (p: number) => p > 250 },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const [productType, setProductType] = useState(searchParams.get("type") ?? "all");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [event, setEvent] = useState(searchParams.get("event") ?? "all");
  const [price, setPrice] = useState(searchParams.get("price") ?? "all");

  const filtered = useMemo(() => {
    const priceTest = priceBuckets.find((b) => b.id === price)?.test ?? (() => true);
    const eventSlugs = event === "all" ? null : events.find((e) => e.slug === event)?.productSlugs ?? [];

    return products.filter((p) => {
      if (productType !== "all" && p.productType !== productType) return false;
      if (category !== "all" && p.category !== category) return false;
      if (eventSlugs && !eventSlugs.includes(p.slug)) return false;
      if (!priceTest(p.startingPrice)) return false;
      return true;
    });
  }, [productType, category, event, price]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink">חנות</h1>
      </div>

      <div className="flex flex-wrap gap-6 justify-center mb-12 px-2">
        <div className="flex flex-col gap-2 items-center">
          <label className="text-[11px] tracked-xs uppercase text-ink/50">קטגוריה</label>
          <select value={productType} onChange={(e) => setProductType(e.target.value)} className="input w-auto">
            <option value="all">הכל</option>
            {productTypes.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <label className="text-[11px] tracked-xs uppercase text-ink/50">סוג פרח</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input w-auto">
            <option value="all">הכל</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <label className="text-[11px] tracked-xs uppercase text-ink/50">אירוע</label>
          <select value={event} onChange={(e) => setEvent(e.target.value)} className="input w-auto">
            <option value="all">הכל</option>
            {events.map((ev) => (
              <option key={ev.slug} value={ev.slug}>
                {ev.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <label className="text-[11px] tracked-xs uppercase text-ink/50">מחיר</label>
          <select value={price} onChange={(e) => setPrice(e.target.value)} className="input w-auto">
            {priceBuckets.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-ink/60 py-16">לא נמצאו מוצרים התואמים את הסינון שבחרתם.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}

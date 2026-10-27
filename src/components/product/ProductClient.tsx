"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import type { Product, Size } from "@/lib/types";
import { addOns as allAddOns } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function ProductClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const defaultSize = product.sizes.find((s) => s.isDefault) ?? product.sizes[0];
  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize.size);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [cardText, setCardText] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [added, setAdded] = useState(false);

  const sizeOption = product.sizes.find((s) => s.size === selectedSize) ?? defaultSize;

  const addOnsTotal = useMemo(
    () =>
      allAddOns
        .filter((a) => selectedAddOns.includes(a.id))
        .reduce((sum, a) => sum + a.price, 0),
    [selectedAddOns],
  );

  const total = sizeOption.price + addOnsTotal;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      title: product.title,
      image: product.images[0],
      size: sizeOption.size,
      sizeLabel: sizeOption.label,
      basePrice: sizeOption.price,
      addOns: allAddOns.filter((a) => selectedAddOns.includes(a.id)),
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pb-28 md:pb-0">
      <div className="md:grid md:grid-cols-2">
        {/* Sticky details */}
        <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-5rem)] md:overflow-y-auto">
          <div className="px-6 py-10 md:px-14 md:py-16 max-w-md md:ml-auto">
            <h1 className="font-serif text-3xl sm:text-4xl text-ink">{product.title}</h1>
            <p className="text-ink/60 mt-3 leading-7 text-sm font-light">{product.longDescription}</p>

            {/* Size selector */}
            <div className="mt-10">
              <p className="text-[11px] tracked-xs uppercase text-ink/50 mb-3">בחרו גודל</p>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`relative border px-3 py-3 text-center transition-colors ${
                      selectedSize === s.size
                        ? "border-ink bg-ink text-paper"
                        : "border-black/15 text-ink hover:border-ink/50"
                    }`}
                  >
                    {s.isDefault && (
                      <span className="absolute -top-2 right-1/2 translate-x-1/2 bg-paper border border-black/15 text-ink text-[9px] tracked-xs uppercase px-2 py-0.5 whitespace-nowrap">
                        פופולרי
                      </span>
                    )}
                    <p className="text-sm">{s.label}</p>
                    <p className="text-xs opacity-60 mt-1">{s.price} ₪</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="mt-8">
              <p className="text-[11px] tracked-xs uppercase text-ink/50 mb-3">תוספות</p>
              <div className="space-y-2">
                {allAddOns.map((addOn) => {
                  const isChecked = selectedAddOns.includes(addOn.id);
                  return (
                    <div key={addOn.id}>
                      <button
                        onClick={() => toggleAddOn(addOn.id)}
                        className={`w-full flex items-center justify-between border px-4 py-3 transition-colors ${
                          isChecked ? "border-ink" : "border-black/15"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`w-4 h-4 border flex items-center justify-center ${
                              isChecked ? "bg-ink border-ink" : "border-ink/30"
                            }`}
                          >
                            {isChecked && <Check size={10} className="text-paper" />}
                          </span>
                          <span className="text-sm text-ink">{addOn.label}</span>
                        </span>
                        <span className="text-sm text-ink/50">+{addOn.price} ₪</span>
                      </button>
                      {addOn.hasTextArea && isChecked && (
                        <textarea
                          value={cardText}
                          onChange={(e) => setCardText(e.target.value)}
                          placeholder="כתבו כאן את הברכה..."
                          rows={2}
                          className="input mt-2"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery date & time */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] tracked-xs uppercase text-ink/50 mb-2 block">תאריך משלוח</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="text-[11px] tracked-xs uppercase text-ink/50 mb-2 block">שעת משלוח</label>
                <select
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="input"
                >
                  <option value="">בחרו שעה</option>
                  <option value="9-13">09:00–13:00</option>
                  <option value="13-17">13:00–17:00</option>
                  <option value="17-20">17:00–20:00</option>
                </select>
              </div>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex flex-col gap-2 mt-10">
              <button
                onClick={handleAddToCart}
                className="w-full bg-ink text-paper py-4 text-sm tracked-xs uppercase hover:bg-ink/85 transition-colors"
              >
                {added ? "נוסף לסל ✓" : `הוסיפו לסל · ${total} ₪`}
              </button>
              <a
                href="https://wa.me/972000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center border border-ink text-ink py-3.5 text-sm tracked-xs uppercase hover:bg-ink hover:text-paper transition-colors"
              >
                הזמנה בוואטסאפ
              </a>
            </div>
          </div>
        </div>

        {/* Scrollable image stack */}
        <div className="flex flex-col">
          {product.images.map((img, i) => (
            <div key={img} className="relative w-full aspect-[4/5]">
              <Image
                src={img}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile sticky order bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-paper border-t border-black/10 p-3">
        <button
          onClick={handleAddToCart}
          className="w-full bg-ink text-paper py-3.5 text-sm tracked-xs uppercase hover:bg-ink/85 transition-colors"
        >
          {added ? "נוסף לסל ✓" : `הוסיפו לסל · ${total} ₪`}
        </button>
      </div>
    </div>
  );
}

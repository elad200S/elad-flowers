"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import type { Product, Size } from "@/lib/types";
import { addOns as allAddOns } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function ProductClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
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
    <div className="pb-28 md:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-powder/30">
            <Image
              src={product.images[activeImage]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex gap-3 mt-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`relative w-16 h-20 rounded-md overflow-hidden ring-2 transition-colors ${
                  activeImage === i ? "ring-bordeaux" : "ring-transparent"
                }`}
              >
                <Image src={img} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">{product.title}</h1>
          <p className="text-charcoal/70 mt-3 leading-7">{product.longDescription}</p>

          {/* Size selector */}
          <div className="mt-8">
            <p className="font-medium text-charcoal mb-3">בחרו גודל</p>
            <div className="grid grid-cols-3 gap-3">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`relative rounded-lg border px-3 py-3 text-center transition-colors ${
                    selectedSize === s.size
                      ? "border-bordeaux bg-bordeaux/5"
                      : "border-gold/30 hover:border-bordeaux/50"
                  }`}
                >
                  {s.isDefault && (
                    <span className="absolute -top-2 right-1/2 translate-x-1/2 bg-gold text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
                      הכי פופולרי
                    </span>
                  )}
                  <p className="text-sm font-medium text-charcoal">{s.label}</p>
                  <p className="text-xs text-charcoal/60 mt-1">{s.price} ₪</p>
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="mt-8">
            <p className="font-medium text-charcoal mb-3">תוספות</p>
            <div className="space-y-2">
              {allAddOns.map((addOn) => {
                const isChecked = selectedAddOns.includes(addOn.id);
                return (
                  <div key={addOn.id}>
                    <button
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`w-full flex items-center justify-between rounded-lg border px-4 py-3 transition-colors ${
                        isChecked ? "border-bordeaux bg-bordeaux/5" : "border-gold/30"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isChecked ? "bg-bordeaux border-bordeaux" : "border-charcoal/30"
                          }`}
                        >
                          {isChecked && <Check size={12} className="text-white" />}
                        </span>
                        <span className="text-sm text-charcoal">{addOn.label}</span>
                      </span>
                      <span className="text-sm text-charcoal/60">+{addOn.price} ₪</span>
                    </button>
                    {addOn.hasTextArea && isChecked && (
                      <textarea
                        value={cardText}
                        onChange={(e) => setCardText(e.target.value)}
                        placeholder="כתבו כאן את הברכה..."
                        rows={2}
                        className="w-full mt-2 rounded-lg border border-gold/30 px-4 py-2 text-sm bg-white focus:outline-none focus:border-bordeaux"
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
              <label className="font-medium text-charcoal text-sm mb-2 block">תאריך משלוח</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full rounded-lg border border-gold/30 px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-bordeaux"
              />
            </div>
            <div>
              <label className="font-medium text-charcoal text-sm mb-2 block">שעת משלוח</label>
              <select
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full rounded-lg border border-gold/30 px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-bordeaux"
              >
                <option value="">בחרו שעה</option>
                <option value="9-13">09:00–13:00</option>
                <option value="13-17">13:00–17:00</option>
                <option value="17-20">17:00–20:00</option>
              </select>
            </div>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex flex-col gap-3 mt-9">
            <button
              onClick={handleAddToCart}
              className="w-full bg-bordeaux text-white py-4 rounded-full text-lg hover:bg-bordeaux-dark transition-colors"
            >
              {added ? "נוסף לסל ✓" : `הוסיפו לסל · ${total} ₪`}
            </button>
            <a
              href="https://wa.me/972000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center border border-bordeaux text-bordeaux py-3.5 rounded-full hover:bg-bordeaux hover:text-white transition-colors"
            >
              הזמנה בוואטסאפ
            </a>
          </div>
        </div>
      </div>

      {/* Mobile sticky order bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-cream border-t border-gold/20 p-3">
        <button
          onClick={handleAddToCart}
          className="w-full bg-bordeaux text-white py-3.5 rounded-full text-base hover:bg-bordeaux-dark transition-colors"
        >
          {added ? "נוסף לסל ✓" : `הוסיפו לסל · ${total} ₪`}
        </button>
      </div>
    </div>
  );
}

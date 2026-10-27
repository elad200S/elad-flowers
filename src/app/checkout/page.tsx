"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const paymentOptions = [
  { id: "bit", label: "ביט" },
  { id: "card", label: "אשראי" },
  { id: "apple", label: "Apple Pay" },
  { id: "google", label: "Google Pay" },
];

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [payment, setPayment] = useState("bit");
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-ink">ההזמנה התקבלה בהצלחה!</h1>
        <p className="text-ink/70 mt-4">
          נשלח לכם אישור בוואטסאפ ותמונה של הזר לפני המשלוח.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 bg-ink text-white px-8 py-3 hover:bg-ink/85 transition-colors"
        >
          חזרה לדף הבית
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-serif text-2xl text-ink">הסל שלך ריק</h1>
        <Link
          href="/"
          className="inline-block mt-6 bg-ink text-white px-8 py-3 hover:bg-ink/85 transition-colors"
        >
          לבחירת זר
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPlaced(true);
        }}
        className="space-y-10"
      >
        <section>
          <h2 className="font-serif text-xl text-ink mb-4">פרטי השולח/ת</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input required placeholder="שם מלא" className="input" />
            <input required type="tel" placeholder="טלפון" className="input" dir="ltr" />
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink mb-4">פרטי המקבל/ת</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input required placeholder="שם מלא" className="input" />
            <input required type="tel" placeholder="טלפון" className="input" dir="ltr" />
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink mb-4">כתובת למשלוח</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input required placeholder="עיר" className="input sm:col-span-1" />
            <input required placeholder="רחוב ומספר בית" className="input sm:col-span-1" />
            <input placeholder="קומה / דירה (לא חובה)" className="input sm:col-span-2" />
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink mb-4">תאריך משלוח</h2>
          <input required type="date" className="input sm:w-1/2" />
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink mb-4">ברכה לכרטיס</h2>
          <textarea placeholder="כתבו כאן את הברכה..." rows={3} className="input" />
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink mb-4">אמצעי תשלום</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {paymentOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPayment(opt.id)}
                className={`rounded-lg border px-3 py-3 text-sm transition-colors ${
                  payment === opt.id
                    ? "border-ink bg-ink/5 text-ink"
                    : "border-black/10 text-ink"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-ink text-white py-4 text-lg hover:bg-ink/85 transition-colors"
        >
          לתשלום · {subtotal} ₪
        </button>
      </form>

      {/* Order summary */}
      <aside className="bg-white/60 rounded-xl border border-black/10 p-6 h-fit">
        <h2 className="font-serif text-lg text-ink mb-4">סיכום הזמנה</h2>
        <ul className="space-y-4">
          {items.map((item) => {
            const addOnsTotal = item.addOns.reduce((s, a) => s + a.price, 0);
            const lineTotal = (item.basePrice + addOnsTotal) * item.quantity;
            return (
              <li key={item.id} className="flex gap-3">
                <div className="relative w-14 h-16 shrink-0 rounded-md overflow-hidden bg-neutral-100">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="text-ink font-medium">{item.title}</p>
                  <p className="text-ink/60">גודל: {item.sizeLabel} · כמות: {item.quantity}</p>
                </div>
                <span className="text-sm text-ink shrink-0">{lineTotal} ₪</span>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-black/10 mt-5 pt-4 flex justify-between font-medium text-ink">
          <span>סה&quot;כ לתשלום</span>
          <span>{subtotal} ₪</span>
        </div>
      </aside>
    </div>
  );
}

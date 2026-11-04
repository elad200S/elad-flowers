"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { deliveryZones, RUSH_DELIVERY_COST } from "@/lib/data";

const paymentOptions = [
  { id: "bit", label: "ביט" },
  { id: "card", label: "אשראי" },
  { id: "apple", label: "Apple Pay" },
  { id: "google", label: "Google Pay" },
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [payment, setPayment] = useState("bit");
  const [city, setCity] = useState(deliveryZones[0].city);
  const [rushDelivery, setRushDelivery] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const selectedZone = deliveryZones.find((z) => z.city === city) ?? deliveryZones[0];
  const total = subtotal + selectedZone.cost + (rushDelivery ? RUSH_DELIVERY_COST : 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: form.get("senderName"),
          senderPhone: form.get("senderPhone"),
          senderEmail: form.get("senderEmail"),
          recipientName: form.get("recipientName"),
          recipientPhone: form.get("recipientPhone"),
          city,
          street: form.get("street"),
          floor: form.get("floor"),
          deliveryDate: form.get("deliveryDate"),
          rushDelivery,
          cardMessage: form.get("cardMessage"),
          paymentMethod: paymentOptions.find((p) => p.id === payment)?.label ?? payment,
          items: items.map((item) => ({
            title: item.title,
            image: item.image,
            sizeLabel: item.sizeLabel,
            quantity: item.quantity,
            basePrice: item.basePrice,
            addOns: item.addOns.map((a) => ({ label: a.label, price: a.price })),
          })),
          deliveryCost: selectedZone.cost,
          total,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "שגיאה בשליחת ההזמנה, נסו שוב.");
        setSubmitting(false);
        return;
      }

      clearCart();
      setPlaced(true);
    } catch {
      setError("שגיאה בשליחת ההזמנה, נסו שוב.");
      setSubmitting(false);
    }
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-ink">ההזמנה התקבלה בהצלחה!</h1>
        <p className="text-ink/70 mt-4">
          שלחנו אישור למייל שלכם, ונשלח גם תמונה של הזר לפני המשלוח.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 rounded-lg bg-accent text-white px-8 py-3 hover:brightness-110 transition-all"
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
          className="inline-block mt-6 rounded-lg bg-accent text-white px-8 py-3 hover:brightness-110 transition-all"
        >
          לבחירת זר
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10">
      <form onSubmit={handleSubmit} className="space-y-10">
        <section>
          <h2 className="font-serif text-xl text-ink mb-4">פרטי השולח/ת</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="senderName" required placeholder="שם מלא" className="input" />
            <input name="senderPhone" required type="tel" placeholder="טלפון" className="input" dir="ltr" />
            <input
              name="senderEmail"
              required
              type="email"
              placeholder="אימייל (לקבלת אישור הזמנה)"
              className="input sm:col-span-2"
              dir="ltr"
            />
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink mb-4">פרטי המקבל/ת</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="recipientName" required placeholder="שם מלא" className="input" />
            <input name="recipientPhone" required type="tel" placeholder="טלפון" className="input" dir="ltr" />
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink mb-4">כתובת למשלוח</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select required value={city} onChange={(e) => setCity(e.target.value)} className="input sm:col-span-1">
              {deliveryZones.map((z) => (
                <option key={z.city} value={z.city}>
                  {z.city} ({z.costLabel})
                </option>
              ))}
            </select>
            <input name="street" required placeholder="רחוב ומספר בית" className="input sm:col-span-1" />
            <input name="floor" placeholder="קומה / דירה (לא חובה)" className="input sm:col-span-2" />
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink mb-4">תאריך משלוח</h2>
          <input
            name="deliveryDate"
            required
            type="date"
            min={today}
            lang="he"
            dir="rtl"
            className="input sm:w-1/2"
          />

          <label className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-black/15 px-4 py-3 cursor-pointer">
            <span className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={rushDelivery}
                onChange={(e) => setRushDelivery(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-ink">משלוח מהיר (תוך שעתיים, בכפוף לזמינות)</span>
            </span>
            <span className="text-sm text-ink/50">+{RUSH_DELIVERY_COST} ₪</span>
          </label>
        </section>

        <section>
          <h2 className="font-serif text-xl text-ink mb-4">ברכה לכרטיס</h2>
          <textarea name="cardMessage" placeholder="כתבו כאן את הברכה..." rows={3} className="input" />
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
                    ? "border-accent bg-accent-soft text-ink"
                    : "border-black/10 text-ink"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-accent text-white py-4 text-lg font-medium hover:brightness-110 transition-all disabled:opacity-50"
        >
          {submitting ? "שולח הזמנה..." : `לתשלום · ${total} ₪`}
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
        <div className="border-t border-black/10 mt-5 pt-4 space-y-2 text-sm text-ink/70">
          <div className="flex justify-between">
            <span>משלוח ({city})</span>
            <span>{selectedZone.cost > 0 ? `${selectedZone.cost} ₪` : "חינם"}</span>
          </div>
          {rushDelivery && (
            <div className="flex justify-between">
              <span>משלוח מהיר</span>
              <span>{RUSH_DELIVERY_COST} ₪</span>
            </div>
          )}
        </div>
        <div className="border-t border-black/10 mt-3 pt-4 flex justify-between font-medium text-ink">
          <span>סה&quot;כ לתשלום</span>
          <span>{total} ₪</span>
        </div>
      </aside>
    </div>
  );
}

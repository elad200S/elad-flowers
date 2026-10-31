import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/db";
import { toWhatsAppLink } from "@/lib/contact";
import FulfilledToggle from "./FulfilledToggle";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(Number(id));
  if (!order) notFound();

  const confirmationMessage = `היי ${order.recipient_name}! זר/מתנה מ${order.sender_name} בדרך אליך ב-${order.delivery_date}. אלעד פרחים 🌸`;
  const recipientWhatsApp = toWhatsAppLink(order.recipient_phone, confirmationMessage);
  const senderWhatsApp = toWhatsAppLink(order.sender_phone);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <Link href="/admin" className="text-sm text-ink/60 hover:text-ink">
        ← חזרה לרשימת ההזמנות
      </Link>

      <div className="flex items-center justify-between mt-4 mb-8">
        <h1 className="font-serif text-2xl text-ink">הזמנה #{order.id}</h1>
        <FulfilledToggle orderId={order.id} initialFulfilled={order.fulfilled} />
      </div>

      <div className="space-y-6 text-sm">
        <section>
          <p className="text-[11px] tracked-xs uppercase text-ink/50 mb-2">שולח/ת</p>
          <p className="text-ink">{order.sender_name} · {order.sender_phone}</p>
        </section>

        <section>
          <p className="text-[11px] tracked-xs uppercase text-ink/50 mb-2">מקבל/ת</p>
          <p className="text-ink">{order.recipient_name} · {order.recipient_phone}</p>
        </section>

        <section>
          <p className="text-[11px] tracked-xs uppercase text-ink/50 mb-2">כתובת משלוח</p>
          <p className="text-ink">
            {order.city}, {order.street}
            {order.floor ? `, ${order.floor}` : ""}
          </p>
        </section>

        <section>
          <p className="text-[11px] tracked-xs uppercase text-ink/50 mb-2">תאריך משלוח</p>
          <p className="text-ink">
            {order.delivery_date}
            {order.rush_delivery ? " · משלוח מהיר" : ""}
          </p>
        </section>

        {order.card_message && (
          <section>
            <p className="text-[11px] tracked-xs uppercase text-ink/50 mb-2">ברכה לכרטיס</p>
            <p className="text-ink">{order.card_message}</p>
          </section>
        )}

        <section>
          <p className="text-[11px] tracked-xs uppercase text-ink/50 mb-2">פריטים</p>
          <ul className="space-y-2">
            {order.items.map((item, i) => (
              <li key={i} className="text-ink">
                {item.title} · {item.sizeLabel} · כמות {item.quantity}
                {item.addOns.length > 0 && (
                  <span className="text-ink/60"> · תוספות: {item.addOns.map((a) => a.label).join(", ")}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="text-[11px] tracked-xs uppercase text-ink/50 mb-2">תשלום</p>
          <p className="text-ink">
            {order.payment_method} · משלוח {order.delivery_cost} ₪ · סה&quot;כ {order.total} ₪
          </p>
        </section>

        <div className="flex flex-wrap gap-3 pt-4">
          <a
            href={recipientWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-ink text-paper text-xs tracked-xs uppercase px-6 py-3 hover:bg-ink/85 transition-colors"
          >
            שלח אישור למקבל/ת בוואטסאפ
          </a>
          <a
            href={senderWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-ink text-ink text-xs tracked-xs uppercase px-6 py-3 hover:bg-ink hover:text-paper transition-colors"
          >
            פתח וואטסאפ עם השולח/ת
          </a>
        </div>
      </div>
    </div>
  );
}

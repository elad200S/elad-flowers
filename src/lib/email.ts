import { Resend } from "resend";
import type { Order } from "./db";
import { formatDate } from "./format";

export async function sendOrderNotificationEmail(order: Order) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.warn("RESEND_API_KEY or ORDER_NOTIFY_EMAIL not set — skipping order email");
    return;
  }

  const resend = new Resend(apiKey);
  const itemsHtml = order.items
    .map(
      (item) =>
        `<li>${item.title} · ${item.sizeLabel} · כמות ${item.quantity}${
          item.addOns.length ? ` · תוספות: ${item.addOns.map((a) => a.label).join(", ")}` : ""
        }</li>`,
    )
    .join("");

  await resend.emails.send({
    from: "הזמנות באתר <onboarding@resend.dev>",
    to,
    subject: `הזמנה חדשה מ-${order.sender_name} · ${order.total} ₪`,
    html: `
      <div dir="rtl" style="font-family: sans-serif;">
        <h2>הזמנה חדשה #${order.id}</h2>
        <p><strong>שולח/ת:</strong> ${order.sender_name} · ${order.sender_phone} · ${order.sender_email}</p>
        <p><strong>מקבל/ת:</strong> ${order.recipient_name} · ${order.recipient_phone}</p>
        <p><strong>כתובת:</strong> ${order.city}, ${order.street}${order.floor ? `, ${order.floor}` : ""}</p>
        <p><strong>תאריך משלוח:</strong> ${formatDate(order.delivery_date)}${order.rush_delivery ? " (משלוח מהיר)" : ""}</p>
        ${order.card_message ? `<p><strong>ברכה:</strong> ${order.card_message}</p>` : ""}
        <p><strong>פריטים:</strong></p>
        <ul>${itemsHtml}</ul>
        <p><strong>אמצעי תשלום:</strong> ${order.payment_method}</p>
        <p><strong>סה"כ:</strong> ${order.total} ₪</p>
      </div>
    `,
  });
}

export async function sendCustomerConfirmationEmail(order: Order) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !order.sender_email) {
    console.warn("RESEND_API_KEY or sender_email missing — skipping customer email");
    return;
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "פרחי ד' יתברך <onboarding@resend.dev>",
    to: order.sender_email,
    subject: "ההזמנה שלך התקבלה 🌸",
    html: `
      <div dir="rtl" style="font-family: sans-serif;">
        <h2>תודה, ${order.sender_name}!</h2>
        <p>ההזמנה שלך (#${order.id}) התקבלה בהצלחה ואנחנו כבר מתחילים לעבוד עליה.</p>
        <p>משלוח ל${order.recipient_name} בתאריך ${formatDate(order.delivery_date)}, ${order.city}.</p>
        <p>סה&quot;כ לתשלום: ${order.total} ₪</p>
        <p>נשלח לך עדכון נוסף עם תמונה של הזר לפני המשלוח.</p>
      </div>
    `,
  });
}

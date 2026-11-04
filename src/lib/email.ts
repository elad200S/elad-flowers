import { Resend } from "resend";
import type { Order, OrderItem } from "./db";
import { formatDate, formatDateTime } from "./format";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://elad-flowers.vercel.app";
const INK = "#121212";

function resolveImageUrl(image: string | undefined) {
  if (!image) return "";
  return image.startsWith("http") ? image : `${SITE_URL}${image}`;
}

function itemLineTotal(item: OrderItem) {
  const addOnsTotal = item.addOns.reduce((sum, a) => sum + a.price, 0);
  return (item.basePrice + addOnsTotal) * item.quantity;
}

function itemsHtml(items: OrderItem[]) {
  return items
    .map((item) => {
      const imageUrl = resolveImageUrl(item.image);
      const addOnsLine = item.addOns.length
        ? `<div style="color:#8a8a8a;font-size:12px;margin-top:4px;">תוספות: ${item.addOns.map((a) => a.label).join(", ")}</div>`
        : "";
      return `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #ececec;" valign="top">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                ${
                  imageUrl
                    ? `<td width="64" valign="top" style="padding-left:14px;">
                        <img src="${imageUrl}" width="64" height="64" alt="${item.title}" style="display:block;width:64px;height:64px;object-fit:cover;border-radius:6px;background:#f2f2f2;" />
                      </td>`
                    : ""
                }
                <td valign="top" style="font-family: Georgia, 'Times New Roman', serif; color:${INK};">
                  <div style="font-size:15px;">${item.title}</div>
                  <div style="color:#8a8a8a;font-size:12px;font-family: Arial, sans-serif;margin-top:2px;">${item.sizeLabel} · כמות ${item.quantity}</div>
                  ${addOnsLine}
                </td>
                <td align="left" valign="top" style="font-family: Arial, sans-serif;font-size:14px;color:${INK};white-space:nowrap;">
                  ${itemLineTotal(item)} ₪
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
    })
    .join("");
}

function emailShell(opts: { title: string; preheader: string; body: string }) {
  return `
    <div dir="rtl" style="font-family: Arial, sans-serif; background:#f7f6f4; padding:24px 12px;">
      <span style="display:none;max-height:0;overflow:hidden;">${opts.preheader}</span>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #ececec;">
        <tr>
          <td style="padding:28px 28px 20px;text-align:center;border-bottom:2px solid ${INK};">
            <div style="font-family: Georgia, 'Times New Roman', serif; font-size:22px; letter-spacing:0.03em; color:${INK};">
              🌸 פרחי ד' יתברך
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:28px;">
            ${opts.body}
          </td>
        </tr>
        <tr>
          <td style="padding:18px 28px;background:#fafafa;border-top:1px solid #ececec;text-align:center;">
            <div style="font-family: Arial, sans-serif;font-size:11px;color:#9a9a9a;">פרחי ד' יתברך · חולון</div>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export async function sendOrderNotificationEmail(order: Order) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.warn("RESEND_API_KEY or ORDER_NOTIFY_EMAIL not set — skipping order email");
    return;
  }

  const resend = new Resend(apiKey);

  const body = `
    <h2 style="font-family: Georgia, 'Times New Roman', serif;color:${INK};margin:0 0 4px;">הזמנה חדשה #${order.id}</h2>
    <div style="color:#8a8a8a;font-size:12px;margin-bottom:20px;">התקבלה ב-${formatDateTime(order.created_at)}</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;color:${INK};margin-bottom:16px;">
      <tr><td style="padding:3px 0;"><strong>שולח/ת:</strong></td><td align="left">${order.sender_name} · ${order.sender_phone}</td></tr>
      <tr><td style="padding:3px 0;"><strong>אימייל:</strong></td><td align="left">${order.sender_email}</td></tr>
      <tr><td style="padding:3px 0;"><strong>מקבל/ת:</strong></td><td align="left">${order.recipient_name} · ${order.recipient_phone}</td></tr>
      <tr><td style="padding:3px 0;"><strong>כתובת:</strong></td><td align="left">${order.city}, ${order.street}${order.floor ? `, ${order.floor}` : ""}</td></tr>
      <tr><td style="padding:3px 0;"><strong>תאריך משלוח:</strong></td><td align="left">${formatDate(order.delivery_date)}${order.rush_delivery ? " (מהיר)" : ""}</td></tr>
      ${order.card_message ? `<tr><td style="padding:3px 0;"><strong>ברכה:</strong></td><td align="left">${order.card_message}</td></tr>` : ""}
      <tr><td style="padding:3px 0;"><strong>תשלום:</strong></td><td align="left">${order.payment_method}</td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ececec;">
      ${itemsHtml(order.items)}
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;font-size:15px;color:${INK};">
      <tr><td><strong>סה&quot;כ</strong></td><td align="left"><strong>${order.total} ₪</strong></td></tr>
    </table>
  `;

  await resend.emails.send({
    from: "הזמנות באתר <onboarding@resend.dev>",
    to,
    subject: `הזמנה חדשה מ-${order.sender_name} · ${order.total} ₪`,
    html: emailShell({
      title: `הזמנה חדשה #${order.id}`,
      preheader: `הזמנה חדשה מ-${order.sender_name}, סה"כ ${order.total} ₪`,
      body,
    }),
  });
}

export async function sendCustomerConfirmationEmail(order: Order) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !order.sender_email) {
    console.warn("RESEND_API_KEY or sender_email missing — skipping customer email");
    return;
  }

  const resend = new Resend(apiKey);

  const body = `
    <h2 style="font-family: Georgia, 'Times New Roman', serif;color:${INK};margin:0 0 10px;">תודה, ${order.sender_name}!</h2>
    <p style="font-size:14px;color:${INK};line-height:1.6;margin:0 0 20px;">
      ההזמנה שלך (#${order.id}) התקבלה בהצלחה ואנחנו כבר מתחילים לעבוד עליה.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border:1px solid #ececec;margin-bottom:20px;">
      <tr>
        <td style="padding:14px 16px;font-size:13px;color:${INK};">
          <strong>משלוח ל${order.recipient_name}</strong><br/>
          ${order.city}, ${order.street}${order.floor ? `, ${order.floor}` : ""}<br/>
          <strong>תאריך:</strong> ${formatDate(order.delivery_date)}${order.rush_delivery ? " (משלוח מהיר)" : ""}
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ececec;">
      ${itemsHtml(order.items)}
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;font-size:15px;color:${INK};">
      <tr><td><strong>סה&quot;כ לתשלום</strong></td><td align="left"><strong>${order.total} ₪</strong></td></tr>
    </table>

    <p style="font-size:12px;color:#8a8a8a;margin-top:22px;line-height:1.6;">
      נשלח לך עדכון נוסף עם תמונה של הזר לפני המשלוח.<br/>
      ההזמנה בוצעה ב-${formatDateTime(order.created_at)}.
    </p>
  `;

  await resend.emails.send({
    from: "פרחי ד' יתברך <onboarding@resend.dev>",
    to: order.sender_email,
    subject: "ההזמנה שלך התקבלה 🌸",
    html: emailShell({
      title: "ההזמנה שלך התקבלה",
      preheader: `תודה ${order.sender_name}, ההזמנה שלך (#${order.id}) התקבלה בהצלחה`,
      body,
    }),
  });
}

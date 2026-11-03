import { NextResponse } from "next/server";
import { createOrder, type OrderItem } from "@/lib/db";
import { sendCustomerConfirmationEmail, sendOrderNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();

  const {
    senderName,
    senderPhone,
    senderEmail,
    recipientName,
    recipientPhone,
    city,
    street,
    floor,
    deliveryDate,
    rushDelivery,
    cardMessage,
    paymentMethod,
    items,
    deliveryCost,
    total,
  } = body ?? {};

  if (
    !senderName ||
    !senderPhone ||
    !senderEmail ||
    !recipientName ||
    !recipientPhone ||
    !city ||
    !street ||
    !deliveryDate ||
    !paymentMethod ||
    !Array.isArray(items) ||
    items.length === 0 ||
    typeof total !== "number"
  ) {
    return NextResponse.json({ error: "חסרים פרטים בהזמנה" }, { status: 400 });
  }

  try {
    const order = await createOrder({
      senderName,
      senderPhone,
      senderEmail,
      recipientName,
      recipientPhone,
      city,
      street,
      floor: floor ?? "",
      deliveryDate,
      rushDelivery: Boolean(rushDelivery),
      cardMessage: cardMessage ?? "",
      paymentMethod,
      items: items as OrderItem[],
      deliveryCost: Number(deliveryCost) || 0,
      total,
    });

    try {
      await sendOrderNotificationEmail(order);
    } catch (emailError) {
      console.error("Failed to send order notification email", emailError);
    }

    try {
      await sendCustomerConfirmationEmail(order);
    } catch (emailError) {
      console.error("Failed to send customer confirmation email", emailError);
    }

    return NextResponse.json({ id: order.id });
  } catch (error) {
    console.error("Failed to create order", error);
    return NextResponse.json({ error: "שגיאה בשמירת ההזמנה" }, { status: 500 });
  }
}

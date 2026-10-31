import { NextResponse } from "next/server";
import { setOrderFulfilled } from "@/lib/db";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { fulfilled } = await request.json().catch(() => ({ fulfilled: true }));

  try {
    await setOrderFulfilled(Number(id), Boolean(fulfilled));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to update order status", error);
    return NextResponse.json({ error: "שגיאה בעדכון ההזמנה" }, { status: 500 });
  }
}

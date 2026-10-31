import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({}));

  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminPassword || !sessionSecret) {
    return NextResponse.json({ error: "הפאנל עדיין לא הוגדר בשרת" }, { status: 500 });
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: "סיסמה שגויה" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", sessionSecret, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}

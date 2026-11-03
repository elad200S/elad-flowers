import Link from "next/link";
import { listOrders } from "@/lib/db";
import { formatDate } from "@/lib/format";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  let orders: Awaited<ReturnType<typeof listOrders>> = [];
  let dbError = false;

  try {
    orders = await listOrders();
  } catch {
    dbError = true;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl text-ink">ניהול הזמנות</h1>
        <LogoutButton />
      </div>

      {dbError && (
        <p className="text-sm text-red-600 mb-6">
          לא הצלחתי להתחבר למסד הנתונים. ודאו שמשתנה הסביבה DATABASE_URL מוגדר.
        </p>
      )}

      {!dbError && orders.length === 0 && <p className="text-ink/60 text-sm">עדיין אין הזמנות.</p>}

      {orders.length > 0 && (
        <div className="overflow-x-auto border border-black/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black/[0.03] text-ink/60">
                <th className="text-right font-normal py-2.5 px-3">#</th>
                <th className="text-right font-normal py-2.5 px-3">תאריך הזמנה</th>
                <th className="text-right font-normal py-2.5 px-3">שולח/ת</th>
                <th className="text-right font-normal py-2.5 px-3">עיר</th>
                <th className="text-right font-normal py-2.5 px-3">תאריך משלוח</th>
                <th className="text-right font-normal py-2.5 px-3">סה&quot;כ</th>
                <th className="text-right font-normal py-2.5 px-3">סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-black/10 hover:bg-black/[0.02]">
                  <td className="py-2.5 px-3">
                    <Link href={`/admin/orders/${order.id}`} className="text-ink hover:underline">
                      {order.id}
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 text-ink/70">{formatDate(order.created_at)}</td>
                  <td className="py-2.5 px-3 text-ink">{order.sender_name}</td>
                  <td className="py-2.5 px-3 text-ink/70">{order.city}</td>
                  <td className="py-2.5 px-3 text-ink/70">{formatDate(order.delivery_date)}</td>
                  <td className="py-2.5 px-3 text-ink">{order.total} ₪</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`text-[11px] tracked-xs uppercase px-2 py-1 ${
                        order.fulfilled ? "bg-black/5 text-ink/60" : "bg-ink text-paper"
                      }`}
                    >
                      {order.fulfilled ? "בוצע" : "חדש"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

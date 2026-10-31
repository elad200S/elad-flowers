import PolicyPage from "@/components/layout/PolicyPage";
import { deliveryZones } from "@/lib/data";

export default function DeliveryPage() {
  return (
    <PolicyPage title="מידע על משלוחים">
      <p>
        אנו שולחים זרים ומתנות עם שליחים אישיים, בעטיפה מוקפדת, ישירות לבית או למשרד של מי שאתם
        הכי אוהבים.
      </p>

      <section>
        <h2 className="font-serif text-lg text-ink mb-3">אזורי חלוקה ועלויות</h2>
        <div className="overflow-hidden border border-black/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black/[0.03] text-ink/60">
                <th className="text-right font-normal py-2.5 px-3">אזור</th>
                <th className="text-right font-normal py-2.5 px-3">עלות משלוח</th>
                <th className="text-right font-normal py-2.5 px-3">זמן אספקה</th>
              </tr>
            </thead>
            <tbody>
              {deliveryZones.map((z) => (
                <tr key={z.city} className="border-t border-black/10">
                  <td className="py-2.5 px-3 text-ink">{z.city}</td>
                  <td className="py-2.5 px-3">{z.costLabel}</td>
                  <td className="py-2.5 px-3">{z.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink mb-2">משלוח באותו היום</h2>
        <p>הזמנות שמתקבלות עד השעה 14:00 יוצאות לשליחות באותו היום, בכפוף לאזור החלוקה.</p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink mb-2">צילום הזר לפני משלוח</h2>
        <p>לכל הזמנה נשלח צילום של הזר המוכן לפני יציאתו לדרך, כדי שתוכלו לוודא שהכול מושלם.</p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink mb-2">אזור לא ברשימה?</h2>
        <p>צרו איתנו קשר ונבדוק עבורכם אפשרות משלוח גם מחוץ לאזורים המפורטים.</p>
      </section>
    </PolicyPage>
  );
}

import PolicyPage from "@/components/layout/PolicyPage";
import { WHATSAPP_URL } from "@/lib/contact";

export default function CancellationsPage() {
  return (
    <PolicyPage title="ביטולים והחזרות">
      <p>
        מאחר שמדובר במוצרים פריכים (פרחים טריים), מדיניות הביטולים וההחזרות שלנו מותאמת לאופי
        המוצר, בהתאם לחוק הגנת הצרכן.
      </p>
      <section>
        <h2 className="font-serif text-lg text-ink mb-2">ביטול הזמנה</h2>
        <p>
          ניתן לבטל או לשנות הזמנה ללא עלות עד 24 שעות לפני מועד המשלוח המתוכנן. ביטול בסמוך
          למועד המשלוח או לאחר יציאת הזר לשילוח לא יזוכה במלואו, מאחר שהפרחים כבר נרכשו ועוצבו
          במיוחד עבור ההזמנה.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink mb-2">בעיה עם ההזמנה</h2>
        <p>
          אם הזר הגיע פגום, לא תואם את ההזמנה, או שיש בעיה אחרת — נא לפנות אלינו תוך 24 שעות
          מקבלת המשלוח עם תמונה, ונטפל בכך בהקדם (החלפה או זיכוי, לפי העניין).
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink mb-2">איך פונים</h2>
        <p>
          הדרך המהירה ביותר לבטל, לשנות או לדווח על בעיה היא{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
            בוואטסאפ
          </a>
          .
        </p>
      </section>
    </PolicyPage>
  );
}

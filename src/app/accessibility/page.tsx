import PolicyPage from "@/components/layout/PolicyPage";
import { CONTACT_EMAIL, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

const STATEMENT_DATE = "05/11/2026";

export default function AccessibilityPage() {
  return (
    <PolicyPage title="הצהרת נגישות">
      <p>
        עסקנו רואה חשיבות רבה במתן שירות שוויוני ונגיש לכלל הציבור, לרבות אנשים עם מוגבלות, ופועל
        להנגשת האתר מתוך כוונה לעמוד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות
        לשירות), התשע״ג-2013, ובהתבסס על תקן ישראלי ת״י 5568 ברמת AA (המבוסס על WCAG 2.0).
      </p>
      <section>
        <h2 className="font-serif text-lg text-ink mb-2">פעולות שננקטו</h2>
        <p>
          האתר נבנה תוך התחשבות בעקרונות נגישות: מבנה סמנטי וכותרות ברור, ניגודיות צבעים, תיאורי
          alt לתמונות, תמיכה בניווט מקלדת, ותפריט נגישות צף (בפינת המסך) המאפשר הגדלת טקסט, הפעלת
          ניגודיות גבוהה, הדגשת קישורים, מעבר לפונט קריא, ועצירת אנימציות ותנועה.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink mb-2">מידה של התאמה</h2>
        <p>
          האתר עדיין בתהליך שיפור מתמשך של הנגישות, וייתכנו חלקים שטרם הונגשו באופן מלא. אנו
          פועלים לאתר ולתקן ליקויים באופן שוטף.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink mb-2">רכז נגישות ופניות</h2>
        <p>
          לפניות, בקשות סיוע או דיווח על בעיית נגישות באתר, ניתן לפנות אלינו:
        </p>
        <ul className="list-none space-y-1 mt-2">
          <li>טלפון: <span dir="ltr">{PHONE_DISPLAY}</span></li>
          <li>דוא&quot;ל: <span dir="ltr">{CONTACT_EMAIL}</span></li>
          <li>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
              וואטסאפ
            </a>
          </li>
        </ul>
      </section>
      <p className="text-xs text-ink/50">עודכן לאחרונה: {STATEMENT_DATE}</p>
    </PolicyPage>
  );
}

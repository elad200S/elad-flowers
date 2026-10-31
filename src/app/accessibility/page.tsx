import PolicyPage from "@/components/layout/PolicyPage";
import { WHATSAPP_URL } from "@/lib/contact";

export default function AccessibilityPage() {
  return (
    <PolicyPage title="הצהרת נגישות">
      <p>
        עסקנו רואה חשיבות רבה במתן שירות שוויוני ונגיש לכלל הציבור, לרבות אנשים עם מוגבלות,
        ופועל להנגשת האתר בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות.
      </p>
      <section>
        <h2 className="font-serif text-lg text-ink mb-2">פעולות שננקטו</h2>
        <p>
          האתר נבנה תוך התחשבות בעקרונות נגישות בסיסיים: ניגודיות צבעים, מבנה כותרות ברור, תמיכה
          בניווט מקלדת ותיאורי תמונות (alt text).
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink mb-2">נתקלתם בבעיה?</h2>
        <p>
          אנו ממשיכים לעבוד על שיפור הנגישות באתר. אם נתקלתם בתקלה או קושי בגלישה, נשמח שתדווחו
          לנו{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
            בוואטסאפ
          </a>{" "}
          ונטפל בכך בהקדם האפשרי.
        </p>
      </section>
    </PolicyPage>
  );
}

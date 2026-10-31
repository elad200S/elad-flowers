import PolicyPage from "@/components/layout/PolicyPage";

export default function PrivacyPage() {
  return (
    <PolicyPage title="מדיניות פרטיות">
      <p>
        אנו ב&quot;אלעד פרחים&quot; מכבדים את פרטיותכם. מסמך זה מפרט כיצד אנו אוספים, שומרים
        ומשתמשים במידע הנמסר באתר.
      </p>
      <section>
        <h2 className="font-serif text-lg text-ink mb-2">איזה מידע נאסף</h2>
        <p>
          בעת ביצוע הזמנה נאסוף פרטים כגון שם, טלפון, כתובת למשלוח ואמצעי תשלום, לצורך השלמת
          ההזמנה ומשלוחה בלבד.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink mb-2">שימוש במידע</h2>
        <p>
          המידע משמש לטיפול בהזמנה, יצירת קשר בנוגע למשלוח, ושיפור השירות. לא נעביר את פרטיכם
          לצד שלישי למטרות שיווקיות ללא הסכמתכם.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink mb-2">אבטחת מידע</h2>
        <p>
          אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע הנמסר באתר, לרבות בתהליך התשלום.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink mb-2">פנייה אלינו</h2>
        <p>לשאלות בנוגע למדיניות הפרטיות ניתן לפנות אלינו דרך עמוד יצירת הקשר.</p>
      </section>
    </PolicyPage>
  );
}

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { CONTACT_EMAIL, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/contact";
import Logo from "./Logo";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-paper text-ink border-t border-black/10">
      <div className="mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <div className="mb-4">
            <Logo iconSize={44} textClassName="font-serif text-xl text-accent whitespace-nowrap" />
          </div>
          <p className="text-sm leading-6 text-ink/60">
            זרים בעיצוב אישי עם משלוח עד הבית בחולון והסביבה.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="אינסטגרם" className="text-ink/70 hover:text-ink transition-colors">
              <InstagramIcon />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="וואטסאפ" className="text-ink/70 hover:text-ink transition-colors">
              <MessageCircle size={18} strokeWidth={1.4} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-[11px] tracked-xs uppercase text-ink/50 mb-4">אזורי משלוח</p>
          <ul className="space-y-2 text-sm text-ink/70">
            <li>חולון</li>
            <li>בת ים</li>
            <li>ראשון לציון</li>
            <li>תל אביב (בתוספת תשלום)</li>
          </ul>
          <Link href="/delivery" className="inline-block mt-4 text-[11px] tracked-xs uppercase text-ink/70 hover:text-ink transition-colors border-b border-ink/30">
            מידע מלא על משלוחים
          </Link>
        </div>

        <div>
          <p className="text-[11px] tracked-xs uppercase text-ink/50 mb-4">שעות פעילות</p>
          <ul className="space-y-2 text-sm text-ink/70">
            <li>א׳-ה׳: 09:00–20:00</li>
            <li>ו׳: 09:00–14:00</li>
            <li>שבת: סגור</li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracked-xs uppercase text-ink/50 mb-4">צור קשר</p>
          <ul className="space-y-2 text-sm text-ink/70">
            <li>רחוב סוקולוב 20, חולון</li>
            <li dir="ltr" className="text-right">{PHONE_DISPLAY}</li>
            <li dir="ltr">{CONTACT_EMAIL}</li>
          </ul>
          <p className="text-[11px] tracked-xs uppercase text-ink/50 mt-6 mb-2">אמצעי תשלום</p>
          <p className="text-sm text-ink/70">ביט · אשראי · Apple Pay · Google Pay</p>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="text-[11px] tracked-xs uppercase text-ink/50 mb-4">חיפושים פופולריים</p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-ink/50">
            <Link href="/shop/bouquet" className="hover:text-ink transition-colors">זר לכלה בחולון</Link>
            <Link href="/shop/bouquet" className="hover:text-ink transition-colors">זר פרחים לשישי בחולון</Link>
            <Link href="/delivery" className="hover:text-ink transition-colors">משלוח פרחים לבת ים</Link>
            <Link href="/category/roses" className="hover:text-ink transition-colors">זר ורדים בראשון לציון</Link>
            <Link href="/shop/bouquet" className="hover:text-ink transition-colors">זר פרחים לתל אביב</Link>
            <Link href="/shop/arrangement" className="hover:text-ink transition-colors">סידור פרחים לבת ים</Link>
            <Link href="/shop/balloon" className="hover:text-ink transition-colors">בלונים ליום הולדת בחולון</Link>
            <Link href="/shop/chocolate-wine" className="hover:text-ink transition-colors">מארז פרחים ושוקולד בחולון</Link>
            <Link href="/shop/plant" className="hover:text-ink transition-colors">עציצים ליום הולדת בראשון לציון</Link>
            <Link href="/shop/bouquet" className="hover:text-ink transition-colors">זר לרכב חתן וכלה בחולון</Link>
            <Link href="/event/birthday" className="hover:text-ink transition-colors">זר ליום הולדת בחולון</Link>
            <Link href="/event/anniversary" className="hover:text-ink transition-colors">זר ליום נישואין בבת ים</Link>
            <Link href="/event/love" className="hover:text-ink transition-colors">זר אהבה ורומנטיקה בחולון</Link>
            <Link href="/event/birth" className="hover:text-ink transition-colors">זר לברית ולידה בראשון לציון</Link>
            <Link href="/event/thanks" className="hover:text-ink transition-colors">זר תודה לקולגה בתל אביב</Link>
            <Link href="/event/holidays" className="hover:text-ink transition-colors">זר לחג בחולון</Link>
            <Link href="/delivery" className="hover:text-ink transition-colors">משלוח פרחים מהיר בחולון</Link>
            <Link href="/delivery" className="hover:text-ink transition-colors">משלוח פרחים באותו היום בחולון</Link>
            <Link href="/shop" className="hover:text-ink transition-colors">חנות פרחים בחולון</Link>
            <Link href="/shop?price=under-100" className="hover:text-ink transition-colors">זר פרחים זול בחולון</Link>
            <Link href="/category/roses" className="hover:text-ink transition-colors">ורדים במחיר משתלם בחולון</Link>
            <Link href="/shop/giftset" className="hover:text-ink transition-colors">מארז מתנה לעובדים בתל אביב</Link>
            <Link href="/shop/bouquet" className="hover:text-ink transition-colors">זר פרחים למשרד בראשון לציון</Link>
            <Link href="/shop" className="hover:text-ink transition-colors">פרחים לבת מצווה בחולון</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink/40">
          <p>© 2026 פרחי ד&apos; יתברך. כל הזכויות שמורות.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/terms" className="hover:text-ink transition-colors">תקנון</Link>
            <Link href="/privacy" className="hover:text-ink transition-colors">פרטיות</Link>
            <Link href="/cancellations" className="hover:text-ink transition-colors">ביטולים והחזרות</Link>
            <Link href="/accessibility" className="hover:text-ink transition-colors">נגישות</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

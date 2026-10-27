import Link from "next/link";
import { MessageCircle } from "lucide-react";

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
          <p className="font-serif text-2xl mb-4">אלעד פרחים</p>
          <p className="text-sm leading-6 text-ink/60">
            זרים בעיצוב אישי עם משלוח עד הבית בחולון והסביבה.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="אינסטגרם" className="text-ink/70 hover:text-ink transition-colors">
              <InstagramIcon />
            </a>
            <a href="https://wa.me/972000000000" target="_blank" rel="noopener noreferrer" aria-label="וואטסאפ" className="text-ink/70 hover:text-ink transition-colors">
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
            <li dir="ltr" className="text-right">03-0000000</li>
            <li>info@eladflowers.co.il</li>
          </ul>
          <p className="text-[11px] tracked-xs uppercase text-ink/50 mt-6 mb-2">אמצעי תשלום</p>
          <p className="text-sm text-ink/70">ביט · אשראי · Apple Pay · Google Pay</p>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink/40">
          <p>© 2026 אלעד פרחים. כל הזכויות שמורות.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-ink transition-colors">תנאי שימוש</Link>
            <Link href="/privacy" className="hover:text-ink transition-colors">פרטיות</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

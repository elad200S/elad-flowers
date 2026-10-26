import Link from "next/link";
import { MessageCircle } from "lucide-react";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bordeaux text-powder">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <p className="font-serif text-2xl text-white mb-4">אלעד פרחים</p>
          <p className="text-sm leading-6 text-powder/90">
            זרים בעיצוב אישי עם משלוח עד הבית בחולון והסביבה.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="אינסטגרם" className="text-white hover:text-gold transition-colors">
              <InstagramIcon />
            </a>
            <a href="https://wa.me/972000000000" target="_blank" rel="noopener noreferrer" aria-label="וואטסאפ" className="text-white hover:text-gold transition-colors">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-white font-medium mb-4">אזורי משלוח</p>
          <ul className="space-y-2 text-sm text-powder/90">
            <li>חולון</li>
            <li>בת ים</li>
            <li>ראשון לציון</li>
            <li>תל אביב (בתוספת תשלום)</li>
          </ul>
        </div>

        <div>
          <p className="text-white font-medium mb-4">שעות פעילות</p>
          <ul className="space-y-2 text-sm text-powder/90">
            <li>א׳-ה׳: 09:00–20:00</li>
            <li>ו׳: 09:00–14:00</li>
            <li>שבת: סגור</li>
          </ul>
        </div>

        <div>
          <p className="text-white font-medium mb-4">צור קשר</p>
          <ul className="space-y-2 text-sm text-powder/90">
            <li>רחוב סוקולוב 20, חולון</li>
            <li dir="ltr" className="text-right">03-0000000</li>
            <li>info@eladflowers.co.il</li>
          </ul>
          <p className="text-white font-medium mt-6 mb-2">אמצעי תשלום</p>
          <p className="text-sm text-powder/90">ביט • אשראי • Apple Pay • Google Pay</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-powder/70">
          <p>© {new Date().getFullYear()} אלעד פרחים. כל הזכויות שמורות.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-white transition-colors">תנאי שימוש</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">פרטיות</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-6">צור קשר</h1>
      <div className="hidden w-16 mx-auto mb-8" />
      <ul className="space-y-3 text-ink/80">
        <li>רחוב סוקולוב 20, חולון</li>
        <li dir="ltr">{PHONE_DISPLAY}</li>
        <li>info@eladflowers.co.il</li>
      </ul>

      <div className="mt-8">
        <p className="text-[11px] tracking-wide uppercase text-ink/50 mb-3">שעות פעילות</p>
        <ul className="space-y-1 text-ink/80 text-sm">
          <li>א׳-ה׳: 09:00–20:00</li>
          <li>ו׳: 09:00–14:00</li>
          <li>שבת: סגור</li>
        </ul>
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-8 bg-ink text-white px-8 py-3 hover:bg-ink/85 transition-colors"
      >
        שלחו לנו הודעה בוואטסאפ
      </a>
    </div>
  );
}

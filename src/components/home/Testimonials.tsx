import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-10 px-4">
        <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">מה הלקוחות שלנו אומרים</h2>
        <div className="gold-line w-16 mx-auto mt-4" />
      </div>

      <div className="flex gap-5 overflow-x-auto no-scrollbar px-4 sm:px-6 snap-x snap-mandatory">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="snap-start shrink-0 w-[85%] sm:w-[55%] md:w-[32%] bg-white/60 rounded-xl p-7 border border-gold/15"
          >
            <div className="flex gap-1 text-gold mb-4">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={16} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="text-charcoal/80 leading-7 text-sm">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-5 text-sm font-medium text-bordeaux">
              {t.name} · {t.city}
            </p>
            <p className="text-xs text-charcoal/50 mt-1">{t.bouquet}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

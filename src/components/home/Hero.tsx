"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

const slides = [
  {
    image: "/hero/rotator/mid-pink.png",
    alt: "זר פרחים מעוצב",
    eyebrow: "משלוח עד הבית · באותו היום",
    title: "זרים בעיצוב אישי\nלכל אירוע ורגע",
    text: "פרחים טריים, עיצוב בוטיק ושירות אישי — פרחי ד׳ יתברך, חולון והסביבה.",
    cta: { label: "לקטלוג המוצרים", href: "/shop" },
  },
  {
    image: "/products/luxury-red-pink-roses.jpeg",
    alt: "זר ורדים אדומים וורודים",
    eyebrow: "טרי כל יום",
    title: "משלוח באותו היום\nבחולון והסביבה",
    text: "הזמינו עד השעה 14:00 ונדאג שהזר יגיע טרי ומושלם עוד היום.",
    cta: { label: "להזמנה", href: "/delivery" },
  },
  {
    image: "/products/gift-set-plant-wine-chocolate.jpeg",
    alt: "מארז מתנה עם צמח, יין ושוקולד",
    eyebrow: "לא רק פרחים",
    title: "מארזי מתנה\nלכל אירוע",
    text: "שוקולד, יין, עציצים ובלונים — נבנה בשבילכם מארז שמתאים בדיוק למקבל/ת המתנה.",
    cta: { label: "לכל המוצרים", href: "/shop/giftset" },
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative w-full">
      <div className="relative h-[52vh] md:h-[68vh] w-full overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={s.image}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <Image
              src={s.image}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/15 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-md text-white">
            <p className="text-[12px] tracked-xs uppercase text-white/80 mb-3">{slide.eyebrow}</p>
            <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-4 whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="text-sm text-white/85 mb-7 leading-7">{slide.text}</p>
            <Link
              href={slide.cta.href}
              className="inline-block bg-accent text-white text-sm font-medium px-8 py-3.5 rounded-lg hover:brightness-110 transition-all"
            >
              {slide.cta.label}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              aria-label={`שקופית ${i + 1}`}
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 22 : 8,
                backgroundColor: "white",
                opacity: i === index ? 1 : 0.5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex justify-center -mt-6 px-4">
        <Link
          href="/shop"
          className="flex items-center gap-2 bg-accent text-white text-sm px-6 py-3 rounded-full shadow-lg hover:brightness-110 transition-all"
        >
          <CalendarDays size={16} />
          בחרו תאריך ואזור למשלוח
        </Link>
      </div>
    </section>
  );
}

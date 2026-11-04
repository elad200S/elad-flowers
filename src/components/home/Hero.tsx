import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full">
      <div className="relative h-[52vh] md:h-[68vh] w-full overflow-hidden">
        <Image
          src="/hero/rotator/mid-pink.png"
          alt="זר פרחים מעוצב"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/15 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-md text-white">
            <p className="text-[12px] tracked-xs uppercase text-white/80 mb-3">
              משלוח עד הבית · באותו היום
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-4">
              זרים בעיצוב אישי
              <br />
              לכל אירוע ורגע
            </h1>
            <p className="text-sm text-white/85 mb-7 leading-7">
              פרחים טריים, עיצוב בוטיק ושירות אישי — פרחי ד&apos; יתברך, חולון והסביבה.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-accent text-white text-sm font-medium px-8 py-3.5 rounded-lg hover:brightness-110 transition-all"
            >
              לקטלוג המוצרים
            </Link>
          </div>
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

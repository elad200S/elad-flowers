"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { heroBeats, useHeroTheme } from "@/context/HeroThemeContext";

const EASE = [0.16, 1, 0.3, 1] as const;

// Each position keeps its own subject and never swaps place with another
// position — only the color/beat cycles, independently per position.
const leftSequence = [
  { src: "/hero/rotator/left-green.png", alt: "תקריב פרח ירוק" },
  { src: "/hero/rotator/left-blue.png", alt: "תקריב פרח כחול" },
  { src: "/hero/rotator/left-pink.jpg", alt: "תקריב פרח ורוד" },
];

const midSequence = [
  { src: "/hero/rotator/mid-pink.png", alt: "דוגמנית בחליפה ורודה אוחזת תיק זרים" },
  { src: "/hero/rotator/mid-green.png", alt: "דוגמנית בחליפה ירוקה אוחזת תיק זרים" },
  { src: "/hero/rotator/mid-blue.jpg", alt: "דוגמנית בחליפה כחולה אוחזת תיק זרים" },
];

const rightSequence = [
  { src: "/hero/rotator/right-blue.png", alt: "זר כחול באגרטל" },
  { src: "/hero/rotator/right-pink.png", alt: "זר ורוד באגרטל" },
  { src: "/hero/rotator/right-green.jpg", alt: "זר ירוק באגרטל" },
];

function Panel({ src, alt, from }: { src: string; alt: string; from: "top" | "bottom" }) {
  const y = from === "top" ? -40 : 40;
  return (
    <motion.div
      key={src}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -y }}
      transition={{ duration: 0.8, ease: EASE }}
      className="absolute inset-0"
    >
      <Image src={src} alt={alt} fill sizes="34vw" priority className="object-cover" />
    </motion.div>
  );
}

export default function Hero() {
  const { index, setIndex, accent } = useHeroTheme();
  const left = leftSequence[index];
  const mid = midSequence[index];
  const right = rightSequence[index];

  return (
    <section className="relative w-full">
      <div className="grid grid-cols-3 h-[62vh] md:h-[88vh]">
        <div className="relative h-full overflow-hidden">
          <AnimatePresence initial={false}>
            <Panel key={left.src} src={left.src} alt={left.alt} from="top" />
          </AnimatePresence>
        </div>
        <div className="relative h-full overflow-hidden">
          <AnimatePresence initial={false}>
            <Panel key={mid.src} src={mid.src} alt={mid.alt} from="bottom" />
          </AnimatePresence>
        </div>
        <div className="relative h-full overflow-hidden">
          <AnimatePresence initial={false}>
            <Panel key={right.src} src={right.src} alt={right.alt} from="top" />
          </AnimatePresence>
        </div>
      </div>

      <h1
        className="pointer-events-none absolute top-[10%] md:top-[14%] inset-x-0 text-center font-serif text-white leading-none px-2
          text-[13vw] md:text-[7.5vw]"
        style={{ textShadow: "0 2px 30px rgba(0,0,0,0.45), 0 2px 70px rgba(0,0,0,0.3)" }}
      >
        אלעד פרחים
      </h1>

      <motion.div
        animate={{ backgroundColor: accent, boxShadow: `0 0 28px ${accent}80` }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute bottom-6 right-6 md:bottom-10 md:right-10"
      >
        <Link href="/shop" className="block text-ink text-xs tracked-xs uppercase px-7 py-3.5">
          לקטלוג
        </Link>
      </motion.div>

      {/* Manual beat selector */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {Array.from({ length: heroBeats }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`ערכה ${i + 1}`}
            onClick={() => setIndex(i)}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{
              backgroundColor: "white",
              opacity: i === index ? 1 : 0.4,
              transform: i === index ? "scale(1.6)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

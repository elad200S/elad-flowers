"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { heroThemes, useHeroTheme } from "@/context/HeroThemeContext";

const EASE = [0.16, 1, 0.3, 1] as const;

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
  const { theme, index, setIndex } = useHeroTheme();

  return (
    <section className="relative w-full">
      <div className="grid grid-cols-3 h-[62vh] md:h-[88vh]">
        <div className="relative h-full overflow-hidden">
          <AnimatePresence initial={false}>
            <Panel key={theme.key} src={theme.panels.left} alt="דוגמנית אוחזת תיק זרים" from="top" />
          </AnimatePresence>
        </div>
        <div className="relative h-full overflow-hidden">
          <AnimatePresence initial={false}>
            <Panel key={theme.key} src={theme.panels.mid} alt="זר פרחים" from="bottom" />
          </AnimatePresence>
        </div>
        <div className="relative h-full overflow-hidden">
          <AnimatePresence initial={false}>
            <Panel key={theme.key} src={theme.panels.right} alt="תקריב על עלי כותרת" from="top" />
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
        animate={{ backgroundColor: theme.accent, boxShadow: `0 0 28px ${theme.accent}80` }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute bottom-6 right-6 md:bottom-10 md:right-10"
      >
        <Link
          href="/category/bouquets"
          className="block text-ink text-xs tracked-xs uppercase px-7 py-3.5"
        >
          לקטלוג
        </Link>
      </motion.div>

      {/* Manual theme selectors */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-5">
        {heroThemes.map((t, i) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setIndex(i)}
            className="text-[11px] tracked-xs uppercase transition-colors"
            style={{ color: "white", opacity: i === index ? 1 : 0.55 }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full">
      <div dir="ltr" className="grid grid-cols-1 md:grid-cols-2 h-[62vh] md:h-[88vh]">
        <div className="relative h-full">
          <Image
            src="/hero/model-bag.png"
            alt="דוגמנית אוחזת תיק זרים"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="relative h-full">
          <Image
            src="/hero/flower-macro.png"
            alt="תקריב על עלי כותרת"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="pointer-events-none absolute top-[10%] md:top-[14%] inset-x-0 text-center font-serif text-white leading-none px-2
          text-[13vw] md:text-[7.5vw]"
        style={{ textShadow: "0 2px 40px rgba(0,0,0,0.35)" }}
      >
        אלעד פרחים
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="absolute bottom-6 right-6 md:bottom-10 md:right-10"
      >
        <Link
          href="/category/bouquets"
          className="inline-block bg-ink text-paper text-xs tracked-xs uppercase px-7 py-3.5 hover:bg-ink/85 transition-colors"
        >
          לקטלוג
        </Link>
      </motion.div>
    </section>
  );
}

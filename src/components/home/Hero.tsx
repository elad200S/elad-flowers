"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1771099077435-6dbcac9fd65e?auto=format&fit=crop&w=1920&q=80"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-white text-5xl sm:text-6xl md:text-7xl tracking-wide"
        >
          פרחים שמרגשים
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-white/90 mt-5 text-lg sm:text-xl max-w-xl"
        >
          זרים בעיצוב אישי עם משלוח עד הבית בחולון והסביבה
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-9"
        >
          <Link
            href="/category/bouquets"
            className="bg-bordeaux text-white px-8 py-3.5 rounded-full hover:bg-bordeaux-dark transition-colors"
          >
            לבחירת זר
          </Link>
          <a
            href="https://wa.me/972000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white px-8 py-3.5 rounded-full hover:bg-white hover:text-bordeaux transition-colors"
          >
            הזמנה בוואטסאפ
          </a>
        </motion.div>
      </div>
    </section>
  );
}

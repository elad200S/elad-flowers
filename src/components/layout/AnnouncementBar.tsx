"use client";

import { motion } from "framer-motion";
import { useHeroTheme } from "@/context/HeroThemeContext";

export default function AnnouncementBar() {
  const { accent } = useHeroTheme();

  return (
    <motion.div
      animate={{ backgroundColor: accent }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-2 px-4"
    >
      <p className="text-[11px] tracked-xs uppercase text-ink">
        משלוח היום בחולון והסביבה · צילום הזר לפני משלוח · תשלום מאובטח
      </p>
    </motion.div>
  );
}

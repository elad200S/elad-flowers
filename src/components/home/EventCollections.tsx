"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { events } from "@/lib/data";

export default function EventCollections() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // RTL: visually "next" is scrollLeft decreasing, but the browser's
    // scrollLeft sign convention in RTL already flips to match "forward".
    el.scrollBy({ left: dir * -el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10 px-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-ink">קנייה לפי אירוע</h2>
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <button
          type="button"
          aria-label="הקודם"
          onClick={() => scrollBy(-1)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-black/10 shadow-md items-center justify-center hover:border-accent hover:text-accent transition-colors"
        >
          <ChevronRight size={18} />
        </button>
        <button
          type="button"
          aria-label="הבא"
          onClick={() => scrollBy(1)}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-black/10 shadow-md items-center justify-center hover:border-accent hover:text-accent transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth md:px-14"
        >
          {events.map((event) => (
            <Link
              key={event.slug}
              href={`/event/${event.slug}`}
              className="group shrink-0 w-44 sm:w-56 flex flex-col items-center gap-3"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="224px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-sm text-ink/70 group-hover:text-accent transition-colors">
                {event.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

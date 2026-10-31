import Image from "next/image";
import Link from "next/link";
import { events } from "@/lib/data";

export default function EventCollections() {
  return (
    <section className="py-10 md:py-14">
      <div className="text-center mb-8 px-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-ink">קנייה לפי אירוע</h2>
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <div className="flex gap-5 overflow-x-auto no-scrollbar md:justify-center">
          {events.map((event) => (
            <Link
              key={event.slug}
              href={`/event/${event.slug}`}
              className="group shrink-0 w-28 sm:w-32 flex flex-col items-center gap-3"
            >
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="128px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-[11px] tracked-xs uppercase text-ink/70 group-hover:text-ink transition-colors">
                {event.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

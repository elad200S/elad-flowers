import Image from "next/image";
import { Play } from "lucide-react";

const reels = [
  "1559779080-6970e0186790",
  "1548094967-e25a127d1f6d",
  "1582794543462-0d7922e50cf5",
  "1539622230226-3d4eb483b3f2",
  "1610397648930-477b8c7f0943",
  "1599463740831-a5015ef7b65a",
  "1586968295564-92fd7572718b",
  "1709983967481-d738b90bd395",
  "1618108571494-7065bc619e68",
];

export default function VideoGallery() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-10 px-4">
        <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">מהסטודיו שלנו</h2>
        <div className="gold-line w-16 mx-auto mt-4" />
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:px-6 snap-x snap-mandatory">
        {reels.map((id, i) => (
          <div
            key={id}
            className="relative shrink-0 w-[42%] sm:w-[26%] md:w-[20%] aspect-[9/16] rounded-xl overflow-hidden snap-start bg-charcoal"
          >
            <Image
              src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`}
              alt={`סרטון ${i + 1}`}
              fill
              sizes="300px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-white/85 flex items-center justify-center">
                <Play size={18} className="text-bordeaux fill-bordeaux" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

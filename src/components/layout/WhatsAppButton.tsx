import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="הזמנה בוואטסאפ"
      className="fixed bottom-5 left-5 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-ink text-paper shadow-lg hover:scale-105 transition-transform"
    >
      <MessageCircle size={20} strokeWidth={1.4} />
    </a>
  );
}

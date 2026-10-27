import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/972000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="הזמנה בוואטסאפ"
      className="fixed bottom-5 left-5 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-ink text-paper shadow-lg hover:scale-105 transition-transform"
    >
      <MessageCircle size={20} strokeWidth={1.4} />
    </a>
  );
}

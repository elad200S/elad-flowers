import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/972000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="הזמנה בוואטסאפ"
      className="fixed bottom-5 left-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
    >
      <MessageCircle size={28} strokeWidth={1.75} fill="white" className="text-[#25D366]" />
    </a>
  );
}

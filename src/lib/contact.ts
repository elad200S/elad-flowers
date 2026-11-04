export const PHONE_DISPLAY = "052-898-0414";
export const PHONE_LOCAL = "0528980414";
export const WHATSAPP_URL = "https://wa.me/972528980414";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://elad-flowers.vercel.app";
// A/B testing — routes to the owner's personal inbox for now.
export const CONTACT_EMAIL = "elad200226@gmail.com";

export function toWhatsAppLink(localPhone: string, text?: string) {
  const digits = localPhone.replace(/\D/g, "");
  const intl = digits.startsWith("0") ? `972${digits.slice(1)}` : digits;
  const base = `https://wa.me/${intl}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

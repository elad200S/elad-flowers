import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AccessibilityWidget from "@/components/layout/AccessibilityWidget";
import CartDrawer from "@/components/cart/CartDrawer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { SITE_URL } from "@/lib/contact";

const heading = Frank_Ruhl_Libre({
  variable: "--font-heading",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500"],
});

const body = Heebo({
  variable: "--font-body",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600"],
});

const title = "פרחי ד' יתברך | זרים בעיצוב אישי בחולון";
const description = "זרים בעיצוב אישי עם משלוח עד הבית בחולון והסביבה. פרחים טריים, עיצוב בוטיק ושירות אישי.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "פרחי ד' יתברך",
    locale: "he_IL",
    type: "website",
    images: [{ url: "/hero/rotator/mid-pink.jpg", width: 1200, height: 630 }],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "FlowerShop",
  name: "פרחי ד' יתברך",
  url: SITE_URL,
  telephone: "+972528980414",
  priceRange: "₪₪",
  address: {
    "@type": "PostalAddress",
    streetAddress: "רחוב סוקולוב 20",
    addressLocality: "חולון",
    addressCountry: "IL",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
  hasMap: "https://share.google/l4zXlMKIljRP2TcZy",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <SmoothScroll />
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
            <AccessibilityWidget />
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

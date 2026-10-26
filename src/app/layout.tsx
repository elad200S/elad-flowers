import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CartDrawer from "@/components/cart/CartDrawer";

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

export const metadata: Metadata = {
  title: "אלעד פרחים | זרים בעיצוב אישי בחולון",
  description: "זרים בעיצוב אישי עם משלוח עד הבית בחולון והסביבה. פרחים טריים, עיצוב בוטיק ושירות אישי.",
};

const parcelDeliveryJsonLd = {
  "@context": "http://schema.org",
  "@type": "ParcelDelivery",
  deliveryAddress: {
    "@type": "PostalAddress",
    streetAddress: "רחוב סוקולוב 20",
    addressLocality: "חולון",
    addressCountry: "IL",
  },
  expectedArrivalUntil: "2026-10-26T13:00:00+02:00",
  carrier: {
    "@type": "Organization",
    name: "שליחויות בוטיק",
  },
  itemShipped: {
    "@type": "Product",
    name: "זר ורדים קלאסי",
  },
  trackingNumber: "12345678",
  trackingUrl: "https://your-shop-domain.co.il/track/12345678",
  partOfOrder: {
    "@type": "Order",
    orderNumber: "1001",
    merchant: {
      "@type": "Organization",
      name: "שם חנות הפרחים",
    },
    orderStatus: "http://schema.org/OrderInTransit",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-cream text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(parcelDeliveryJsonLd) }}
        />
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarClient from "@/components/layout/NavbarClient";
import Footer from "@/components/layout/Footer";
import TrustBanner from "@/components/layout/TrustBanner";
import CartDrawer from "@/components/cart/CartDrawer";
import { NavbarProvider } from "@/components/layout/NavbarProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MODU — Sofás modulares fabricados en España",
    template: "%s | MODU",
  },
  description:
    "Sofás modulares D2C fabricados en España. Sin herramientas. En 15 minutos. Envío gratis a Península.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-[#F2F1EC] text-[#1E1E1C] antialiased">
        <NavbarProvider>
          <NavbarClient />
          <TrustBanner />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </NavbarProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Fraunces, Be_Vietnam_Pro } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { CartLink } from "@/components/CartLink";
import "./globals.css";
import "./cart.css";

const display = Fraunces({ subsets: ["latin", "vietnamese"], variable: "--font-display" });
const body = Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], weight: ["400", "600", "700"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "BrewLite",
  description: "Đặt đồ uống nhanh trên điện thoại",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f6f5c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <div className="shell">
            <header className="topbar">
              <Link href="/" className="brand">BrewLite</Link>
              <CartLink />
            </header>
            <main>{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

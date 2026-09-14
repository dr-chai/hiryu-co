import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import Header from "@/components/brand/Header";
import Footer from "@/components/brand/Footer";
import CartDrawer from "@/components/commerce/CartDrawer";

const sans = Noto_Sans_TC({
  variable: "--font-hiryu-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Noto_Serif_TC({
  variable: "--font-hiryu-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HIRYU / 輝琉 — 由廢到輝",
  description: "冇人係廢物，只係未喺啱嘅光裡面被看見。可負擔嘅日常選物店。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}

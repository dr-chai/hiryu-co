"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCart, selectCartCount } from "@/lib/store";
import { useUI } from "@/lib/ui-store";

const LINKS = [
  { href: "/shop", label: "選物" },
  { href: "/room", label: "入店" },
  { href: "/#makers", label: "Makers" },
  { href: "/#studio", label: "Studio" },
];

export default function Header() {
  const items = useCart((s) => s.items);
  const setCartOpen = useUI((s) => s.setCartOpen);
  const count = selectCartCount(items);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-offwhite/10 bg-obsidian">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-serif text-lg tracking-[0.2em] text-offwhite"
          >
            HIRYU <span className="text-teal">／</span> 輝琉
          </Link>

          {/* 桌面 nav */}
          <div className="hidden items-center gap-6 text-sm text-offwhite/80 sm:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-offwhite"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="rounded-full border border-offwhite/20 px-4 py-2 text-sm text-offwhite transition-colors hover:border-teal/60"
              aria-label="開啟購物袋"
            >
              袋
              {count > 0 && (
                <span aria-live="polite" className="ml-1.5 text-teal">
                  {count}
                </span>
              )}
            </button>

            {/* 手機 hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-xl leading-none text-offwhite transition-transform active:scale-90 sm:hidden"
              aria-label={menuOpen ? "關閉選單" : "開啟選單"}
            >
              {menuOpen ? "✕" : "≡"}
            </button>
          </div>
        </nav>
      </header>

      {/* 手機 full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-obsidian/95 px-8 backdrop-blur-xl"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
          >
            <nav className="flex flex-col gap-6">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-medium text-offwhite/90 transition-colors hover:text-offwhite"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/room"
              onClick={() => setMenuOpen(false)}
              className="mt-8 w-fit rounded-full bg-offwhite px-8 py-3.5 text-base font-medium text-obsidian transition-transform hover:scale-105"
            >
              入店選物
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

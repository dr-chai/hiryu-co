"use client";

import Link from "next/link";
import { useCart, selectCartCount } from "@/lib/store";
import { useUI } from "@/lib/ui-store";

export default function Header() {
  const items = useCart((s) => s.items);
  const setCartOpen = useUI((s) => s.setCartOpen);
  const count = selectCartCount(items);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-offwhite/10 bg-obsidian">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-lg tracking-[0.2em] text-offwhite"
        >
          HIRYU <span className="text-teal">／</span> 輝琉
        </Link>

        <div className="flex items-center gap-6 text-sm text-offwhite/80">
          <Link href="/shop" className="transition-colors hover:text-offwhite">
            選物
          </Link>
          <Link href="/room" className="transition-colors hover:text-offwhite">
            入店
          </Link>
          <a href="#makers" className="transition-colors hover:text-offwhite">
            Makers
          </a>
          <a href="#studio" className="transition-colors hover:text-offwhite">
            Studio
          </a>
        </div>

        <button
          onClick={() => setCartOpen(true)}
          className="rounded-full border border-offwhite/20 px-4 py-2 text-sm text-offwhite transition-colors hover:border-teal/60"
          aria-label="開啟購物袋"
        >
          袋
          {count > 0 && <span className="ml-1.5 text-teal">{count}</span>}
        </button>
      </nav>
    </header>
  );
}

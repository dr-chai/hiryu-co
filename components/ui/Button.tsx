import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "dark";

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm tracking-wide transition-all duration-300 ease-out";
  const styles =
    variant === "primary"
      ? "border border-teal/60 bg-teal/15 text-offwhite backdrop-blur-sm shadow-[0_0_24px_-6px_rgba(101,200,194,0.45)] hover:bg-teal/25 hover:specular-ring"
      : variant === "ghost"
        ? "text-offwhite/85 border border-offwhite/40 hover:border-teal/70 hover:text-offwhite"
        : "text-obsidian/80 border border-obsidian/25 hover:border-teal-deep hover:text-obsidian";
  const cls = `${base} ${styles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

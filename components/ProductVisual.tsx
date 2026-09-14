import type { Product } from "@/lib/types";

const COLOR: Record<string, string> = {
  琉璃青: "#65c8c2",
  青綠: "#65c8c2",
  琥珀金: "#e3ae5c",
  琥珀: "#e3ae5c",
  霧藍: "#7fa6bd",
  霧灰: "#9aa0a6",
  微藍: "#8fb0c4",
  米白: "#f3f0e9",
  陶土灰: "#9a8f80",
  黃銅: "#b98a4e",
  亞麻原色: "#d8cbb2",
  木色: "#b98d63",
  虹彩: "#7fc9c0",
};

function hex(name: string, fallback: string): string {
  return COLOR[name] ?? fallback;
}

export default function ProductVisual({
  product,
  shine = false,
  className = "",
}: {
  product: Product;
  shine?: boolean;
  className?: string;
}) {
  const a = hex(product.colors[0] ?? "", "#3a3a38");
  const b = product.colors.length > 1 ? hex(product.colors[1], a) : a;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
        boxShadow: shine
          ? "0 0 44px -10px rgba(101,200,194,0.55)"
          : "none",
        filter: shine ? "brightness(1.08)" : "brightness(0.9) saturate(0.82)",
        transition: "filter 0.5s ease, box-shadow 0.5s ease",
      }}
      role="img"
      aria-label={`${product.name} — ${product.material.join("、")}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.34), transparent 46%)",
        }}
      />
      <div
        className="absolute left-4 top-5 h-px w-1/2 bg-white/40"
        style={{ transform: "rotate(-18deg)" }}
      />
    </div>
  );
}

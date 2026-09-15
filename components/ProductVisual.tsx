import Image from "next/image";
import type { Product } from "@/lib/types";

export default function ProductVisual({
  product,
  shine = false,
  className = "",
  decorative = false,
}: {
  product: Product;
  shine?: boolean;
  className?: string;
  decorative?: boolean;
}) {
  const Tag = decorative ? "span" : "div";

  return (
    <Tag
      className={`relative block overflow-hidden rounded-2xl bg-neutral-900 ${className}`}
      style={{
        boxShadow: shine
          ? "0 0 44px -10px rgba(101,200,194,0.55)"
          : "none",
        filter: shine ? "brightness(1.07)" : "none",
        transition: "filter 0.5s ease, box-shadow 0.5s ease",
      }}
    >
      <Image
        src={`/products/${product.slug}.png`}
        alt={decorative ? "" : product.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover"
      />
    </Tag>
  );
}

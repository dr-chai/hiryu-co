import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, products } from "@/lib/selectors";
import { formatHKD } from "@/lib/format";
import ProductVisual from "@/components/ProductVisual";
import AddToCartButton from "@/components/commerce/AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/shop/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.brand} | HIRYU 輝琉`,
    description: product.story,
  };
}

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-offwhite px-6 pb-24 pt-28 text-obsidian">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/shop"
          className="text-sm text-obsidian/50 transition-colors hover:text-teal-deep"
        >
          ← 返去選物
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <ProductVisual product={product} shine className="aspect-[4/5] w-full" />

          <div>
            <p className="text-xs tracking-[0.3em] text-teal-deep">
              {product.brand}
            </p>
            <h1 className="mt-3 font-serif text-4xl">{product.name}</h1>
            <p className="mt-2 text-sm text-obsidian/60">
              {formatHKD(product.price.amount)}
              <span className="ml-2 text-xs">親民價</span>
            </p>

            <p className="mt-6 text-base leading-relaxed text-obsidian/80">
              {product.story}
            </p>

            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex gap-3">
                <dt className="w-16 text-obsidian/40">物料</dt>
                <dd>{product.material.join("、")}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 text-obsidian/40">產地</dt>
                <dd>{product.origin}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <AddToCartButton product={product} tone="light" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

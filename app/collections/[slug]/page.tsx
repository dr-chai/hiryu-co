import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollection, byCategory, collections } from "@/lib/selectors";
import ProductCard from "@/components/commerce/ProductCard";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/collections/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return { title: `${collection.title} — HIRYU 輝琉` };
}

export default async function CollectionPage(
  props: PageProps<"/collections/[slug]">,
) {
  const { slug } = await props.params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const items = byCategory(slug);

  return (
    <div className="min-h-screen bg-offwhite px-6 pb-24 pt-28 text-obsidian">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/shop"
          className="text-sm text-obsidian/50 transition-colors hover:text-teal-deep"
        >
          ← 返去選物
        </Link>
        <p className="mt-8 text-xs tracking-[0.3em] text-teal-deep">
          {collection.en.toUpperCase()}
        </p>
        <h1 className="mt-3 font-serif text-4xl">{collection.title}</h1>
        <p className="mt-3 text-sm text-obsidian/60">{collection.description}</p>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

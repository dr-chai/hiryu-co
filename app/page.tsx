import Link from "next/link";
import Hero from "@/components/brand/Hero";
import ProductCard from "@/components/commerce/ProductCard";
import Button from "@/components/ui/Button";
import { products, collections, makers } from "@/lib/selectors";

const picks = products.filter((p) => p.floor !== "B1").slice(0, 6);

export default function Home() {
  return (
    <>
      <Hero />

      {/* 策展 statement（米白底） */}
      <section className="bg-offwhite px-6 py-24 text-obsidian">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-3xl leading-relaxed sm:text-4xl">
            我哋唔係收集貨品；
            <br />
            我哋選擇值得留喺你生活入面嘅物件。
          </p>
          <p className="mt-6 text-sm text-obsidian/60">
            選一件令日常發光嘅嘢。
          </p>
        </div>
      </section>

      {/* ROOM 預覽（黑曜石底） */}
      <section className="bg-obsidian px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs tracking-[0.3em] text-teal">THE HIRYU ROOM</p>
          <h2 className="mt-4 font-serif text-3xl text-offwhite sm:text-5xl">
            輝琉之間
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-offwhite/70">
            三層樓：未定形 → 光の棚 → 輝琉之間。上樓，就係由廢走向輝。
          </p>
          <div className="mt-8">
            <Button href="/room">走入去望下</Button>
          </div>
        </div>
      </section>

      {/* 廢佬揀俾街坊（米白底） */}
      <section className="bg-offwhite px-6 py-24 text-obsidian">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] text-teal-deep">
                廢佬揀俾街坊
              </p>
              <h2 className="mt-3 font-serif text-3xl">
                唔係熱賣榜，係揀過嘅。
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm text-obsidian/50 transition-colors hover:text-teal-deep"
            >
              全部選物 →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {picks.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 3 Collections（黑曜石底） */}
      <section className="bg-obsidian px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl text-offwhite">
            按心情揀
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {collections.map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="glass group rounded-2xl p-8 transition-colors hover:specular-ring"
              >
                <p className="text-xs tracking-widest text-teal">
                  {c.en.toUpperCase()}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-offwhite">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm text-offwhite/60">{c.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Makers in Light（米白底） */}
      <section id="makers" className="bg-offwhite px-6 py-24 text-obsidian">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs tracking-[0.3em] text-teal-deep">
            MAKERS IN LIGHT
          </p>
          <h2 className="mt-3 font-serif text-3xl">被選中嘅創作者</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {makers.map((m) => (
              <div
                key={m.slug}
                className="rounded-2xl border border-obsidian/10 p-8"
              >
                <p className="font-serif text-xl">{m.name}</p>
                <p className="mt-1 text-xs text-obsidian/50">{m.origin}</p>
                <p className="mt-6 font-serif text-lg leading-relaxed">
                  「{m.line}」
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 廢佬講兩句（黑曜石底） */}
      <section className="bg-obsidian px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs tracking-[0.3em] text-teal">廢佬講兩句</p>
          <p className="mt-6 font-serif text-2xl leading-relaxed text-offwhite">
            「各位街坊，入嚟望下啦。呢度未必樣樣都啱你，
            <br />
            但應該總有一件，會令你覺得今日好啲。」
          </p>
        </div>
      </section>

      {/* Studio / Bring Your Work to Light（米白底） */}
      <section id="studio" className="bg-offwhite px-6 py-24 text-obsidian">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2">
          <div className="rounded-2xl border border-obsidian/10 p-10">
            <p className="text-xs tracking-[0.3em] text-teal-deep">
              HIRYU STUDIO
            </p>
            <h3 className="mt-4 font-serif text-2xl">
              將品牌感覺，變成數碼體驗。
            </h3>
            <p className="mt-4 text-sm text-obsidian/60">
              Vibe Coding · Brand Experiences · Creator Storefronts
            </p>
            <div className="mt-8">
              <Button href="#" variant="dark">
                Start a Project
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-obsidian/10 p-10">
            <p className="text-xs tracking-[0.3em] text-teal-deep">
              BRING YOUR WORK TO LIGHT
            </p>
            <h3 className="mt-4 font-serif text-2xl">
              將你嘅嘢帶到光裡，等啱嘅人睇到。
            </h3>
            <p className="mt-4 text-sm text-obsidian/60">
              你做緊嘅嘢，可能未必人人都明。但可能正正有人，一直等緊見到佢。
            </p>
            <div className="mt-8">
              <Button href="#" variant="dark">
                申請成為輝琉選品
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

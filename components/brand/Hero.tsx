"use client";

import { motion, useReducedMotion } from "framer-motion";
import LogoMorph from "./LogoMorph";
import Button from "@/components/ui/Button";

function fadeProps(reduced: boolean | null, delay: number) {
  return {
    initial: reduced ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" as const, delay },
  };
}

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-obsidian obsidian-glow px-6">
      {/* 焦散光動畫背景 */}
      <div
        aria-hidden
        className="caustic-anim pointer-events-none absolute inset-0"
      />

      <div className="relative z-10 flex flex-col items-center">
        <LogoMorph />

        <motion.p
          {...fadeProps(reduced, 2.5)}
          className="mt-8 text-xs tracking-[0.4em] text-teal"
        >
          HIRYU / 輝琉 · 由廢到輝
        </motion.p>

        <motion.h1
          {...fadeProps(reduced, 2.7)}
          className="mt-4 text-center font-serif text-4xl leading-[1.15] text-offwhite sm:text-6xl"
        >
          由廢到輝，
          <br />
          唔需要等人批准。
        </motion.h1>

        <motion.p
          {...fadeProps(reduced, 3.0)}
          className="mt-5 max-w-md text-center text-sm leading-relaxed text-offwhite/60"
        >
          冇人係廢物，只係未喺啱嘅光裡面被看見。
        </motion.p>

        <motion.div
          {...fadeProps(reduced, 3.3)}
          className="mt-8 flex flex-col gap-4 sm:flex-row"
        >
          <Button href="/room">入店</Button>
          <Button href="/shop" variant="ghost">
            直接選購
          </Button>
        </motion.div>

        <motion.p
          {...fadeProps(reduced, 3.6)}
          className="mt-8 text-xs tracking-widest text-offwhite/40"
        >
          NOTHING IS WASTED · SOME THINGS JUST NEED THE RIGHT LIGHT
        </motion.p>
      </div>
    </section>
  );
}

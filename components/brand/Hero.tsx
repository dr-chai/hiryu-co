"use client";

import { motion, useReducedMotion } from "framer-motion";
import LogoMorph from "./LogoMorph";
import Button from "@/components/ui/Button";

export default function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-obsidian obsidian-glow px-6">
      <LogoMorph />
      <motion.div
        className="mt-10 flex flex-col gap-4 sm:flex-row"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.7, ease: "easeOut" }}
      >
        <Button href="/room">入店</Button>
        <Button href="/shop" variant="ghost">
          直接選購
        </Button>
      </motion.div>
      <p className="mt-8 text-xs tracking-widest text-offwhite/40">
        NOTHING IS WASTED · SOME THINGS JUST NEED THE RIGHT LIGHT
      </p>
    </section>
  );
}

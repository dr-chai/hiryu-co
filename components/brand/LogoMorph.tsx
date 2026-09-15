"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function LogoMorph() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className="font-serif text-[8rem] font-extralight leading-none text-teal glow-teal">
        輝
      </span>
    );
  }

  return (
    <div className="relative flex h-44 items-center justify-center overflow-hidden">
      {/* 光軸：由上而下 sweep */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 h-44 bg-gradient-to-b from-transparent via-teal/25 to-transparent"
        initial={{ y: "-140%" }}
        animate={{ y: "240%" }}
        transition={{ duration: 2.4, ease: "easeInOut", delay: 0.4 }}
      />

      {/* 字形 morph：廢 → 輝（只准 transform + opacity） */}
      <motion.span
        aria-hidden
        className="absolute font-serif text-[9rem] font-extralight leading-none text-neutral-600"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, delay: 1.1, ease: "easeIn" }}
      >
        廢
      </motion.span>
      <motion.span
        className="absolute font-serif text-[9rem] font-extralight leading-none text-teal glow-teal"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 1.6, ease: "easeOut" }}
      >
        輝
      </motion.span>
    </div>
  );
}

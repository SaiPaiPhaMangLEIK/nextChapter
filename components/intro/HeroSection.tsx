"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  return (
    <section className="px-6 pt-16 pb-10">
      {/* Pill label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-300/40 bg-brand-600/10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-300 animate-pulse" />
          <span className="text-[10px] font-semibold tracking-[0.18em] text-brand-300 uppercase">
            Your Reading Evolution
          </span>
        </span>
      </motion.div>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="font-serif text-[42px] leading-[1.08] font-bold text-white tracking-tight"
      >
        Discover your
        <br />
        <span className="text-brand-300">next chapter</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease }}
        className="mt-5 text-[15px] leading-[1.65] text-white/55 max-w-[300px]"
      >
        Find better books, track your reading, and understand what you read
        through curated insights and deep analysis.
      </motion.p>
    </section>
  );
}

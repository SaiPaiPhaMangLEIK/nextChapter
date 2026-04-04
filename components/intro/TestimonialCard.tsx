"use client";

import { motion } from "framer-motion";

export default function TestimonialCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="px-8 py-10"
    >
      {/* Decorative quote mark — floats above */}
      <div
        className="text-center text-[52px] font-serif leading-none select-none mb-2"
        style={{ color: "rgba(100,120,90,0.20)" }}
        aria-hidden
      >
        &ldquo;
      </div>

      {/* Quote — centered, italic serif, floats directly on parchment */}
      <blockquote className="text-center">
        <p className="font-serif text-[16px] italic leading-[1.72] text-ink-600 tracking-[-0.01em]">
          The reading experience has been elevated into a meditative digital space.
        </p>

        {/* Attribution */}
        <footer className="mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-ink-200" />
          <cite className="text-[10px] font-semibold tracking-[0.20em] text-ink-400 uppercase not-italic">
            The Daily Reader
          </cite>
          <span className="h-px w-8 bg-ink-200" />
        </footer>
      </blockquote>
    </motion.section>
  );
}

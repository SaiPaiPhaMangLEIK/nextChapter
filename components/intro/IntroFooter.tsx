"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function IntroFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="px-6 pt-4 pb-12"
    >
      {/* Wordmark */}
      <div className="flex items-center justify-center gap-1.5 mb-5">
        <div className="w-6 h-6 rounded-lg bg-brand-500/20 flex items-center justify-center">
          <BookOpen size={12} className="text-brand-500" strokeWidth={2} />
        </div>
        <span className="text-xs font-semibold text-ink-400 tracking-wide">
          NextChapter
        </span>
      </div>

      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-4">
          {["Privacy", "Terms", "Support"].map((link) => (
            <button
              key={link}
              className="text-[11px] text-ink-300 font-medium hover:text-ink-500 transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-ink-300">
          © 2024 NextChapter Inc. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}

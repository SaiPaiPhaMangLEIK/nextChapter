"use client";

import { motion } from "framer-motion";

const AVATAR_COLORS = [
  { from: "#a78bfa", to: "#7c3aed" },  // violet
  { from: "#f472b6", to: "#db2777" },  // pink
  { from: "#fbbf24", to: "#d97706" },  // amber
  { from: "#38bdf8", to: "#0284c7" },  // sky
];
const INITIALS = ["A", "M", "J", "S"];

export default function CommunitySection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="px-5 pt-2 pb-4"
    >
      <div className="bg-white rounded-3xl px-6 py-7 shadow-card">
        <h3 className="text-[20px] font-bold text-ink-700 leading-tight tracking-tight">
          Your reading, refined.
        </h3>
        <p className="mt-2 text-[13px] text-ink-400 leading-relaxed">
          Connect with a community of intentional readers who prioritize
          quality over quantity.
        </p>

        {/* Stacked avatars + count badge */}
        <div className="mt-5 flex items-center gap-3">
          <div className="flex items-center">
            {AVATAR_COLORS.map(({ from, to }, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-white text-white text-[11px] font-bold"
                style={{
                  background: `linear-gradient(135deg, ${from}, ${to})`,
                  marginLeft: i === 0 ? 0 : -8,
                  zIndex: 4 - i,
                }}
              >
                {INITIALS[i]}
              </div>
            ))}
          </div>

          <div className="h-5 w-px bg-ink-100" />

          <div className="flex items-baseline gap-1">
            <span className="text-[14px] font-bold text-brand-600">+12k</span>
            <span className="text-[12px] text-ink-400">readers</span>
          </div>
        </div>

        {/* Activity bar chart */}
        <div className="mt-6 flex items-end gap-[3px] h-8">
          {[38, 62, 48, 78, 52, 88, 68, 82, 58, 72, 44, 92, 62, 80].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background:
                  i >= 10
                    ? "linear-gradient(to top, #186E28, #8CE08C)"
                    : "#E2E3DC",
              }}
            />
          ))}
        </div>
        <p className="mt-1.5 text-[10px] text-ink-300 font-medium">
          Community reading activity · last 14 days
        </p>
      </div>
    </motion.section>
  );
}

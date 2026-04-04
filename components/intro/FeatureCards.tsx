"use client";

import { motion } from "framer-motion";
import { BookMarked } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.16, ease },
  }),
};

// Warm book-spine texture inside the Curated Shelves card
const CARD_SPINES = [
  "repeating-linear-gradient(",
  "  90deg,",
  "  rgba(255,255,255, 0.00)  0px, rgba(255,255,255, 0.00)  18px,",
  "  rgba(255,255,255, 0.06) 18px, rgba(255,255,255, 0.06)  22px,",
  "  rgba(255,255,255, 0.00) 22px, rgba(255,255,255, 0.00)  46px,",
  "  rgba(255,255,255, 0.04) 46px, rgba(255,255,255, 0.04)  70px,",
  "  rgba(255,255,255, 0.00) 70px, rgba(255,255,255, 0.00)  88px,",
  "  rgba(255,255,255, 0.07) 88px, rgba(255,255,255, 0.07)  90px",
  ")",
].join("");

const CARD_SHELVES = [
  "repeating-linear-gradient(",
  "  180deg,",
  "  transparent                  0px, transparent                 84px,",
  "  rgba(255,255,255, 0.06)     84px, rgba(255,255,255, 0.06)    86px,",
  "  rgba(  0,  0,  0, 0.10)     86px, rgba(  0,  0,  0, 0.10)   90px",
  ")",
].join("");

// ── Card 1: Deep Narrative Tracking ─────────────────────────────────────────

function AnalyzeCard() {
  return (
    <motion.div
      custom={0}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className="bg-white rounded-3xl p-5 shadow-card relative overflow-hidden"
    >
      {/* Top-right label */}
      <span className="absolute top-4 right-4 text-[9px] font-semibold tracking-[0.16em] text-ink-300 uppercase">
        01 / Analyze
      </span>

      {/* Icon */}
      <div className="w-10 h-10 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
        <BookMarked size={18} className="text-brand-600" strokeWidth={1.8} />
      </div>

      <h3 className="text-[18px] font-bold text-ink-700 leading-tight tracking-tight">
        Deep Narrative<br />Tracking
      </h3>
      <p className="mt-2.5 text-[13px] text-ink-400 leading-relaxed">
        AI-driven insights that help you map your emotional journey through every book.
      </p>

      {/* Mini spark-line bar decoration */}
      <div className="mt-5 flex items-end gap-1 h-5">
        {[55, 80, 40, 95, 60, 75, 50, 88, 45, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background: i >= 6
                ? "linear-gradient(to top, #186E28, #8CE08C)"
                : "#E2E3DC",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Card 2: Curated Shelves (visual highlight) ───────────────────────────────

function CuratedShelvesCard() {
  return (
    <motion.div
      custom={1}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className="relative rounded-3xl overflow-hidden"
      style={{ minHeight: 240 }}
    >
      {/* Layered green gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #1e3d22 0%, #243d26 35%, #1a3020 65%, #0f2016 100%)",
        }}
      />

      {/* Book-spine texture inside card */}
      <div className="absolute inset-0 opacity-100" style={{ backgroundImage: CARD_SPINES }} />
      <div className="absolute inset-0 opacity-100" style={{ backgroundImage: CARD_SHELVES }} />

      {/* Warm amber glow — mimics the bookshelf photo warmth */}
      <div
        className="absolute"
        style={{
          top: -30, right: -30, width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,140,50,0.18) 0%, transparent 65%)",
        }}
      />
      {/* Green glow */}
      <div
        className="absolute"
        style={{
          bottom: -30, left: -20, width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(24,110,40,0.20) 0%, transparent 65%)",
        }}
      />

      {/* Blurred horizontal bokeh strip (simulates out-of-focus book photo) */}
      <div
        className="absolute inset-x-0 opacity-25"
        style={{
          top: "30%", height: "40%",
          background:
            "linear-gradient(90deg, rgba(180,120,40,0.4) 0%, rgba(50,100,50,0.3) 30%, rgba(210,160,55,0.35) 55%, rgba(35,65,35,0.3) 75%, rgba(195,130,45,0.4) 100%)",
          filter: "blur(8px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col h-full" style={{ minHeight: 240 }}>
        <div className="mt-auto">
          {/* Label row */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
            <span className="text-[9px] font-semibold tracking-[0.16em] text-brand-300 uppercase">
              02 / Curate
            </span>
          </div>

          <h3 className="text-[22px] font-bold text-white leading-tight tracking-tight">
            Curated Shelves
          </h3>
          <p className="mt-1.5 text-[13px] text-white/58 leading-relaxed">
            Expertly crafted lists tailored to your cognitive growth.
          </p>

          {/* Shelf fill bars */}
          <div className="mt-5 flex gap-1">
            <div className="h-1 flex-[3] rounded-full" style={{ background: "rgba(24,110,40,0.65)" }} />
            <div className="h-1 flex-[2] rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />
            <div className="h-1 flex-1 rounded-full"  style={{ background: "rgba(255,255,255,0.09)" }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeatureCards() {
  return (
    <section className="px-5 pt-6 pb-2 space-y-4">
      <AnalyzeCard />
      <CuratedShelvesCard />
    </section>
  );
}

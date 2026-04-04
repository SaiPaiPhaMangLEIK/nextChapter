"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Bookmark, Brain, Compass, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const STEP = 8;
const TOTAL = 11;

const INSIGHTS = [
  {
    id: 1,
    icon: <Brain size={18} strokeWidth={1.8} />,
    title: "Algorithmic Curation",
    description:
      "Identifying patterns in the themes you love, from botanical illustrations to classic literature.",
  },
  {
    id: 2,
    icon: <Compass size={18} strokeWidth={1.8} />,
    title: "Dynamic Pathways",
    description:
      "Creating connections between your favorite genres to reveal hidden gems in our collection.",
  },
  {
    id: 3,
    icon: <Sparkles size={18} strokeWidth={1.8} />,
    title: "Personalized Journey",
    description:
      "Crafting your next reading steps based on your rhythm and goals.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Floating card shell ─────────────────────────────────────────────────────

function BookCard({
  size,
  icon,
  opacity = 1,
}: {
  size: "lg" | "md" | "sm";
  icon: React.ReactNode;
  opacity?: number;
}) {
  const dims = { lg: "w-[90px] h-[108px]", md: "w-[76px] h-[92px]", sm: "w-[66px] h-[80px]" };
  const iconDims = { lg: "w-10 h-10", md: "w-9 h-9", sm: "w-8 h-8" };
  const lineW = { lg: ["w-8", "w-6"], md: ["w-7", "w-5"], sm: ["w-6", "w-4"] };

  return (
    <div
      className={`${dims[size]} bg-white rounded-[16px] flex flex-col items-center justify-center gap-3 border border-white/60`}
      style={{
        opacity,
        boxShadow: `0 ${size === "lg" ? 10 : 5}px ${size === "lg" ? 32 : 18}px rgba(0,0,0,${size === "lg" ? 0.09 : 0.06})`,
      }}
    >
      <div className={`${iconDims[size]} bg-brand-100 rounded-xl flex items-center justify-center`}>
        <span className="text-forest-700">{icon}</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className={`${lineW[size][0]} h-[2px] bg-sage-200 rounded-full`} />
        <div className={`${lineW[size][1]} h-[2px] bg-sage-100 rounded-full`} />
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LoadingPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisible(1), 700),
      setTimeout(() => setVisible(2), 2200),
      setTimeout(() => setVisible(3), 3700),
      setTimeout(() => router.push("/onboarding/preview"), 5600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [router]);

  const pct = Math.round((STEP / TOTAL) * 100);

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg, #DCF0DC 0%, #F1F5EB 45%, #F8FAF3 100%)",
      }}
    >
      {/* ── Custom header ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 pt-14 pb-1">
        <Link
          href="/onboarding/step-5"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/70 border border-white/80 shadow-sm text-ink-600 hover:text-ink-900 transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={2} />
        </Link>

        <span className="font-bold text-[17px] text-forest-900 tracking-tight">
          NextChapter
        </span>

        {/* Compact progress bar */}
        <div className="w-[72px] h-[3px] bg-sage-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, delay: 0.3, ease }}
          />
        </div>
      </div>

      {/* ── Floating book cards ────────────────────────────────────────── */}
      <div className="relative h-[200px] mx-6 mt-2">
        {/* Connecting lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 320 200"
          fill="none"
        >
          <motion.line
            x1="160" y1="55" x2="110" y2="130"
            stroke="#186E28" strokeWidth="1.2" strokeDasharray="5 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.22 }}
            transition={{ duration: 1.2, delay: 0.6, ease }}
          />
          <motion.line
            x1="160" y1="55" x2="215" y2="125"
            stroke="#186E28" strokeWidth="1.2" strokeDasharray="5 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.22 }}
            transition={{ duration: 1.2, delay: 0.8, ease }}
          />
          {[
            [160, 55],
            [110, 130],
            [215, 125],
          ].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx} cy={cy} r="3"
              fill="#186E28"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.35 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
            />
          ))}
        </svg>

        {/* Card 1 — main, front centre */}
        <div className="absolute" style={{ top: "0%", left: "50%", marginLeft: -10 }}>
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [5, 6.5, 5] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <BookCard size="lg" icon={<BookOpen size={20} strokeWidth={1.7} />} />
          </motion.div>
        </div>

        {/* Card 2 — back left */}
        <div className="absolute" style={{ top: "38%", left: "18%" }}>
          <motion.div
            animate={{ y: [0, -7, 0], rotate: [-13, -11.5, -13] }}
            transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          >
            <BookCard size="md" icon={<Bookmark size={17} strokeWidth={1.7} />} opacity={0.88} />
          </motion.div>
        </div>

        {/* Card 3 — back right, smallest */}
        <div className="absolute" style={{ top: "30%", right: "14%" }}>
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [9, 10.5, 9] }}
            transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            <BookCard size="sm" icon={<BookOpen size={15} strokeWidth={1.7} />} opacity={0.72} />
          </motion.div>
        </div>
      </div>

      {/* ── Title ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
        className="px-6 text-center mt-1"
      >
        <h1 className="font-bold text-[27px] leading-[1.22] tracking-tight text-forest-900">
          We're building your reading map...
        </h1>
        <p className="mt-2.5 text-[13.5px] text-ink-400 leading-[1.6] max-w-[290px] mx-auto">
          Analyzing your preferences to create an editorial journey tailored to your interests.
        </p>
      </motion.div>

      {/* ── Pulsing dots ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center gap-1.5 mt-5"
      >
        <div className="flex items-center gap-[5px]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.85, 1.1, 0.85] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: i * 0.27,
                ease: "easeInOut",
              }}
              className="w-[7px] h-[7px] rounded-full bg-brand-600"
            />
          ))}
        </div>
        <p className="text-[9px] font-bold tracking-[0.22em] text-brand-600 uppercase">
          Connecting Nodes
        </p>
      </motion.div>

      {/* ── Insight cards ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 px-5 mt-5">
        {INSIGHTS.map((card, i) =>
          visible > i ? (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="bg-white/65 backdrop-blur-sm border border-white/80 rounded-[18px] p-4 shadow-[0_1px_10px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-forest-700">{card.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[14.5px] text-forest-900 leading-tight">
                    {card.title}
                  </p>
                  <p className="mt-1 text-[12.5px] text-ink-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : null
        )}
      </div>

      {/* ── Skip ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center pb-10 pt-6 mt-auto"
      >
        <button
          onClick={() => router.push("/onboarding/preview")}
          className="text-[12px] text-ink-300 hover:text-ink-500 transition-colors"
        >
          Tap to skip →
        </button>
      </motion.div>
    </div>
  );
}

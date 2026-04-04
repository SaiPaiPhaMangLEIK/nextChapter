"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Lock,
  Check,
  BookOpen,
  Bookmark,
  User,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// ─── Book data ────────────────────────────────────────────────────────────────

interface BookEntry {
  title: string;
  author: string;
  tag: string;
  description: string;
  category: string;
  cover: React.CSSProperties;
}

const BOOKS: Record<string, BookEntry> = {
  "creative-act": {
    title: "The Creative Act",
    author: "Rick Rubin",
    tag: "Creative Focus",
    description: "Rick Rubin's masterpiece on mindfulness and the artistic journey.",
    category: "PHILOSOPHY",
    cover: { background: "linear-gradient(150deg, #cfc4a8 0%, #e8dfc8 45%, #bfb090 100%)" },
  },
  "atomic-habits": {
    title: "Atomic Habits",
    author: "James Clear",
    tag: "Foundational Systems",
    description: "Tiny changes, remarkable results — the science of habit formation.",
    category: "SELF-DEVELOPMENT",
    cover: { background: "linear-gradient(150deg, #e89820 0%, #c47810 100%)" },
  },
  "deep-work": {
    title: "Deep Work",
    author: "Cal Newport",
    tag: "Mastering Focus",
    description: "Rules for focused success in a distracted world.",
    category: "PRODUCTIVITY",
    cover: { background: "linear-gradient(150deg, #1e4a7a 0%, #0e2a50 100%)" },
  },
  "war-of-art": {
    title: "The War of Art",
    author: "Steven Pressfield",
    tag: "Overcoming Resistance",
    description: "Break through the blocks and win your inner creative battles.",
    category: "CREATIVITY",
    cover: { background: "linear-gradient(150deg, #7a5545 0%, #5a3525 100%)" },
  },
  "thinking-fast-slow": {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    tag: "Cognitive Mastery",
    description: "The two systems that drive how we think and decide.",
    category: "PSYCHOLOGY",
    cover: { background: "linear-gradient(150deg, #3a5878 0%, #1a3858 100%)" },
  },
  "flow": {
    title: "Flow",
    author: "Mihaly Csikszentmihalyi",
    tag: "Peak Experience",
    description: "The psychology of optimal experience.",
    category: "PSYCHOLOGY",
    cover: { background: "linear-gradient(150deg, #c87830 0%, #a85810 100%)" },
  },
  "meditations": {
    title: "Meditations",
    author: "Marcus Aurelius",
    tag: "Stoic Wisdom",
    description: "Timeless wisdom from Rome's philosopher-emperor.",
    category: "PHILOSOPHY",
    cover: { background: "linear-gradient(150deg, #3a3860 0%, #1e1e40 100%)" },
  },
  "sapiens": {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    tag: "Human Origins",
    description: "A brief history of humankind across 100,000 years.",
    category: "HISTORY",
    cover: { background: "linear-gradient(150deg, #5a3820 0%, #3a2010 100%)" },
  },
  "zero-to-one": {
    title: "Zero to One",
    author: "Peter Thiel",
    tag: "First Principles",
    description: "Notes on startups, or how to build the future.",
    category: "BUSINESS",
    cover: { background: "linear-gradient(150deg, #1a1a30 0%, #0a0a18 100%)" },
  },
};

// ─── Personalization maps ─────────────────────────────────────────────────────

const PLAN_MAP: Record<string, { featured: string; path: string[]; discover: string[] }> = {
  "learn": {
    featured: "deep-work",
    path: ["atomic-habits", "deep-work", "war-of-art"],
    discover: ["thinking-fast-slow", "flow"],
  },
  "relax": {
    featured: "meditations",
    path: ["meditations", "creative-act", "sapiens"],
    discover: ["flow", "sapiens"],
  },
  "improve-thinking": {
    featured: "creative-act",
    path: ["atomic-habits", "deep-work", "war-of-art"],
    discover: ["flow", "meditations"],
  },
  "build-habits": {
    featured: "atomic-habits",
    path: ["atomic-habits", "deep-work", "war-of-art"],
    discover: ["flow", "thinking-fast-slow"],
  },
  "explore-ideas": {
    featured: "sapiens",
    path: ["sapiens", "meditations", "zero-to-one"],
    discover: ["creative-act", "thinking-fast-slow"],
  },
};

const SUBTITLE_MAP: Record<string, string> = {
  "learn":           "Based on your love of learning, we've curated a path to sharpen your skills and deepen your knowledge.",
  "relax":           "Based on your reading style, we've chosen a calm, enriching journey to help you unwind and explore.",
  "improve-thinking":"Based on your reading style, we've curated a path to help you master creative focus.",
  "build-habits":    "Based on your goal to build better habits, we've mapped out a transformative reading journey.",
  "explore-ideas":   "Based on your curiosity for ideas, we've curated an expansive intellectual adventure.",
};

const DEFAULT_KEY = "improve-thinking";

const ease = [0.16, 1, 0.3, 1] as const;
const PATH_STATES = ["done", "current", "locked"] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PreviewPage() {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  const [planKey, setPlanKey] = useState(DEFAULT_KEY);
  const [subtitle, setSubtitle] = useState(SUBTITLE_MAP[DEFAULT_KEY]);

  useEffect(() => {
    try {
      const state = JSON.parse(localStorage.getItem("onboarding_state") ?? "{}");
      const m = state.readingMotivation as string | undefined;
      if (m && PLAN_MAP[m]) {
        setPlanKey(m);
        setSubtitle(SUBTITLE_MAP[m] ?? SUBTITLE_MAP[DEFAULT_KEY]);
      }
    } catch {
      // ignore
    }
  }, []);

  function handleGenerate() {
    setGenerating(true);
    router.push("/onboarding/auth");
  }

  const plan = PLAN_MAP[planKey];
  const featured = BOOKS[plan.featured];
  const pathItems = plan.path.map((id, i) => ({ ...BOOKS[id], state: PATH_STATES[i] }));
  const discoverItems = plan.discover.map(id => BOOKS[id]);
  const pct = Math.round((9 / 11) * 100);

  return (
    <div
      className="min-h-screen pb-28"
      style={{ background: "linear-gradient(180deg, #e8f0e5 0%, #f0f5ee 35%, #f5f2eb 100%)" }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <Link
          href="/onboarding/loading"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/70 border border-white/80 shadow-sm text-ink-600 hover:text-ink-900 transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={2} />
        </Link>

        <span className="font-bold text-[17px] text-forest-900 tracking-tight">
          NextChapter
        </span>

        <div className="flex items-center gap-2">
          <div className="w-[56px] h-[3px] bg-sage-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: 0.4, ease }}
            />
          </div>
          <Link
            href="/home"
            className="text-[13px] font-medium text-ink-400 hover:text-ink-600 transition-colors"
          >
            Skip
          </Link>
        </div>
      </div>

      <div className="px-5 space-y-6">
        {/* ── Label + heading ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease }}
        >
          <p className="text-[9.5px] font-bold tracking-[0.22em] text-brand-600 uppercase mb-2">
            Discovery Preview
          </p>
          <h1 className="font-bold text-[28px] leading-[1.18] tracking-tight text-forest-900">
            Your next great story is waiting.
          </h1>
          <p className="mt-2 text-[13.5px] text-ink-400 leading-[1.6]">
            {subtitle}
          </p>
        </motion.div>

        {/* ── Featured book card ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease }}
          className="rounded-[22px] overflow-hidden bg-white shadow-[0_6px_32px_rgba(0,0,0,0.10)] cursor-pointer active:scale-[0.99] transition-transform"
          onClick={() => router.push("/home")}
        >
          {/* Cover area */}
          <div className="relative h-[200px]" style={featured.cover}>
            {/* Depth gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            {/* Ambient light spot */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(255,255,255,0.18) 0%, transparent 70%)",
              }}
            />
            {/* Title text on cover */}
            <div className="absolute inset-0 flex items-center justify-center px-10">
              <p className="font-serif font-bold text-[24px] leading-tight text-white/90 tracking-widest text-center uppercase">
                {featured.title.split(" ").map((word, i, arr) => (
                  <span key={i}>
                    {word}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            {/* Badge */}
            <div className="absolute bottom-3 left-3">
              <span className="inline-flex items-center gap-1 bg-brand-500 text-white text-[9.5px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full">
                <Star size={9} fill="currentColor" strokeWidth={0} />
                Next Best Read
              </span>
            </div>
          </div>

          {/* Info row */}
          <div className="px-4 pt-3 pb-4">
            <p className="font-bold text-[16px] text-forest-900">{featured.title}</p>
            <p className="text-[12.5px] text-ink-400 mt-0.5 leading-snug">
              {featured.description}
            </p>
            <div className="flex items-center justify-between mt-3">
              {/* Avatars + social proof */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["JP", "MK"].map((init) => (
                    <div
                      key={init}
                      className="w-6 h-6 rounded-full bg-sage-400 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white"
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <span className="text-[11px] text-ink-400">+1k reading</span>
              </div>
              {/* Preview button */}
              <button
                onClick={(e) => { e.stopPropagation(); router.push("/home"); }}
                className="px-4 py-1.5 rounded-full border border-ink-200 text-[12px] font-semibold text-ink-700 hover:bg-sage-50 transition-colors"
              >
                Preview
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Curated path ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36, ease }}
        >
          <p className="font-bold text-[17px] text-forest-900 mb-4">Your Curated Path</p>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[15px] top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-brand-400 via-brand-200 to-sage-100" />

            <div className="flex flex-col gap-5">
              {pathItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3.5 relative">
                  {/* State icon */}
                  <div
                    className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 z-10 ${
                      item.state === "done"
                        ? "bg-brand-500"
                        : item.state === "current"
                        ? "bg-white border-2 border-brand-500 shadow-[0_0_0_4px_rgba(42,168,101,0.12)]"
                        : "bg-white border border-sage-200"
                    }`}
                  >
                    {item.state === "done" && (
                      <Check size={14} className="text-white" strokeWidth={3} />
                    )}
                    {item.state === "current" && (
                      <BookOpen size={13} className="text-brand-500" strokeWidth={2.2} />
                    )}
                    {item.state === "locked" && (
                      <Lock size={12} className="text-sage-300" strokeWidth={2} />
                    )}
                  </div>

                  {/* Text */}
                  <div className={`flex-1 min-w-0 pt-0.5 ${item.state === "locked" ? "opacity-40" : ""}`}>
                    <p
                      className={`font-semibold text-[14px] leading-tight ${
                        item.state === "current" ? "text-forest-900" : "text-ink-800"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-[11.5px] text-ink-400 mt-0.5">
                      {item.author}
                      <span className="text-ink-300"> · {item.tag}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Discover More ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-[17px] text-forest-900">Discover More</p>
            <button className="text-[12px] font-semibold text-brand-600 hover:text-brand-700 transition-colors">
              View Gallery
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {discoverItems.map((book) => (
              <motion.div
                key={book.title}
                whileTap={{ scale: 0.97 }}
                className="rounded-[16px] overflow-hidden cursor-pointer shadow-[0_3px_18px_rgba(0,0,0,0.10)]"
                onClick={() => router.push("/home")}
              >
                <div className="h-[120px] relative" style={book.cover}>
                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.62) 100%)",
                    }}
                  />
                  {/* Text */}
                  <div className="absolute bottom-2.5 left-3 right-2">
                    <p className="text-[8px] font-bold tracking-[0.18em] text-white/55 uppercase">
                      {book.category}
                    </p>
                    <p className="font-bold text-[13px] text-white leading-tight mt-0.5">
                      {book.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.62, ease }}
          className="flex flex-col items-center gap-3 pb-2"
        >
          <motion.button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="w-full flex items-center justify-center gap-2 py-[17px] rounded-full bg-forest-900 hover:bg-forest-800 text-white font-semibold text-[15px] shadow-[0_4px_24px_rgba(15,35,18,0.28)] transition-colors"
          >
            {generating ? (
              <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            ) : (
              <>
                Generate My Custom Journey
                <ChevronRight size={18} strokeWidth={2.5} />
              </>
            )}
          </motion.button>

          <p className="text-center text-[10.5px] text-ink-300 leading-relaxed px-4">
            By continuing, you agree to our reading algorithm's personalized selection process.
          </p>
        </motion.div>
      </div>

      {/* ── Preview bottom nav (decorative) ────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm border-t border-sage-100 flex items-center justify-around py-4 z-40">
        <button className="text-brand-600">
          <BookOpen size={22} strokeWidth={1.8} />
        </button>
        <button className="text-ink-300">
          <Bookmark size={22} strokeWidth={1.8} />
        </button>
        <button className="text-ink-300">
          <User size={22} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

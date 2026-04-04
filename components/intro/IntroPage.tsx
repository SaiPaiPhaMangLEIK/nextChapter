"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

import HeroSection from "./HeroSection";
import CTAButtons from "./CTAButtons";
import FeatureCards from "./FeatureCards";
import TestimonialCard from "./TestimonialCard";
import CommunitySection from "./CommunitySection";
import IntroFooter from "./IntroFooter";

// ─────────────────────────────────────────────────────────────────────────────
// BOOK SPINE TEXTURE — warm amber / dark-brown / teal tones, like a real shelf
// The repeating pattern width (168px) approximates 5–6 books per shelf row.
// ─────────────────────────────────────────────────────────────────────────────
const WARM_SPINES = [
  "repeating-linear-gradient(",
  "  90deg,",
  "  rgba(188,128, 46, 0.52)   0px, rgba(188,128, 46, 0.52)  20px,",  // amber book
  "  rgba( 22, 12,  5, 0.68)  20px, rgba( 22, 12,  5, 0.68)  26px,",  // dark gap
  "  rgba(205,152, 54, 0.44)  26px, rgba(205,152, 54, 0.44)  52px,",  // lighter amber
  "  rgba( 48, 72, 40, 0.58)  52px, rgba( 48, 72, 40, 0.58)  70px,",  // teal green
  "  rgba(218,165, 60, 0.38)  70px, rgba(218,165, 60, 0.38)  94px,",  // gold
  "  rgba( 18, 10,  4, 0.72)  94px, rgba( 18, 10,  4, 0.72) 102px,",  // thin dark spine
  "  rgba(162,106, 38, 0.48) 102px, rgba(162,106, 38, 0.48) 124px,",  // amber-brown
  "  rgba( 58, 88, 50, 0.52) 124px, rgba( 58, 88, 50, 0.52) 146px,",  // sage green
  "  rgba(195,136, 48, 0.40) 146px, rgba(195,136, 48, 0.40) 162px,",  // warm amber
  "  rgba( 20, 12,  5, 0.70) 162px, rgba( 20, 12,  5, 0.70) 168px",   // gap
  ")",
].join("");

// Wooden shelf-board horizontal lines between book rows
const SHELF_BOARDS = [
  "repeating-linear-gradient(",
  "  180deg,",
  "  transparent                    0px, transparent                   90px,",
  "  rgba(255,220,160, 0.06)       90px, rgba(255,220,160, 0.06)      92px,",
  "  rgba( 10,  6,  2, 0.18)       92px, rgba( 10,  6,  2, 0.18)      96px,",
  "  rgba(255,220,160, 0.04)       96px, rgba(255,220,160, 0.04)      98px,",
  "  transparent                   98px, transparent                  188px,",
  "  rgba(255,220,160, 0.05)      188px, rgba(255,220,160, 0.05)     190px,",
  "  rgba( 10,  6,  2, 0.14)      190px, rgba( 10,  6,  2, 0.14)     194px",
  ")",
].join("");

// Dark-green overlay that makes text readable while warm texture bleeds through
const DARK_OVERLAY = [
  "linear-gradient(",
  "  180deg,",
  "  rgba(10,18,12, 0.86)   0%,",
  "  rgba(12,20,14, 0.82)  38%,",
  "  rgba(18,28,20, 0.58)  65%,",
  "  transparent          100%",
  ")",
].join("");

export default function IntroPage() {
  return (
    /*
     * Single full-page gradient that flows from deep forest at the top to
     * warm parchment below — including an amber/tan blend zone (~460–560px)
     * that echoes the warm bookshelf photo tones from the Figma.
     */
    <div
      className="min-h-screen"
      style={{
        background: [
          "linear-gradient(",
          "  180deg,",
          "  #121a0e   0px,",   // deepest forest
          "  #121a0e 340px,",   // hold through hero + CTAs
          "  #1c2a14 388px,",   // begin to lift
          "  #2e3c1c 426px,",   // mossy olive
          "  #4a4028 460px,",   // warm olive-brown — amber creeps in
          "  #786c4a 494px,",   // golden tan — bookshelf warmth
          "  #a89870 516px,",   // warm sand
          "  #c8b890 536px,",   // light sand
          "  #e4dac8 555px,",   // near-cream
          "  #f0e8d8 572px,",   // warm cream
          "  #f5f1ea 596px",    // full parchment
          ")",
        ].join(""),
      }}
    >
      <main className="max-w-lg mx-auto relative">

        {/* ── Warm bookshelf texture (dark zone only) ────────────────────────── */}
        <div
          aria-hidden
          className="absolute top-0 inset-x-0 pointer-events-none overflow-hidden"
          style={{ height: 580 }}
        >
          {/* Amber + teal book spines */}
          <div className="absolute inset-0" style={{ backgroundImage: WARM_SPINES }} />
          {/* Shelf boards between rows */}
          <div className="absolute inset-0" style={{ backgroundImage: SHELF_BOARDS }} />
          {/* Dark overlay keeps text readable */}
          <div className="absolute inset-0" style={{ backgroundImage: DARK_OVERLAY }} />
          {/* Green glow behind hero text */}
          <div
            className="absolute"
            style={{
              top: -80, left: -60, width: 400, height: 400, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(42,168,101,0.14) 0%, transparent 65%)",
            }}
          />
          {/* Warm amber glow — echoes the bookshelf photo warmth */}
          <div
            className="absolute"
            style={{
              top: 80, right: -40, width: 280, height: 280, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(200,140,50,0.10) 0%, transparent 70%)",
            }}
          />
          {/* Vignette: corners */}
          <div
            className="absolute top-0 right-0"
            style={{
              width: 200, height: 200,
              background: "radial-gradient(circle at top right, rgba(0,0,0,0.30) 0%, transparent 68%)",
            }}
          />
        </div>

        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 flex items-center justify-between px-6 pt-14"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-brand-500 flex items-center justify-center shadow-glow">
              <BookOpen size={14} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-[15px] font-semibold text-white tracking-[-0.01em]">
              NextChapter
            </span>
          </div>
        </motion.header>

        {/* ── Hero + CTAs ─────────────────────────────────────────────────────── */}
        <div className="relative z-10">
          <HeroSection />
          <CTAButtons />
        </div>

        {/* ── Feature cards ───────────────────────────────────────────────────── */}
        <FeatureCards />

        {/* ── Testimonial (floats on parchment) ───────────────────────────────── */}
        <TestimonialCard />

        {/* ── Community ───────────────────────────────────────────────────────── */}
        <CommunitySection />

        {/* ── Final CTA ───────────────────────────────────────────────────────── */}
        <CloserSection />

        {/* ── Footer ──────────────────────────────────────────────────────────── */}
        <IntroFooter />
      </main>
    </div>
  );
}

// ── Closing dark CTA panel ───────────────────────────────────────────────────

function CloserSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="px-5 pt-4 pb-6"
    >
      <div
        className="relative rounded-3xl px-6 py-8 overflow-hidden"
        style={{ background: "#121a0e" }}
      >
        {/* Warm texture bleed inside the dark panel */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: WARM_SPINES, opacity: 0.35 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: DARK_OVERLAY }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 85% 10%, rgba(42,168,101,0.22) 0%, transparent 55%)",
          }}
        />
        <div className="relative z-10">
          <div className="w-10 h-10 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center mb-4">
            <BookOpen size={18} className="text-brand-400" strokeWidth={1.8} />
          </div>
          <h3 className="text-[22px] font-bold text-white leading-tight tracking-tight">
            A system for<br />
            <span className="text-brand-300">reading better.</span>
          </h3>
          <p className="mt-2 text-[13px] text-white/50 leading-relaxed">
            Not just tracking books — understanding where each one leads you next.
          </p>
          <Link href="/onboarding" className="block mt-6">
            <button className="w-full py-3.5 rounded-full bg-brand-500 text-white text-[14px] font-semibold shadow-glow active:scale-[0.98] transition-all">
              Begin Your Journey
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

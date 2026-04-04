"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CTAButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.42, ease }}
      className="px-6 pb-10 flex flex-col gap-3"
    >
      {/* Primary — Get Started */}
      <Link href="/onboarding/step-1" className="block">
        <button className="relative w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-brand-600 text-white text-[15px] font-semibold shadow-glow active:scale-[0.98] transition-all duration-200 overflow-hidden group">
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          Get Started
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </button>
      </Link>

      {/* Secondary — Sign In → custom sign-in page */}
      <Link href="/onboarding/signin" className="block">
        <button className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[15px] font-medium active:scale-[0.98] transition-all duration-200 hover:bg-white/15">
          Sign In
        </button>
      </Link>

      {/* Friction-reducer hint */}
      <p className="text-center text-[11px] text-white/30 font-medium tracking-wide mt-1">
        Takes less than 1 minute · Free to start
      </p>
    </motion.div>
  );
}

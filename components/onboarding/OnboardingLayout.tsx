"use client";

import { motion } from "framer-motion";
import OnboardingProgress from "./OnboardingProgress";

interface OnboardingLayoutProps {
  /** Current step number (1-based) */
  step: number;
  /** Total number of steps */
  totalSteps?: number;
  /** ReactNode allows green-highlighted words in the heading */
  titleNode: React.ReactNode;
  subtitle?: string;
  skipHref?: string;
  onSkip?: () => void;
  backHref?: string;
  onBack?: () => void;
  children: React.ReactNode;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function OnboardingLayout({
  step,
  totalSteps = 11,
  titleNode,
  subtitle,
  skipHref,
  onSkip,
  backHref,
  onBack,
  children,
}: OnboardingLayoutProps) {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #DCF0DC 0%, #F1F5EB 45%, #F8FAF3 100%)",
      }}
    >
      {/* ── Progress header ──────────────────────────────────────── */}
      <OnboardingProgress
        current={step}
        total={totalSteps}
        skipHref={skipHref}
        onSkip={onSkip}
        backHref={backHref}
        onBack={onBack}
      />

      {/* ── Title section ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease }}
        className="px-6 pt-8 pb-6"
      >
        <h1 className="font-bold text-[30px] leading-[1.18] tracking-tight text-forest-900">
          {titleNode}
        </h1>
        {subtitle && (
          <p className="mt-3 text-[14px] text-ink-400 leading-[1.6] max-w-[300px]">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* ── Content (option cards etc.) ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18, ease }}
        className="px-5 pb-32"  // pb-32 leaves room for fixed Continue button
      >
        {children}
      </motion.div>
    </div>
  );
}

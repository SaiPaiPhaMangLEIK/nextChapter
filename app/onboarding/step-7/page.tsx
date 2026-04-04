"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookText,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Sparkles,
  BrainCircuit,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import ContinueButton from "@/components/onboarding/ContinueButton";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type ReadingDepth = "easy" | "balanced" | "challenging";

// ─── Data ────────────────────────────────────────────────────────────────────

interface DepthOption {
  id: ReadingDepth;
  label: string;
  description: string;
  icon: React.ReactNode;
  decorIcon: React.ReactNode;
  recommended?: boolean;
}

const OPTIONS: DepthOption[] = [
  {
    id: "easy",
    label: "Easy",
    description:
      "Light, digestible summaries and key takeaways. Perfect for quick morning updates or casual exploration.",
    icon: <BookText size={22} strokeWidth={1.7} />,
    decorIcon: <Lightbulb size={52} strokeWidth={1.1} />,
  },
  {
    id: "balanced",
    label: "Balanced",
    description:
      "Moderate depth with editorial commentary and structural insights. The sweet spot for daily growth.",
    icon: <BookOpen size={22} strokeWidth={1.7} />,
    decorIcon: <Sparkles size={52} strokeWidth={1.1} />,
    recommended: true,
  },
  {
    id: "challenging",
    label: "Challenging",
    description:
      "Deep dives into dense literature, technical whitepapers, and philosophical texts. For the focused scholar.",
    icon: <GraduationCap size={22} strokeWidth={1.7} />,
    decorIcon: <BrainCircuit size={52} strokeWidth={1.1} />,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

// ─── DepthCard ────────────────────────────────────────────────────────────────

interface DepthCardProps {
  option: DepthOption;
  selected: boolean;
  onSelect: () => void;
}

function DepthCard({ option, selected, onSelect }: DepthCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.985 }}
      animate={selected ? { scale: 1.02 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={cn(
        "relative w-full text-left rounded-[22px] bg-white p-5 overflow-hidden transition-all duration-200",
        selected
          ? "border-2 border-forest-800 shadow-[0_4px_28px_rgba(22,47,25,0.18)]"
          : "border border-[#e2ebe0] shadow-[0_1px_8px_rgba(0,0,0,0.05)]"
      )}
    >
      {/* ── Decorative icon — top right, faded ──────────────────────── */}
      <div
        className={cn(
          "absolute top-4 right-4 pointer-events-none transition-colors duration-300",
          selected ? "text-brand-200" : "text-[#d8e8d4]"
        )}
        aria-hidden="true"
      >
        {option.decorIcon}
      </div>

      {/* ── Icon circle + badge row ──────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={cn(
            "w-11 h-11 flex items-center justify-center rounded-2xl shrink-0 transition-colors duration-200",
            selected ? "bg-brand-100" : "bg-[#e8f2e5]"
          )}
        >
          <span
            className={cn(
              "transition-colors duration-200",
              selected ? "text-brand-600" : "text-sage-600"
            )}
          >
            {option.icon}
          </span>
        </div>

        {/* RECOMMENDED badge — only on balanced */}
        {option.recommended && (
          <span className="text-[9px] font-bold tracking-[0.14em] uppercase bg-brand-100 text-brand-600 px-2.5 py-1 rounded-full">
            RECOMMENDED
          </span>
        )}
      </div>

      {/* ── Title ──────────────────────────────────────────────────────── */}
      <p
        className={cn(
          "font-bold text-[17px] leading-tight transition-colors duration-200",
          selected ? "text-forest-900" : "text-ink-900"
        )}
      >
        {option.label}
      </p>

      {/* ── Description ────────────────────────────────────────────────── */}
      <p className="text-[13px] text-ink-400 leading-relaxed mt-1.5 max-w-[240px]">
        {option.description}
      </p>

      {/* ── Selected check badge ───────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center"
          >
            <Check size={11} className="text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StepSevenDepth() {
  const router = useRouter();
  const [selected, setSelected] = useState<ReadingDepth>("balanced");
  const [loading, setLoading] = useState(false);

  function handleConfirm() {
    setLoading(true);
    try {
      const existing = JSON.parse(
        localStorage.getItem("onboarding_state") ?? "{}"
      );
      localStorage.setItem(
        "onboarding_state",
        JSON.stringify({ ...existing, readingDepth: selected })
      );
    } catch {
      // ignore storage errors
    }
    router.push("/home");
  }

  return (
    <>
      <OnboardingLayout
        step={7}
        totalSteps={11}
        titleNode={
          <>
            What level do you{" "}
            <em className="text-brand-500 not-italic font-bold">prefer?</em>
          </>
        }
        subtitle="Tailor your reading journey. Choose a pace and complexity that aligns with your current focus and cognitive bandwidth."
        skipHref="/home"
        backHref="/onboarding/step-6"
      >
        {/* ── Depth option cards ──────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {OPTIONS.map((option, i) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.2 + i * 0.08, ease }}
            >
              <DepthCard
                option={option}
                selected={selected === option.id}
                onSelect={() => setSelected(option.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Footer hint ─────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55, ease }}
          className="text-center text-[11px] font-medium tracking-widest uppercase text-ink-300 mt-7"
        >
          You can adjust this later in settings.
        </motion.p>
      </OnboardingLayout>

      {/* ── Confirm button ──────────────────────────────────────────────── */}
      <ContinueButton
        onClick={handleConfirm}
        label="Confirm Selection"
        loading={loading}
      />
    </>
  );
}

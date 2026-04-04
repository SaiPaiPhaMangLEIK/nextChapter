"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  TrendingUp,
  Briefcase,
  Brain,
  ChevronRight,
} from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import TopicCard from "@/components/onboarding/TopicCard";
import GenrePill from "@/components/onboarding/GenrePill";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────────────────────

const PRIMARY_TOPICS = [
  {
    id: "philosophy",
    title: "Philosophy",
    icon: <BookOpen size={22} strokeWidth={1.7} />,
  },
  {
    id: "self-development",
    title: "Self-development",
    icon: <TrendingUp size={22} strokeWidth={1.7} />,
  },
  {
    id: "business",
    title: "Business",
    icon: <Briefcase size={22} strokeWidth={1.7} />,
  },
  {
    id: "psychology",
    title: "Psychology",
    icon: <Brain size={22} strokeWidth={1.7} />,
  },
] as const;

const MORE_GENRES = [
  { id: "fiction", label: "Fiction" },
  { id: "fantasy", label: "Fantasy" },
  { id: "history", label: "History" },
  { id: "science", label: "Science" },
  { id: "art", label: "Art" },
  { id: "travel", label: "Travel" },
] as const;

const MIN = 3;

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StepTwoInterests() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const shakeControls = useAnimation();

  // Smart pre-selection based on step-1 reader type
  useEffect(() => {
    try {
      const state = JSON.parse(
        localStorage.getItem("onboarding_state") ?? "{}"
      );
      const rt = state.readerType as string | undefined;
      if (rt === "fiction") {
        setSelected(new Set(["fiction", "fantasy"]));
      } else if (rt === "non-fiction") {
        setSelected(new Set(["business", "psychology"]));
      }
    } catch {
      // ignore
    }
  }, []);

  function toggle(id: string) {
    setShowError(false);
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function handleContinue() {
    if (selected.size < MIN) {
      setShowError(true);
      await shakeControls.start({
        x: [0, -10, 10, -7, 7, -4, 4, 0],
        transition: { duration: 0.48, ease: "easeInOut" },
      });
      return;
    }

    setLoading(true);
    try {
      const existing = JSON.parse(
        localStorage.getItem("onboarding_state") ?? "{}"
      );
      localStorage.setItem(
        "onboarding_state",
        JSON.stringify({ ...existing, topics: Array.from(selected) })
      );
    } catch {
      // ignore
    }
    router.push("/onboarding/step-3");
  }

  const count = selected.size;
  const ready = count >= MIN;

  const titleNode = (
    <>
      What topics{" "}
      <em className="not-italic font-bold text-brand-600 font-serif">
        interest
      </em>{" "}
      you?
    </>
  );

  return (
    <>
      <OnboardingLayout
        step={2}
        totalSteps={11}
        titleNode={titleNode}
        subtitle="We'll curate your library based on your curiosities. Choose at least three to get started."
        skipHref="/home"
        backHref="/onboarding/step-1"
      >
        {/* ── Primary topic grid ────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {PRIMARY_TOPICS.map(({ id, title, icon }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.22 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TopicCard
                icon={icon}
                title={title}
                selected={selected.has(id)}
                onSelect={() => toggle(id)}
              />
            </motion.div>
          ))}
        </div>

        {/* ── More genres ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/55 rounded-[20px] p-4 border border-white/80"
        >
          <p className="text-[9px] font-bold tracking-[0.20em] text-sage-400 uppercase mb-3">
            More Genres
          </p>
          <div className="flex flex-wrap gap-2">
            {MORE_GENRES.map(({ id, label }) => (
              <GenrePill
                key={id}
                label={label}
                selected={selected.has(id)}
                onSelect={() => toggle(id)}
              />
            ))}
          </div>
        </motion.div>
      </OnboardingLayout>

      {/* ── Fixed bottom bar ──────────────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-50 pointer-events-none">
        {/* Fade mask */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(245,242,235,0.97) 0%, rgba(245,242,235,0.80) 55%, transparent 100%)",
          }}
        />

        <div className="relative flex flex-col items-center pb-10 pt-3 gap-2.5 pointer-events-auto">
          {/* Dynamic counter / error message */}
          <motion.div animate={shakeControls}>
            {showError ? (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[13px] font-semibold text-red-500"
              >
                Select at least 3 topics to continue
              </motion.p>
            ) : (
              <p
                className={cn(
                  "text-[13px] font-medium transition-colors duration-300",
                  ready ? "text-brand-600" : "text-ink-400"
                )}
              >
                {ready
                  ? `${count} topics selected ✓`
                  : `${count} of ${MIN} selected`}
              </p>
            )}
          </motion.div>

          {/* Continue button */}
          <motion.button
            type="button"
            onClick={handleContinue}
            disabled={loading}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className={cn(
              "flex items-center gap-2 px-9 py-[17px] rounded-full",
              "text-[15px] font-semibold text-white transition-all duration-300 shadow-lg",
              ready
                ? "bg-forest-900 hover:bg-forest-800 shadow-[0_4px_24px_rgba(15,35,18,0.30)]"
                : "bg-sage-300 opacity-75 cursor-not-allowed"
            )}
          >
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            ) : (
              <>
                Continue
                <ChevronRight size={18} strokeWidth={2.5} />
              </>
            )}
          </motion.button>
        </div>

        {/* Footer hint */}
        <p className="relative text-center text-[11px] text-ink-300 pb-7 pointer-events-none px-6">
          You can change these preferences anytime in settings.
        </p>
      </div>
    </>
  );
}

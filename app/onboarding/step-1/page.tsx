"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Lightbulb, Infinity as InfinityIcon } from "lucide-react";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import OptionCard from "@/components/onboarding/OptionCard";
import ContinueButton from "@/components/onboarding/ContinueButton";
import { motion } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

type ReaderType = "fiction" | "non-fiction" | "both";

const OPTIONS: {
  id: ReaderType;
  title: string;
  description: string;
  icon: React.ReactNode;
  layout: "vertical" | "horizontal";
}[] = [
  {
    id: "fiction",
    title: "Fiction",
    description: "Imaginative worlds, character-driven sagas, and poetic prose.",
    icon: <BookOpen size={20} strokeWidth={1.8} />,
    layout: "vertical",
  },
  {
    id: "non-fiction",
    title: "Non-fiction",
    description: "Real-world insights, history, science, and personal growth.",
    icon: <Lightbulb size={20} strokeWidth={1.8} />,
    layout: "vertical",
  },
  {
    id: "both",
    title: "Both",
    description:
      "An eclectic appetite for all forms of storytelling and knowledge.",
    icon: <InfinityIcon size={20} strokeWidth={1.8} />,
    layout: "horizontal",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StepOneReaderType() {
  const router = useRouter();
  const [selected, setSelected] = useState<ReaderType | null>(null);
  const [loading, setLoading] = useState(false);

  function handleContinue() {
    if (!selected) return;
    setLoading(true);
    // Persist to localStorage for later backend sync
    try {
      const existing = JSON.parse(
        localStorage.getItem("onboarding_state") ?? "{}"
      );
      localStorage.setItem(
        "onboarding_state",
        JSON.stringify({ ...existing, readerType: selected })
      );
    } catch {
      // ignore storage errors
    }
    router.push("/onboarding/step-2");
  }

  // Title node with green-highlighted "reader"
  const titleNode = (
    <>
      What kind of{" "}
      <span className="text-brand-600">reader</span>{" "}
      are you?
    </>
  );

  return (
    <>
      <OnboardingLayout
        step={1}
        totalSteps={11}
        titleNode={titleNode}
        subtitle="This helps us tailor your library with books that match your intellectual curiosity."
        skipHref="/home"
      >
        {/* ── Option cards ──────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {OPTIONS.map(({ id, title, description, icon, layout }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.22 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <OptionCard
                icon={icon}
                title={title}
                description={description}
                selected={selected === id}
                onSelect={() => setSelected(id)}
                layout={layout}
              />
            </motion.div>
          ))}
        </div>
      </OnboardingLayout>

      {/* ── Fixed Continue button ─────────────────────────────────── */}
      <ContinueButton
        onClick={handleContinue}
        disabled={!selected}
        loading={loading}
      />
    </>
  );
}

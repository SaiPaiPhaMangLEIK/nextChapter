"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Leaf,
  Brain,
  Clock,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import OptionCard from "@/components/onboarding/OptionCard";
import ContinueButton from "@/components/onboarding/ContinueButton";

// ─── Data ────────────────────────────────────────────────────────────────────

type Motivation =
  | "learn"
  | "relax"
  | "improve-thinking"
  | "build-habits"
  | "explore-ideas";

const OPTIONS: {
  id: Motivation;
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "learn",
    title: "Learn",
    description: "Gain new knowledge and skills",
    icon: <GraduationCap size={20} strokeWidth={1.8} />,
  },
  {
    id: "relax",
    title: "Relax",
    description: "Unwind and escape daily stress",
    icon: <Leaf size={20} strokeWidth={1.8} />,
  },
  {
    id: "improve-thinking",
    title: "Improve thinking",
    description: "Sharpens logic, empathy, and focus",
    icon: <Brain size={20} strokeWidth={1.8} />,
  },
  {
    id: "build-habits",
    title: "Build habits",
    description: "Create a consistent daily routine",
    icon: <Clock size={20} strokeWidth={1.8} />,
  },
  {
    id: "explore-ideas",
    title: "Explore ideas",
    description: "Discover new worlds and concepts",
    icon: <Rocket size={20} strokeWidth={1.8} />,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StepThreeMotivation() {
  const router = useRouter();
  const [selected, setSelected] = useState<Motivation | null>(null);
  const [loading, setLoading] = useState(false);

  function handleContinue() {
    if (!selected) return;
    setLoading(true);
    try {
      const existing = JSON.parse(
        localStorage.getItem("onboarding_state") ?? "{}"
      );
      localStorage.setItem(
        "onboarding_state",
        JSON.stringify({ ...existing, readingMotivation: selected })
      );
    } catch {
      // ignore
    }
    router.push("/onboarding/step-4");
  }

  return (
    <>
      <OnboardingLayout
        step={3}
        totalSteps={11}
        titleNode="Why do you read?"
        subtitle="Choose your primary motivation. We'll curate your library to match your intent."
        skipHref="/home"
        backHref="/onboarding/step-2"
      >
        {/* ── Hint ─────────────────────────────────────────────────── */}
        <p className="text-[11px] text-ink-300 mb-4 -mt-2">
          You can change this later
        </p>

        {/* ── Option cards ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 mb-6">
          {OPTIONS.map(({ id, title, description, icon }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.22 + i * 0.07, ease }}
            >
              <motion.div
                animate={selected === id ? { scale: 1.015 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              >
                <OptionCard
                  icon={icon}
                  title={title}
                  description={description}
                  selected={selected === id}
                  onSelect={() => setSelected(id)}
                  layout="horizontal"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ── Decorative book illustration ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease }}
          className="relative h-[160px] rounded-[24px] overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, #e8d5c0 0%, #d9c4a8 35%, #c8ad90 65%, #b89a7a 100%)",
          }}
          aria-hidden="true"
        >
          {/* Ambient light */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,248,240,0.45) 0%, transparent 70%)",
            }}
          />

          {/* Open book viewed from above */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] h-[140px]">
            {/* Left page */}
            <div
              className="absolute left-0 top-4 w-[102px] h-[130px] rounded-tl-[3px] rounded-bl-[3px]"
              style={{
                background:
                  "linear-gradient(100deg, #f5ede0 0%, #efe4d0 80%, #e8d8c0 100%)",
                boxShadow: "inset -3px 0 12px rgba(0,0,0,0.07)",
                transformOrigin: "right top",
                transform: "perspective(500px) rotateX(12deg) rotateY(6deg)",
              }}
            >
              {[...Array(7)].map((_, j) => (
                <div
                  key={j}
                  className="mx-4 rounded-full bg-[#b8a090]/25"
                  style={{ height: 2, marginTop: j === 0 ? 14 : 8 }}
                />
              ))}
              <div
                className="mx-4 mt-4 rounded-full bg-[#b8a090]/15"
                style={{ height: 2, width: "60%" }}
              />
            </div>

            {/* Spine */}
            <div
              className="absolute top-4 w-[16px] h-[130px]"
              style={{
                left: "calc(50% - 8px)",
                background:
                  "linear-gradient(to right, #c4a882, #d4b892, #c4a882)",
                transform: "perspective(500px) rotateX(12deg)",
              }}
            />

            {/* Right page */}
            <div
              className="absolute right-0 top-4 w-[102px] h-[130px] rounded-tr-[3px] rounded-br-[3px]"
              style={{
                background:
                  "linear-gradient(80deg, #e8d8c0 0%, #efe4d0 20%, #f5ede0 100%)",
                boxShadow: "inset 3px 0 12px rgba(0,0,0,0.04)",
                transformOrigin: "left top",
                transform: "perspective(500px) rotateX(12deg) rotateY(-6deg)",
              }}
            >
              {[...Array(7)].map((_, j) => (
                <div
                  key={j}
                  className="mx-4 rounded-full bg-[#b8a090]/25"
                  style={{ height: 2, marginTop: j === 0 ? 14 : 8 }}
                />
              ))}
              <div
                className="mx-4 mt-4 rounded-full bg-[#b8a090]/15"
                style={{ height: 2, width: "45%" }}
              />
            </div>
          </div>

          {/* Bottom fade for depth */}
          <div
            className="absolute bottom-0 inset-x-0 h-12 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(160,120,80,0.30), transparent)",
            }}
          />
        </motion.div>
      </OnboardingLayout>

      {/* ── Continue button ───────────────────────────────────────────── */}
      <ContinueButton
        onClick={handleContinue}
        disabled={!selected}
        loading={loading}
      />
    </>
  );
}

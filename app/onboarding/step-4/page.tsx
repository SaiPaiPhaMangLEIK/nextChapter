"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Files, BookOpen, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import VolumeCard from "@/components/onboarding/VolumeCard";
import ContinueButton from "@/components/onboarding/ContinueButton";

// ─── Data ────────────────────────────────────────────────────────────────────

type Volume = "1-10" | "10-20" | "20-50" | "50+";
type ReadingLevel = "light" | "moderate" | "active" | "intensive";

const VOLUME_MAP: Record<Volume, ReadingLevel> = {
  "1-10": "light",
  "10-20": "moderate",
  "20-50": "active",
  "50+": "intensive",
};

const OPTIONS: {
  id: Volume;
  icon: React.ReactNode;
}[] = [
  { id: "1-10",  icon: <FileText  size={22} strokeWidth={1.7} /> },
  { id: "10-20", icon: <Files     size={22} strokeWidth={1.7} /> },
  { id: "20-50", icon: <BookOpen  size={22} strokeWidth={1.7} /> },
  { id: "50+",   icon: <Rocket    size={22} strokeWidth={1.7} /> },
];

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StepFourVolume() {
  const router = useRouter();
  const [selected, setSelected] = useState<Volume | null>(null);
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
        JSON.stringify({
          ...existing,
          readingVolume: selected,
          readingLevel: VOLUME_MAP[selected],
        })
      );
    } catch {
      // ignore
    }
    router.push("/onboarding/step-5");
  }

  return (
    <>
      <OnboardingLayout
        step={4}
        totalSteps={11}
        titleNode="How many pages do you read per session?"
        subtitle="This helps us curate reading lists that fit perfectly into your daily rhythm."
        skipHref="/home"
        backHref="/onboarding/step-3"
      >
        {/* ── Helper text ───────────────────────────────────────────── */}
        <p className="text-[11px] text-ink-300 -mt-2 mb-5">
          We'll use this to suggest realistic reading goals.
        </p>

        {/* ── Volume card grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {OPTIONS.map(({ id, icon }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.2 + i * 0.07, ease }}
            >
              <VolumeCard
                icon={icon}
                range={id}
                selected={selected === id}
                onSelect={() => setSelected(id)}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Quote card ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55, ease }}
          className="relative h-[156px] rounded-[22px] overflow-hidden"
          aria-hidden="true"
          style={{ background: "linear-gradient(145deg, #d8d4ce 0%, #c8c4bc 40%, #b8b4ac 100%)" }}
        >
          {/* Ambient vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 70% 20%, rgba(255,255,255,0.22) 0%, transparent 65%)",
            }}
          />

          {/* Reading figure — SVG silhouette */}
          <div className="absolute bottom-0 right-4 w-[110px] h-[140px] opacity-30">
            <svg viewBox="0 0 110 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="55" cy="22" rx="16" ry="18" fill="#6b6560" />
              <path d="M39 20 Q42 4 55 4 Q68 4 71 20 Q68 12 55 11 Q42 12 39 20Z" fill="#4a4540" />
              <rect x="44" y="20" width="9" height="6" rx="3" stroke="#4a4540" strokeWidth="1.5" fill="none" />
              <rect x="57" y="20" width="9" height="6" rx="3" stroke="#4a4540" strokeWidth="1.5" fill="none" />
              <line x1="53" y1="23" x2="57" y2="23" stroke="#4a4540" strokeWidth="1.5" />
              <path d="M30 55 Q32 42 55 40 Q78 42 80 55 L82 90 Q55 95 28 90Z" fill="#7a7570" />
              <path d="M30 60 Q20 72 22 85 L36 82 Q32 74 38 68Z" fill="#8a8580" />
              <path d="M80 60 Q90 72 88 85 L74 82 Q78 74 72 68Z" fill="#8a8580" />
              <path d="M24 82 Q55 78 55 82 Q55 78 86 82 L84 108 Q55 104 55 108 Q55 104 26 108Z" fill="#e8e4dc" />
              <line x1="55" y1="82" x2="55" y2="108" stroke="#b8b4ac" strokeWidth="1" />
              <line x1="30" y1="89" x2="52" y2="88" stroke="#b0aca4" strokeWidth="1" />
              <line x1="30" y1="94" x2="52" y2="93" stroke="#b0aca4" strokeWidth="1" />
              <line x1="30" y1="99" x2="48" y2="98" stroke="#b0aca4" strokeWidth="1" />
              <line x1="58" y1="88" x2="80" y2="89" stroke="#b0aca4" strokeWidth="1" />
              <line x1="58" y1="93" x2="80" y2="94" stroke="#b0aca4" strokeWidth="1" />
              <line x1="58" y1="98" x2="76" y2="99" stroke="#b0aca4" strokeWidth="1" />
            </svg>
          </div>

          {/* Quote text */}
          <div className="absolute bottom-5 left-5 right-[100px]">
            <p className="font-serif italic text-[13px] leading-[1.55] text-ink-600/80">
              "A reader lives a thousand lives before he dies."
            </p>
          </div>

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 inset-x-0 h-8 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.08), transparent)" }}
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

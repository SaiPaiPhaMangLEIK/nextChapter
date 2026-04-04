"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, CalendarDays, Coffee, Library } from "lucide-react";
import { motion } from "framer-motion";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import OptionCard from "@/components/onboarding/OptionCard";
import ContinueButton from "@/components/onboarding/ContinueButton";

// ─── Data ────────────────────────────────────────────────────────────────────

type Frequency = "daily" | "weekly" | "occasionally" | "rarely";

const OPTIONS: {
  id: Frequency;
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "daily",
    title: "Daily",
    description: "A chapter a day keeps the world away.",
    icon: <BookOpen size={20} strokeWidth={1.8} />,
  },
  {
    id: "weekly",
    title: "Weekly",
    description: "Consistency is the key to deep immersion.",
    icon: <CalendarDays size={20} strokeWidth={1.8} />,
  },
  {
    id: "occasionally",
    title: "Occasionally",
    description: "Reading as a special treat for slow days.",
    icon: <Coffee size={20} strokeWidth={1.8} />,
  },
  {
    id: "rarely",
    title: "Rarely",
    description: "Starting a fresh journey once in a while.",
    icon: <Library size={20} strokeWidth={1.8} />,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StepFiveFrequency() {
  const router = useRouter();
  const [selected, setSelected] = useState<Frequency | null>(null);
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
        JSON.stringify({ ...existing, readingFrequency: selected })
      );
    } catch {
      // ignore
    }
    router.push("/onboarding/loading");
  }

  return (
    <>
      <OnboardingLayout
        step={5}
        totalSteps={11}
        titleNode="How often do you read?"
        subtitle="Help us tailor your reading journey to match your rhythm."
        skipHref="/home"
        backHref="/onboarding/step-4"
      >
        {/* ── Option cards ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 mb-6">
          {OPTIONS.map(({ id, title, description, icon }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.2 + i * 0.07, ease }}
            >
              <motion.div
                animate={selected === id ? { scale: 1.02 } : { scale: 1 }}
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

        {/* ── Decorative bookshelf ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55, ease }}
          className="relative h-[130px] rounded-[22px] overflow-hidden"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(160deg, #d0cdc8 0%, #c4c0ba 50%, #b8b4ae 100%)",
          }}
        >
          {/* Ambient light */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 30% 25%, rgba(255,255,255,0.18) 0%, transparent 70%)",
            }}
          />

          {/* Bookshelf SVG */}
          <div className="absolute inset-0 flex items-end justify-center pb-0 opacity-35">
            <svg
              viewBox="0 0 280 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Shelf plank */}
              <rect x="10" y="88" width="260" height="7" rx="2" fill="#8a847c" />

              {/* Book 1 — tall dark */}
              <rect x="20" y="44" width="18" height="44" rx="2" fill="#5a5550" />
              <rect x="20" y="44" width="3" height="44" fill="#4a4540" />
              <line x1="22" y1="52" x2="22" y2="82" stroke="#3a3530" strokeWidth="0.5" />

              {/* Book 2 — medium warm */}
              <rect x="40" y="54" width="14" height="34" rx="2" fill="#7a6e60" />
              <rect x="40" y="54" width="2.5" height="34" fill="#6a5e50" />

              {/* Book 3 — short light */}
              <rect x="56" y="64" width="16" height="24" rx="2" fill="#9a9488" />
              <rect x="56" y="64" width="2.5" height="24" fill="#8a8478" />

              {/* Book 4 — tall medium */}
              <rect x="74" y="48" width="20" height="40" rx="2" fill="#6a6860" />
              <rect x="74" y="48" width="3" height="40" fill="#5a5850" />
              <line x1="84" y1="56" x2="84" y2="82" stroke="#4a4840" strokeWidth="0.8" strokeDasharray="2,2" />

              {/* Tilted book */}
              <g transform="rotate(-8 108 88)">
                <rect x="96" y="60" width="14" height="30" rx="1.5" fill="#887870" />
                <rect x="96" y="60" width="2" height="30" fill="#786860" />
              </g>

              {/* Book 5 */}
              <rect x="114" y="52" width="16" height="36" rx="2" fill="#7c7468" />
              <rect x="114" y="52" width="2.5" height="36" fill="#6c6458" />

              {/* Book 6 — wide */}
              <rect x="132" y="58" width="22" height="30" rx="2" fill="#908880" />
              <rect x="132" y="58" width="3" height="30" fill="#807870" />
              <line x1="143" y1="63" x2="143" y2="83" stroke="#706860" strokeWidth="0.8" />

              {/* Small bookend object */}
              <rect x="156" y="78" width="10" height="10" rx="5" fill="#a09890" />

              {/* Book 7 */}
              <rect x="168" y="50" width="18" height="38" rx="2" fill="#686460" />
              <rect x="168" y="50" width="2.5" height="38" fill="#585450" />

              {/* Book 8 — short */}
              <rect x="188" y="66" width="14" height="22" rx="2" fill="#a49c94" />

              {/* Book 9 */}
              <rect x="204" y="46" width="20" height="42" rx="2" fill="#5e5c58" />
              <rect x="204" y="46" width="3" height="42" fill="#4e4c48" />
              <line x1="214" y1="54" x2="214" y2="82" stroke="#3e3c38" strokeWidth="0.8" strokeDasharray="3,2" />

              {/* Book 10 */}
              <rect x="226" y="56" width="16" height="32" rx="2" fill="#847c74" />
              <rect x="226" y="56" width="2.5" height="32" fill="#746c64" />

              {/* Book 11 — tall */}
              <rect x="244" y="42" width="18" height="46" rx="2" fill="#6e6a64" />
              <rect x="244" y="42" width="3" height="46" fill="#5e5a54" />
            </svg>
          </div>

          {/* Bottom shadow */}
          <div
            className="absolute bottom-0 inset-x-0 h-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.12), transparent)",
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

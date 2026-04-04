"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Check, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const GENRES = [
  "Self-Help", "Psychology", "Business", "History",
  "Science", "Philosophy", "Fiction", "Biography",
  "Technology", "Health", "Finance", "Spirituality",
];

const GOALS = [
  { value: 6, label: "Casual", desc: "6 books / year" },
  { value: 12, label: "Steady", desc: "12 books / year" },
  { value: 24, label: "Avid", desc: "24 books / year" },
  { value: 52, label: "Voracious", desc: "52 books / year" },
];

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  function toggleGenre(g: string) {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  }

  async function handleFinish() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/home");
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col px-6 py-12 max-w-lg mx-auto">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center">
          <BookOpen size={16} className="text-white" />
        </div>
        <span className="text-[17px] font-bold text-ink-700">NextChapter</span>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all",
                step >= s
                  ? "bg-brand-600 text-white"
                  : "bg-sage-100 text-ink-400"
              )}
            >
              {step > s ? <Check size={14} /> : s}
            </div>
            {s < 2 && (
              <div className={cn("flex-1 h-0.5 w-12 rounded", step > s ? "bg-brand-300" : "bg-sage-200")} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Genre selection */}
      {step === 1 && (
        <div className="animate-fade-in flex-1">
          <h1 className="text-[22px] font-bold text-ink-700 leading-tight mb-1">
            What do you love reading?
          </h1>
          <p className="text-sm text-ink-400 mb-6">Pick 3 or more genres to personalize your experience.</p>

          <div className="flex flex-wrap gap-2.5">
            {GENRES.map((genre) => {
              const active = selectedGenres.includes(genre);
              return (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={cn(
                    "px-4 py-2.5 rounded-2xl text-sm font-medium border-2 transition-all duration-200",
                    active
                      ? "bg-brand-600 text-white border-brand-600 shadow-float"
                      : "bg-white text-ink-600 border-sage-200 shadow-card"
                  )}
                >
                  {active && <Check size={12} className="inline mr-1.5 -mt-0.5" />}
                  {genre}
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-8">
            <Button
              variant="primary"
              size="xl"
              fullWidth
              disabled={selectedGenres.length < 3}
              icon={<ArrowRight size={18} />}
              className="flex-row-reverse gap-2"
              onClick={() => setStep(2)}
            >
              Continue ({selectedGenres.length} selected)
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Reading goal */}
      {step === 2 && (
        <div className="animate-fade-in flex-1">
          <h1 className="text-[22px] font-bold text-ink-700 leading-tight mb-1">
            Set your reading goal
          </h1>
          <p className="text-sm text-ink-400 mb-6">How many books do you want to read this year?</p>

          <div className="space-y-3">
            {GOALS.map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setSelectedGoal(value)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-200",
                  selectedGoal === value
                    ? "bg-brand-50 border-brand-300 shadow-float"
                    : "bg-white border-sage-200 shadow-card"
                )}
              >
                <div>
                  <p
                    className={cn(
                      "text-[15px] font-semibold",
                      selectedGoal === value ? "text-brand-600" : "text-ink-700"
                    )}
                  >
                    {label}
                  </p>
                  <p className="text-xs text-ink-400 mt-0.5">{desc}</p>
                </div>
                {selectedGoal === value && (
                  <div className="w-7 h-7 rounded-xl bg-brand-600 flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <Button
              variant="primary"
              size="xl"
              fullWidth
              disabled={!selectedGoal}
              loading={loading}
              onClick={handleFinish}
            >
              Start My Journey
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface OnboardingProgressProps {
  current: number;
  total: number;
  skipHref?: string;
  onSkip?: () => void;
  backHref?: string;
  onBack?: () => void;
}

export default function OnboardingProgress({
  current,
  total,
  skipHref = "/home",
  onSkip,
  backHref,
  onBack,
}: OnboardingProgressProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="flex items-center gap-3 px-6 pt-14 pb-2">
      {/* Back button */}
      {(backHref || onBack) && (
        backHref ? (
          <Link
            href={backHref}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/70 border border-white shadow-sm text-ink-600 hover:text-ink-900 transition-colors shrink-0"
          >
            <ArrowLeft size={16} strokeWidth={2} />
          </Link>
        ) : (
          <button
            onClick={onBack}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/70 border border-white shadow-sm text-ink-600 hover:text-ink-900 transition-colors shrink-0"
          >
            <ArrowLeft size={16} strokeWidth={2} />
          </button>
        )
      )}

      {/* Centre: bar only */}
      <div className="flex-1 min-w-0">
        <div className="h-[3px] bg-sage-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Right: Skip */}
      {skipHref && !onSkip ? (
        <Link
          href={skipHref}
          className="text-[13px] font-medium text-ink-400 hover:text-ink-600 transition-colors shrink-0"
        >
          Skip
        </Link>
      ) : (
        <button
          onClick={onSkip}
          className="text-[13px] font-medium text-ink-400 hover:text-ink-600 transition-colors shrink-0"
        >
          Skip
        </button>
      )}
    </div>
  );
}

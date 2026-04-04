"use client";

// Placeholder — Step 6 will be built when its Figma is provided
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function StepSix() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-6"
      style={{
        background:
          "linear-gradient(180deg, #DCF0DC 0%, #F1F5EB 45%, #F8FAF3 100%)",
      }}
    >
      <div className="text-center">
        <p className="text-xs font-semibold tracking-[0.18em] text-sage-400 uppercase mb-3">
          Step 6 / 11
        </p>
        <h1 className="text-[26px] font-bold text-forest-900 leading-tight">
          Coming soon
        </h1>
        <p className="mt-2 text-sm text-ink-400">Step 6 will be built next.</p>
      </div>
      <Link
        href="/onboarding/step-5"
        className="flex items-center gap-2 text-sm text-ink-400 font-medium"
      >
        <ArrowLeft size={15} /> Back
      </Link>
    </div>
  );
}

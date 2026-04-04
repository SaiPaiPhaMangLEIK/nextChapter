"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import type { Book } from "@/types";

interface ProgressTrackerProps {
  book: Book;
  onUpdate?: (currentPage: number) => void;
  className?: string;
}

export default function ProgressTracker({ book, onUpdate, className }: ProgressTrackerProps) {
  const totalPages = book.progress?.totalPages ?? book.pageCount ?? 0;
  const [currentPage, setCurrentPage] = useState(book.progress?.currentPage ?? 0);
  const [inputValue, setInputValue] = useState(String(book.progress?.currentPage ?? 0));
  const [saved, setSaved] = useState(false);

  const percentage = totalPages ? Math.round((currentPage / totalPages) * 100) : 0;

  function handleSave() {
    onUpdate?.(currentPage);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function stepPage(delta: number) {
    const next = Math.min(Math.max(currentPage + delta, 0), totalPages);
    setCurrentPage(next);
    setInputValue(String(next));
  }

  function handleInput(value: string) {
    setInputValue(value);
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0 && num <= totalPages) {
      setCurrentPage(num);
    }
  }

  return (
    <div className={cn("bg-white rounded-2xl p-5 shadow-card", className)}>
      {/* Header: label + dominant page count */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold tracking-widest text-ink-400 uppercase">
          Update Progress
        </span>
        <div className="flex items-baseline gap-0.5">
          <input
            type="number"
            min={0}
            max={totalPages}
            value={inputValue}
            onChange={(e) => handleInput(e.target.value)}
            className="w-16 text-right text-[22px] font-bold text-brand-600 bg-transparent outline-none leading-none"
          />
          <span className="text-[14px] text-ink-400 font-medium"> / {totalPages}</span>
        </div>
      </div>

      {/* Progress bar */}
      <ProgressBar value={percentage} size="md" className="mb-5" />

      {/* Stepper row: − | Save Progress | + */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => stepPage(-10)}
          className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-ink-600 active:scale-95 transition-transform shrink-0"
        >
          <Minus size={18} />
        </button>

        <Button
          fullWidth
          onClick={handleSave}
          variant={saved ? "secondary" : "primary"}
          size="lg"
        >
          {saved ? "Saved ✓" : "Save Progress"}
        </Button>

        <button
          onClick={() => stepPage(10)}
          className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 active:scale-95 transition-transform shrink-0"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}

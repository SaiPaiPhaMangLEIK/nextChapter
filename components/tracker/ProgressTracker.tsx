"use client";

import { useState } from "react";
import { BookOpen, Plus, Minus } from "lucide-react";
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
    <div className={cn("bg-white rounded-2xl p-5 shadow-card space-y-4", className)}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center">
          <BookOpen size={16} className="text-brand-600" />
        </div>
        <div>
          <h3 className="text-[14px] font-semibold text-gray-900">Update Progress</h3>
          <p className="text-xs text-gray-400">{totalPages} pages total</p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-semibold text-brand-600">{percentage}%</span>
        </div>
        <ProgressBar value={percentage} size="md" />
      </div>

      {/* Page stepper */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => stepPage(-10)}
          className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 active:scale-95 transition-transform"
        >
          <Minus size={16} />
        </button>

        <div className="flex-1 text-center">
          <input
            type="number"
            min={0}
            max={totalPages}
            value={inputValue}
            onChange={(e) => handleInput(e.target.value)}
            className="w-24 text-center text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-brand-200 focus:border-brand-500 outline-none transition-colors pb-1"
          />
          <p className="text-xs text-gray-400 mt-1">of {totalPages} pages</p>
        </div>

        <button
          onClick={() => stepPage(10)}
          className="w-10 h-10 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 active:scale-95 transition-transform"
        >
          <Plus size={16} />
        </button>
      </div>

      <Button
        fullWidth
        onClick={handleSave}
        variant={saved ? "secondary" : "primary"}
        size="lg"
      >
        {saved ? "Saved!" : "Save Progress"}
      </Button>
    </div>
  );
}

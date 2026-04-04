"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, BookPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AIRecommendation } from "@/types";

interface RecommendationCardProps {
  recommendation: AIRecommendation;
  onAdd?: (rec: AIRecommendation) => void;
  className?: string;
}

export default function RecommendationCard({
  recommendation: rec,
  onAdd,
  className,
}: RecommendationCardProps) {
  const confidencePercent = Math.round(rec.confidence * 100);

  return (
    <div className={cn("bg-white rounded-2xl shadow-card overflow-hidden", className)}>
      <div className="flex gap-4 p-4">
        {/* Cover */}
        <Link href={`/book/${rec.book.id}`} className="shrink-0">
          <div className="w-[60px] h-[90px] rounded-xl overflow-hidden bg-sage-100 shadow-sm">
            {rec.book.coverUrl ? (
              <Image
                src={rec.book.coverUrl}
                alt={rec.book.title}
                width={60}
                height={90}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-100 to-sage-100 flex items-center justify-center p-2">
                <span className="text-[10px] text-brand-700 font-semibold text-center leading-tight">
                  {rec.book.title.slice(0, 12)}
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link href={`/book/${rec.book.id}`}>
                <h3 className="text-[14px] font-semibold text-ink-700 leading-snug line-clamp-2">
                  {rec.book.title}
                </h3>
              </Link>
              <p className="text-xs text-ink-400 mt-0.5">{rec.book.author}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Sparkles size={11} className="text-brand-600" />
              <span className="text-xs font-semibold text-brand-600">{confidencePercent}%</span>
            </div>
          </div>

          {/* AI reason */}
          <p className="text-xs text-ink-500 mt-2 leading-relaxed line-clamp-2">{rec.reason}</p>
        </div>
      </div>

      {/* Add button */}
      <div className="px-4 pb-4">
        <button
          onClick={() => onAdd?.(rec)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-brand-50 text-brand-600 text-sm font-medium active:bg-brand-100 transition-colors"
        >
          <BookPlus size={15} />
          Add to Library
        </button>
      </div>
    </div>
  );
}

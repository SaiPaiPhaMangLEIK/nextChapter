"use client";

import { useState } from "react";
import { Sparkles, TrendingUp, Search } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import RecommendationCard from "@/components/ai/RecommendationCard";
import BookCard from "@/components/book/BookCard";
import Badge from "@/components/ui/Badge";
import { MOCK_RECOMMENDATIONS, MOCK_BOOKS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const GENRE_FILTERS = [
  "All",
  "Psychology",
  "Self-Help",
  "Business",
  "History",
  "Science",
  "Philosophy",
];

export default function DiscoverPage() {
  const [activeGenre, setActiveGenre] = useState("All");

  return (
    <div className="mobile-page bg-cream animate-fade-in">
      <PageHeader
        title="Discover"
        subtitle="What to read next"
        right={
          <button className="w-9 h-9 bg-white rounded-2xl shadow-card flex items-center justify-center">
            <Search size={16} className="text-gray-600" />
          </button>
        }
      />

      {/* ─── AI recommendations ─────────────────────────────────── */}
      <div className="px-5 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-xl bg-brand-500 flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-gray-900">Picked for You</h2>
            <p className="text-[11px] text-gray-400">Based on your reading history</p>
          </div>
        </div>

        <div className="space-y-3">
          {MOCK_RECOMMENDATIONS.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>
      </div>

      {/* ─── Genre filter ───────────────────────────────────────── */}
      <div className="pt-6">
        <div className="px-5 mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={15} className="text-brand-500" />
            <h2 className="text-[15px] font-bold text-gray-900">Browse by Genre</h2>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 pb-1">
          {GENRE_FILTERS.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200",
                activeGenre === genre
                  ? "bg-brand-500 text-white shadow-float"
                  : "bg-white text-gray-500 shadow-card"
              )}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Trending books in selected genre */}
        <div className="px-5 pt-4 space-y-3">
          {MOCK_BOOKS.filter(
            (b) => activeGenre === "All" || b.genre.includes(activeGenre)
          ).map((book) => (
            <BookCard key={book.id} book={book} variant="list" showProgress={false} />
          ))}
        </div>
      </div>

      {/* ─── Reading journey prompt ──────────────────────────────── */}
      <div className="px-5 pt-5 pb-4">
        <div className="bg-gradient-to-br from-brand-500 to-sage-600 rounded-2xl p-5">
          <Badge variant="green" size="sm" className="bg-white/20 text-white border-0 mb-2">
            Premium
          </Badge>
          <h3 className="text-[15px] font-bold text-white">Personalized Reading Path</h3>
          <p className="text-xs text-white/70 mt-1 leading-relaxed">
            Get a curated 12-book journey tailored to your goals and interests — crafted by AI, refined by your taste.
          </p>
          <button className="mt-4 w-full py-3 rounded-2xl bg-white text-brand-600 text-sm font-bold shadow-float">
            Build My Reading Path
          </button>
        </div>
      </div>
    </div>
  );
}

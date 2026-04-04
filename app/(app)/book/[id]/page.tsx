"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Star,
  BookOpen,
  Calendar,
  Hash,
  ChevronDown,
  Share2,
  BookmarkPlus,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ProgressTracker from "@/components/tracker/ProgressTracker";
import AskThisBook from "@/components/ai/AskThisBook";
import RecommendationCard from "@/components/ai/RecommendationCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MOCK_BOOKS, MOCK_RECOMMENDATIONS } from "@/lib/mock-data";
import { statusLabel, statusColor, truncate } from "@/lib/utils";

export default function BookDetailPage() {
  const { id } = useParams();
  const book = MOCK_BOOKS.find((b) => b.id === id) ?? MOCK_BOOKS[1];
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [activeSection, setActiveSection] = useState<"overview" | "progress" | "ai">("overview");

  const relatedRecs = MOCK_RECOMMENDATIONS.slice(0, 2);

  return (
    <div className="mobile-page bg-cream animate-fade-in">
      <PageHeader
        showBack
        transparent
        right={
          <button className="w-9 h-9 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-card">
            <Share2 size={16} className="text-gray-600" />
          </button>
        }
      />

      {/* ─── Book hero ──────────────────────────────────────────── */}
      <div className="relative">
        {/* Background blur cover */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {book.coverUrl && (
            <Image
              src={book.coverUrl}
              alt=""
              fill
              className="object-cover blur-2xl opacity-30 scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream" />
        </div>

        <div className="flex flex-col items-center pt-2 pb-6 px-5">
          {/* Cover */}
          <div className="w-[120px] h-[180px] rounded-2xl overflow-hidden shadow-2xl">
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={book.title}
                width={120}
                height={180}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-100 to-sage-100 flex items-center justify-center p-4">
                <span className="text-sm text-brand-700 font-semibold text-center">{book.title}</span>
              </div>
            )}
          </div>

          {/* Title & Author */}
          <div className="text-center mt-4">
            <h1 className="text-[20px] font-bold text-gray-900 leading-tight">{book.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{book.author}</p>
          </div>

          {/* Rating */}
          {book.rating && (
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < book.rating!
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-200 fill-gray-200"
                  }
                />
              ))}
              <span className="text-xs text-gray-400 ml-1">{book.rating}/5</span>
            </div>
          )}

          {/* Status badge + genres */}
          <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-xl ${statusColor(book.status)}`}>
              {statusLabel(book.status)}
            </span>
            {book.genre.map((g) => (
              <Badge key={g} size="sm">{g}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Quick stats ────────────────────────────────────────── */}
      <div className="px-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: BookOpen, label: "Pages", value: book.pageCount ?? "—" },
            { icon: Calendar, label: "Year", value: book.publishedYear ?? "—" },
            {
              icon: Hash,
              label: "Progress",
              value: book.progress ? `${book.progress.percentage}%` : "—",
            },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-3.5 shadow-card text-center">
              <Icon size={16} className="text-brand-500 mx-auto mb-1" />
              <p className="text-[15px] font-bold text-gray-900">{value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Section tabs ───────────────────────────────────────── */}
      <div className="px-5 pt-5">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl">
          {(["overview", "progress", "ai"] as const).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                activeSection === section
                  ? "bg-white text-gray-900 shadow-card"
                  : "text-gray-400"
              }`}
            >
              {section === "ai" ? "Ask AI" : section}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Section content ────────────────────────────────────── */}
      <div className="px-5 pt-4 space-y-4">
        {activeSection === "overview" && (
          <>
            {/* Description */}
            {book.description && (
              <div className="bg-white rounded-2xl p-4 shadow-card">
                <h3 className="text-[13px] font-semibold text-gray-900 mb-2">About this book</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {showFullDesc ? book.description : truncate(book.description, 180)}
                </p>
                {book.description.length > 180 && (
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="flex items-center gap-1 text-brand-600 text-xs font-medium mt-2"
                  >
                    {showFullDesc ? "Show less" : "Read more"}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${showFullDesc ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>
            )}

            {/* Tags */}
            {book.tags && book.tags.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-card">
                <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 bg-brand-50 text-brand-700 rounded-xl font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended after */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-brand-500" />
                  <h3 className="text-[14px] font-semibold text-gray-900">Read Next</h3>
                </div>
              </div>
              <div className="space-y-3">
                {relatedRecs.map((rec) => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            </div>
          </>
        )}

        {activeSection === "progress" && (
          <ProgressTracker book={book} />
        )}

        {activeSection === "ai" && (
          <AskThisBook book={book} isPremium={false} />
        )}
      </div>

      {/* ─── Action buttons ─────────────────────────────────────── */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            icon={<BookmarkPlus size={17} />}
          >
            Save
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            icon={<CheckCircle2 size={17} />}
          >
            {book.status === "reading" ? "Mark Done" : "Start Reading"}
          </Button>
        </div>
      </div>
    </div>
  );
}

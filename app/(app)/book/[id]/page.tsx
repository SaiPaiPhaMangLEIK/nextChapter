"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Flame,
  TrendingUp,
  CalendarClock,
  Timer,
  Share2,
  BookmarkPlus,
  BookOpen,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ProgressTracker from "@/components/tracker/ProgressTracker";
import AskThisBook from "@/components/ai/AskThisBook";
import RecommendationCard from "@/components/ai/RecommendationCard";
import Button from "@/components/ui/Button";
import RingStat from "@/components/ui/RingStat";
import { MOCK_BOOKS, MOCK_RECOMMENDATIONS, MOCK_USER } from "@/lib/mock-data";
import { statusLabel, statusColor, truncate } from "@/lib/utils";

export default function BookDetailPage() {
  const { id } = useParams();
  const book = MOCK_BOOKS.find((b) => b.id === id) ?? MOCK_BOOKS[1];
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [activeSection, setActiveSection] = useState<"overview" | "progress" | "ai">("overview");

  const relatedRecs = MOCK_RECOMMENDATIONS.slice(0, 2);

  // ── Derived reading stats ────────────────────────────────────────────────
  const avgPagesPerDay = MOCK_USER.readingGoal?.pagesPerDay ?? 24;
  const remaining = book.progress
    ? book.progress.totalPages - book.progress.currentPage
    : null;
  const daysLeft = remaining != null ? Math.ceil(remaining / avgPagesPerDay) : null;
  const sessionCount = book.progress
    ? Math.round(book.progress.currentPage / 18)
    : null;

  const finishDate =
    daysLeft != null
      ? new Date(Date.now() + daysLeft * 24 * 60 * 60 * 1000)
      : null;
  const finishMonthAbbr = finishDate
    ? finishDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
    : "";
  const finishDay = finishDate ? finishDate.getDate() : 0;
  const finishLabel = finishDate
    ? finishDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })
    : "";
  const pagesTodayRemaining = Math.max(0, avgPagesPerDay - 25); // mock: 25 read today

  const gridStats = [
    { icon: Flame, label: "Streak", value: `${MOCK_USER.stats.currentStreak} days` },
    { icon: TrendingUp, label: "Average", value: `${avgPagesPerDay} pgs/day` },
    { icon: CalendarClock, label: "Finishing in", value: daysLeft != null ? `~${daysLeft} days` : "—" },
    { icon: Timer, label: "Sessions", value: sessionCount != null ? `${sessionCount} total` : "—" },
  ];

  const ringStats = [
    {
      value: MOCK_USER.stats.currentStreak,
      unit: "DAYS",
      label: "STREAK",
      fillPercent: Math.min((MOCK_USER.stats.currentStreak / Math.max(MOCK_USER.stats.longestStreak, 1)) * 100, 100),
    },
    {
      value: avgPagesPerDay,
      unit: "PGS/D",
      label: "AVERAGE",
      fillPercent: Math.min((avgPagesPerDay / 50) * 100, 100),
    },
    {
      value: sessionCount ?? 0,
      unit: "TOTAL",
      label: "SESSIONS",
      fillPercent: Math.min(((sessionCount ?? 0) / 15) * 100, 100),
    },
  ];

  // ── Mock reading session history ─────────────────────────────────────────
  const mockFlowSessions = book.progress
    ? [
        {
          from: Math.max(0, book.progress.currentPage - 32),
          to: book.progress.currentPage,
          time: "Today, 8:45 AM",
          pages: 32,
        },
        {
          from: Math.max(0, book.progress.currentPage - 54),
          to: Math.max(0, book.progress.currentPage - 32),
          time: "Yesterday, 9:20 PM",
          pages: 22,
        },
      ]
    : [];

  const isProgress = activeSection === "progress";

  return (
    <div className="mobile-page bg-cream animate-fade-in">
      {/* ─── Header ─────────────────────────────────────────────── */}
      <PageHeader
        showBack
        transparent
        right={
          !isProgress ? (
            <button className="w-9 h-9 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-card">
              <Share2 size={16} className="text-ink-600" />
            </button>
          ) : undefined
        }
      />

      {/* ─── Book hero ──────────────────────────────────────────── */}
      <div className="px-5 pt-2 pb-5">
        <div className="bg-sage-50 rounded-3xl p-4 flex gap-4 items-center">
          {/* Cover with optional progress badge */}
          <div className="group relative shrink-0 w-[100px] h-[150px] rounded-2xl overflow-hidden bg-gray-900 shadow-xl cursor-pointer">
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={book.title}
                width={100}
                height={150}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-100 to-sage-100 flex items-center justify-center p-3">
                <span className="text-xs text-brand-700 font-semibold text-center leading-tight">
                  {book.title}
                </span>
              </div>
            )}
            {/* Progress % badge — shown in progress mode */}
            {isProgress && book.progress && (
              <div className="absolute top-2 left-2 bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg leading-tight z-10">
                {book.progress.percentage}%
              </div>
            )}
            {/* Hover overlay — entire cover is the Submit Page button */}
            <button className="absolute inset-0 bg-ink-700/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 active:bg-ink-700/75 transition-all duration-300">
              <BookOpen size={20} className="text-white" />
              <span className="text-[11px] font-bold text-white tracking-wide">
                Submit Page
              </span>
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <span
              className={`inline-flex text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-lg ${statusColor(book.status)}`}
            >
              {statusLabel(book.status)}
            </span>
            <h1 className="text-[18px] font-bold text-ink-700 leading-tight mt-2">
              {book.title}
            </h1>
            <p className="text-[13px] text-ink-400 italic mt-0.5 truncate">{book.author}</p>

            {/* Genre tags — shown in progress mode instead of % */}
            {isProgress ? (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {book.genre.slice(0, 2).map((g) => (
                  <span
                    key={g}
                    className="text-[9px] font-semibold tracking-wide uppercase px-2 py-1 bg-sage-100 text-ink-500 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>
            ) : (
              book.progress && (
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-[26px] font-bold text-brand-600 leading-none">
                    {book.progress.percentage}%
                  </span>
                  <span className="text-[12px] text-ink-400">
                    {book.progress.currentPage}/{book.progress.totalPages} pages
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* ─── Quick stats (hidden in progress tab) ───────────────── */}
      {!isProgress && (
        <div className="px-5 pb-5">
          <div className="bg-white rounded-2xl px-4 py-5  flex items-center justify-around">
            {ringStats.map((s) => (
              <RingStat key={s.label} {...s} />
            ))}
          </div>
        </div>
      )}

      {/* ─── Section tabs ───────────────────────────────────────── */}
      <div className="px-5">
        <div className="flex gap-1 bg-sage-100 p-1 rounded-2xl">
          {(["overview", "progress", "ai"] as const).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                activeSection === section
                  ? "bg-white text-ink-700 shadow-card"
                  : "text-ink-400"
              }`}
            >
              {section === "ai" ? "Ask AI" : section}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Section content ────────────────────────────────────── */}
      <div key={activeSection} className="px-5 pt-4 pb-2 space-y-4 animate-slide-up">
        {/* ── Overview ── */}
        {activeSection === "overview" && (
          <>
            {(book.description || (book.tags && book.tags.length > 0) || book.genre.length > 0) && (
              <div className="bg-white rounded-2xl p-4 shadow-card">
                {(book.genre.length > 0 || (book.tags && book.tags.length > 0)) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[...book.genre, ...(book.tags ?? [])].map((label) => (
                      <span
                        key={label}
                        className="text-[9px] font-semibold tracking-wide uppercase px-3 py-1 bg-sage-100 text-ink-500 rounded-full"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}
                {book.description && (
                  <>
                    <h3 className="text-[15px] font-bold text-ink-700 mb-2">About the Book</h3>
                    <p className="text-sm text-ink-500 leading-relaxed">
                      {showFullDesc ? book.description : truncate(book.description, 180)}
                      {book.description.length > 180 && (
                        <button
                          onClick={() => setShowFullDesc(!showFullDesc)}
                          className="text-brand-600 font-semibold ml-1 inline"
                        >
                          {showFullDesc ? "Show less" : "Read more"}
                        </button>
                      )}
                    </p>
                  </>
                )}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-brand-600" />
                <h3 className="text-[14px] font-semibold text-ink-700">Read Next</h3>
              </div>
              <div className="space-y-3">
                {relatedRecs.map((rec) => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── Progress (focused mode) ── */}
        {activeSection === "progress" && (
          <>
            {/* Update Progress card */}
            <ProgressTracker book={book} />

            {/* Stats 2×2 grid */}
            <div className="grid grid-cols-2 gap-3">
              {gridStats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white rounded-2xl p-4 shadow-card">
                  <Icon size={18} className="text-brand-600 mb-3" />
                  <p className="text-[10px] font-semibold tracking-wide text-ink-400 uppercase mb-1">
                    {label}
                  </p>
                  <p className="text-[16px] font-bold text-ink-700 leading-tight">{value}</p>
                </div>
              ))}
            </div>

            {/* Estimated Completion */}
            {finishDate && (
              <div className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-4">
                <div className="bg-brand-600 text-white rounded-2xl px-3 py-2 text-center shrink-0 min-w-[52px]">
                  <p className="text-[9px] font-bold uppercase tracking-widest leading-none mb-1">
                    {finishMonthAbbr}
                  </p>
                  <p className="text-[24px] font-bold leading-none">{finishDay}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-ink-700">Estimated Completion</p>
                  <p className="text-xs text-ink-500 mt-0.5 leading-snug">
                    Read{" "}
                    <span className="text-brand-600 font-semibold">
                      {pagesTodayRemaining} more pages
                    </span>{" "}
                    today to finish by {finishLabel}.
                  </p>
                </div>
              </div>
            )}

            {/* Recent Flow */}
            {mockFlowSessions.length > 0 && (
              <div>
                <p className="text-[11px] font-bold tracking-widest text-ink-400 uppercase mb-3">
                  Recent Flow
                </p>
                <div className="space-y-3">
                  {mockFlowSessions.map((session) => (
                    <div
                      key={session.time}
                      className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                        <BookOpen size={16} className="text-brand-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-ink-700">
                          Pages {session.from} → {session.to}
                        </p>
                        <p className="text-[11px] text-ink-400 mt-0.5">{session.time}</p>
                      </div>
                      <span className="text-[13px] font-semibold text-brand-600 shrink-0">
                        +{session.pages} pgs
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── Ask AI ── */}
        {activeSection === "ai" && <AskThisBook book={book} isPremium={false} />}
      </div>

      {/* ─── Bottom action buttons ───────────────────────────────── */}
      <div className="px-5 pt-4 pb-6">
        {isProgress ? (
          <div className="flex gap-3">
            <Button variant="outline" size="lg" className="flex-1">
              Submit Page
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              icon={<CheckCircle2 size={17} />}
            >
              Mark Done
            </Button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

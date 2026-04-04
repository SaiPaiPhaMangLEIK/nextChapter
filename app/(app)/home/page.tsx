"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Flame,
  Target,
  ArrowRight,
  Sparkles,
  Bell,
  Clock,
  BookMarked,
} from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { MOCK_BOOKS, MOCK_USER, MOCK_RECOMMENDATIONS } from "@/lib/mock-data";
import type { Book } from "@/types";
import { cn } from "@/lib/utils";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatStat(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".0", "")}k`;
  return String(n);
}

// ─── Continue Reading Card ─────────────────────────────────────────────────────

function ContinueReadingCard({ book }: { book: Book }) {
  const pct = book.progress?.percentage ?? 0;
  return (
    <Link href={`/book/${book.id}`} className="shrink-0 w-[155px] snap-start">
      {/* Cover */}
      <div className="relative w-full h-[210px] rounded-[18px] overflow-hidden bg-sage-200 shadow-[0_6px_24px_rgba(0,0,0,0.15)]">
        {book.coverUrl && (
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            className="object-cover"
            sizes="155px"
          />
        )}
        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
          }}
        />
        {/* Progress overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-white/90 tracking-wide">
              {pct}%
            </span>
          </div>
          <div className="h-[3px] bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-400 rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Title + Author */}
      <div className="mt-2.5 px-0.5">
        <p className="text-[13px] font-bold text-gray-900 leading-tight line-clamp-2">
          {book.title}
        </p>
        <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{book.author}</p>
      </div>
    </Link>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  bg: string;
  iconBg: string;
  iconColor: string;
}

function StatCard({ icon, value, label, bg, iconBg, iconColor }: StatCardProps) {
  return (
    <div className={cn("rounded-[20px] p-4 flex flex-col gap-2.5", bg)}>
      <div
        className={cn(
          "w-9 h-9 rounded-[11px] flex items-center justify-center",
          iconBg,
          iconColor
        )}
      >
        {icon}
      </div>
      <p className="text-[22px] font-bold text-gray-900 leading-none">{value}</p>
      <p className="text-[11px] text-gray-500 font-medium leading-tight">{label}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const user = MOCK_USER;
  const currentlyReading = MOCK_BOOKS.filter((b) => b.status === "reading");
  const goalPercent = Math.round(
    (user.readingGoal!.booksCompleted / user.readingGoal!.booksPerYear) * 100
  );
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const featuredRec = MOCK_RECOMMENDATIONS[0];
  const readingHours = Math.round(user.stats.totalReadingTime / 60);
  const minutesThisMonth = Math.round(user.stats.totalReadingTime / 12);

  return (
    <div className="mobile-page bg-cream animate-fade-in">
      {/* ─── Hero header ─────────────────────────────────────────── */}
      <div className="relative px-5 pt-14 pb-6 bg-gradient-to-b from-brand-500 to-brand-600 text-white overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-brand-100 text-sm font-medium">{greeting} 👋</p>
            <h1 className="text-[22px] font-bold mt-0.5 leading-tight">
              {user.displayName.split(" ")[0]}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400" />
            </button>
            <Avatar name={user.displayName} src={user.avatarUrl} size="md" />
          </div>
        </div>

        {/* Stats row */}
        <div className="relative mt-5 flex gap-3">
          <div className="flex-1 bg-white/15 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Flame size={14} className="text-amber-300" />
              <span className="text-xs text-white/80">Streak</span>
            </div>
            <p className="text-xl font-bold">{user.stats.currentStreak}</p>
            <p className="text-[10px] text-white/60">days</p>
          </div>
          <div className="flex-1 bg-white/15 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <BookOpen size={14} className="text-brand-200" />
              <span className="text-xs text-white/80">This Year</span>
            </div>
            <p className="text-xl font-bold">{user.stats.booksThisYear}</p>
            <p className="text-[10px] text-white/60">books read</p>
          </div>
          <div className="flex-1 bg-white/15 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Target size={14} className="text-green-300" />
              <span className="text-xs text-white/80">Goal</span>
            </div>
            <p className="text-xl font-bold">{goalPercent}%</p>
            <p className="text-[10px] text-white/60">of {user.readingGoal!.booksPerYear}</p>
          </div>
        </div>
      </div>

      {/* ─── Annual goal progress ──────────────────────────────── */}
      <div className="px-5 pt-5">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[13px] font-semibold text-gray-900">2025 Reading Goal</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {user.readingGoal!.booksCompleted} of {user.readingGoal!.booksPerYear} books
              </p>
            </div>
            <Badge variant="green">{goalPercent}%</Badge>
          </div>
          <ProgressBar value={goalPercent} size="md" showLabel={false} />
          <p className="text-xs text-gray-400 mt-2">
            {user.readingGoal!.booksPerYear - user.readingGoal!.booksCompleted} more books to
            reach your goal
          </p>
        </div>
      </div>

      {/* ─── Continue Reading ──────────────────────────────────── */}
      <div className="pt-6">
        <div className="flex items-center justify-between px-5 mb-4">
          <h2 className="text-[16px] font-bold text-gray-900">Continue Reading</h2>
          <Link
            href="/library?tab=reading"
            className="flex items-center gap-1 text-brand-600 text-sm font-medium"
          >
            See all <ArrowRight size={14} />
          </Link>
        </div>

        {currentlyReading.length === 0 ? (
          <div className="mx-5 bg-white rounded-2xl p-6 shadow-card text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-3">
              <BookOpen size={22} className="text-brand-500" />
            </div>
            <p className="text-sm font-medium text-gray-700">Nothing in progress</p>
            <p className="text-xs text-gray-400 mt-1">Start reading something today</p>
            <Link href="/library">
              <button className="mt-3 px-4 py-2 bg-brand-500 text-white rounded-xl text-sm font-medium">
                Browse Library
              </button>
            </Link>
          </div>
        ) : (
          <div
            className="flex gap-4 overflow-x-auto px-5 pb-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            {currentlyReading.map((book) => (
              <ContinueReadingCard key={book.id} book={book} />
            ))}
            {/* trailing space */}
            <div className="shrink-0 w-1" />
          </div>
        )}
      </div>

      {/* ─── Reading Activity Stats ────────────────────────────── */}
      <div className="px-5 pt-5">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<BookMarked size={18} strokeWidth={1.8} />}
            value={String(user.stats.totalBooksRead)}
            label="Books Finished"
            bg="bg-blue-50"
            iconBg="bg-blue-100"
            iconColor="text-blue-500"
          />
          <StatCard
            icon={<Clock size={18} strokeWidth={1.8} />}
            value={formatStat(minutesThisMonth)}
            label="Minutes This Month"
            bg="bg-purple-50"
            iconBg="bg-purple-100"
            iconColor="text-purple-500"
          />
          <StatCard
            icon={<BookOpen size={18} strokeWidth={1.8} />}
            value={formatStat(user.stats.totalPagesRead)}
            label="Total Pages"
            bg="bg-rose-50"
            iconBg="bg-rose-100"
            iconColor="text-rose-500"
          />
          <StatCard
            icon={<Flame size={18} strokeWidth={1.8} />}
            value={`${readingHours}h`}
            label="Reading Time"
            bg="bg-amber-50"
            iconBg="bg-amber-100"
            iconColor="text-amber-500"
          />
        </div>
      </div>

      {/* ─── Daily Recommendation ─────────────────────────────── */}
      <div className="px-5 pt-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-bold text-gray-900">Daily Recommendation</h2>
          <div className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-brand-500" />
            <span className="text-[11px] font-semibold text-brand-600">Curated by AI</span>
          </div>
        </div>

        <div className="bg-white rounded-[24px] overflow-hidden shadow-card">
          {/* Book cover — tall featured area */}
          <div className="relative h-[280px] bg-forest-900 overflow-hidden">
            {featuredRec.book.coverUrl && (
              <Image
                src={featuredRec.book.coverUrl}
                alt={featuredRec.book.title}
                fill
                className="object-cover opacity-60"
                sizes="(max-width: 500px) 100vw, 500px"
              />
            )}
            {/* Darkening overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(15,35,18,0.35) 0%, rgba(15,35,18,0.75) 100%)",
              }}
            />
            {/* Text on cover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <p className="text-[8px] font-bold tracking-[0.22em] uppercase text-white/55 mb-5">
                {featuredRec.book.genre?.[0] ?? "Editor's Pick"}
              </p>
              <h3 className="text-[28px] font-bold text-white leading-[1.08] tracking-tight uppercase">
                {featuredRec.book.title}
              </h3>
              <div className="w-8 h-[1px] bg-white/30 my-3" />
              <p className="text-[11px] font-medium text-white/65 tracking-[0.18em] uppercase">
                {featuredRec.book.author}
              </p>
            </div>
          </div>

          {/* Content below cover */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-brand-600">
                Editor&apos;s Choice
              </span>
            </div>
            <p className="font-bold text-[16px] text-gray-900 leading-tight">
              {featuredRec.book.title}
            </p>
            <p className="text-[12px] text-gray-400 mt-0.5">{featuredRec.book.author}</p>

            {/* AI explanation block */}
            <div className="mt-4 bg-sage-50 rounded-[14px] p-4 border border-sage-100">
              <p className="text-[12.5px] text-gray-600 leading-relaxed">
                &ldquo;{featuredRec.reason}&rdquo;
              </p>
            </div>

            {/* Start Reading button */}
            <Link href={`/book/${featuredRec.book.id}`}>
              <button className="mt-4 w-full flex items-center justify-center gap-2 py-[15px] bg-forest-900 text-white rounded-full text-[14px] font-semibold hover:bg-forest-800 active:bg-forest-950 transition-colors shadow-[0_4px_20px_rgba(15,35,18,0.28)]">
                Start Reading
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  BookOpen,
  Flame,
  Clock,
  Star,
  Settings,
  ChevronRight,
  Award,
  TrendingUp,
  Edit3,
} from "lucide-react";
import { UserButton, Show } from "@clerk/nextjs";
import Avatar from "@/components/ui/Avatar";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import { MOCK_USER } from "@/lib/mock-data";
import { formatDate, pluralize } from "@/lib/utils";

const SETTINGS_ITEMS = [
  { label: "Edit Profile", icon: Edit3, href: "/profile/edit" },
  { label: "Reading Goals", icon: TrendingUp, href: "/profile/goals" },
  { label: "Notifications", icon: Award, href: "/profile/notifications" },
  { label: "App Settings", icon: Settings, href: "/profile/settings" },
];

export default function ProfilePage() {
  const user = MOCK_USER;
  const goalPercent = Math.round(
    (user.readingGoal!.booksCompleted / user.readingGoal!.booksPerYear) * 100
  );

  return (
    <div className="mobile-page bg-cream animate-fade-in">
      {/* ─── Header banner ──────────────────────────────────────── */}
      <div className="relative px-5 pt-14 pb-6 bg-gradient-to-b from-brand-700 to-brand-600 text-white overflow-hidden">
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={user.displayName} src={user.avatarUrl} size="lg" />
            <div>
              <h1 className="text-[18px] font-bold">{user.displayName}</h1>
              <p className="text-xs text-white/70">@{user.username}</p>
              <p className="text-xs text-white/60 mt-0.5">Member since {formatDate(user.joinedAt)}</p>
            </div>
          </div>
          <button className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center">
            <Settings size={16} />
          </button>
        </div>

        {user.bio && (
          <p className="text-sm text-white/80 mt-4 leading-relaxed">{user.bio}</p>
        )}
      </div>

      {/* ─── Reading goal card ──────────────────────────────────── */}
      <div className="px-5 pt-5">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold text-ink-700">2025 Reading Goal</h3>
            <Badge variant="green">{user.readingGoal!.booksCompleted} / {user.readingGoal!.booksPerYear}</Badge>
          </div>
          <ProgressBar value={goalPercent} size="md" />
          <p className="text-xs text-ink-400 mt-2">
            {user.readingGoal!.booksPerYear - user.readingGoal!.booksCompleted} books to go — you&apos;re {goalPercent}% there!
          </p>
        </div>
      </div>

      {/* ─── Stats grid ─────────────────────────────────────────── */}
      <div className="px-5 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              icon: BookOpen,
              label: "Books Read",
              value: user.stats.totalBooksRead,
              color: "text-brand-600",
              bg: "bg-brand-50",
            },
            {
              icon: Flame,
              label: "Best Streak",
              value: `${user.stats.longestStreak}d`,
              color: "text-amber-500",
              bg: "bg-amber-50",
            },
            {
              icon: Clock,
              label: "Hours Read",
              value: Math.round(user.stats.totalReadingTime / 60),
              color: "text-blue-500",
              bg: "bg-blue-50",
            },
            {
              icon: Star,
              label: "Avg Rating",
              value: user.stats.averageRating.toFixed(1),
              color: "text-purple-500",
              bg: "bg-purple-50",
            },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-card">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-2`}>
                <Icon size={18} className={color} />
              </div>
              <p className="text-[22px] font-bold text-ink-700">{value}</p>
              <p className="text-xs text-ink-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Favorite genre + reading pace ──────────────────────── */}
      <div className="px-5 pt-4">
        <div className="bg-white rounded-2xl p-4 shadow-card space-y-3">
          <h3 className="text-[13px] font-semibold text-ink-700">Reading Habits</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink-500">Favorite Genre</span>
            <Badge variant="green">{user.stats.favoriteGenre}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink-500">Books this Month</span>
            <span className="text-sm font-semibold text-ink-700">{user.stats.booksThisMonth}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink-500">Total Pages Read</span>
            <span className="text-sm font-semibold text-ink-700">
              {user.stats.totalPagesRead.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink-500">Current Streak</span>
            <div className="flex items-center gap-1.5">
              <Flame size={14} className="text-amber-500" />
              <span className="text-sm font-semibold text-ink-700">
                {pluralize(user.stats.currentStreak, "day")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Settings list ──────────────────────────────────────── */}
      <div className="px-5 pt-4">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden divide-y divide-sage-100">
          {SETTINGS_ITEMS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-sage-50 active:bg-sage-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-sage-100 flex items-center justify-center">
                <Icon size={15} className="text-ink-600" />
              </div>
              <span className="flex-1 text-sm text-ink-700 font-medium">{label}</span>
              <ChevronRight size={15} className="text-ink-300" />
            </button>
          ))}
        </div>
      </div>

      {/* ─── Account ────────────────────────────────────────────── */}
      <div className="px-5 pt-4 pb-4">
        <Show when="signed-in">
          <div className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-card">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 rounded-2xl",
                  userButtonPopoverCard: "rounded-2xl shadow-card-hover",
                },
              }}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink-700">Account</p>
              <p className="text-xs text-ink-400">Manage profile, security & sign out</p>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}

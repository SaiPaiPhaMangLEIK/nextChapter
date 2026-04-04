"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  Heart,
  Bookmark,
  ShoppingBag,
  Brain,
  ChevronDown,
  Check,
  ScanLine,
  Play,
  Trash2,
  CheckCircle2,
  BookOpen,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { MOCK_BOOKS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Book } from "@/types";

// ─── Static config ────────────────────────────────────────────────────────────

const TO_BUY_IDS = new Set(["3", "6"]);
const INITIAL_FAVORITES = new Set(["1", "2", "5"]);

type Collection = "all" | "favorites" | "philosophy" | "want_to_read" | "to_buy";
type SortOption = "recent" | "progress" | "az" | "difficulty";

const COLLECTIONS: { id: Collection; label: string; Icon: React.ElementType }[] = [
  { id: "favorites", label: "Favorites", Icon: Heart },
  { id: "philosophy", label: "Philosophy", Icon: Brain },
  { id: "want_to_read", label: "Want to Read", Icon: Bookmark },
  { id: "to_buy", label: "To Buy", Icon: ShoppingBag },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Recently Read" },
  { value: "progress", label: "Progress" },
  { value: "az", label: "A–Z" },
  { value: "difficulty", label: "Difficulty" },
];

// ─── Library Grid Card ────────────────────────────────────────────────────────

function LibraryBookCard({
  book,
  isFavorite,
  onLongPress,
}: {
  book: Book;
  isFavorite: boolean;
  onLongPress: () => void;
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pct = book.progress?.percentage ?? 0;

  function startPress() {
    timerRef.current = setTimeout(onLongPress, 550);
  }
  function cancelPress() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  return (
    <div
      onMouseDown={startPress}
      onMouseUp={cancelPress}
      onMouseLeave={cancelPress}
      onTouchStart={startPress}
      onTouchEnd={cancelPress}
      onTouchMove={cancelPress}
      className="select-none"
    >
      <Link href={`/book/${book.id}`}>
        {/* Cover */}
        <div className="relative w-full aspect-[2/3] rounded-[14px] overflow-hidden bg-sage-100 shadow-[0_2px_10px_rgba(0,0,0,0.10)] active:scale-[0.97] transition-transform">
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 500px) 33vw, 160px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-sage-200 p-2">
              <span className="text-[9px] text-brand-600 font-semibold text-center leading-tight">
                {book.title}
              </span>
            </div>
          )}

          {/* Finished badge */}
          {book.status === "finished" && (
            <div className="absolute top-2 right-2 w-[22px] h-[22px] rounded-full bg-brand-600 flex items-center justify-center shadow-sm">
              <Check size={11} className="text-white" strokeWidth={3} />
            </div>
          )}

          {/* Favorite heart */}
          {isFavorite && (
            <div className="absolute top-2 left-2 w-[20px] h-[20px] rounded-full bg-white/85 flex items-center justify-center backdrop-blur-sm">
              <Heart size={10} className="text-rose-500 fill-rose-500" />
            </div>
          )}

          {/* Reading progress bar at bottom of cover */}
          {book.status === "reading" && (
            <div className="absolute bottom-0 inset-x-0 h-[3px] bg-black/15">
              <div
                className="h-full bg-brand-300 rounded-r-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="mt-1.5 px-0.5">
          <p className="text-[11.5px] font-semibold text-ink-700 leading-tight line-clamp-2">
            {book.title}
          </p>
          <p className="text-[10px] text-ink-400 mt-0.5 truncate">{book.author}</p>
          {book.status === "reading" && pct > 0 && (
            <span className="text-[9.5px] font-bold text-brand-600">{pct}%</span>
          )}
        </div>
      </Link>
    </div>
  );
}

// ─── Context Sheet ────────────────────────────────────────────────────────────

function ContextSheet({
  book,
  isFavorite,
  onClose,
  onContinue,
  onMarkFinished,
  onToggleFavorite,
  onRemove,
}: {
  book: Book | null;
  isFavorite: boolean;
  onClose: () => void;
  onContinue: () => void;
  onMarkFinished: () => void;
  onToggleFavorite: () => void;
  onRemove: () => void;
}) {
  return (
    <AnimatePresence>
      {book && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 420, damping: 36 }}
            className="fixed bottom-0 inset-x-0 z-[70] bg-white rounded-t-[28px] pt-4 pb-10 max-w-lg mx-auto"
          >
            {/* Handle */}
            <div className="w-10 h-1 rounded-full bg-sage-200 mx-auto mb-4" />

            {/* Book info */}
            <div className="flex items-center gap-3 px-5 pb-4 border-b border-sage-200">
              <div className="w-10 h-[60px] rounded-[10px] overflow-hidden bg-sage-100 shrink-0 shadow-sm">
                {book.coverUrl && (
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    width={40}
                    height={60}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-bold text-ink-700 truncate">{book.title}</p>
                <p className="text-[12px] text-ink-400 truncate">{book.author}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-3 pt-2 space-y-0.5">
              {book.status === "reading" && (
                <button
                  onClick={onContinue}
                  className="w-full flex items-center gap-3.5 px-3.5 py-3.5 rounded-2xl hover:bg-sage-50 active:bg-sage-100 transition-colors text-left"
                >
                  <Play size={18} className="text-brand-600" />
                  <span className="text-[14px] font-medium text-ink-700">Continue Reading</span>
                </button>
              )}
              {book.status !== "finished" && (
                <button
                  onClick={onMarkFinished}
                  className="w-full flex items-center gap-3.5 px-3.5 py-3.5 rounded-2xl hover:bg-sage-50 active:bg-sage-100 transition-colors text-left"
                >
                  <CheckCircle2 size={18} className="text-brand-600" />
                  <span className="text-[14px] font-medium text-ink-700">Mark as Finished</span>
                </button>
              )}
              <button
                onClick={onToggleFavorite}
                className="w-full flex items-center gap-3.5 px-3.5 py-3.5 rounded-2xl hover:bg-sage-50 active:bg-sage-100 transition-colors text-left"
              >
                <Heart
                  size={18}
                  className={cn(
                    isFavorite ? "text-rose-500 fill-rose-500" : "text-ink-400"
                  )}
                />
                <span className="text-[14px] font-medium text-ink-700">
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </span>
              </button>
              <button
                onClick={onRemove}
                className="w-full flex items-center gap-3.5 px-3.5 py-3.5 rounded-2xl hover:bg-red-50 active:bg-red-100 transition-colors text-left"
              >
                <Trash2 size={18} className="text-red-400" />
                <span className="text-[14px] font-medium text-red-500">Remove from Library</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LibraryPage() {
  const router = useRouter();
  const [books, setBooks] = useState([...MOCK_BOOKS]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(INITIAL_FAVORITES));
  const [activeCollection, setActiveCollection] = useState<Collection>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [sortOpen, setSortOpen] = useState(false);
  const [contextBook, setContextBook] = useState<Book | null>(null);

  // ── Derived data ────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let result = books.filter((b) => {
      if (activeCollection === "favorites") return favorites.has(b.id);
      if (activeCollection === "philosophy")
        return (
          b.genre.some((g) => g === "Philosophy") ||
          (b.tags?.includes("philosophy") ?? false)
        );
      if (activeCollection === "want_to_read") return b.status === "want_to_read";
      if (activeCollection === "to_buy") return TO_BUY_IDS.has(b.id);
      return true;
    });

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "az":
        return [...result].sort((a, b) => a.title.localeCompare(b.title));
      case "progress":
        return [...result].sort(
          (a, b) => (b.progress?.percentage ?? 0) - (a.progress?.percentage ?? 0)
        );
      case "difficulty":
        return [...result].sort((a, b) => (b.pageCount ?? 0) - (a.pageCount ?? 0));
      default:
        return [...result].sort((a, b) =>
          (b.progress?.lastUpdated ?? b.addedAt).localeCompare(
            a.progress?.lastUpdated ?? a.addedAt
          )
        );
    }
  }, [books, favorites, activeCollection, searchQuery, sortBy]);

  const currentlyReading = books.filter((b) => b.status === "reading");

  const collectionCounts = useMemo(
    () => ({
      all: books.length,
      favorites: books.filter((b) => favorites.has(b.id)).length,
      philosophy: books.filter(
        (b) =>
          b.genre.some((g) => g === "Philosophy") ||
          (b.tags?.includes("philosophy") ?? false)
      ).length,
      want_to_read: books.filter((b) => b.status === "want_to_read").length,
      to_buy: books.filter((b) => TO_BUY_IDS.has(b.id)).length,
    }),
    [books, favorites]
  );

  const sortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Sort";

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleContinue() {
    if (!contextBook) return;
    router.push(`/book/${contextBook.id}`);
    setContextBook(null);
  }

  function handleMarkFinished() {
    if (!contextBook) return;
    setBooks((prev) =>
      prev.map((b) =>
        b.id === contextBook.id ? { ...b, status: "finished" as const } : b
      )
    );
    setContextBook(null);
  }

  function handleToggleFavorite() {
    if (!contextBook) return;
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(contextBook.id) ? next.delete(contextBook.id) : next.add(contextBook.id);
      return next;
    });
    setContextBook(null);
  }

  function handleRemove() {
    if (!contextBook) return;
    setBooks((prev) => prev.filter((b) => b.id !== contextBook.id));
    setContextBook(null);
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="mobile-page bg-cream animate-fade-in">
      {/* ── Header ───────────────────────────────────────────────── */}
      <PageHeader
        title="My Library"
        subtitle={`${books.length} books`}
        right={
          <Link href="/book/scan">
            <button className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center text-ink-500 shadow-card active:scale-95 transition-transform">
              <Search size={18} strokeWidth={2} />
            </button>
          </Link>
        }
      />

      {/* ── Search ───────────────────────────────────────────────── */}
      <div className="px-5 pt-3 pb-1">
        <div className="flex items-center gap-3 bg-sage-100 rounded-[18px] px-4 py-3">
          <Search size={15} className="text-ink-400 shrink-0" />
          <input
            type="text"
            placeholder="Search your library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-[13px] outline-none bg-transparent placeholder:text-ink-400 text-ink-700"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}>
              <X size={14} className="text-ink-400" />
            </button>
          )}
        </div>
      </div>

      {/* ── Curated Collections ──────────────────────────────────── */}
      <div className="px-5 pt-5 pb-1">
        <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-ink-400 mb-4">
          Curated Collections
        </p>
        <div
          className="flex gap-5 overflow-x-auto"
          style={{ scrollbarWidth: "none" } as React.CSSProperties}
        >
          {COLLECTIONS.map(({ id, label, Icon }) => {
            const active = activeCollection === id;
            const count = collectionCounts[id];
            return (
              <button
                key={id}
                onClick={() => setActiveCollection(active ? "all" : id)}
                className="shrink-0 flex flex-col items-center gap-1.5"
              >
                <motion.div
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className={cn(
                    "w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-200",
                    active
                      ? "bg-forest-900 shadow-[0_4px_18px_rgba(15,35,18,0.28)]"
                      : "bg-brand-50"
                  )}
                >
                  <Icon
                    size={22}
                    strokeWidth={1.8}
                    className={cn(
                      "transition-colors duration-200",
                      active
                        ? id === "favorites"
                          ? "text-rose-400 fill-rose-400"
                          : "text-white"
                        : "text-ink-500"
                    )}
                  />
                </motion.div>
                <span
                  className={cn(
                    "text-[10.5px] font-medium text-center leading-tight",
                    active ? "text-forest-900 font-bold" : "text-ink-500"
                  )}
                >
                  {label}
                </span>
                {count > 0 && (
                  <span className="text-[9.5px] text-ink-400 -mt-1">({count})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Currently Reading mini row ───────────────────────────── */}
      {currentlyReading.length > 0 && (
        <div className="pt-5">
          <div className="flex items-center justify-between px-5 mb-3">
            <h3 className="text-[14px] font-bold text-ink-700">Currently Reading</h3>
            <span className="text-[11px] font-semibold text-brand-600">
              {currentlyReading.length} in progress
            </span>
          </div>
          <div
            className="flex gap-3 overflow-x-auto px-5 pb-1 snap-x"
            style={{ scrollbarWidth: "none" } as React.CSSProperties}
          >
            {currentlyReading.map((book) => (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                className="shrink-0 w-[100px] snap-start"
              >
                <div className="relative w-[100px] h-[150px] rounded-[14px] overflow-hidden bg-sage-100 shadow-md active:scale-[0.97] transition-transform">
                  {book.coverUrl && (
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  )}
                  {/* Gradient + progress */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-12 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.58) 0%, transparent 100%)",
                    }}
                  />
                  <div className="absolute bottom-2 right-2">
                    <span className="text-[9px] font-bold text-white bg-black/40 px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                      {book.progress?.percentage ?? 0}%
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/20">
                    <div
              className="h-full bg-brand-300"
              style={{ width: `${book.progress?.percentage ?? 0}%` }}
                    />
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-ink-700 mt-1.5 leading-tight line-clamp-2">
                  {book.title}
                </p>
                <p className="text-[9.5px] text-ink-400 mt-0.5 truncate">{book.author}</p>
              </Link>
            ))}
            <div className="shrink-0 w-1" />
          </div>
        </div>
      )}

      {/* ── Library header + sort ─────────────────────────────────── */}
      <div className="flex items-end justify-between px-5 pt-6 pb-2">
        <div>
          <h2 className="text-[22px] font-bold text-ink-700 leading-none">Library</h2>
          <p className="text-[11px] font-bold text-brand-600 tracking-wide mt-0.5">
            ALL BOOKS ({filtered.length})
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortOpen((o) => !o)}
            className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-2 shadow-card text-[12px] font-medium text-ink-600 active:scale-95 transition-transform"
          >
            {sortLabel}
            <ChevronDown
              size={13}
              strokeWidth={2.5}
              className={cn(
                "transition-transform duration-200",
                sortOpen && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence>
            {sortOpen && (
              <>
                {/* Backdrop to close on outside click */}
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setSortOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -6 }}
                  transition={{ duration: 0.14 }}
                  className="absolute right-0 top-full mt-1.5 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.14)] p-1.5 min-w-[162px] z-30"
                >
                  {SORT_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => {
                        setSortBy(value);
                        setSortOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-colors flex items-center justify-between",
                        sortBy === value
                          ? "bg-brand-50 text-brand-600"
                          : "text-ink-700 hover:bg-sage-50"
                      )}
                    >
                      {label}
                      {sortBy === value && (
                        <Check size={13} className="text-brand-600" strokeWidth={2.5} />
                      )}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Scan hint ────────────────────────────────────────────── */}
      <div className="px-5 pb-3 flex items-center gap-1.5">
        <ScanLine size={12} className="text-brand-600" />
        <p className="text-[11.5px] text-ink-400">Scan a book to add it instantly</p>
      </div>

      {/* ── Grid / Empty state ───────────────────────────────────── */}
      <div className="px-5 pb-32">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="w-16 h-16 rounded-3xl bg-sage-100 flex items-center justify-center mb-4 shadow-sm">
              <BookOpen size={26} className="text-sage-500" />
            </div>
            <p className="text-[15px] font-bold text-ink-700">No books here yet</p>
            <p className="text-[13px] text-ink-400 mt-1.5 max-w-[220px] leading-relaxed">
              {activeCollection !== "all"
                ? "Add books from recommendations or scan a new one"
                : searchQuery
                  ? `No results for "${searchQuery}"`
                  : "Start building your reading list"}
            </p>
            <Link href="/book/scan">
              <button className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-forest-900 text-white rounded-full text-[13px] font-semibold shadow-[0_4px_16px_rgba(15,35,18,0.25)]">
                <ScanLine size={14} />
                Scan a Book
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-x-3 gap-y-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <LibraryBookCard
                    book={book}
                    isFavorite={favorites.has(book.id)}
                    onLongPress={() => setContextBook(book)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ── Context Menu Sheet ───────────────────────────────────── */}
      <ContextSheet
        book={contextBook}
        isFavorite={contextBook ? favorites.has(contextBook.id) : false}
        onClose={() => setContextBook(null)}
        onContinue={handleContinue}
        onMarkFinished={handleMarkFinished}
        onToggleFavorite={handleToggleFavorite}
        onRemove={handleRemove}
      />
    </div>
  );
}

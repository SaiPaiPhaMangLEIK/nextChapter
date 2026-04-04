"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ZoomIn, ZoomOut, Sparkles, Filter } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import { MOCK_BOOKS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Book } from "@/types";

// Simulated layout positions for books in the map
const MAP_POSITIONS = [
  { bookId: "1", x: 160, y: 140, size: "lg" },
  { bookId: "2", x: 290, y: 80, size: "md" },
  { bookId: "4", x: 80, y: 240, size: "md" },
  { bookId: "5", x: 230, y: 220, size: "sm" },
  { bookId: "3", x: 330, y: 200, size: "sm" },
  { bookId: "6", x: 120, y: 340, size: "sm" },
];

const CONNECTIONS = [
  { from: "1", to: "4" },
  { from: "1", to: "5" },
  { from: "1", to: "2" },
  { from: "2", to: "3" },
  { from: "4", to: "6" },
  { from: "5", to: "3" },
];

const SIZE_CONFIG = {
  lg: { w: 64, h: 96, radius: 32 },
  md: { w: 52, h: 78, radius: 26 },
  sm: { w: 40, h: 60, radius: 20 },
};

export default function MapPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [zoom, setZoom] = useState(1);

  const getBook = (id: string) => MOCK_BOOKS.find((b) => b.id === id);

  return (
    <div className="mobile-page bg-cream animate-fade-in">
      <PageHeader
        title="Reading Map"
        subtitle="Your book connections"
        right={
            <button className="w-9 h-9 bg-white rounded-2xl shadow-card flex items-center justify-center">
            <Filter size={16} className="text-ink-600" />
          </button>
        }
      />

      {/* ─── Legend ─────────────────────────────────────────────── */}
      <div className="px-5 pt-2 pb-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {[
            { color: "bg-brand-600", label: "Finished" },
            { color: "bg-amber-400", label: "Reading" },
            { color: "bg-sage-300", label: "Want to Read" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5 shrink-0">
              <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
              <span className="text-xs text-ink-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Map canvas ─────────────────────────────────────────── */}
      <div className="mx-5 rounded-3xl overflow-hidden bg-gradient-to-br from-sage-50 to-brand-50 border border-sage-200 shadow-card">
        <div
          className="relative overflow-auto scrollbar-hide"
          style={{ height: "460px" }}
        >
          <div
            style={{
              width: 440,
              height: 440,
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              position: "relative",
            }}
          >
            {/* SVG connections */}
            <svg
              width={440}
              height={440}
              className="absolute inset-0 pointer-events-none"
            >
              {CONNECTIONS.map(({ from, to }) => {
                const fromPos = MAP_POSITIONS.find((p) => p.bookId === from);
                const toPos = MAP_POSITIONS.find((p) => p.bookId === to);
                if (!fromPos || !toPos) return null;
                return (
                  <line
                    key={`${from}-${to}`}
                    x1={fromPos.x}
                    y1={fromPos.y}
                    x2={toPos.x}
                    y2={toPos.y}
                    stroke="#8CE08C"
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                    opacity={0.6}
                  />
                );
              })}
            </svg>

            {/* Book nodes */}
            {MAP_POSITIONS.map(({ bookId, x, y, size }) => {
              const book = getBook(bookId);
              if (!book) return null;
              const cfg = SIZE_CONFIG[size as keyof typeof SIZE_CONFIG];
              const isSelected = selectedBook?.id === bookId;

              const ringColor =
                book.status === "finished"
                  ? "ring-brand-600"
                  : book.status === "reading"
                  ? "ring-amber-400"
                  : "ring-sage-300";

              return (
                <button
                  key={bookId}
                  onClick={() => setSelectedBook(isSelected ? null : book)}
                  style={{
                    position: "absolute",
                    left: x - cfg.w / 2,
                    top: y - cfg.h / 2,
                    width: cfg.w,
                    height: cfg.h,
                  }}
                  className={cn(
                    "rounded-xl overflow-hidden ring-2 transition-all duration-200 shadow-md",
                    ringColor,
                    isSelected && "scale-110 shadow-xl ring-4"
                  )}
                >
                  {book.coverUrl ? (
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      width={cfg.w}
                      height={cfg.h}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-100 to-sage-100 flex items-center justify-center p-1">
                      <span className="text-[8px] text-brand-600 font-bold text-center leading-tight">
                        {book.title.slice(0, 8)}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-sage-200/50">
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
            className="w-8 h-8 rounded-xl bg-white shadow-card flex items-center justify-center"
          >
            <ZoomOut size={14} className="text-ink-500" />
          </button>
          <span className="text-xs text-ink-400 w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(1.8, z + 0.2))}
            className="w-8 h-8 rounded-xl bg-white shadow-card flex items-center justify-center"
          >
            <ZoomIn size={14} className="text-ink-500" />
          </button>
        </div>
      </div>

      {/* ─── Selected book detail ────────────────────────────────── */}
      {selectedBook && (
        <div className="mx-5 mt-4 bg-white rounded-2xl p-4 shadow-card animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="w-[46px] h-[68px] rounded-xl overflow-hidden bg-sage-100 shadow-sm shrink-0">
              {selectedBook.coverUrl ? (
                <Image
                  src={selectedBook.coverUrl}
                  alt={selectedBook.title}
                  width={46}
                  height={68}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-ink-700 truncate">{selectedBook.title}</p>
              <p className="text-xs text-ink-400 mt-0.5">{selectedBook.author}</p>
              <Badge
                variant={selectedBook.status === "reading" ? "amber" : "green"}
                size="sm"
                className="mt-1.5"
              >
                {selectedBook.status === "reading"
                  ? "Reading"
                  : selectedBook.status === "finished"
                  ? "Finished"
                  : "Want to Read"}
              </Badge>
            </div>
            <Link href={`/book/${selectedBook.id}`}>
              <button className="shrink-0 px-3 py-1.5 bg-brand-50 text-brand-600 rounded-xl text-xs font-semibold">
                View
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* ─── AI insight ─────────────────────────────────────────── */}
      <div className="px-5 pt-4">
        <div className="bg-gradient-to-r from-brand-50 to-sage-50 rounded-2xl p-4 border border-sage-200">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-brand-600" />
            <p className="text-[13px] font-semibold text-ink-700">AI Insight</p>
          </div>
          <p className="text-xs text-ink-500 leading-relaxed">
            You have a strong pattern in <strong>Psychology & Self-Help</strong>. Your reading map
            shows you tend to explore how habits and decisions intersect. Try branching into
            Philosophy or Neuroscience next.
          </p>
        </div>
      </div>
    </div>
  );
}

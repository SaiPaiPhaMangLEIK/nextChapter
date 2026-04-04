"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Search, X, Plus, BookOpen, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import type { Book } from "@/types";

// Simulated search results
const SEARCH_RESULTS: Partial<Book>[] = [
  {
    id: "sr1",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    coverUrl: "https://covers.openlibrary.org/b/id/8739164-L.jpg",
    genre: ["Self-Help"],
    pageCount: 224,
    publishedYear: 2016,
  },
  {
    id: "sr2",
    title: "Can't Hurt Me",
    author: "David Goggins",
    coverUrl: "https://covers.openlibrary.org/b/id/12345-L.jpg",
    genre: ["Memoir", "Self-Help"],
    pageCount: 364,
    publishedYear: 2018,
  },
];

export default function ScanPage() {
  const [mode, setMode] = useState<"options" | "search" | "scan" | "result">("options");
  const [query, setQuery] = useState("");
  const [results] = useState(SEARCH_RESULTS);

  return (
    <div className="mobile-page bg-cream animate-fade-in">
      <PageHeader title="Add Book" showBack />

      {/* ─── Mode selection ─────────────────────────────────────── */}
      {mode === "options" && (
        <div className="px-5 pt-4 space-y-3">
          <p className="text-sm text-gray-500 mb-4">How would you like to add a book?</p>

          {[
            {
              icon: Camera,
              title: "Scan Book Cover",
              desc: "Point your camera at any book cover",
              action: () => setMode("scan"),
              color: "bg-brand-500",
            },
            {
              icon: Search,
              title: "Search by Title",
              desc: "Find by book title, author, or ISBN",
              action: () => setMode("search"),
              color: "bg-blue-500",
            },
            {
              icon: BookOpen,
              title: "Browse Catalog",
              desc: "Explore curated reading lists",
              action: () => setMode("search"),
              color: "bg-purple-500",
            },
          ].map(({ icon: Icon, title, desc, action, color }) => (
            <button
              key={title}
              onClick={action}
              className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-card text-left active:scale-[0.98] transition-transform"
            >
              <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shrink-0`}>
                <Icon size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-gray-900">{title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* ─── Search mode ────────────────────────────────────────── */}
      {mode === "search" && (
        <div className="px-5 pt-3 space-y-4">
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-card">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search title, author, ISBN..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>

          {query.length > 1 && (
            <div className="space-y-3">
              <p className="text-xs text-gray-400">Results</p>
              {results.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center gap-3.5 bg-white rounded-2xl p-4 shadow-card"
                >
                  <div className="w-[46px] h-[68px] rounded-xl overflow-hidden bg-gray-100 shadow-sm shrink-0">
                    {book.coverUrl ? (
                      <Image
                        src={book.coverUrl}
                        alt={book.title ?? ""}
                        width={46}
                        height={68}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-100" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-gray-900 truncate">{book.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{book.author}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {book.genre?.slice(0, 2).map((g) => (
                        <Badge key={g} size="sm">{g}</Badge>
                      ))}
                    </div>
                  </div>
                  <button className="w-9 h-9 rounded-2xl bg-brand-500 flex items-center justify-center shrink-0">
                    <Plus size={18} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {!query && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search size={28} className="text-gray-300" />
              </div>
              <p className="text-sm text-gray-500">Type to search for books</p>
            </div>
          )}
        </div>
      )}

      {/* ─── Scan mode (placeholder) ────────────────────────────── */}
      {mode === "scan" && (
        <div className="px-5 pt-4">
          <div className="bg-gray-900 rounded-3xl overflow-hidden aspect-[3/4] flex flex-col items-center justify-center gap-4 relative">
            <div className="absolute inset-8 border-2 border-white/40 rounded-2xl" />
            <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-brand-400 rounded-tl-lg" />
            <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-brand-400 rounded-tr-lg" />
            <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-brand-400 rounded-bl-lg" />
            <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-brand-400 rounded-br-lg" />
            <Camera size={40} className="text-white/40" />
            <p className="text-white/60 text-sm text-center px-8">
              Camera access required to scan book covers
            </p>
            <Button variant="secondary" size="md">
              Enable Camera
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

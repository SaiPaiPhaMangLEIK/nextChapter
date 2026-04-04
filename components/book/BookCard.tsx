"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import { statusLabel, statusColor } from "@/lib/utils";
import type { Book } from "@/types";

interface BookCardProps {
  book: Book;
  variant?: "compact" | "list" | "grid";
  showProgress?: boolean;
  className?: string;
}

export default function BookCard({
  book,
  variant = "grid",
  showProgress = true,
  className,
}: BookCardProps) {
  if (variant === "list") {
    return (
      <Link href={`/book/${book.id}`} className="block">
        <div
          className={cn(
            "flex gap-3.5 p-4 bg-white rounded-2xl shadow-card active:scale-[0.99] transition-all",
            className
          )}
        >
          <div className="shrink-0 w-[52px] h-[78px] rounded-xl overflow-hidden bg-sage-100 shadow-sm">
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={book.title}
                width={52}
                height={78}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-sage-100">
                <span className="text-[10px] text-brand-600 font-semibold text-center px-1 leading-tight">
                  {book.title.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-[14px] font-semibold text-ink-700 leading-snug truncate">
                  {book.title}
                </h3>
                <p className="text-xs text-ink-400 mt-0.5 truncate">{book.author}</p>
              </div>
              {book.rating && (
                <div className="flex items-center gap-0.5 shrink-0">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs text-ink-500">{book.rating}</span>
                </div>
              )}
            </div>

            <div className="mt-2.5 space-y-1.5">
              {showProgress && book.progress && book.status === "reading" && (
                <div>
                  <ProgressBar value={book.progress.percentage} size="xs" />
                  <p className="text-[10px] text-ink-400 mt-0.5">
                    p. {book.progress.currentPage} / {book.progress.totalPages}
                  </p>
                </div>
              )}
              <span
                className={cn(
                  "inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-lg",
                  statusColor(book.status)
                )}
              >
                {statusLabel(book.status)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/book/${book.id}`} className="block shrink-0">
        <div className={cn("w-[110px]", className)}>
          <div className="w-[110px] h-[165px] rounded-xl overflow-hidden bg-sage-100 shadow-md active:scale-[0.97] transition-transform">
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={book.title}
                width={110}
                height={165}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-sage-100 p-3">
                <span className="text-xs text-brand-700 font-semibold text-center leading-tight">
                  {book.title}
                </span>
              </div>
            )}
          </div>
          <div className="mt-2 px-0.5">
            <p className="text-[12px] font-semibold text-ink-700 leading-tight line-clamp-2">
              {book.title}
            </p>
            <p className="text-[10px] text-ink-400 mt-0.5 truncate">{book.author}</p>
            {showProgress && book.progress && book.status === "reading" && (
              <ProgressBar value={book.progress.percentage} size="xs" className="mt-1.5" />
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Grid variant (default)
  return (
    <Link href={`/book/${book.id}`} className="block">
      <div
        className={cn(
          "bg-white rounded-2xl overflow-hidden shadow-card active:scale-[0.98] transition-all",
          className
        )}
      >
        <div className="relative w-full h-48 bg-sage-100">
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-sage-100 p-4">
              <span className="text-sm text-brand-700 font-semibold text-center leading-tight">
                {book.title}
              </span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge variant={book.status === "reading" ? "green" : "default"} size="sm">
              {statusLabel(book.status)}
            </Badge>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-[13px] font-semibold text-ink-700 leading-snug line-clamp-2">
            {book.title}
          </h3>
          <p className="text-[11px] text-ink-400 mt-0.5 truncate">{book.author}</p>
          {showProgress && book.progress && (
            <ProgressBar value={book.progress.percentage} size="xs" className="mt-2" />
          )}
        </div>
      </div>
    </Link>
  );
}

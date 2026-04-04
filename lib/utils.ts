import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ReadingStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatProgress(current: number, total: number): string {
  if (!total) return "0%";
  return `${Math.round((current / total) * 100)}%`;
}

export function getProgressPercent(current: number, total: number): number {
  if (!total) return 0;
  return Math.min(Math.round((current / total) * 100), 100);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function statusLabel(status: ReadingStatus): string {
  const labels: Record<ReadingStatus, string> = {
    want_to_read: "Want to Read",
    reading: "Reading",
    finished: "Finished",
    paused: "Paused",
    dnf: "Did Not Finish",
  };
  return labels[status];
}

export function statusColor(status: ReadingStatus): string {
  const colors: Record<ReadingStatus, string> = {
    want_to_read: "bg-blue-100 text-blue-700",
    reading: "bg-brand-50 text-brand-600",
    finished: "bg-brand-50 text-brand-600",
    paused: "bg-amber-100 text-amber-700",
    dnf: "bg-red-100 text-red-600",
  };
  return colors[status];
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? `${count} ${singular}` : `${count} ${plural ?? singular + "s"}`;
}

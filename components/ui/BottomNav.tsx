"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, ScanLine, Map, AlignJustify } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Nav items either side of the Scan FAB ────────────────────────────────────

const LEFT_ITEMS = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Library", href: "/library", icon: BookOpen },
];

const RIGHT_ITEMS = [
  { label: "Map", href: "/map", icon: Map },
  { label: "Menu", href: "/profile", icon: AlignJustify },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Hide on book detail pages
  if (/^\/book\/(?!scan)[^/]+/.test(pathname)) return null;

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Elevated Scan FAB — sits above the bar */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-6 z-10 flex flex-col items-center">
        <Link href="/book/scan" className="active:scale-95 transition-transform block">
          {/* White ring wrapper */}
          <div className="p-[3px] rounded-full bg-white shadow-[0_4px_18px_rgba(0,0,0,0.12)]">
            <div className="w-[52px] h-[52px] rounded-full bg-forest-900 flex items-center justify-center shadow-[0_4px_14px_rgba(15,35,18,0.40)]">
              <ScanLine size={22} className="text-white" strokeWidth={2} />
            </div>
          </div>
        </Link>
      </div>

      {/* Nav bar — pb covers iOS home indicator without adding gap on desktop */}
      <div
        className="bg-white/95 backdrop-blur-xl border-t border-sage-200 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center h-16 max-w-lg mx-auto px-2">
          {/* Left items */}
          {LEFT_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 flex-1 h-14 rounded-2xl transition-all duration-200",
                  active
                    ? "text-brand-600"
                    : "text-ink-400 hover:text-ink-600 active:scale-95"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-200",
                    active ? "bg-brand-50" : ""
                  )}
                >
                  <Icon
                    size={22}
                    strokeWidth={active ? 2.5 : 1.8}
                    className="transition-all duration-200"
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium leading-none transition-all",
                    active ? "text-brand-600" : "text-ink-400"
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Center spacer + Scan label */}
          <div className="flex flex-col items-center justify-end pb-2 flex-1 h-14">
            <span className="text-[10px] font-medium text-ink-400">Scan</span>
          </div>

          {/* Right items */}
          {RIGHT_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 flex-1 h-14 rounded-2xl transition-all duration-200",
                  active
                    ? "text-brand-600"
                    : "text-ink-400 hover:text-ink-600 active:scale-95"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-200",
                    active ? "bg-brand-50" : ""
                  )}
                >
                  <Icon
                    size={22}
                    strokeWidth={active ? 2.5 : 1.8}
                    className="transition-all duration-200"
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium leading-none transition-all",
                    active ? "text-brand-600" : "text-ink-400"
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

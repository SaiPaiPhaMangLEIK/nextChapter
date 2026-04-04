"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  transparent?: boolean;
  right?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  showBack = false,
  transparent = false,
  right,
  className,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between px-5 h-14",
        !transparent && "bg-cream/90 backdrop-blur-xl border-b border-gray-100/80",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-9 h-9 rounded-2xl bg-gray-100 text-gray-600 active:scale-95 transition-transform"
          >
            <ArrowLeft size={18} strokeWidth={2} />
          </button>
        )}
        {title && (
          <div>
            <h1 className="text-[17px] font-semibold text-gray-900 leading-tight">{title}</h1>
            {subtitle && (
              <p className="text-xs text-gray-400 leading-tight mt-0.5">{subtitle}</p>
            )}
          </div>
        )}
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </header>
  );
}

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  size?: "xs" | "sm" | "md";
  showLabel?: boolean;
  className?: string;
  color?: "green" | "amber" | "blue";
}

const heights = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
};

const colors = {
  green: "from-brand-400 to-brand-500",
  amber: "from-amber-400 to-amber-500",
  blue: "from-blue-400 to-blue-500",
};

export default function ProgressBar({
  value,
  size = "sm",
  showLabel = false,
  className,
  color = "green",
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex-1 bg-gray-100 rounded-full overflow-hidden", heights[size])}>
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-500",
            colors[color]
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-gray-500 w-8 text-right shrink-0">
          {clamped}%
        </span>
      )}
    </div>
  );
}

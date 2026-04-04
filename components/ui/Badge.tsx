import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "amber" | "blue" | "red" | "purple";
  size?: "sm" | "md";
  className?: string;
}

const variants = {
  default: "bg-sage-100 text-ink-500",
  green: "bg-brand-50 text-brand-600",
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  red: "bg-red-100 text-red-600",
  purple: "bg-purple-100 text-purple-700",
};

const sizes = {
  sm: "text-[10px] px-2 py-0.5 rounded-lg",
  md: "text-xs px-2.5 py-1 rounded-xl",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium leading-none",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

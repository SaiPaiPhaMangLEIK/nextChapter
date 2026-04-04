import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

const pixelSizes = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };

export default function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div
      className={cn(
        "rounded-full overflow-hidden bg-gradient-to-br from-brand-300 to-brand-600 flex items-center justify-center shrink-0",
        sizes[size],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={name ?? "Avatar"}
          width={pixelSizes[size]}
          height={pixelSizes[size]}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-semibold text-white leading-none">{initials}</span>
      )}
    </div>
  );
}

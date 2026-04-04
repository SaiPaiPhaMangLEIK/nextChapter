import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center px-8 py-12 gap-4",
        className
      )}
    >
      {icon && (
        <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center text-gray-400">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <h3 className="text-[15px] font-semibold text-gray-800">{title}</h3>
        {description && (
          <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

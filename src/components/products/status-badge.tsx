import type { ProductStatus } from "@/content/types"
import { cn } from "@/lib/utils"

export const statusLabels: Record<ProductStatus, string> = {
  live: "Live",
  beta: "Beta",
  "coming-soon": "Coming soon",
}

const styles: Record<ProductStatus, { badge: string; dot: string }> = {
  live: {
    badge: "border-success/25 bg-success/10 text-success",
    dot: "bg-success",
  },
  beta: {
    badge: "border-warning/30 bg-warning/10 text-warning",
    dot: "bg-warning",
  },
  "coming-soon": {
    badge: "border-border bg-muted text-muted-foreground",
    dot: "bg-muted-foreground/60",
  },
}

export function StatusBadge({
  status,
  className,
}: {
  status: ProductStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        styles[status].badge,
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          styles[status].dot,
          status === "live" && "motion-safe:animate-pulse"
        )}
      />
      {statusLabels[status]}
    </span>
  )
}

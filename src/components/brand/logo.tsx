import { cn } from "@/lib/utils"

/**
 * Placeholder brand mark: an open "C" with a cursor block, on a navy tile.
 * Replace the SVG paths when the final logo is ready; the same geometry is
 * used in src/app/icon.svg and the Open Graph images.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
    >
      <rect
        width="32"
        height="32"
        rx="9"
        className="fill-navy dark:fill-brand-accent"
      />
      <path
        d="M21.6 10.4a7.9 7.9 0 1 0 0 11.2"
        fill="none"
        strokeWidth="3.4"
        strokeLinecap="round"
        className="stroke-brand-accent dark:stroke-navy"
      />
      <rect
        x="19"
        y="14.3"
        width="3.4"
        height="3.4"
        rx="0.9"
        className="fill-white dark:fill-navy"
      />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-display text-[1.2rem] leading-none font-bold tracking-[-0.03em]",
        className
      )}
    >
      <LogoMark />
      <span>
        Creed<span className="text-brand">tech</span>
      </span>
    </span>
  )
}

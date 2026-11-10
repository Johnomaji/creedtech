import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.16em] text-brand uppercase",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="size-1.5 rounded-[1px] bg-brand-accent ring-1 ring-brand/30"
      />
      {children}
    </p>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  /** Heading level. Defaults to h2. */
  as?: "h1" | "h2"
  id?: string
  className?: string
  children?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  id,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(
          "mt-4 text-3xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-[2.6rem]",
          !eyebrow && "mt-0"
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}

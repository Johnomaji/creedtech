import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { Container } from "./container"
import { Eyebrow } from "./section-heading"

/** Top-of-page header used by every inner page. Renders the page's h1. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <section
      aria-labelledby="page-title"
      className={cn(
        "relative isolate under-header overflow-hidden border-b",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid fade-mask-top"
      />
      <Container className="pt-16 pb-16 sm:pt-24 sm:pb-20">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            id="page-title"
            className="mt-5 text-4xl leading-[1.04] font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  )
}

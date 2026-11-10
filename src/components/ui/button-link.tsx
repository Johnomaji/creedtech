import Link from "next/link"
import type { ReactNode } from "react"
import type { VariantProps } from "class-variance-authority"
import { ArrowUpRight } from "lucide-react"

import { isExternalHref } from "@/lib/nav"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

/**
 * A link styled as a button. Internal paths use next/link; external URLs
 * open in a new tab with an icon and a screen-reader hint.
 */
export function ButtonLink({
  href,
  children,
  variant,
  size = "xl",
  className,
}: {
  href: string
  children: ReactNode
  className?: string
} & VariantProps<typeof buttonVariants>) {
  const classes = cn(buttonVariants({ variant, size }), className)

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

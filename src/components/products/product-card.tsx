import Link from "next/link"
import type { CSSProperties } from "react"
import { ArrowUpRight } from "lucide-react"

import { getCategory } from "@/content/products"
import type { Product } from "@/content/types"
import { cn } from "@/lib/utils"
import { ProductMark } from "./product-mark"
import { StatusBadge } from "./status-badge"

export function ProductCard({
  product,
  headingLevel: Heading = "h3",
  className,
}: {
  product: Product
  headingLevel?: "h2" | "h3"
  className?: string
}) {
  const category = getCategory(product.category)

  return (
    <article
      style={{ "--product-accent": product.accentColor } as CSSProperties}
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-2xl border bg-card p-6 transition duration-300 sm:p-7",
        "hover:-translate-y-0.5 hover:border-[color-mix(in_oklch,var(--product-accent),transparent_55%)] hover:shadow-[0_24px_48px_-24px_color-mix(in_oklch,var(--product-accent),transparent_55%)]",
        "has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-background",
        className
      )}
    >
      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 -z-10 size-64 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--product-accent),transparent_78%),transparent)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-4">
        <ProductMark product={product} />
        <StatusBadge status={product.status} />
      </div>

      <p className="mt-6 font-mono text-[0.7rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
        {category.label}
      </p>
      <Heading className="mt-1.5 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
        <Link
          href={`/products/${product.slug}`}
          className="outline-none after:absolute after:inset-0 after:content-['']"
        >
          {product.name}
        </Link>
      </Heading>
      <p className="mt-2 leading-relaxed text-muted-foreground">
        {product.tagline}
      </p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
        <ul className="flex flex-wrap gap-1.5" aria-label="Platforms">
          {product.platforms.map((platform) => (
            <li
              key={platform}
              className="rounded-md border bg-background/60 px-2 py-0.5 text-xs text-muted-foreground"
            >
              {platform}
            </li>
          ))}
        </ul>
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full border bg-background/60 text-muted-foreground transition-all duration-300 group-hover:border-transparent group-hover:bg-(--product-accent) group-hover:text-white"
        >
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  )
}

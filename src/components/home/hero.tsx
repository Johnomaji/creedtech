import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { products } from "@/content/products"
import { Container } from "@/components/layout/container"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HeroVisual } from "./hero-visual"

const highlights = [
  "Discovery to launch",
  "Web, iOS & Android",
  "Long-term support",
]

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      {/* Background: hairline grid + top glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid fade-mask-top"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 mx-auto h-144 max-w-5xl bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand-indigo),transparent_82%),transparent)]"
      />

      <Container className="grid grid-cols-1 items-center gap-16 pt-14 pb-16 sm:pt-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-12 lg:pt-28 lg:pb-28">
        <div className="max-w-2xl">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full border bg-card/70 py-1 pr-3 pl-1 text-sm text-muted-foreground shadow-xs transition-colors hover:border-brand/40 hover:text-foreground"
          >
            <span className="rounded-full bg-brand-accent px-2 py-0.5 font-mono text-[0.68rem] font-medium tracking-wider text-brand-accent-foreground uppercase">
              {products.length} products
            </span>
            <span className="sm:hidden">See what we&apos;ve built</span>
            <span className="hidden sm:inline">
              Edutech, health, CX and productivity
            </span>
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>

          <h1
            id="hero-title"
            className="mt-7 text-[2.6rem] leading-[1.02] font-bold tracking-[-0.04em] sm:text-6xl lg:text-[4.4rem]"
          >
            We build the software organizations{" "}
            <span className="relative isolate whitespace-nowrap">
              <span
                aria-hidden="true"
                className="absolute inset-x-[-0.06em] bottom-[0.06em] -z-10 h-[0.36em] -skew-x-6 rounded-[0.08em] bg-brand-accent dark:hidden"
              />
              <span className="dark:text-brand-accent">run on.</span>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Creedtech designs, builds and supports SaaS products and custom
            software for schools, health providers and growing businesses. We
            run our own products, so we build yours like a product too.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "xl" }))}
            >
              Start a project
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
            <Link
              href="/products"
              className={cn(buttonVariants({ size: "xl", variant: "outline" }))}
            >
              Explore our products
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-brand-subtle text-brand">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pl-6">
          <HeroVisual />
        </div>
      </Container>
    </section>
  )
}

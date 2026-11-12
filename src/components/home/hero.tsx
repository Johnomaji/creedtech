import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate under-header overflow-hidden"
    >
      {/* Background: hairline grid + top glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid fade-mask-top"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-24 -z-10 mx-auto h-144 max-w-5xl bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand-indigo),transparent_82%),transparent)]"
      />

      <Container className="flex flex-col items-center pt-20 pb-8 text-center sm:pt-28 sm:pb-12 lg:pt-40 lg:pb-16">
        <h1
          id="hero-title"
          className="max-w-4xl text-[2.6rem] leading-[1.02] font-bold tracking-[-0.045em] text-balance sm:text-6xl lg:text-[5.25rem]"
        >
          We build the software organizations run on.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
          Creedtech designs, builds and supports SaaS products and custom
          software for schools, health providers and growing businesses. We run
          our own products, so we build yours like a product too.
        </p>

        <div className="mt-11 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/contact" className={cn(buttonVariants({ size: "xl" }))}>
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
      </Container>
    </section>
  )
}

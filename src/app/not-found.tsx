import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { products } from "@/content/products"
import { Container } from "@/components/layout/container"
import { Eyebrow } from "@/components/layout/section-heading"
import { ButtonLink } from "@/components/ui/button-link"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
}

const suggestions = [
  { href: "/products", label: "Our products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Creedtech" },
  { href: "/contact", label: "Contact us" },
]

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative isolate under-header overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid fade-mask-top"
      />
      <Container className="flex flex-col items-center py-24 text-center sm:py-32">
        <Eyebrow>Error 404</Eyebrow>
        <h1
          id="not-found-title"
          className="mt-5 text-4xl leading-[1.04] font-bold tracking-[-0.04em] sm:text-5xl"
        >
          This page doesn&apos;t exist
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted-foreground">
          The link may be broken, or the page may have moved. Here are some
          places to start instead.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">
            <ArrowLeft data-icon="inline-start" aria-hidden="true" />
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>

        <nav aria-label="Suggested pages" className="mt-14 w-full max-w-xl">
          <ul className="grid gap-2 text-left sm:grid-cols-2">
            {[
              ...suggestions,
              ...products.slice(0, 2).map((product) => ({
                href: `/products/${product.slug}`,
                label: product.name,
              })),
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between rounded-xl border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-brand/40"
                >
                  {link.label}
                  <ArrowRight
                    className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  )
}

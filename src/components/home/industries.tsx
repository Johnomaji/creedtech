import Link from "next/link"
import {
  Clapperboard,
  GraduationCap,
  HeartPulse,
  Landmark,
  MessagesSquare,
  Store,
} from "lucide-react"

import { industries, type IndustryIcon } from "@/content/company"
import { getProduct } from "@/content/products"
import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/layout/section-heading"

const icons = {
  "graduation-cap": GraduationCap,
  "heart-pulse": HeartPulse,
  "messages-square": MessagesSquare,
  clapperboard: Clapperboard,
  landmark: Landmark,
  store: Store,
} satisfies Record<IndustryIcon, unknown>

export function Industries() {
  return (
    <section
      aria-labelledby="industries-title"
      className="border-y bg-card/50 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="industries-title"
          eyebrow="Industries"
          title="Built for the organizations that keep things running"
          description="We focus on sectors where better software changes outcomes for real people: students, patients, customers and the teams who serve them."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = icons[industry.icon]
            const related = industry.productSlugs
              .map((slug) => getProduct(slug))
              .filter((p) => p !== undefined)

            return (
              <li
                key={industry.name}
                className="group flex flex-col bg-card p-7 transition-colors hover:bg-background"
              >
                <Icon
                  className="size-6 text-brand transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">
                  {industry.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
                {related.length > 0 ? (
                  <p className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-5 text-xs text-muted-foreground">
                    <span className="font-mono tracking-wider uppercase">
                      Products
                    </span>
                    {related.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-brand"
                      >
                        {product.name}
                      </Link>
                    ))}
                  </p>
                ) : (
                  <p className="mt-auto pt-5 font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    Custom builds
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { products } from "@/content/products"
import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/layout/section-heading"
import { ProductCard } from "@/components/products/product-card"
import { cn } from "@/lib/utils"

/**
 * Bento layout on large screens: two wide cards on the first row, three on
 * the next, then repeating. Works for any number of products.
 */
function spanFor(index: number) {
  return index % 5 < 2 ? "lg:col-span-3" : "lg:col-span-2"
}

export function ProductShowcase() {
  return (
    <section
      aria-labelledby="products-title"
      className="pt-16 pb-24 sm:pb-32 lg:pt-20"
    >
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="products-title"
            eyebrow="Our products"
            title="Products we build, ship and run ourselves"
            description="We don't just build software for clients. We operate our own SaaS products, which keeps our engineering honest and our advice practical."
          />
          <Link
            href="/products"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand"
          >
            View all products
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {products.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              className={cn("reveal sm:odd:last:col-span-2", spanFor(index))}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

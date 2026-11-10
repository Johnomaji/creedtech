import { productCategories, products } from "@/content/products"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { ProductCard } from "@/components/products/product-card"
import { ProductFilter } from "@/components/products/product-filter"
import { CtaBand } from "@/components/sections/cta-band"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "Products",
  description:
    "SaaS products from Creedtech for education, health, customer experience and productivity: Terminal, IdomaSpeak, Workbench and more.",
  path: "/products",
})

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Software we build, ship and run ourselves"
        description="Focused products for schools, families, customer teams and every department in between. Each one is built and supported by the same team that builds our clients' software."
      />

      <section aria-label="Product catalogue" className="py-14 sm:py-20">
        <Container>
          <ProductFilter
            categories={productCategories.map(({ id, label }) => ({
              id,
              label,
            }))}
            items={products.map((product) => ({
              id: product.slug,
              category: product.category,
              node: (
                <ProductCard
                  product={product}
                  headingLevel="h2"
                  className="w-full"
                />
              ),
            }))}
          />
        </Container>
      </section>

      <CtaBand
        title="Need something none of these do?"
        description="We build custom software too. Tell us about the process you want to fix and we'll suggest the simplest way to get there."
      />
    </>
  )
}

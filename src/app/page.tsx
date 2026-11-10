import { Hero } from "@/components/home/hero"
import { Industries } from "@/components/home/industries"
import { Process } from "@/components/home/process"
import { ProductShowcase } from "@/components/home/product-showcase"
import { ServicesOverview } from "@/components/home/services-overview"
import { StatsStrip } from "@/components/home/stats-strip"
import { Testimonials } from "@/components/home/testimonials"
import { CtaBand } from "@/components/sections/cta-band"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({ path: "/" })

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <ServicesOverview />
      <Process />
      <Industries />
      <StatsStrip />
      <Testimonials />
      <CtaBand />
    </>
  )
}

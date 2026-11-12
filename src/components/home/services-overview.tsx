import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { services } from "@/content/services"
import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/layout/section-heading"
import { ServiceIcon } from "@/components/services/service-icon"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ServicesOverview() {
  return (
    <section
      aria-labelledby="services-title"
      className="relative border-y bg-card/50 py-24 sm:py-32"
    >
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="services-title"
            eyebrow="What we do"
            title="Custom software, built around how you work"
            description="Bring us a process that's held together by spreadsheets, a product idea, or a system that's outgrown itself. We'll help you decide what to build, then build it properly."
          />
          <Link
            href="/services"
            className={cn(
              buttonVariants({ size: "xl", variant: "outline" }),
              "mt-8"
            )}
          >
            Explore our services
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <li
              key={service.slug}
              className="group relative flex reveal flex-col rounded-2xl border bg-card p-6 transition-colors hover:border-brand/35 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand-subtle text-brand">
                <ServiceIcon name={service.icon} className="size-5" />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">
                <Link
                  href={`/services#${service.slug}`}
                  className="outline-none after:absolute after:inset-0 after:content-['']"
                >
                  {service.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.summary}
              </p>
            </li>
          ))}

          {/* Sixth tile: a nudge for people who aren't sure what they need. */}
          <li className="flex reveal flex-col justify-between rounded-2xl bg-inverse p-6 text-inverse-foreground">
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.02em]">
                Not sure where to start?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-inverse-foreground/75">
                Book a free discovery call. We&apos;ll map the problem with you
                and suggest the smallest thing worth building.
              </p>
            </div>
            <Link
              href="/contact?interest=custom-project"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent underline-offset-4 hover:underline"
            >
              Book a discovery call
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  )
}

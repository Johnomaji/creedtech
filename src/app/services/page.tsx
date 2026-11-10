import Link from "next/link"
import { ArrowRight, Check, Plus } from "lucide-react"

import { engagementModels, faqs, services } from "@/content/services"
import { site } from "@/content/site"
import { Process } from "@/components/home/process"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { SectionHeading } from "@/components/layout/section-heading"
import { CtaBand } from "@/components/sections/cta-band"
import { ServiceIcon } from "@/components/services/service-icon"
import { absoluteUrl, JsonLd, organizationId } from "@/lib/json-ld"
import { createMetadata } from "@/lib/metadata"
import { cn } from "@/lib/utils"

export const metadata = createMetadata({
  title: "Services",
  description:
    "Custom SaaS development, web and mobile apps, internal tools and workflow automation, digital transformation consulting, and maintenance and support.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={services.map((service) => ({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: absoluteUrl(`/services#${service.slug}`),
          provider: { "@id": organizationId, name: site.name },
        }))}
      />

      <PageHeader
        eyebrow="Services"
        title="Custom software, from first workshop to long-term support"
        description="We design, build and run software for organizations that have outgrown spreadsheets and off-the-shelf tools, using the same practices behind our own products."
      >
        <nav aria-label="Services on this page" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                >
                  <ServiceIcon name={service.icon} className="size-3.5" />
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {/* Services */}
      <div className="divide-y">
        {services.map((service, index) => (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-title`}
            className="py-16 sm:py-24"
          >
            <Container className="grid gap-10 lg:grid-cols-2 lg:gap-20">
              <div className={cn(index % 2 === 1 && "lg:order-2")}>
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-subtle text-brand">
                    <ServiceIcon name={service.icon} className="size-5" />
                  </span>
                  <span className="font-mono text-sm font-medium text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(services.length).padStart(2, "0")}
                  </span>
                </div>
                <h2
                  id={`${service.slug}-title`}
                  className="mt-6 text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-4xl"
                >
                  {service.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <Link
                  href="/contact?interest=custom-project"
                  className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
                >
                  Discuss your project
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <div className="reveal rounded-2xl border bg-card p-7 sm:p-8">
                <h3 className="font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  What you get
                </h3>
                <ul className="mt-6 space-y-4">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-subtle text-brand">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      <span className="leading-snug">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <div className="border-y bg-card/50">
        <Process />
      </div>

      {/* Engagement models */}
      <section aria-labelledby="engage-title" className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            id="engage-title"
            eyebrow="Ways to work together"
            title="Pick the engagement that fits"
            description="Every engagement starts with a short discovery phase, so you know exactly what you're getting before committing to a build."
          />
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {engagementModels.map((model) => (
              <li
                key={model.title}
                className="flex reveal flex-col rounded-2xl border bg-card p-7"
              >
                <p className="font-mono text-xs font-medium tracking-[0.14em] text-brand uppercase">
                  Best for: {model.bestFor}
                </p>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">
                  {model.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {model.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-title"
        className="border-t bg-card/50 py-24 sm:py-32"
      >
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Questions we hear often"
            description={
              <>
                Something else on your mind?{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  Email us
                </a>
                .
              </>
            }
          />
          <div className="divide-y rounded-2xl border bg-card">
            {faqs.map((faq) => (
              <details key={faq.question} name="faq" className="group px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Plus
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="-mt-1 pb-6 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}

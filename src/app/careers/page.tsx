import { ArrowDown, ArrowUpRight, Briefcase, Clock, MapPin } from "lucide-react"

import { culture, hiringSteps } from "@/content/careers"
import { jobs } from "@/content/jobs"
import { site } from "@/content/site"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { SectionHeading } from "@/components/layout/section-heading"
import { buttonVariants } from "@/components/ui/button"
import { createMetadata } from "@/lib/metadata"
import { cn } from "@/lib/utils"

export const metadata = createMetadata({
  title: "Careers",
  description:
    "Join Creedtech and build software used by schools, families and teams. Our culture, open roles and how we hire.",
  path: "/careers",
})

const speculativeHref = `mailto:${site.careersEmail}?subject=${encodeURIComponent(
  "Speculative application"
)}`

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build software that runs organizations"
        description="Join a small team shipping our own products and custom platforms for schools, health providers and businesses. Real problems, real users, real ownership."
      >
        <a
          href="#open-roles"
          className={cn(buttonVariants({ size: "xl" }), "mt-10")}
        >
          See open roles
          <ArrowDown data-icon="inline-end" aria-hidden="true" />
        </a>
      </PageHeader>

      {/* Culture */}
      <section aria-labelledby="culture-title" className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="culture-title"
            eyebrow="Culture"
            title="What it's like to work here"
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {culture.map((point) => (
              <li
                key={point.title}
                className="reveal rounded-2xl border bg-card p-6"
              >
                <h3 className="text-lg font-semibold tracking-[-0.02em]">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Open roles */}
      <section
        id="open-roles"
        aria-labelledby="roles-title"
        className="border-y bg-card/50 py-20 sm:py-28"
      >
        <Container>
          <SectionHeading
            id="roles-title"
            eyebrow="Open roles"
            title={
              jobs.length > 0
                ? `${jobs.length} open ${jobs.length === 1 ? "role" : "roles"}`
                : "No open roles right now"
            }
          />

          {jobs.length > 0 ? (
            <ul className="mt-12 divide-y overflow-hidden rounded-2xl border bg-card">
              {jobs.map((job) => (
                <li
                  key={job.slug}
                  className="flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="max-w-2xl">
                    <p className="font-mono text-xs font-medium tracking-[0.14em] text-brand uppercase">
                      {job.department}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">
                      {job.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {job.summary}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-1.5">
                        <MapPin className="size-4" aria-hidden="true" />
                        {job.location}
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Clock className="size-4" aria-hidden="true" />
                        {job.type}
                      </li>
                    </ul>
                  </div>
                  <a
                    href={job.applyHref}
                    className={cn(
                      buttonVariants({ size: "xl", variant: "outline" }),
                      "shrink-0 self-start lg:self-center"
                    )}
                  >
                    Apply
                    <span className="sr-only"> for {job.title}</span>
                    <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-12 flex flex-col items-center rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
              <span className="grid size-12 place-items-center rounded-full bg-brand-subtle text-brand">
                <Briefcase className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-5 text-lg font-semibold tracking-tight">
                We&apos;re not hiring for specific roles at the moment
              </p>
              <p className="mt-2 max-w-md text-muted-foreground">
                We&apos;re still happy to hear from great engineers and
                designers. Tell us what you&apos;d like to work on.
              </p>
              <a
                href={speculativeHref}
                className={cn(buttonVariants({ size: "xl" }), "mt-7")}
              >
                Send a speculative application
              </a>
            </div>
          )}

          {jobs.length > 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              Don&apos;t see your role?{" "}
              <a
                href={speculativeHref}
                className="font-medium text-foreground underline underline-offset-4"
              >
                Send a speculative application
              </a>
              .
            </p>
          ) : null}
        </Container>
      </section>

      {/* Hiring process */}
      <section aria-labelledby="process-title" className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="process-title"
            eyebrow="How we hire"
            title="A short, respectful process"
            description="We aim to reach a decision within a couple of weeks and keep you updated at every step."
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {hiringSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border bg-card p-6">
                <span className="grid size-9 place-items-center rounded-full border font-mono text-sm font-medium text-brand">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  )
}

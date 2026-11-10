import { ArrowRight } from "lucide-react"

import { processSteps } from "@/content/company"
import { Container } from "@/components/layout/container"
import { SectionHeading } from "@/components/layout/section-heading"

export function Process() {
  return (
    <section aria-labelledby="process-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="process-title"
          eyebrow="How we work"
          title={processSteps.map((step, index) => (
            <span key={step.title}>
              <span className="whitespace-nowrap">
                {step.title}
                {index < processSteps.length - 1 ? (
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="ml-[0.15em] inline-block size-[0.8em] align-[-0.02em] text-muted-foreground/50"
                  />
                ) : null}
              </span>{" "}
            </span>
          ))}
          description="A simple, transparent process with working software early and often. You always know what's being built, why, and what comes next."
        />

        <div className="relative mt-16">
          {/* Connector line (large screens) */}
          <div
            aria-hidden="true"
            className="absolute top-5 right-[12.5%] left-[12.5%] hidden h-px bg-[linear-gradient(90deg,transparent,var(--border)_10%,var(--border)_90%,transparent)] lg:block"
          />
          <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="relative reveal lg:px-4 lg:text-center"
              >
                <div className="flex items-center gap-4 lg:flex-col lg:gap-0">
                  <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border bg-background font-mono text-sm font-medium text-brand shadow-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] lg:mt-6">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:mx-auto lg:max-w-60">
                  {step.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5 lg:justify-center">
                  {step.outputs.map((output) => (
                    <li
                      key={output}
                      className="rounded-md border bg-card px-2 py-1 text-xs text-muted-foreground"
                    >
                      {output}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

import { ArrowRight, Mail } from "lucide-react"

import { site } from "@/content/site"
import { Container } from "@/components/layout/container"
import { ButtonLink } from "@/components/ui/button-link"
import { buttonVariants } from "@/components/ui/button"
import { isExternalHref } from "@/lib/nav"
import { cn } from "@/lib/utils"

export function CtaBand({
  title = "Have a process that deserves better software?",
  description = "Tell us what you're trying to fix. We'll reply with questions, ideas and a clear next step. No sales script.",
  action = { label: "Start a project", href: "/contact" },
}: {
  title?: string
  description?: string
  action?: { label: string; href: string }
}) {
  return (
    <section aria-labelledby="cta-title" className="pt-4 pb-20 sm:pb-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-inverse px-6 py-16 text-center text-inverse-foreground ring-1 ring-white/10 sm:px-16 sm:py-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] [--grid-line:oklch(1_0_0/0.07)]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-48 left-1/2 -z-10 h-96 w-3xl -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand-accent),transparent_60%),transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute -top-40 -left-20 -z-10 size-96 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand-indigo),transparent_40%),transparent)]"
          />

          <h2
            id="cta-title"
            className="mx-auto max-w-3xl text-3xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-5xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-inverse-foreground/75 sm:text-lg">
            {description}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={action.href} variant="accent">
              {action.label}
              {isExternalHref(action.href) ? null : (
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              )}
            </ButtonLink>
            <a
              href={`mailto:${site.email}`}
              className={cn(
                buttonVariants({ size: "xl", variant: "ghost-inverse" })
              )}
            >
              <Mail data-icon="inline-start" aria-hidden="true" />
              {site.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

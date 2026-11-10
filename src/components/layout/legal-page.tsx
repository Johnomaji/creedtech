import type { ReactNode } from "react"

import { Container } from "./container"
import { PageHeader } from "./page-header"

/**
 * Layout for long-form legal pages. Styles plain h2/p/ul children so the
 * page files can stay as simple markup.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={title}
        description={`Last updated ${updated}`}
      />
      <Container className="py-16 sm:py-20">
        <div className="mb-10 max-w-3xl rounded-xl border border-warning/40 bg-warning/10 px-5 py-4 text-sm leading-relaxed">
          <strong>Placeholder text.</strong> This page is a starting point only
          and is not legal advice. Have it reviewed by a qualified lawyer for
          your jurisdiction before launch.
        </div>
        <article className="max-w-3xl text-foreground/85 [&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-foreground [&_li]:mt-2 [&_p]:mt-4 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:leading-relaxed">
          {children}
        </article>
      </Container>
    </>
  )
}

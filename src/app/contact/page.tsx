import { Mail } from "lucide-react"

import { products } from "@/content/products"
import { site, type SocialKey } from "@/content/site"
import { socialIcons, socialLabels } from "@/components/brand/social-icons"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { createMetadata } from "@/lib/metadata"
import { ContactForm } from "./contact-form"

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Request a product demo, start a custom software project or explore a partnership with Creedtech.",
  path: "/contact",
})

const nextSteps = [
  {
    title: "We read every message",
    description: "A real person on our team reviews your note.",
  },
  {
    title: "We reply with questions",
    description: "Usually a few clarifying questions and some initial ideas.",
  },
  {
    title: "A short discovery call",
    description: "If it's a fit, we book a call to map out the next step.",
  },
]

export default function ContactPage() {
  const socials = Object.entries(site.socials) as [SocialKey, string][]

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about what you're building"
        description="Request a demo, start a project or explore a partnership. Tell us a little about your organization and we'll get back to you."
      />

      <section aria-label="Contact form and details" className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="space-y-10">
            <div>
              <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Email
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-flex items-center gap-2 text-lg font-semibold underline-offset-4 hover:underline"
              >
                <Mail className="size-5 text-brand" aria-hidden="true" />
                {site.email}
              </a>
            </div>

            <div>
              <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                Elsewhere
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {socials.map(([key, href]) => {
                  const Icon = socialIcons[key]
                  return (
                    <li key={key}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                      >
                        <Icon className="size-4" />
                        {socialLabels[key]}
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                What happens next
              </h2>
              <ol className="mt-4 space-y-5">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border bg-card font-mono text-sm font-medium text-brand">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div>
            <h2 className="sr-only">Send us a message</h2>
            <ContactForm
              products={products.map((product) => ({
                slug: product.slug,
                name: product.name,
                waitlist: /waitlist/i.test(product.ctaLabel),
              }))}
            />
          </div>
        </Container>
      </section>
    </>
  )
}

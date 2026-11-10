import Link from "next/link"
import { Mail } from "lucide-react"

import { products } from "@/content/products"
import { services } from "@/content/services"
import { companyNav, legalNav, site, type SocialKey } from "@/content/site"
import { Wordmark } from "@/components/brand/logo"
import { socialIcons, socialLabels } from "@/components/brand/social-icons"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { Container } from "./container"
import { CurrentYear } from "./current-year"

const columns = [
  {
    title: "Products",
    links: products.map((p) => ({
      href: `/products/${p.slug}`,
      label: p.name,
    })),
  },
  {
    title: "Services",
    links: services.map((s) => ({
      href: `/services#${s.slug}`,
      label: s.title,
    })),
  },
  { title: "Company", links: companyNav },
  { title: "Legal", links: legalNav },
]

export function SiteFooter() {
  const socials = Object.entries(site.socials) as [SocialKey, string][]

  return (
    <footer className="border-t bg-card/40">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2.7fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              className="-m-1.5 inline-block rounded-lg p-1.5"
              aria-label={`${site.name} home`}
            >
              <Wordmark />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              We build SaaS products and custom software for schools, health
              providers and growing businesses, and keep it running long after
              launch.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              <Mail className="size-4 text-brand" aria-hidden="true" />
              {site.email}
            </a>
            <ul className="mt-6 flex items-center gap-2">
              {socials.map(([key, href]) => {
                const Icon = socialIcons[key]
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${socialLabels[key]}`}
                      className="inline-flex size-9 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-foreground uppercase">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-6 border-t pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            © <CurrentYear /> {site.legalName}. All rights reserved.
          </p>
          <ThemeSwitcher />
        </div>
      </Container>
    </footer>
  )
}

import type { CSSProperties } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  ImageIcon,
  Info,
  Users,
} from "lucide-react"

import { getCategory, getProduct, products } from "@/content/products"
import { site } from "@/content/site"
import type { Product, ProductCategoryId } from "@/content/types"
import { Container } from "@/components/layout/container"
import { Eyebrow, SectionHeading } from "@/components/layout/section-heading"
import { ProductCard } from "@/components/products/product-card"
import { ProductMark } from "@/components/products/product-mark"
import { StatusBadge, statusLabels } from "@/components/products/status-badge"
import { CtaBand } from "@/components/sections/cta-band"
import { ButtonLink } from "@/components/ui/button-link"
import {
  absoluteUrl,
  breadcrumbJsonLd,
  JsonLd,
  organizationId,
} from "@/lib/json-ld"
import { createMetadata } from "@/lib/metadata"

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}

  return createMetadata({
    title: `${product.name} (${getCategory(product.category).label})`,
    description: product.description,
    path: `/products/${product.slug}`,
    image: {
      url: `/products/${product.slug}/opengraph-image`,
      alt: `${product.name} by ${site.name}`,
    },
  })
}

const applicationCategory: Record<ProductCategoryId, string> = {
  edutech: "EducationalApplication",
  health: "HealthApplication",
  crm: "BusinessApplication",
  productivity: "BusinessApplication",
}

function softwareApplicationJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    url: absoluteUrl(`/products/${product.slug}`),
    applicationCategory: applicationCategory[product.category],
    operatingSystem: product.platforms.join(", "),
    publisher: { "@id": organizationId },
    ...(product.logo ? { image: absoluteUrl(product.logo) } : {}),
  }
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const category = getCategory(product.category)
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <div style={{ "--product-accent": product.accentColor } as CSSProperties}>
      <JsonLd
        data={[
          softwareApplicationJsonLd(product),
          breadcrumbJsonLd([
            { name: "Products", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section
        aria-labelledby="page-title"
        className="relative isolate overflow-hidden border-b"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-grid fade-mask-top"
        />
        <div
          aria-hidden="true"
          className="absolute -top-48 right-0 -z-10 size-160 bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--product-accent),transparent_82%),transparent)]"
        />

        <Container className="grid grid-cols-1 items-center gap-14 pt-10 pb-16 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:pt-14">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/products"
                    className="transition-colors hover:text-foreground"
                  >
                    Products
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3.5" />
                </li>
                <li aria-current="page" className="text-foreground">
                  {product.name}
                </li>
              </ol>
            </nav>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ProductMark product={product} size="lg" />
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  {category.label}
                </span>
                <StatusBadge status={product.status} />
              </div>
            </div>

            <h1
              id="page-title"
              className="mt-7 text-5xl leading-none font-bold tracking-[-0.045em] sm:text-6xl lg:text-7xl"
            >
              {product.name}
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-snug text-foreground/85 sm:text-2xl">
              {product.tagline}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={product.ctaHref}>{product.ctaLabel}</ButtonLink>
              <ButtonLink href="/products" variant="outline">
                <ArrowLeft data-icon="inline-start" aria-hidden="true" />
                All products
              </ButtonLink>
            </div>

            <dl className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Available on</dt>
              {product.platforms.map((platform) => (
                <dd
                  key={platform}
                  className="rounded-md border bg-card px-2 py-0.5 font-medium"
                >
                  {platform}
                </dd>
              ))}
            </dl>
          </div>

          <ScreenshotFrame product={product} />
        </Container>
      </section>

      {/* Disclaimer (e.g. "not a diagnostic tool") */}
      {product.disclaimer ? (
        <Container className="pt-10">
          <aside
            aria-label="Important notice"
            className="flex gap-4 rounded-2xl border border-warning/40 bg-warning/10 p-5 sm:p-6"
          >
            <Info
              className="mt-0.5 size-5 shrink-0 text-warning"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold">Important</p>
              <p className="mt-1 leading-relaxed text-foreground/85">
                {product.disclaimer}
              </p>
            </div>
          </aside>
        </Container>
      ) : null}

      {/* Problem → solution */}
      <section aria-labelledby="problem-title" className="py-20 sm:py-28">
        <Container>
          <h2 id="problem-title" className="sr-only">
            The problem and our solution
          </h2>
          <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <div className="rounded-2xl border bg-card p-7 sm:p-9">
              <Eyebrow className="text-muted-foreground">The problem</Eyebrow>
              <p className="mt-5 text-lg leading-relaxed text-foreground/85">
                {product.problem}
              </p>
            </div>
            <div
              aria-hidden="true"
              className="grid place-items-center text-muted-foreground"
            >
              <span className="grid size-11 rotate-90 place-items-center rounded-full border bg-background lg:rotate-0">
                <ArrowRight className="size-4" />
              </span>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-[color-mix(in_oklch,var(--product-accent),transparent_60%)] bg-card p-7 sm:p-9">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(140deg,color-mix(in_oklch,var(--product-accent),transparent_88%),transparent_60%)]"
              />
              <div className="relative">
                <Eyebrow>How {product.name} solves it</Eyebrow>
                <p className="mt-5 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section
        aria-labelledby="features-title"
        className="border-y bg-card/50 py-20 sm:py-28"
      >
        <Container>
          <SectionHeading
            id="features-title"
            eyebrow="Key features"
            title={`What you get with ${product.name}`}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature) => (
              <li
                key={feature.title}
                className="flex reveal flex-col rounded-2xl border bg-card p-6"
              >
                <span className="grid size-9 place-items-center rounded-lg bg-[color-mix(in_oklch,var(--product-accent),transparent_85%)] text-foreground">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Audience */}
      <section aria-labelledby="audience-title" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            id="audience-title"
            eyebrow="Who it's for"
            title={`Built for the people who use ${product.name} every day`}
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {product.audience.map((audience) => (
              <li
                key={audience}
                className="flex items-center gap-3 rounded-xl border bg-card px-4 py-4 font-medium"
              >
                <Users
                  className="size-4 shrink-0 text-brand"
                  aria-hidden="true"
                />
                {audience}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Screenshots */}
      <section
        aria-labelledby="screens-title"
        className="border-t bg-card/50 py-20 sm:py-28"
      >
        <Container>
          <SectionHeading
            id="screens-title"
            eyebrow="Screenshots"
            title={`A look inside ${product.name}`}
          />
          {product.screenshots.length > 0 ? (
            <ul className="mt-12 grid gap-5 md:grid-cols-2">
              {product.screenshots.map((shot) => (
                <li
                  key={shot.src}
                  className="overflow-hidden rounded-2xl border bg-card"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-auto w-full"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p className="mt-4 text-muted-foreground">
                Screenshots are coming soon.{" "}
                <Link
                  href={product.ctaHref}
                  className="font-medium text-brand underline-offset-4 hover:underline"
                >
                  {product.ctaLabel}
                </Link>{" "}
                to see it in action.
              </p>
              <div
                aria-hidden="true"
                className="mt-10 grid gap-5 md:grid-cols-3"
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="grid aspect-[4/3] place-items-center rounded-2xl border border-dashed bg-[linear-gradient(160deg,color-mix(in_oklch,var(--product-accent),transparent_90%),transparent)] text-muted-foreground"
                  >
                    <ImageIcon className="size-6 opacity-50" />
                  </div>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      {/* Other products */}
      <section aria-labelledby="more-title" className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="more-title"
            eyebrow="More from Creedtech"
            title="Other products"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <ProductCard key={other.slug} product={other} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title={
          product.status === "coming-soon"
            ? `Be first to try ${product.name}`
            : `See ${product.name} in action`
        }
        description={`${product.name} is ${statusLabels[product.status].toLowerCase()}. ${
          product.status === "coming-soon"
            ? "Join the waitlist and we'll let you know as soon as it's ready."
            : "Tell us a little about your organization and we'll show you how it fits."
        }`}
        action={{ label: product.ctaLabel, href: product.ctaHref }}
      />
    </div>
  )
}

/** Hero visual: the first screenshot in a browser frame, or a placeholder. */
function ScreenshotFrame({ product }: { product: Product }) {
  const shot = product.screenshots[0]

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-[0_40px_80px_-32px_color-mix(in_oklch,var(--product-accent),transparent_55%)]">
        <div className="flex items-center gap-1.5 border-b px-4 py-3">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="ml-3 truncate font-mono text-[0.7rem] text-muted-foreground">
            {product.name.toLowerCase().replace(/\s+/g, "")}.app
          </span>
        </div>
        {shot ? (
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            preload
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full"
          />
        ) : (
          <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-[linear-gradient(150deg,color-mix(in_oklch,var(--product-accent),transparent_80%),transparent_70%)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-grid opacity-70"
            />
            <div className="relative flex flex-col items-center gap-4 text-center">
              <ProductMark product={product} size="lg" />
              <p className="text-sm font-medium text-muted-foreground">
                Product screenshots coming soon
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

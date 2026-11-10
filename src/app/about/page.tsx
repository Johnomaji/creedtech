import Link from "next/link"
import { ArrowRight, Compass, Target } from "lucide-react"

import { mission, story, timeline, values, vision } from "@/content/about"
import { team } from "@/content/team"
import { StatsStrip } from "@/components/home/stats-strip"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { SectionHeading } from "@/components/layout/section-heading"
import { InitialsAvatar } from "@/components/people/initials-avatar"
import { CtaBand } from "@/components/sections/cta-band"
import { createMetadata } from "@/lib/metadata"
import { cn } from "@/lib/utils"

/** Stretch the last item so a 2- or 3-column grid never ends in a gap. */
function fillLastRow(index: number, count: number) {
  if (index !== count - 1) return undefined
  return cn(
    count % 2 === 1 && "sm:col-span-2 lg:col-span-1",
    count % 3 === 2 && "lg:col-span-2",
    count % 3 === 1 && "lg:col-span-3"
  )
}

export const metadata = createMetadata({
  title: "About",
  description:
    "Creedtech grew out of Creed Academy, a coding school for children founded in 2018. Our story, mission, vision and values.",
  path: "/about",
})

export default function AboutPage() {
  const founder = team.find((member) => member.group === "leadership")

  return (
    <>
      <PageHeader
        eyebrow="About Creedtech"
        title={story.title}
        description="We're a software company that builds its own products and custom software for organizations in education, health and business."
      />

      {/* Story */}
      <section aria-labelledby="story-title" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <h2
              id="story-title"
              className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
            >
              Our story
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/85">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>

          {founder ? (
            <aside
              aria-label="Founder"
              className="self-start rounded-2xl border bg-card p-7 lg:sticky lg:top-28"
            >
              <InitialsAvatar
                name={founder.name}
                src={founder.photo}
                size="lg"
              />
              <p className="mt-6 text-xl font-semibold tracking-tight">
                {founder.name}
              </p>
              <p className="text-sm text-muted-foreground">{founder.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {founder.bio}
              </p>
              <Link
                href="/team"
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
              >
                Meet the team
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </aside>
          ) : null}
        </Container>
      </section>

      {/* Mission & vision */}
      <section aria-label="Mission and vision" className="pb-20 sm:pb-28">
        <Container className="grid gap-5 lg:grid-cols-2">
          <div className="relative isolate overflow-hidden rounded-3xl bg-inverse p-8 text-inverse-foreground sm:p-12">
            <div
              aria-hidden="true"
              className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand-accent),transparent_60%),transparent)]"
            />
            <Target className="size-6 text-brand-accent" aria-hidden="true" />
            <h2 className="mt-6 font-mono text-xs font-medium tracking-[0.16em] text-inverse-foreground/70 uppercase">
              Our mission
            </h2>
            <p className="mt-4 font-display text-2xl leading-snug font-semibold tracking-[-0.02em] sm:text-3xl">
              {mission}
            </p>
          </div>
          <div className="relative isolate overflow-hidden rounded-3xl border bg-card p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand-indigo),transparent_80%),transparent)]"
            />
            <Compass className="size-6 text-brand" aria-hidden="true" />
            <h2 className="mt-6 font-mono text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Our vision
            </h2>
            <p className="mt-4 font-display text-2xl leading-snug font-semibold tracking-[-0.02em] sm:text-3xl">
              {vision}
            </p>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section
        aria-labelledby="values-title"
        className="border-y bg-card/50 py-20 sm:py-28"
      >
        <Container>
          <SectionHeading
            id="values-title"
            eyebrow="Values"
            title="How we work, and what we won't compromise on"
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <li
                key={value.title}
                className={cn("bg-card p-7", fillLastRow(index, values.length))}
              >
                <span className="font-mono text-sm font-medium text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em]">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-title" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading
            id="timeline-title"
            eyebrow="Timeline"
            title="How we got here"
          />
          <ol className="relative border-l pl-8">
            {timeline.map((entry) => (
              <li key={entry.title} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[2.4rem] size-3 rounded-full border-2 border-background bg-brand ring-4 ring-brand-subtle"
                />
                <p className="font-mono text-sm font-medium text-brand">
                  {entry.date}
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em]">
                  {entry.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="border-t">
        <StatsStrip />
      </div>
      <div className="pt-24 sm:pt-32">
        <CtaBand />
      </div>
    </>
  )
}

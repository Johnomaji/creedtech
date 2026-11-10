import { stats } from "@/content/company"
import { Container } from "@/components/layout/container"

export function StatsStrip() {
  return (
    <section aria-label="Creedtech in numbers" className="pt-24 sm:pt-32">
      <Container>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-3 bg-card p-6 sm:p-8"
            >
              <dt className="order-2 max-w-52 text-sm leading-snug text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

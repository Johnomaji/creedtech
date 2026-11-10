import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { team, teamGroups } from "@/content/team"
import type { TeamMember } from "@/content/types"
import { socialIcons, socialLabels } from "@/components/brand/social-icons"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { InitialsAvatar } from "@/components/people/initials-avatar"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "Team",
  description:
    "Meet the people building Creedtech's products and our clients' software.",
  path: "/team",
})

export default function TeamPage() {
  const groups = teamGroups
    .map((group) => ({
      ...group,
      members: team.filter((member) => member.group === group.id),
    }))
    .filter((group) => group.members.length > 0)

  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="The people behind the software"
        description="Engineers, designers and operators who care about the people using what we build, whether that's a teacher on results day or a support agent on a busy Monday."
      />

      <div className="py-16 sm:py-24">
        <Container className="space-y-20">
          {groups.map((group) => (
            <section key={group.id} aria-labelledby={`${group.id}-title`}>
              <div className="flex items-baseline justify-between gap-4 border-b pb-4">
                <h2
                  id={`${group.id}-title`}
                  className="text-2xl font-semibold tracking-[-0.03em]"
                >
                  {group.label}
                </h2>
                <span className="font-mono text-sm text-muted-foreground">
                  {group.members.length}{" "}
                  {group.members.length === 1 ? "person" : "people"}
                </span>
              </div>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.members.map((member) => (
                  <li key={member.name} className="flex">
                    <MemberCard member={member} />
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section
            aria-labelledby="join-title"
            className="relative isolate flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-inverse p-8 text-inverse-foreground sm:flex-row sm:items-center sm:p-12"
          >
            <div
              aria-hidden="true"
              className="absolute -right-20 -bottom-32 -z-10 size-96 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand-accent),transparent_60%),transparent)]"
            />
            <div>
              <h2
                id="join-title"
                className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
              >
                Want to build with us?
              </h2>
              <p className="mt-2 text-inverse-foreground/75">
                We&apos;re always glad to meet thoughtful engineers and
                designers.
              </p>
            </div>
            <Link
              href="/careers"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-brand-accent px-5 font-medium text-brand-accent-foreground transition-colors hover:bg-[color-mix(in_oklch,var(--brand-accent),white_18%)]"
            >
              See open roles
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </section>
        </Container>
      </div>
    </>
  )
}

function MemberCard({ member }: { member: TeamMember }) {
  const links = Object.entries(member.links ?? {}).filter(
    (entry): entry is [keyof typeof socialIcons, string] => Boolean(entry[1])
  )

  return (
    <article className="flex w-full flex-col rounded-2xl border bg-card p-6 transition-colors hover:border-brand/30">
      <div className="flex items-center gap-4">
        <InitialsAvatar name={member.name} src={member.photo} size="md" />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold tracking-[-0.02em]">
            {member.name}
          </h3>
          <p className="text-sm text-brand">{member.role}</p>
        </div>
      </div>
      <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {member.bio}
      </p>
      {links.length > 0 ? (
        <ul className="mt-6 flex gap-2 border-t pt-5">
          {links.map(([network, href]) => {
            const Icon = socialIcons[network]
            return (
              <li key={network}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on ${socialLabels[network]}`}
                  className="inline-flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            )
          })}
        </ul>
      ) : null}
    </article>
  )
}

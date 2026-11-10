import type { Job } from "./types"

/**
 * Open roles. Set to an empty array (`export const jobs: Job[] = []`) when
 * nothing is open; the careers page then shows an empty state that invites
 * speculative applications.
 */
// TODO: these are sample roles for layout review. Replace or remove before launch.
export const jobs: Job[] = [
  {
    slug: "full-stack-engineer",
    title: "Full-stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    summary:
      "Build product features end to end across our SaaS products and client projects, using TypeScript, React and Node.js.",
    applyHref:
      "mailto:careers@creedtech.com?subject=Application%3A%20Full-stack%20Engineer",
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Contract",
    summary:
      "Shape the experience of products used by schools, families and teams, from research and flows to polished UI.",
    applyHref:
      "mailto:careers@creedtech.com?subject=Application%3A%20Product%20Designer",
  },
]

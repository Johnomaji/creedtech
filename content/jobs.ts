import { site } from "./site"
import type { Job } from "./types"

const applyHref = (title: string) =>
  `mailto:${site.careersEmail}?subject=${encodeURIComponent(`Application: ${title}`)}`

/**
 * Open roles. Set to an empty array (`export const jobs: Job[] = []`) when
 * nothing is open; the careers page then shows an empty state that invites
 * speculative applications.
 */
export const jobs: Job[] = [
  {
    slug: "full-stack-engineer",
    title: "Full-stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    summary:
      "Build product features end to end across our SaaS products and client projects, using TypeScript, React and Node.js.",
    applyHref: applyHref("Full-stack Engineer"),
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Contract",
    summary:
      "Shape the experience of products used by schools, families and teams, from research and flows to polished UI.",
    applyHref: applyHref("Product Designer"),
  },
]

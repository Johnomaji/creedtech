import { productCategories, products } from "./products"

/* -------------------------------------------------------------------------- */
/* How we work                                                                */
/* -------------------------------------------------------------------------- */

export interface ProcessStep {
  title: string
  description: string
  outputs: string[]
}

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "We spend time with the people who'll use the software, map the process as it really runs today, and agree what success looks like.",
    outputs: [
      "Stakeholder workshops",
      "Process maps",
      "Scope and success metrics",
    ],
  },
  {
    title: "Design",
    description:
      "We prototype the experience and the architecture together, and test them with real users before committing to a build.",
    outputs: [
      "Clickable prototypes",
      "Technical architecture",
      "Delivery plan",
    ],
  },
  {
    title: "Build",
    description:
      "We ship in short, visible iterations with demos every sprint, so you see progress and steer priorities as we go.",
    outputs: ["Fortnightly demos", "Automated tests and CI", "Staged releases"],
  },
  {
    title: "Support",
    description:
      "After launch we train your team, monitor the system and keep improving it as your organization grows.",
    outputs: [
      "Training and handover",
      "Monitoring and updates",
      "Ongoing roadmap",
    ],
  },
]

/* -------------------------------------------------------------------------- */
/* Industries                                                                 */
/* -------------------------------------------------------------------------- */

export type IndustryIcon =
  | "graduation-cap"
  | "heart-pulse"
  | "messages-square"
  | "clapperboard"
  | "landmark"
  | "store"

export interface Industry {
  name: string
  description: string
  icon: IndustryIcon
  /** Slugs of related products (from products.ts), shown as links. */
  productSlugs: string[]
}

export const industries: Industry[] = [
  {
    name: "Education",
    description:
      "Results, records and learning tools for schools, teachers, learners and parents.",
    icon: "graduation-cap",
    productSlugs: ["terminal", "idomaspeak"],
  },
  {
    name: "Healthcare",
    description:
      "Screening, referral and care-tracking tools for families, clinics and therapists.",
    icon: "heart-pulse",
    productSlugs: ["health-platform"],
  },
  {
    name: "Customer service",
    description:
      "Shared inboxes, ticketing and feedback for teams that live in customer conversations.",
    icon: "messages-square",
    productSlugs: ["cx-platform"],
  },
  {
    name: "Media & creative",
    description:
      "Production pipelines that move work from writer to editor to designer without the chasing.",
    icon: "clapperboard",
    productSlugs: ["workbench"],
  },
  {
    name: "Non-profits & public sector",
    description:
      "Case management, reporting and citizen-facing services that need to be accessible and reliable.",
    icon: "landmark",
    productSlugs: [],
  },
  {
    name: "Growing businesses",
    description:
      "Internal tools and automation that replace spreadsheets as operations scale.",
    icon: "store",
    productSlugs: ["workbench"],
  },
]

/* -------------------------------------------------------------------------- */
/* Stats                                                                      */
/* -------------------------------------------------------------------------- */

export interface Stat {
  value: string
  label: string
}

// TODO: confirm these numbers, and swap in client-facing metrics (projects
// delivered, users served, uptime) as they become available.
export const stats: Stat[] = [
  { value: "2018", label: "Building and teaching software since" },
  { value: String(products.length), label: "SaaS products in our portfolio" },
  {
    value: String(productCategories.length),
    label: "Sectors we build products for",
  },
  { value: "3", label: "Platforms we ship to: web, iOS and Android" },
]

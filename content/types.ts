/**
 * Content types for the Creedtech site.
 *
 * Every page reads from the typed data files in /content. To add a product,
 * service, team member, testimonial or job, edit the matching file only.
 * TypeScript will flag any missing or misspelled fields.
 */

/* -------------------------------------------------------------------------- */
/* Products                                                                   */
/* -------------------------------------------------------------------------- */

export type ProductCategoryId = "edutech" | "health" | "crm" | "productivity"

export interface ProductCategory {
  id: ProductCategoryId
  label: string
  description: string
}

export type ProductStatus = "live" | "beta" | "coming-soon"

export type Platform = "Web" | "iOS" | "Android" | "Desktop"

export interface ProductFeature {
  title: string
  description: string
}

export interface ProductScreenshot {
  /** Path under /public, e.g. "/products/terminal/dashboard.png". */
  src: string
  alt: string
  width: number
  height: number
}

export interface Product {
  /** URL segment: /products/[slug]. Lowercase, hyphenated, unique. */
  slug: string
  name: string
  category: ProductCategoryId
  /** One line, shown on cards. Aim for under 70 characters. */
  tagline: string
  /** The solution: what the product does, in 1–3 sentences. */
  description: string
  /** The problem it solves, in the customer's words. */
  problem: string
  features: ProductFeature[]
  /** Who it's for. Short noun phrases. */
  audience: string[]
  status: ProductStatus
  platforms: Platform[]
  ctaLabel: string
  /** Internal path ("/contact?…") or full external URL ("https://…"). */
  ctaHref: string
  /** Any CSS colour. Used for the product mark, glows and highlights. */
  accentColor: string
  /** Optional logo path under /public (square SVG or PNG works best). */
  logo?: string
  screenshots: ProductScreenshot[]
  /** Optional notice shown prominently on the product page. */
  disclaimer?: string
}

/* -------------------------------------------------------------------------- */
/* Services                                                                   */
/* -------------------------------------------------------------------------- */

export type ServiceIcon =
  "layers" | "smartphone" | "workflow" | "compass" | "life-buoy"

export interface Service {
  /** Anchor on /services, e.g. /services#custom-saas. */
  slug: string
  title: string
  /** One or two lines, shown on the home page. */
  summary: string
  /** Longer description for the services page. */
  description: string
  icon: ServiceIcon
  /** What a client gets from the engagement. */
  deliverables: string[]
}

/* -------------------------------------------------------------------------- */
/* Team                                                                       */
/* -------------------------------------------------------------------------- */

export type TeamGroup = "leadership" | "engineering" | "design" | "operations"

export interface TeamMember {
  name: string
  role: string
  group: TeamGroup
  /** Two or three sentences. */
  bio: string
  /** Optional photo under /public. Without one, an initials avatar is shown. */
  photo?: string
  links?: {
    linkedin?: string
    github?: string
    x?: string
  }
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                               */
/* -------------------------------------------------------------------------- */

export interface Testimonial {
  quote: string
  name: string
  role: string
  organization: string
  /** Optional photo under /public. */
  avatar?: string
}

/* -------------------------------------------------------------------------- */
/* Careers                                                                    */
/* -------------------------------------------------------------------------- */

export type EmploymentType =
  "Full-time" | "Part-time" | "Contract" | "Internship"

export interface Job {
  slug: string
  title: string
  department: "Engineering" | "Design" | "Product" | "Operations" | "Sales"
  location: string
  type: EmploymentType
  /** One or two sentences. */
  summary: string
  /** Where applications go: a mailto: link, ATS URL or form. */
  applyHref: string
}

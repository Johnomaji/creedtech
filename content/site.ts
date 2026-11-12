/**
 * Company-wide settings: name, URLs, contact details and navigation.
 */

// NEXT_PUBLIC_SITE_URL wins when set. On Vercel, falls back to the project's
// production domain (its custom domain once one is added, otherwise the
// *.vercel.app one), so canonical URLs and Open Graph images never point at
// a domain the site isn't on.
const vercelProductionUrl =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelProductionUrl
    ? `https://${vercelProductionUrl}`
    : "https://creedtech.com.ng")
).replace(/\/$/, "")

export const site = {
  name: "Creedtech",
  legalName: "Creedtech", // TODO: registered company name, e.g. "Creedtech Ltd"
  url: siteUrl,
  title: "Creedtech: software that organizations run on",
  description:
    "Creedtech builds SaaS products and custom software for schools, health providers and growing businesses, from first workshop to long-term support.",
  email: "creedit.2024@gmail.com",
  careersEmail: "creedit.2024@gmail.com",
  founder: {
    name: "Web Johnny",
    role: "Founder & CEO",
  },
  // TODO: replace with the real company profiles. These handles are guesses.
  socials: {
    linkedin: "https://www.linkedin.com/company/creedtech",
    x: "https://x.com/creedtech",
    github: "https://github.com/creedtech",
  },
} as const

export type SocialKey = keyof typeof site.socials

export interface NavItem {
  href: string
  label: string
}

export const mainNav: NavItem[] = [
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
]

export const companyNav: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
]

export const legalNav: NavItem[] = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
]

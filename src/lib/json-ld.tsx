import { site } from "@/content/site"

type JsonLdValue = Record<string, unknown>

/**
 * Renders schema.org structured data. `<` is escaped so content can never
 * break out of the script tag.
 */
export function JsonLd({ data }: { data: JsonLdValue | JsonLdValue[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${site.url}/`).toString()
}

export const organizationId = `${site.url}/#organization`

export function organizationJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    email: site.email,
    description: site.description,
    founder: {
      "@type": "Person",
      name: site.founder.name,
      jobTitle: site.founder.role,
    },
    sameAs: Object.values(site.socials),
  }
}

export function websiteJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": organizationId },
  }
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

import type { Metadata } from "next"

import { site } from "@/content/site"

interface OgImage {
  /** Path of an `opengraph-image` route, e.g. "/opengraph-image". */
  url: string
  alt: string
}

/** The site-wide card from `app/opengraph-image.tsx`. */
const defaultOgImage: OgImage = { url: "/opengraph-image", alt: site.title }

/**
 * Per-page metadata with matching Open Graph and Twitter fields and a
 * canonical URL.
 *
 * The image is always set explicitly: a page's `openGraph` and `twitter`
 * objects replace its parents' (images included), and they also take
 * precedence over an `opengraph-image.tsx` in the page's own segment.
 */
export function createMetadata({
  title,
  description = site.description,
  path,
  image = defaultOgImage,
}: {
  /** Page title. Omit on the home page to use the site title. */
  title?: string
  description?: string
  /** Path of the page, e.g. "/products". Used for the canonical URL. */
  path: string
  /** Social card. Defaults to the site-wide one. */
  image?: OgImage
}): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : site.title
  const images = [{ ...image, width: 1200, height: 630 }]

  return {
    title: title ?? { absolute: site.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  }
}

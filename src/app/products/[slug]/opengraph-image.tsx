import { getCategory, getProduct, products } from "@/content/products"
import { statusLabels } from "@/components/products/status-badge"
import { toHex } from "@/lib/color"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "Creedtech product"
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) {
    return renderOgImage({
      eyebrow: "Products",
      title: "Software we build, ship and run ourselves",
    })
  }

  return renderOgImage({
    eyebrow: `${getCategory(product.category).label} · ${statusLabels[product.status]}`,
    title: product.name,
    description: product.tagline,
    accent: toHex(product.accentColor),
  })
}

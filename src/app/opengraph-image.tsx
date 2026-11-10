import { site } from "@/content/site"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = site.title
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "Software company",
    title: "We build the software organizations run on.",
    description:
      "SaaS products and custom software for education, health and business.",
  })
}

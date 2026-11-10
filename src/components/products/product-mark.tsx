import Image from "next/image"
import type { CSSProperties } from "react"

import type { Product } from "@/content/types"
import { cn } from "@/lib/utils"

/** Product logo, or a monogram tile in the product's accent colour. */
export function ProductMark({
  product,
  size = "md",
  className,
}: {
  product: Pick<Product, "name" | "logo" | "accentColor">
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const dimensions = { sm: 32, md: 44, lg: 64 }[size]

  if (product.logo) {
    return (
      <Image
        src={product.logo}
        alt=""
        width={dimensions}
        height={dimensions}
        className={cn("shrink-0 rounded-xl", className)}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      style={{ "--product-accent": product.accentColor } as CSSProperties}
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden font-display font-bold text-white",
        "bg-[linear-gradient(140deg,var(--product-accent),color-mix(in_oklch,var(--product-accent),black_35%))]",
        "shadow-[inset_0_1px_0_oklch(1_0_0/0.25),0_6px_16px_-6px_var(--product-accent)]",
        {
          sm: "size-8 rounded-lg text-sm",
          md: "size-11 rounded-xl text-lg",
          lg: "size-16 rounded-2xl text-2xl",
        }[size],
        className
      )}
    >
      {product.name.charAt(0)}
    </span>
  )
}

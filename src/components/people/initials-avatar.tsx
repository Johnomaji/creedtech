import Image from "next/image"

import { cn } from "@/lib/utils"

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const first = parts[0]?.charAt(0) ?? ""
  const last = parts.length > 1 ? (parts.at(-1)?.charAt(0) ?? "") : ""
  return (first + last).toUpperCase()
}

/** Deterministic hue per name so avatars vary but never change. */
function hueFor(name: string) {
  let hash = 0
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 360
  return hash
}

const sizes = {
  sm: { box: "size-10 text-sm", px: 40 },
  md: { box: "size-14 text-base", px: 56 },
  lg: { box: "size-24 text-2xl", px: 96 },
}

export function InitialsAvatar({
  name,
  src,
  size = "md",
  className,
}: {
  name: string
  src?: string
  size?: keyof typeof sizes
  className?: string
}) {
  const { box, px } = sizes[size]

  if (src) {
    return (
      <Image
        src={src}
        // Decorative: every usage prints the name right beside the avatar.
        alt=""
        width={px}
        height={px}
        className={cn("shrink-0 rounded-full object-cover", box, className)}
      />
    )
  }

  const hue = hueFor(name)
  return (
    <span
      aria-hidden="true"
      style={{
        backgroundColor: `oklch(0.93 0.04 ${hue})`,
        color: `oklch(0.35 0.09 ${hue})`,
      }}
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-display font-semibold tracking-tight ring-1 ring-black/5 dark:ring-white/10",
        box,
        className
      )}
    >
      {getInitials(name)}
    </span>
  )
}

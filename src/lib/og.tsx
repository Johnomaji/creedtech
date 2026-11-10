import { ImageResponse } from "next/og"

import { site } from "@/content/site"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

const navy = "#0b1736"
const lime = "#c3f23e"
const indigo = "#4f46e5"

/** Shared Open Graph card used by the site and product routes. */
export function renderOgImage({
  eyebrow,
  title,
  description,
  accent = indigo,
}: {
  eyebrow: string
  title: string
  description?: string
  accent?: string
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: navy,
        backgroundImage: `radial-gradient(circle at 85% 15%, ${accent}66 0%, transparent 45%), radial-gradient(circle at 10% 110%, ${lime}40 0%, transparent 40%)`,
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="56" height="56" viewBox="0 0 32 32">
          <rect
            width="32"
            height="32"
            rx="9"
            fill="#ffffff"
            fillOpacity="0.08"
          />
          <path
            d="M21.6 10.4a7.9 7.9 0 1 0 0 11.2"
            fill="none"
            stroke={lime}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <rect
            x="19"
            y="14.3"
            width="3.4"
            height="3.4"
            rx="0.9"
            fill="#ffffff"
          />
        </svg>
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
          {site.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: lime,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: -2.5,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 900,
            }}
          >
            {description}
          </div>
        ) : null}
      </div>
    </div>,
    ogSize
  )
}

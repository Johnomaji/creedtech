import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/** Home-screen icon for iOS, generated from the placeholder brand mark. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b1736",
      }}
    >
      <svg width="132" height="132" viewBox="0 0 32 32">
        <path
          d="M21.6 10.4a7.9 7.9 0 1 0 0 11.2"
          fill="none"
          stroke="#c3f23e"
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
    </div>,
    size
  )
}

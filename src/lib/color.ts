/**
 * Converts an `oklch(L C H)` colour to `#rrggbb`. Used for Open Graph images,
 * whose renderer doesn't understand OKLCH. Other formats are returned as-is.
 */
export function toHex(color: string): string {
  const match = color.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/i)
  if (!match) return color

  const lightness = parseFloat(match[1]) / (match[2] === "%" ? 100 : 1)
  const chroma = parseFloat(match[3])
  const hue = (parseFloat(match[4]) * Math.PI) / 180
  const a = chroma * Math.cos(hue)
  const b = chroma * Math.sin(hue)

  // OKLab → LMS → linear sRGB (Björn Ottosson's reference matrices).
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3
  const linear = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]

  return (
    "#" +
    linear
      .map((channel) => {
        const c = Math.min(1, Math.max(0, channel))
        const srgb = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055
        return Math.round(srgb * 255)
          .toString(16)
          .padStart(2, "0")
      })
      .join("")
  )
}

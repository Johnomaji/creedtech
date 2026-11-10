/**
 * Theme handling without a provider.
 *
 * - The user's choice ("light" | "dark") is stored in localStorage; no entry
 *   means "follow the system".
 * - `themeScript` runs inline in <head> before first paint and sets
 *   <html data-theme="light|dark">, so there is no flash and pages stay
 *   statically prerendered (no cookies are read on the server).
 * - Client components read and update the preference through the tiny
 *   external store below.
 */

export type ThemePreference = "system" | "light" | "dark"
export type ResolvedTheme = "light" | "dark"

export const THEME_STORAGE_KEY = "theme"

export const themeScript = `(function(){try{var p=localStorage.getItem("${THEME_STORAGE_KEY}");var d=p==="dark"||(p!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.setAttribute("data-theme",d?"dark":"light")}catch(e){}})()`

const listeners = new Set<() => void>()

export function getThemePreference(): ThemePreference {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === "light" || value === "dark" ? value : "system"
  } catch {
    return "system"
  }
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference !== "system") return preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function applyTheme(preference: ThemePreference = getThemePreference()) {
  const root = document.documentElement
  const theme = resolveTheme(preference)
  // Nothing to do (the usual case on page load): avoid touching <html>,
  // which would invalidate styles for the whole document.
  if (root.getAttribute("data-theme") === theme) return

  // Suppress colour transitions for a frame so the switch is instant.
  root.setAttribute("data-theme-switching", "")
  root.setAttribute("data-theme", theme)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => root.removeAttribute("data-theme-switching"))
  })
}

export function setThemePreference(preference: ThemePreference) {
  try {
    if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY)
    else localStorage.setItem(THEME_STORAGE_KEY, preference)
  } catch {
    // Storage unavailable (private mode, blocked): apply for this page only.
  }
  applyTheme(preference)
  listeners.forEach((listener) => listener())
}

export function subscribeToTheme(listener: () => void) {
  listeners.add(listener)

  const media = window.matchMedia("(prefers-color-scheme: dark)")
  const onSystemChange = () => {
    if (getThemePreference() === "system") applyTheme("system")
    listener()
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return
    applyTheme()
    listener()
  }

  media.addEventListener("change", onSystemChange)
  window.addEventListener("storage", onStorage)

  return () => {
    listeners.delete(listener)
    media.removeEventListener("change", onSystemChange)
    window.removeEventListener("storage", onStorage)
  }
}

"use client"

import { useLayoutEffect } from "react"
import { Moon, Sun } from "lucide-react"

import { applyTheme, setThemePreference } from "@/lib/theme"
import { cx } from "@/lib/cx"

/**
 * Header toggle: flips between light and dark. The icon is driven by CSS
 * (the `dark:` variant), so server and client markup always match.
 */
export function ThemeToggle({ className }: { className?: string }) {
  // React's dev-mode Strict remount resets <html> attributes; re-apply the
  // stored theme before paint. In production the attribute is already
  // correct, so this returns immediately.
  useLayoutEffect(() => {
    applyTheme()
  }, [])

  function toggle() {
    const current = document.documentElement.getAttribute("data-theme")
    setThemePreference(current === "dark" ? "light" : "dark")
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={cx(
        "inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
    >
      <Sun className="size-[1.1rem] dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-[1.1rem] dark:block" aria-hidden="true" />
    </button>
  )
}

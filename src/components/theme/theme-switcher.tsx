"use client"

import { useSyncExternalStore } from "react"
import { Monitor, Moon, Sun } from "lucide-react"

import {
  getThemePreference,
  setThemePreference,
  subscribeToTheme,
  type ThemePreference,
} from "@/lib/theme"
import { cx } from "@/lib/cx"

const options: {
  value: ThemePreference
  label: string
  icon: typeof Sun
}[] = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
]

/** Footer control with an explicit "System" option. */
export function ThemeSwitcher({ className }: { className?: string }) {
  const preference = useSyncExternalStore(
    subscribeToTheme,
    getThemePreference,
    () => "system" as const
  )

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={cx(
        "inline-flex items-center gap-0.5 rounded-full border bg-card p-0.5",
        className
      )}
    >
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-pressed={preference === value}
          aria-label={`${label} theme`}
          title={`${label} theme`}
          onClick={() => setThemePreference(value)}
          className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-muted aria-pressed:text-foreground"
        >
          <Icon className="size-3.5" aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}

"use client"

import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu, X } from "lucide-react"

import type { NavItem } from "@/content/site"
import { isActivePath } from "@/lib/nav"

/**
 * Disclosure-style mobile menu: a button that reveals a panel below the
 * header. Closes on Escape, on navigation, and when focus leaves it.
 */
export function MobileNav({
  items,
  cta,
}: {
  items: NavItem[]
  /** Call-to-action rendered on the server (keeps button styles out of the client bundle). */
  cta: ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close when the route changes (adjusting state during render).
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 1024px)")
    function onBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    desktop.addEventListener("change", onBreakpoint)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
      desktop.removeEventListener("change", onBreakpoint)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className="lg:hidden"
      onBlur={(event) => {
        const next = event.relatedTarget as Node | null
        if (next && !rootRef.current?.contains(next)) setOpen(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b bg-background shadow-lg shadow-navy/5"
      >
        <nav
          aria-label="Mobile"
          className="mx-auto max-w-7xl px-4 pt-2 pb-6 sm:px-6"
        >
          <ul className="divide-y">
            {items.map((item) => {
              const active = isActivePath(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onNavigate={() => setOpen(false)}
                    className="flex items-center justify-between py-3.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground"
                  >
                    {item.label}
                    <ArrowRight
                      className="size-4 opacity-40"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-4" onClickCapture={() => setOpen(false)}>
            {cta}
          </div>
        </nav>
      </div>
    </div>
  )
}

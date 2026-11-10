"use client"

import { useCallback, useSyncExternalStore, type ReactNode } from "react"
import Link from "next/link"
import { AnimatePresence, LazyMotion, m, MotionConfig } from "motion/react"
import { ArrowRight } from "lucide-react"

import { cx } from "@/lib/cx"

/*
 * Category filter for the products grid.
 *
 * - Cards are rendered on the server and passed in as `node`s, so this
 *   component only adds the filtering behaviour.
 * - The selected category lives in the URL (?category=…) so filtered views
 *   can be shared, without making the page dynamic on the server.
 * - Motion's layout animations load lazily and respect reduced motion.
 */

const loadMotionFeatures = () =>
  import("motion/react").then((mod) => mod.domMax)

const ALL = "all"
const PARAM = "category"
const urlListeners = new Set<() => void>()

function subscribeToUrl(listener: () => void) {
  urlListeners.add(listener)
  window.addEventListener("popstate", listener)
  return () => {
    urlListeners.delete(listener)
    window.removeEventListener("popstate", listener)
  }
}

function getUrlCategory() {
  return new URLSearchParams(window.location.search).get(PARAM)
}

export interface FilterCategory {
  id: string
  label: string
}

export interface FilterItem {
  id: string
  category: string
  node: ReactNode
}

export function ProductFilter({
  categories,
  items,
}: {
  categories: FilterCategory[]
  items: FilterItem[]
}) {
  const fromUrl = useSyncExternalStore(
    subscribeToUrl,
    getUrlCategory,
    () => null
  )
  const active =
    fromUrl && categories.some((c) => c.id === fromUrl) ? fromUrl : ALL

  const select = useCallback((id: string) => {
    const url = new URL(window.location.href)
    if (id === ALL) url.searchParams.delete(PARAM)
    else url.searchParams.set(PARAM, id)
    window.history.replaceState(window.history.state, "", url)
    urlListeners.forEach((listener) => listener())
  }, [])

  const visible =
    active === ALL ? items : items.filter((item) => item.category === active)
  const activeLabel = categories.find((c) => c.id === active)?.label
  const options = [{ id: ALL, label: "All products" }, ...categories]

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <div
          role="group"
          aria-label="Filter products by category"
          className="flex flex-wrap gap-2"
        >
          {options.map((option) => {
            const count =
              option.id === ALL
                ? items.length
                : items.filter((item) => item.category === option.id).length
            const pressed = active === option.id
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => select(option.id)}
                className={cx(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
                  pressed
                    ? "border-transparent bg-foreground text-background"
                    : "bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground"
                )}
              >
                {option.label}
                <span
                  className={cx(
                    "rounded-full px-1.5 font-mono text-[0.7rem] tabular-nums",
                    pressed ? "bg-background/15" : "bg-muted"
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <p aria-live="polite" className="sr-only">
          {`Showing ${visible.length} ${visible.length === 1 ? "product" : "products"}${
            activeLabel ? ` in ${activeLabel}` : ""
          }`}
        </p>

        {visible.length > 0 ? (
          <m.ul
            layout
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item) => (
                <m.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex"
                >
                  {item.node}
                </m.li>
              ))}
            </AnimatePresence>
          </m.ul>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed bg-card/60 px-6 py-16 text-center">
            <h2 className="text-xl font-semibold tracking-tight">
              Nothing here yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              We don&apos;t have a product in this category yet, but we build
              custom software for it.
            </p>
            <Link
              href="/contact?interest=custom-project"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand underline-offset-4 hover:underline"
            >
              Tell us what you need
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </LazyMotion>
    </MotionConfig>
  )
}

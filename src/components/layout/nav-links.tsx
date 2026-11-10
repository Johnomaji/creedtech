"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import type { NavItem } from "@/content/site"
import { isActivePath } from "@/lib/nav"
import { cx } from "@/lib/cx"

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => {
        const active = isActivePath(pathname, item.href)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cx(
                "relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                "aria-[current=page]:text-foreground",
                "after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:rounded-full after:bg-brand after:opacity-0 after:transition-opacity aria-[current=page]:after:opacity-100"
              )}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

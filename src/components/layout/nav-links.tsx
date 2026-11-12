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
                "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                "aria-[current=page]:bg-muted aria-[current=page]:text-foreground"
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

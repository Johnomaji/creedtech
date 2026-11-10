import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { mainNav, site } from "@/content/site"
import { Wordmark } from "@/components/brand/logo"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MobileNav } from "./mobile-nav"
import { NavLinks } from "./nav-links"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="-m-1.5 rounded-lg p-1.5"
          aria-label={`${site.name} home`}
        >
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="ml-6 hidden lg:block">
          <NavLinks items={mainNav} />
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden h-9 rounded-lg px-3.5 sm:inline-flex"
            )}
          >
            Start a project
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
          <MobileNav
            items={mainNav}
            cta={
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "xl" }),
                  "w-full justify-center"
                )}
              >
                Start a project
              </Link>
            }
          />
        </div>
      </div>
    </header>
  )
}

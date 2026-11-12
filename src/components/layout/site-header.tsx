import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { mainNav, site } from "@/content/site"
import { Wordmark } from "@/components/brand/logo"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Container } from "./container"
import { MobileNav } from "./mobile-nav"
import { NavLinks } from "./nav-links"

/**
 * Floating header. Its height (gap + bar) is `--header-height` in
 * globals.css. Keep them in sync.
 */
export function SiteHeader() {
  return (
    // Only the bar takes clicks; the gap around it passes them to the page.
    <header className="pointer-events-none sticky top-0 z-50 pt-3">
      <Container>
        <div className="pointer-events-auto relative flex h-14 items-center gap-4 rounded-2xl border border-border/70 bg-background/75 pr-2.5 pl-4 shadow-lg shadow-navy/5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65 sm:pl-5 dark:shadow-black/25">
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
      </Container>
    </header>
  )
}

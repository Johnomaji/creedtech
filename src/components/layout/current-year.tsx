import { cacheLife } from "next/cache"

/**
 * The current year for the copyright line. Cache Components requires
 * time-based values to be cached explicitly; this one is refreshed daily.
 */
export async function CurrentYear() {
  "use cache"
  cacheLife("days")
  return <>{new Date().getFullYear()}</>
}

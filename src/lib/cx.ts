/**
 * Minimal class-name joiner for Client Components.
 *
 * `cn` (from the `cn` package) resolves Tailwind conflicts, but it ships a
 * ~10 KB engine to the browser. Client Components here never need conflict
 * resolution, so they use this instead. Server Components can keep using
 * `cn` freely: it never reaches the client bundle from there.
 */
export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

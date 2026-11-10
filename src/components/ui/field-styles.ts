/**
 * Class strings for form controls, shared by the shadcn/ui primitives
 * (Input, Textarea, NativeSelect) and Client Components that render plain
 * elements to keep the `cn` engine out of the browser bundle.
 */

const shared =
  "w-full min-w-0 rounded-lg border border-input bg-transparent text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"

export const inputStyles = `${shared} h-11 px-3 py-1 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground`

export const textareaStyles = `${shared} flex field-sizing-content min-h-32 px-3 py-2.5`

export const selectStyles = `${shared} h-11 appearance-none py-1 pr-9 pl-3 dark:hover:bg-input/50`

export const labelStyles = "text-sm leading-none font-medium"

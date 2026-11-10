import * as React from "react"
import { cn } from "cn"

import { inputStyles } from "./field-styles"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputStyles, className)}
      {...props}
    />
  )
}

export { Input }

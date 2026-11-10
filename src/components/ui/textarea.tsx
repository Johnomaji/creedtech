import * as React from "react"
import { cn } from "cn"

import { textareaStyles } from "./field-styles"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaStyles, className)}
      {...props}
    />
  )
}

export { Textarea }

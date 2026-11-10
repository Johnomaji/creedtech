import {
  Compass,
  Layers,
  LifeBuoy,
  Smartphone,
  Workflow,
  type LucideProps,
} from "lucide-react"

import type { ServiceIcon as ServiceIconName } from "@/content/types"

const icons = {
  layers: Layers,
  smartphone: Smartphone,
  workflow: Workflow,
  compass: Compass,
  "life-buoy": LifeBuoy,
} satisfies Record<ServiceIconName, unknown>

export function ServiceIcon({
  name,
  ...props
}: { name: ServiceIconName } & LucideProps) {
  const Icon = icons[name]
  return <Icon aria-hidden="true" {...props} />
}

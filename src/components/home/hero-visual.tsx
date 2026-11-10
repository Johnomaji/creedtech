import { Bell, Check, CircleCheck, MessageCircle, Star } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Decorative "product console" built from HTML so it stays crisp, themable
 * and costs no image requests. It illustrates three products at a glance:
 * Workbench handoffs (main window), Terminal results and the CX inbox.
 */

const stages = [
  { initial: "W", role: "Writer", task: "Script", state: "done" },
  { initial: "E", role: "Editor", task: "Edit pass", state: "active" },
  { initial: "D", role: "Designer", task: "Thumbnails", state: "next" },
  { initial: "V", role: "Video editor", task: "Final cut", state: "waiting" },
] as const

const stateLabel = {
  done: "Done",
  active: "In progress",
  next: "Up next",
  waiting: "Waiting",
}

export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-lg select-none sm:mt-16 sm:mb-20 lg:my-0 lg:max-w-none"
    >
      {/* Glow */}
      <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand-indigo),transparent_70%),transparent)]" />
      <div className="absolute -right-6 -bottom-10 -z-10 size-48 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand-accent),transparent_55%),transparent)]" />

      {/* Main window: Workbench */}
      <div className="relative rounded-2xl border bg-card shadow-[0_40px_80px_-32px_color-mix(in_oklch,var(--brand-navy),transparent_65%)]">
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
          </div>
          <div className="flex gap-1 font-mono text-[0.68rem] text-muted-foreground">
            <span className="rounded-md bg-muted px-2 py-0.5 text-foreground">
              Workbench
            </span>
            <span className="px-2 py-0.5">Terminal</span>
            <span className="hidden px-2 py-0.5 sm:inline">Inbox</span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
                Media team · Episode 12
              </p>
              <p className="mt-1 font-display text-base font-semibold tracking-tight">
                Launch story video
              </p>
            </div>
            <span className="rounded-full border bg-background px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground">
              Due Fri
            </span>
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[38%] rounded-full bg-[linear-gradient(90deg,var(--brand-indigo),var(--brand-indigo-soft))]" />
          </div>

          <ol className="mt-5 space-y-2">
            {stages.map((stage, index) => (
              <li key={stage.role} className="relative">
                {index < stages.length - 1 ? (
                  <span className="absolute top-9 left-[1.1rem] h-3 w-px bg-border" />
                ) : null}
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors",
                    stage.state === "active"
                      ? "border-brand/40 bg-brand-subtle shadow-[0_0_0_3px_color-mix(in_oklch,var(--brand),transparent_88%)]"
                      : "bg-background/50"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-full text-[0.65rem] font-semibold",
                      stage.state === "done" && "bg-success/15 text-success",
                      stage.state === "active" &&
                        "bg-brand text-primary-foreground",
                      (stage.state === "next" || stage.state === "waiting") &&
                        "bg-muted text-muted-foreground"
                    )}
                  >
                    {stage.state === "done" ? (
                      <Check className="size-3.5" />
                    ) : (
                      stage.initial
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.8rem] font-medium">
                      {stage.task}
                    </p>
                    <p className="truncate text-[0.7rem] text-muted-foreground">
                      {stage.role}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 text-[0.7rem] font-medium whitespace-nowrap",
                      stage.state === "done" && "text-success",
                      stage.state === "active" && "text-brand",
                      (stage.state === "next" || stage.state === "waiting") &&
                        "text-muted-foreground"
                    )}
                  >
                    {stage.state === "active" ? (
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex size-full rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
                      </span>
                    ) : null}
                    {stateLabel[stage.state]}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/70 px-3 py-2 text-[0.72rem] text-muted-foreground">
            <Bell className="size-3.5 shrink-0 text-brand" />
            <span className="min-w-0 truncate">
              Designer is notified automatically when the edit is approved.
            </span>
          </div>
        </div>
      </div>

      {/* Floating card: Terminal results */}
      <div className="absolute -bottom-24 -left-4 hidden w-60 rounded-xl border bg-card p-3.5 shadow-xl shadow-navy/10 motion-safe:animate-float sm:block lg:-left-10">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-md bg-[oklch(0.58_0.17_255)] text-[0.65rem] font-bold text-white">
            T
          </span>
          <p className="text-[0.75rem] font-semibold">Terminal</p>
          <span className="ml-auto text-[0.65rem] text-muted-foreground">
            JSS 2 · Term 1
          </span>
        </div>
        <div className="mt-3 flex h-10 items-end gap-1">
          {[38, 64, 50, 86, 70, 100, 78].map((height, i) => (
            <span
              key={i}
              style={{ height: `${height}%` }}
              className="flex-1 rounded-sm bg-[color-mix(in_oklch,oklch(0.58_0.17_255),transparent_70%)] last:bg-[oklch(0.58_0.17_255)]"
            />
          ))}
        </div>
        <p className="mt-2.5 flex items-center gap-1.5 text-[0.72rem] font-medium text-success">
          <CircleCheck className="size-3.5" />
          Results published to parents
        </p>
      </div>

      {/* Floating card: CX inbox */}
      <div className="absolute -top-20 -right-3 hidden w-56 rounded-xl border bg-card p-3.5 shadow-xl shadow-navy/10 motion-safe:animate-float-delayed sm:block lg:-right-8">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-md bg-[oklch(0.62_0.2_350)] text-white">
            <MessageCircle className="size-3.5" />
          </span>
          <p className="text-[0.75rem] font-semibold">Ticket #4821</p>
          <span className="ml-auto rounded-full bg-success/12 px-1.5 py-px text-[0.62rem] font-medium text-success">
            Resolved
          </span>
        </div>
        <p className="mt-2 text-[0.72rem] leading-snug text-muted-foreground">
          “Thanks, that sorted it straight away!”
        </p>
        <div className="mt-2 flex items-center gap-0.5 text-[oklch(0.75_0.16_75)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3 fill-current" />
          ))}
          <span className="ml-1.5 text-[0.65rem] text-muted-foreground">
            CSAT 5/5
          </span>
        </div>
      </div>
    </div>
  )
}

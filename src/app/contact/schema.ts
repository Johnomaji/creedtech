import { z } from "zod"

export const interestOptions = [
  { value: "product-demo", label: "Product demo" },
  { value: "custom-project", label: "Custom project" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
] as const

export type Interest = (typeof interestOptions)[number]["value"]

const interestValues = interestOptions.map((o) => o.value) as [
  Interest,
  ...Interest[],
]

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Please enter your name." })
    .max(100, { error: "Please keep your name under 100 characters." }),
  email: z
    .string()
    .trim()
    .max(200, { error: "Please use a shorter email address." })
    .pipe(z.email({ error: "Please enter a valid email address." })),
  company: z
    .string()
    .trim()
    .max(120, { error: "Please keep this under 120 characters." }),
  interest: z.enum(interestValues, {
    error: "Please choose what you're interested in.",
  }),
  message: z
    .string()
    .trim()
    .min(10, {
      error: "Please tell us a little more (at least 10 characters).",
    })
    .max(5000, { error: "Please keep your message under 5,000 characters." }),
})

export type ContactInput = z.infer<typeof contactSchema>
export type ContactField = keyof ContactInput

export interface ContactState {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Partial<Record<ContactField, string[]>>
  /** Echoed back on error so the form keeps what the visitor typed. */
  values?: Partial<Record<ContactField, string>>
}

export const initialContactState: ContactState = { status: "idle" }

/** Name of the hidden honeypot field. Humans never see or fill it. */
export const HONEYPOT_FIELD = "website"
/** Hidden field holding the time the form was first rendered in the browser. */
export const STARTED_AT_FIELD = "startedAt"
/** Submissions faster than this are almost certainly bots. */
export const MIN_FILL_TIME_MS = 2500

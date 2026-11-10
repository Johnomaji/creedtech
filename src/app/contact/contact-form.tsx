"use client"

import {
  startTransition,
  useActionState,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react"
import { ChevronDown, CircleCheck, LoaderCircle, Send } from "lucide-react"

import {
  inputStyles,
  labelStyles,
  selectStyles,
  textareaStyles,
} from "@/components/ui/field-styles"
import { cx } from "@/lib/cx"
import { submitContact } from "./actions"
import {
  HONEYPOT_FIELD,
  initialContactState,
  interestOptions,
  STARTED_AT_FIELD,
  type ContactField,
  type ContactState,
} from "./schema"

export interface PrefillProduct {
  slug: string
  name: string
  waitlist: boolean
}

const fieldOrder: ContactField[] = [
  "name",
  "email",
  "company",
  "interest",
  "message",
]

export function ContactForm({ products }: { products: PrefillProduct[] }) {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState
  )
  // A success message is hidden once dismissed ("send another") or when the
  // page is hidden by client navigation, so it never shows stale.
  const [dismissed, setDismissed] = useState<ContactState | null>(null)
  const showSuccess = state.status === "success" && state !== dismissed

  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const stateRef = useRef(state)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  // Next.js keeps visited pages mounted (hidden) for fast back navigation.
  // Clear a finished submission when this page is hidden.
  useLayoutEffect(() => {
    return () => {
      if (stateRef.current.status === "success") setDismissed(stateRef.current)
    }
  }, [])

  // Move focus to the first invalid field, or to the success message.
  useEffect(() => {
    if (state.status === "error" && state.fieldErrors) {
      const first = fieldOrder.find((field) => state.fieldErrors?.[field])
      const element = first ? formRef.current?.elements.namedItem(first) : null
      if (element instanceof HTMLElement) element.focus()
    }
    if (state.status === "success") successRef.current?.focus()
  }, [state])

  // On every fresh form: record when it appeared (spam timing check) and
  // prefill from links like /contact?interest=product-demo&product=terminal.
  useEffect(() => {
    const form = formRef.current
    if (!form) return

    const startedAt = form.elements.namedItem(STARTED_AT_FIELD)
    if (startedAt instanceof HTMLInputElement)
      startedAt.value = String(Date.now())

    const params = new URLSearchParams(window.location.search)
    const interest = params.get("interest")
    const select = form.elements.namedItem("interest")
    if (
      select instanceof HTMLSelectElement &&
      !select.value &&
      interestOptions.some((o) => o.value === interest)
    ) {
      select.value = interest as string
    }

    const product = products.find((p) => p.slug === params.get("product"))
    const message = form.elements.namedItem("message")
    if (product && message instanceof HTMLTextAreaElement && !message.value) {
      message.value = product.waitlist
        ? `I'd like to join the waitlist for ${product.name}.`
        : `I'd like a demo of ${product.name}.`
    }
  }, [products, showSuccess])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Submit through a transition instead of the form's default action so
    // React doesn't clear the fields when validation fails. Without
    // JavaScript, the form still posts to the Server Action natively.
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(() => formAction(formData))
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-start rounded-2xl border bg-card p-8 sm:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-success/15 text-success">
          <CircleCheck className="size-6" aria-hidden="true" />
        </span>
        <h2
          ref={successRef}
          tabIndex={-1}
          className="mt-6 text-2xl font-semibold tracking-[-0.02em] outline-none"
        >
          Message sent
        </h2>
        <p role="status" className="mt-2 leading-relaxed text-muted-foreground">
          {state.message}
        </p>
        <button
          type="button"
          onClick={() => setDismissed(state)}
          className="mt-8 text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  const errors = state.status === "error" ? state.fieldErrors : undefined
  const values = state.status === "error" ? state.values : undefined

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={state.status === "error" ? "form-status" : undefined}
      className="relative rounded-2xl border bg-card p-6 sm:p-8"
    >
      {state.status === "error" && state.message ? (
        <p
          id="form-status"
          role="alert"
          className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors?.name?.[0]}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={values?.name}
            aria-invalid={errors?.name ? true : undefined}
            aria-describedby={errors?.name ? "name-error" : undefined}
            className={inputStyles}
          />
        </Field>

        <Field
          id="email"
          label="Work email"
          required
          error={errors?.email?.[0]}
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            defaultValue={values?.email}
            aria-invalid={errors?.email ? true : undefined}
            aria-describedby={errors?.email ? "email-error" : undefined}
            className={inputStyles}
          />
        </Field>

        <Field
          id="company"
          label="Company or organization"
          error={errors?.company?.[0]}
        >
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={values?.company}
            aria-invalid={errors?.company ? true : undefined}
            aria-describedby={errors?.company ? "company-error" : undefined}
            className={inputStyles}
          />
        </Field>

        <Field
          id="interest"
          label="I'm interested in"
          required
          error={errors?.interest?.[0]}
        >
          <div className="relative">
            <select
              id="interest"
              name="interest"
              required
              defaultValue={values?.interest ?? ""}
              aria-invalid={errors?.interest ? true : undefined}
              aria-describedby={errors?.interest ? "interest-error" : undefined}
              className={selectStyles}
            >
              <option
                value=""
                disabled
                className="bg-[Canvas] text-[CanvasText]"
              >
                Choose an option
              </option>
              {interestOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-[Canvas] text-[CanvasText]"
                >
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </Field>

        <Field
          id="message"
          label="How can we help?"
          required
          error={errors?.message?.[0]}
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            defaultValue={values?.message}
            placeholder="A few sentences about your organization and what you'd like to build or improve."
            aria-invalid={errors?.message ? true : undefined}
            aria-describedby={errors?.message ? "message-error" : undefined}
            className={textareaStyles}
          />
        </Field>
      </div>

      {/* Spam protection: a honeypot humans never see, plus a timestamp. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] size-px overflow-hidden"
      >
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name={STARTED_AT_FIELD} />

      <div className="mt-8 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-muted-foreground">
          Fields marked <span aria-hidden="true">*</span>
          <span className="sr-only">with an asterisk</span> are required. We
          only use your details to reply to you.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-[0.95rem] font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-progress disabled:opacity-70"
        >
          {pending ? (
            <>
              <LoaderCircle
                className="size-4 animate-spin"
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <label htmlFor={id} className={labelStyles}>
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-destructive">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

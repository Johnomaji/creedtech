"use server"

import { Resend } from "resend"
import { z } from "zod"

import { site } from "@/content/site"
import {
  contactSchema,
  HONEYPOT_FIELD,
  interestOptions,
  MIN_FILL_TIME_MS,
  STARTED_AT_FIELD,
  type ContactField,
  type ContactInput,
  type ContactState,
} from "./schema"

const SUCCESS: ContactState = {
  status: "success",
  message: "Thanks! Your message is on its way. We'll be in touch soon.",
}

const fields: ContactField[] = [
  "name",
  "email",
  "company",
  "interest",
  "message",
]

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function looksLikeBot(formData: FormData) {
  // 1. Honeypot: a visually hidden field that real visitors never fill in.
  const honeypot = formData.get(HONEYPOT_FIELD)
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true

  // 2. Timing: set in the browser when the form appears. Missing when
  //    JavaScript is off, so only enforced when present.
  const startedAt = Number(formData.get(STARTED_AT_FIELD))
  if (startedAt > 0 && Date.now() - startedAt < MIN_FILL_TIME_MS) return true

  return false
}

function buildEmail(data: ContactInput) {
  const interest =
    interestOptions.find((o) => o.value === data.interest)?.label ??
    data.interest
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "-"],
    ["Interested in", interest],
  ]

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}`
  const html = `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#667"><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`
    )
    .join(
      ""
    )}</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(
    data.message
  )}</p>`

  return {
    subject: `New enquiry (${interest}) from ${data.name}`,
    text,
    html,
  }
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Pretend to succeed so bots get no signal that they were filtered.
  if (looksLikeBot(formData)) return SUCCESS

  const raw = Object.fromEntries(
    fields.map((field) => [field, String(formData.get(field) ?? "")])
  ) as Record<ContactField, string>

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values: raw,
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "Creedtech Website <onboarding@resend.dev>"

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without email configured: log and succeed.
      console.info("[contact] Email not configured. Submission:", parsed.data)
      return SUCCESS
    }
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set.")
    return {
      status: "error",
      message: `Sorry, we couldn't send your message. Please email us at ${site.email}.`,
      values: raw,
    }
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: parsed.data.email,
      ...buildEmail(parsed.data),
    })
    if (error) throw new Error(error.message)
  } catch (error) {
    console.error("[contact] Failed to send email:", error)
    return {
      status: "error",
      message: `Sorry, something went wrong sending your message. Please try again, or email us at ${site.email}.`,
      values: raw,
    }
  }

  return SUCCESS
}

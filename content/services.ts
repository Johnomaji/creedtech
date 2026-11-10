import type { Service } from "./types"

/**
 * Services, in display order. `icon` maps to a Lucide icon in
 * src/components/services/service-icon.tsx.
 */
export const services: Service[] = [
  {
    slug: "custom-saas",
    title: "Custom SaaS development",
    summary:
      "Multi-tenant products with accounts, billing, roles and analytics, engineered to grow with your customer base.",
    description:
      "We design and build software-as-a-service products end to end: product strategy, architecture, multi-tenancy, subscriptions and billing, admin tooling and analytics. It's the same playbook we use for our own products.",
    icon: "layers",
    deliverables: [
      "Product and technical architecture",
      "Multi-tenant platform with roles and permissions",
      "Subscriptions, billing and onboarding",
      "Admin dashboards and analytics",
    ],
  },
  {
    slug: "web-mobile-apps",
    title: "Web & mobile apps",
    summary:
      "Fast, accessible web apps and polished iOS and Android apps, built by one team.",
    description:
      "From customer-facing portals to field apps for your staff, we build web and mobile applications that are fast, accessible and easy to maintain, sharing logic across platforms where it makes sense.",
    icon: "smartphone",
    deliverables: [
      "Responsive web applications",
      "iOS and Android apps",
      "APIs and integrations",
      "App Store and Play Store releases",
    ],
  },
  {
    slug: "internal-tools",
    title: "Internal tools & workflow automation",
    summary:
      "Replace spreadsheets, paper forms and manual handoffs with tools built around how your team works.",
    description:
      "We map how work actually moves through your organization, then build the internal tools, dashboards and automations that remove the copy-pasting, chasing and double entry.",
    icon: "workflow",
    deliverables: [
      "Process mapping and requirements",
      "Internal dashboards and admin tools",
      "Approval flows and automated handoffs",
      "Integrations with the tools you already use",
    ],
  },
  {
    slug: "digital-transformation",
    title: "Digital transformation consulting",
    summary:
      "Clarify your processes, choose the right systems and plan a rollout your people will actually adopt.",
    description:
      "Not every problem needs new software. We help leadership teams assess current systems, prioritise what to digitise first, and plan migrations and training that stick.",
    icon: "compass",
    deliverables: [
      "Current-state assessment",
      "Digital roadmap and priorities",
      "Build, buy or adapt recommendations",
      "Rollout, migration and training plans",
    ],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & support",
    summary:
      "Monitoring, updates, security patches and continuous improvement, so your software keeps working as you grow.",
    description:
      "Software is never finished. We keep systems secure, up to date and performing well, and keep improving them as your needs change, whether we built them or not.",
    icon: "life-buoy",
    deliverables: [
      "Monitoring and incident response",
      "Security updates and dependency upgrades",
      "Performance and reliability improvements",
      "A monthly roadmap of enhancements",
    ],
  },
]

/* -------------------------------------------------------------------------- */
/* Ways to work together                                                      */
/* -------------------------------------------------------------------------- */

export interface EngagementModel {
  title: string
  bestFor: string
  description: string
}

export const engagementModels: EngagementModel[] = [
  {
    title: "Fixed-scope project",
    bestFor: "A well-defined product or tool",
    description:
      "We agree the scope, timeline and price up front after a short discovery phase, then deliver in visible milestones.",
  },
  {
    title: "Dedicated product team",
    bestFor: "Ongoing product development",
    description:
      "A cross-functional team of engineers and a designer working as an extension of yours, with a shared roadmap.",
  },
  {
    title: "Support retainer",
    bestFor: "Software already in production",
    description:
      "A monthly allocation for monitoring, fixes, upgrades and improvements, with clear response times.",
  },
]

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export interface Faq {
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    question: "How much does a custom project cost?",
    answer:
      "It depends on scope, which is why every project starts with a short discovery phase. You'll get a clear estimate and options before committing to a build.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "Small internal tools can ship in weeks; larger platforms are usually released in stages over a few months, with working software from the first sprint.",
  },
  {
    question: "Who owns the code?",
    answer:
      "For custom builds, ownership terms are agreed in the contract before work begins. We document everything so your team can maintain it.", // TODO: confirm standard IP terms
  },
  {
    question: "Can you take over an existing system?",
    answer:
      "Yes. We start with a code and infrastructure review, fix what's urgent, and then agree a plan for maintenance and improvements.",
  },
  {
    question: "Can we use one of your products instead of a custom build?",
    answer:
      "Often, yes. If one of our products fits, we'll tell you, and we can configure or extend it for your organization.",
  },
]

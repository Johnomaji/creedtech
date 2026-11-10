import type { Product, ProductCategory, ProductCategoryId } from "./types"

export const productCategories: ProductCategory[] = [
  {
    id: "edutech",
    label: "Edutech",
    description: "Software for schools, teachers, learners and parents.",
  },
  {
    id: "health",
    label: "Health",
    description: "Tools that make care easier to find, follow and track.",
  },
  {
    id: "crm",
    label: "CRM & Customer Experience",
    description: "Every customer conversation in one place.",
  },
  {
    id: "productivity",
    label: "Productivity",
    description: "Work management for every department.",
  },
]

/**
 * Products, in display order.
 *
 * To add a product, copy an entry, give it a unique `slug`, and fill in
 * every field. Its card, filter, detail page (/products/[slug]), sitemap
 * entry, Open Graph image and JSON-LD are generated automatically.
 */
export const products: Product[] = [
  {
    slug: "terminal",
    name: "Terminal",
    category: "edutech",
    tagline:
      "School results, from score entry to parents, without spreadsheets.",
    description:
      "Terminal gives schools one place to manage results. Teachers enter scores, Terminal computes totals, grades and positions automatically, generates report cards for a whole class at once, and publishes results securely to parents.",
    problem:
      "At the end of every term, teachers and administrators lose weeks to spreadsheets: re-typing scores, checking formulas, formatting report cards and answering calls from parents waiting on results. Errors slip through and results arrive late.",
    features: [
      {
        title: "Score entry",
        description:
          "Teachers record assessment and exam scores per subject and class, from any device.",
      },
      {
        title: "Automatic computation",
        description:
          "Totals, averages, grades and class positions are computed instantly using your school's grading rules.",
      },
      {
        title: "Report card generation",
        description:
          "Generate consistent, print-ready report cards for an entire class in one step.",
      },
      {
        title: "Result publishing to parents",
        description:
          "Release results to parents when you're ready, with secure access for each family.",
      },
      {
        title: "Admin, teacher and parent roles",
        description:
          "Everyone sees exactly what they should, from whole-school analytics to a single child's report.",
      },
    ],
    audience: [
      "Primary and secondary schools",
      "Principals and school administrators",
      "Teachers and form tutors",
      "Parents and guardians",
    ],
    status: "live", // TODO: confirm status
    platforms: ["Web"],
    ctaLabel: "Request demo", // TODO: switch to "Visit product" + public URL if Terminal has one
    ctaHref: "/contact?interest=product-demo&product=terminal",
    accentColor: "oklch(0.58 0.17 255)",
    screenshots: [], // TODO: add screenshots under /public/products/terminal/
  },
  {
    slug: "idomaspeak",
    name: "IdomaSpeak",
    category: "edutech",
    tagline: "Learn the Idoma language in a few minutes a day.",
    description:
      "IdomaSpeak is a mobile app for learning Idoma through bite-sized lessons, native-speaker audio and game-like practice that makes a daily habit stick.",
    problem:
      "Idoma is a living language with a rich culture, yet there are very few modern, engaging ways to learn it. Young people and families in the diaspora who want to stay connected to the language have little to practise with.",
    features: [
      {
        title: "Bite-sized lessons",
        description:
          "Short lessons that fit into a commute or a break, building vocabulary and phrases step by step.",
      },
      {
        title: "Audio pronunciation",
        description:
          "Hear every word and phrase spoken clearly, so learners get tone and pronunciation right.",
      },
      {
        title: "Streaks and gamification",
        description:
          "Streaks, points and milestones that turn practice into a daily habit.",
      },
      {
        title: "Progress tracking",
        description:
          "See what you've learned, what to review and how far you've come.",
      },
    ],
    audience: [
      "Children and adults learning Idoma",
      "Families and diaspora communities",
      "Anyone curious about Idoma language and culture",
    ],
    status: "beta", // TODO: confirm status
    platforms: ["iOS", "Android"],
    ctaLabel: "Join waitlist",
    ctaHref: "/contact?interest=product-demo&product=idomaspeak",
    accentColor: "oklch(0.7 0.17 50)",
    screenshots: [],
  },
  {
    // TODO: replace with the final product name and slug ([HEALTH_PRODUCT_NAME])
    slug: "health-platform",
    name: "Health Platform",
    category: "health",
    tagline:
      "Screening, support and care pathways for neurodivergent families.",
    description:
      "A health platform for neurodivergent communities. Families can complete validated screening questionnaires that give a likelihood indication, find evaluation centres in their city, connect with professionals, and follow guided lessons while tracking their child's growth.",
    problem:
      "Families who notice signs of autism, ADHD or other neurodevelopmental differences often don't know where to start. Evaluation centres are hard to find, waiting lists are long, and caregivers are left without practical guidance in the meantime.",
    features: [
      {
        title: "Validated screening tools",
        description:
          "Evidence-based questionnaires that give a likelihood indication and a clear next step. Screening is not a diagnosis.",
      },
      {
        title: "Referral to evaluation centres",
        description:
          "Find centres in your city that can carry out a formal evaluation.",
      },
      {
        title: "Directory of professionals",
        description:
          "Browse therapists, clinicians and specialists who work with neurodivergent children and adults.",
      },
      {
        title: "Guided lessons for caregivers",
        description:
          "Step-by-step therapy and ABA-style activities that caregivers can practise at home.",
      },
      {
        title: "Growth tracking",
        description:
          "Record milestones and progress over time, and share them with professionals.",
      },
    ],
    audience: [
      "Parents and caregivers",
      "Neurodivergent individuals and families",
      "Therapists, clinicians and evaluation centres",
    ],
    status: "coming-soon", // TODO: confirm status
    platforms: ["Web", "iOS", "Android"],
    ctaLabel: "Join waitlist",
    ctaHref: "/contact?interest=product-demo&product=health-platform",
    accentColor: "oklch(0.64 0.12 182)",
    screenshots: [],
    disclaimer:
      "This platform is not a diagnostic tool. Screening results give a likelihood indication only and are not a medical diagnosis. Always consult a qualified healthcare professional for evaluation, diagnosis and treatment.",
  },
  {
    // TODO: replace with the final product name and slug ([CRM_PRODUCT_NAME])
    slug: "cx-platform",
    name: "CX Platform",
    category: "crm",
    tagline: "Every customer conversation, ticket and rating in one place.",
    description:
      "A customer-experience CRM that brings every channel into one shared inbox, turns conversations into trackable tickets, and gives your team the customer context and analytics to resolve issues fast.",
    problem:
      "Customer messages arrive by chat, email, social media and phone. They get lost in personal inboxes, nobody knows who is handling what, and leaders have no clear view of response times or customer satisfaction.",
    features: [
      {
        title: "Omnichannel inbox",
        description:
          "Chat, email and social messages land in one shared inbox your whole team can work from.",
      },
      {
        title: "Ticketing",
        description:
          "Turn any conversation into a ticket with an owner, priority and status.",
      },
      {
        title: "Customer profiles",
        description:
          "Full history, notes and context for every customer, visible on every conversation.",
      },
      {
        title: "Feedback and CSAT",
        description:
          "Collect ratings and feedback automatically after each resolution.",
      },
      {
        title: "Team collaboration",
        description:
          "Assign, mention and hand over conversations without leaving the thread.",
      },
      {
        title: "Analytics",
        description:
          "Track volume, response times, resolution rates and satisfaction across channels.",
      },
    ],
    audience: [
      "Customer support and success teams",
      "Sales and account managers",
      "Growing businesses with high message volume",
    ],
    status: "coming-soon", // TODO: confirm status
    platforms: ["Web"],
    ctaLabel: "Join waitlist",
    ctaHref: "/contact?interest=product-demo&product=cx-platform",
    accentColor: "oklch(0.62 0.2 350)",
    screenshots: [],
  },
  {
    slug: "workbench",
    name: "Workbench",
    category: "productivity",
    tagline: "Work management with handoffs nobody has to chase.",
    description:
      "Workbench is work management for every department. Tasks move through clear status pipelines with defined handoffs between roles, so the next person is notified the moment work is ready for them.",
    problem:
      "Most work passes through several hands. In a media team, a story moves from writer to editor to designer to video editor, and every handoff means a message, a reminder or a missed deadline. Work stalls in the gaps between people.",
    features: [
      {
        title: "Role-to-role handoffs",
        description:
          "Define who works on a task next, from writer to editor to designer to video editor, and let Workbench pass it on.",
      },
      {
        title: "Status pipelines",
        description:
          "Model each team's workflow as stages, so everyone can see where every piece of work is.",
      },
      {
        title: "Assignments",
        description:
          "Every task has a clear owner at every stage, with no ambiguity about who's on it.",
      },
      {
        title: "Deadlines",
        description:
          "Set due dates for the whole task and for each stage, and spot delays before they happen.",
      },
      {
        title: "Notifications",
        description:
          "The right people are notified automatically when work is handed to them or a deadline is near.",
      },
    ],
    audience: [
      "Media and content teams",
      "Operations and project teams",
      "Any department with multi-step workflows",
    ],
    status: "beta", // TODO: confirm status
    platforms: ["Web"],
    ctaLabel: "Request demo",
    ctaHref: "/contact?interest=product-demo&product=workbench",
    accentColor: "oklch(0.72 0.15 75)",
    screenshots: [],
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getCategory(id: ProductCategoryId): ProductCategory {
  const category = productCategories.find((c) => c.id === id)
  if (!category) throw new Error(`Unknown product category: ${id}`)
  return category
}

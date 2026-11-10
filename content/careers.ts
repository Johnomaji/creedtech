/**
 * Copy for the Careers page. Open roles live in jobs.ts.
 */

export interface CulturePoint {
  title: string
  description: string
}

// TODO: confirm these match how the team actually works (remote policy,
// learning support, and so on) before launch.
export const culture: CulturePoint[] = [
  {
    title: "Real ownership",
    description:
      "Small teams, clear responsibilities and direct contact with the people who use what you build.",
  },
  {
    title: "Products and projects",
    description:
      "Work across our own SaaS products and client builds, so you see problems from both sides.",
  },
  {
    title: "Learn and teach",
    description:
      "We started as a coding school. Mentoring, code review and sharing what you learn are part of the job.",
  },
  {
    title: "Focused, flexible work",
    description:
      "Fewer meetings, written decisions and the space to do deep work, wherever you do it best.",
  },
]

export const hiringSteps = [
  {
    title: "Apply",
    description:
      "Send your CV or portfolio and a short note about why the role interests you.",
  },
  {
    title: "Intro call",
    description:
      "A 30-minute conversation about your experience and what you're looking for.",
  },
  {
    title: "Practical exercise",
    description:
      "A small, realistic task, discussed together. No trick questions.",
  },
  {
    title: "Meet the team",
    description:
      "Talk to the people you'd work with, then we make a decision quickly.",
  },
]

/**
 * Copy for the About page. Edit freely; every field is plain text.
 */

export const story = {
  title: "From teaching code to building the software organizations run on",
  paragraphs: [
    "Creedtech started with a classroom. In 2018, our founder Web Johnny opened Creed Academy to teach children to code. Working with schools up close showed him how much of their day was lost to spreadsheets, paperwork and systems that didn't fit how they actually worked.",
    "Creedtech grew out of that experience. We build software products of our own, like Terminal for school results and Workbench for team handoffs, and we build custom software for organizations that need something made for them.",
    "Running our own products keeps us honest. We feel the same pressure our clients do to ship reliable software, support real users and keep improving long after launch. That's the standard we hold every project to.",
  ],
}

export const mission =
  "To build dependable, well-designed software that helps schools, health providers and businesses serve people better."

export const vision =
  "A world where every organization, wherever it is, runs on software as good as the best companies in the world use."

export interface Value {
  title: string
  description: string
}

export const values: Value[] = [
  {
    title: "Build for the people who use it",
    description:
      "Teachers, parents, clinicians and support agents are our real users. We design around their day, not around a feature list.",
  },
  {
    title: "Own the outcome",
    description:
      "We measure success by whether the software is used and works, not by whether we delivered what the specification said.",
  },
  {
    title: "Clarity over cleverness",
    description:
      "Plain language, simple interfaces and readable code. If it's hard to explain, it's probably too complicated.",
  },
  {
    title: "Teach as we go",
    description:
      "Our roots are in education. We share what we know with clients and with each other, so everyone gets better.",
  },
  {
    title: "Built to last",
    description:
      "Secure, tested, documented software that a future team can maintain, whether that's us or you.",
  },
]

export interface TimelineEntry {
  date: string
  title: string
  description: string
}

// TODO: confirm dates and milestones. Entries marked "20XX" need a real year.
export const timeline: TimelineEntry[] = [
  {
    date: "2018",
    title: "Creed Academy opens",
    description:
      "Web Johnny starts Creed Academy to teach coding to children, and starts seeing how schools really run.",
  },
  {
    date: "20XX",
    title: "Creedtech is founded",
    description:
      "A software company focused on products and custom platforms for organizations.",
  },
  {
    date: "20XX",
    title: "Terminal launches",
    description:
      "Our school results management system goes live, taking report cards from weeks to days.",
  },
  {
    date: "Today",
    title: "A growing product portfolio",
    description:
      "Five products across education, health, customer experience and productivity, alongside custom software for clients.",
  },
]

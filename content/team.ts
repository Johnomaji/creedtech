import type { TeamGroup, TeamMember } from "./types"

export const teamGroups: { id: TeamGroup; label: string }[] = [
  { id: "leadership", label: "Leadership" },
  { id: "engineering", label: "Engineering" },
  { id: "design", label: "Design" },
  { id: "operations", label: "Operations" },
]

/**
 * Team members, in display order within each group.
 * Add a `photo` (path under /public, square, at least 400×400) to replace
 * the initials avatar.
 */
export const team: TeamMember[] = [
  {
    name: "Web Johnny",
    role: "Founder & CEO",
    group: "leadership",
    bio: "Web Johnny is a self-taught software engineer with an M.Sc. in Software Engineering. In 2018 he founded Creed Academy, which has taught coding to children ever since, and he now leads Creedtech's products and client work.",
    // TODO: add photo, e.g. photo: "/team/web-johnny.jpg"
    links: {
      // TODO: add Web Johnny's profile URLs
    },
  },
  {
    name: "Ochai", // TODO: add surname
    role: "Senior Full-stack Engineer",
    group: "engineering",
    bio: "Ochai builds Creedtech's web and mobile software end to end, from database to interface, across our own products and client projects.",
    links: {
      // TODO: add Ochai's profile URLs
    },
  },
  {
    name: "Rashida Abdul-Rashid",
    role: "Design Advisor",
    group: "design",
    bio: "Rashida advises Creedtech on design, guiding how our products look, feel and work so they stay clear and accessible for the people who use them.",
    links: {
      // TODO: add Rashida's profile URLs
    },
  },
  {
    name: "Chelsea", // TODO: add surname
    role: "Operations Manager",
    group: "operations",
    bio: "Chelsea co-founded our health platform for neurodivergent families. As Operations Manager she keeps Creedtech's projects, people and partners running smoothly.",
    links: {
      // TODO: add Chelsea's profile URLs
    },
  },
]
